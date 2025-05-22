#!/usr/bin/env python3
"""
Advanced Pool Game Overlay
--------------------------
A standalone overlay application for pool games with:
- Customizable pocket positions
- Table transformation (move, scale, rotate)
- Shot trajectory prediction with rebound physics
- Configuration saving/loading per website/game
"""

import sys
import os
import json
import math
from pathlib import Path
from functools import partial

from PyQt5.QtWidgets import (
    QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout, 
    QPushButton, QLabel, QSlider, QColorDialog, QInputDialog,
    QListWidget, QMenu, QAction, QSystemTrayIcon, QMessageBox,
    QFileDialog, QCheckBox, QGroupBox, QFormLayout
)
from PyQt5.QtCore import Qt, QPoint, QRect, QTimer, QPointF, pyqtSignal, QSize
from PyQt5.QtGui import (
    QPainter, QColor, QPen, QBrush, QPolygon, QFont, 
    QCursor, QIcon, QPainterPath, QTransform
)

import numpy as np
import keyboard
from pynput import mouse
import pyautogui

# Constants
DEFAULT_POCKET_SIZE = 20
DEFAULT_BALL_SIZE = 14
DEFAULT_TABLE_WIDTH = 800
DEFAULT_TABLE_HEIGHT = 400
DEFAULT_TABLE_COLOR = QColor(0, 128, 0, 100)  # Semi-transparent green
DEFAULT_POCKET_COLOR = QColor(255, 255, 0, 150)  # Semi-transparent yellow
DEFAULT_GUIDE_COLOR = QColor(0, 255, 0, 200)  # Semi-transparent bright green
DEFAULT_BALL_COLOR = QColor(255, 255, 255, 200)  # Semi-transparent white
DEFAULT_WARNING_COLOR = QColor(255, 0, 0, 200)  # Semi-transparent red
DEFAULT_SUCCESS_COLOR = QColor(0, 255, 128, 200)  # Semi-transparent green

# Config directory
CONFIG_DIR = Path.home() / ".pool-overlay"
os.makedirs(CONFIG_DIR, exist_ok=True)


class PoolOverlayWidget(QWidget):
    """The main overlay widget with transparent background and all drawing functionality."""
    
    configChanged = pyqtSignal()  # Signal when config changes
    
    def __init__(self, parent=None):
        super().__init__(parent)
        self.initUI()
        self.initOverlay()
        self.initHotkeys()
    
    def initUI(self):
        """Initialize the UI components."""
        # Set up a transparent, frameless window that stays on top
        self.setAttribute(Qt.WA_TranslucentBackground)
        self.setWindowFlags(
            Qt.FramelessWindowHint | 
            Qt.WindowStaysOnTopHint | 
            Qt.Tool
        )
        
        # Make it full screen by default
        screen_size = QApplication.desktop().screenGeometry()
        self.resize(screen_size.width(), screen_size.height())
        
        # Initial state is click-through
        self.setClickThrough(True)
    
    def initOverlay(self):
        """Initialize the overlay state and configuration."""
        # Mouse tracking
        self.setMouseTracking(True)
        
        # State variables
        self.editing_mode = False
        self.moving_table = False
        self.moving_pocket_index = -1
        self.scaling_table = False
        self.rotating_table = False
        self.mouse_pos = QPoint(0, 0)
        self.drag_start_pos = QPoint(0, 0)
        self.mouse_pressed = False
        
        # Table and elements
        self.table_rect = QRect(
            (self.width() - DEFAULT_TABLE_WIDTH) // 2,
            (self.height() - DEFAULT_TABLE_HEIGHT) // 2,
            DEFAULT_TABLE_WIDTH, 
            DEFAULT_TABLE_HEIGHT
        )
        
        # Create default pocket positions (six pockets)
        self.resetPocketPositions()
        
        # Transformation
        self.table_transform = QTransform()
        self.scale_factor = 1.0
        self.rotation_angle = 0.0
        self.table_center = QPoint(
            self.table_rect.x() + self.table_rect.width() // 2,
            self.table_rect.y() + self.table_rect.height() // 2
        )
        
        # Visualization settings
        self.show_table_outline = True
        self.show_pocket_zones = True
        self.show_trajectory = True
        self.show_rebound = True
        self.pocket_size = DEFAULT_POCKET_SIZE
        self.ball_size = DEFAULT_BALL_SIZE
        
        # Colors
        self.table_color = DEFAULT_TABLE_COLOR
        self.pocket_color = DEFAULT_POCKET_COLOR
        self.guide_color = DEFAULT_GUIDE_COLOR
        self.ball_color = DEFAULT_BALL_COLOR
        self.warning_color = DEFAULT_WARNING_COLOR
        self.success_color = DEFAULT_SUCCESS_COLOR
        
        # Shot prediction
        self.cue_ball_pos = None
        self.target_ball_pos = None
        
        # Config
        self.current_config_name = "default"
        self.snap_to_grid = False
        self.grid_size = 10
        
        # Keybindings
        self.keybindings = {
            "toggle_editing": "F8",
            "toggle_overlay": "F9",
            "save_config": "ctrl+s",
            "load_config": "ctrl+o",
            "reset_pockets": "ctrl+r",
        }
    
    def initHotkeys(self):
        """Set up keyboard hotkeys."""
        keyboard.add_hotkey(self.keybindings["toggle_editing"], self.toggleEditingMode)
        keyboard.add_hotkey(self.keybindings["toggle_overlay"], self.toggleOverlayVisibility)
        keyboard.add_hotkey(self.keybindings["save_config"], self.saveConfigDialog)
        keyboard.add_hotkey(self.keybindings["load_config"], self.loadConfigDialog)
        keyboard.add_hotkey(self.keybindings["reset_pockets"], self.resetPocketPositions)
    
    def resetPocketPositions(self):
        """Reset pocket positions to default spots around the table."""
        table_x, table_y = self.table_rect.x(), self.table_rect.y()
        table_w, table_h = self.table_rect.width(), self.table_rect.height()
        
        # Standard 6-pocket positions
        self.pockets = [
            QPoint(table_x, table_y),  # Top-left
            QPoint(table_x + table_w // 2, table_y),  # Top-center
            QPoint(table_x + table_w, table_y),  # Top-right
            QPoint(table_x, table_y + table_h),  # Bottom-left
            QPoint(table_x + table_w // 2, table_y + table_h),  # Bottom-center
            QPoint(table_x + table_w, table_y + table_h)  # Bottom-right
        ]
        self.update()
        self.configChanged.emit()
    
    def setClickThrough(self, click_through):
        """Toggle between click-through and interactive modes."""
        if click_through:
            self.setWindowFlags(
                self.windowFlags() | Qt.WindowTransparentForInput
            )
        else:
            self.setWindowFlags(
                self.windowFlags() & ~Qt.WindowTransparentForInput
            )
        self.show()  # Needed to apply flag changes
        
    def toggleEditingMode(self):
        """Toggle between normal and editing modes."""
        self.editing_mode = not self.editing_mode
        self.setClickThrough(not self.editing_mode)
        
        if self.editing_mode:
            # Show a status message
            QApplication.instance().tray_icon.showMessage(
                "Pool Overlay",
                "Editing Mode ON - Use ALT to move pockets, SHIFT to move table, "
                "CTRL+Scroll to scale, CTRL+Alt+Drag to rotate",
                QSystemTrayIcon.Information,
                2000
            )
        else:
            QApplication.instance().tray_icon.showMessage(
                "Pool Overlay",
                "Editing Mode OFF - Overlay is now click-through",
                QSystemTrayIcon.Information,
                2000
            )
        self.update()
    
    def toggleOverlayVisibility(self):
        """Toggle visibility of the entire overlay."""
        if self.isVisible():
            self.hide()
        else:
            self.show()
    
    def saveConfigDialog(self):
        """Show dialog to save the current configuration."""
        if not self.editing_mode:
            return
            
        config_name, ok = QInputDialog.getText(
            self, "Save Configuration",
            "Enter a name for this configuration:",
            text=self.current_config_name
        )
        
        if ok and config_name:
            self.saveConfig(config_name)
            self.current_config_name = config_name
            
            QApplication.instance().tray_icon.showMessage(
                "Pool Overlay",
                f"Configuration '{config_name}' saved successfully",
                QSystemTrayIcon.Information,
                2000
            )
    
    def loadConfigDialog(self):
        """Show dialog to load a saved configuration."""
        if not self.editing_mode:
            return
            
        config_files = [f.stem for f in CONFIG_DIR.glob("*.json")]
        
        if not config_files:
            QMessageBox.information(
                self, "No Configurations", 
                "No saved configurations found."
            )
            return
        
        config_name, ok = QInputDialog.getItem(
            self, "Load Configuration",
            "Select a configuration to load:",
            config_files, 0, False
        )
        
        if ok and config_name:
            self.loadConfig(config_name)
            QApplication.instance().tray_icon.showMessage(
                "Pool Overlay",
                f"Configuration '{config_name}' loaded successfully",
                QSystemTrayIcon.Information,
                2000
            )
    
    def saveConfig(self, config_name):
        """Save the current configuration to a file."""
        config = {
            "table_rect": {
                "x": self.table_rect.x(),
                "y": self.table_rect.y(),
                "width": self.table_rect.width(),
                "height": self.table_rect.height()
            },
            "pockets": [{"x": p.x(), "y": p.y()} for p in self.pockets],
            "scale_factor": self.scale_factor,
            "rotation_angle": self.rotation_angle,
            "pocket_size": self.pocket_size,
            "ball_size": self.ball_size,
            "colors": {
                "table": self.table_color.getRgb(),
                "pocket": self.pocket_color.getRgb(),
                "guide": self.guide_color.getRgb(),
                "ball": self.ball_color.getRgb(),
                "warning": self.warning_color.getRgb(),
                "success": self.success_color.getRgb()
            },
            "visibility": {
                "table_outline": self.show_table_outline,
                "pocket_zones": self.show_pocket_zones,
                "trajectory": self.show_trajectory,
                "rebound": self.show_rebound
            },
            "snap_to_grid": self.snap_to_grid,
            "grid_size": self.grid_size
        }
        
        config_path = CONFIG_DIR / f"{config_name}.json"
        with open(config_path, "w") as f:
            json.dump(config, f, indent=2)
    
    def loadConfig(self, config_name):
        """Load a configuration from a file."""
        config_path = CONFIG_DIR / f"{config_name}.json"
        
        try:
            with open(config_path, "r") as f:
                config = json.load(f)
            
            # Apply configuration
            self.table_rect = QRect(
                config["table_rect"]["x"],
                config["table_rect"]["y"],
                config["table_rect"]["width"],
                config["table_rect"]["height"]
            )
            
            self.pockets = [QPoint(p["x"], p["y"]) for p in config["pockets"]]
            
            self.scale_factor = config.get("scale_factor", 1.0)
            self.rotation_angle = config.get("rotation_angle", 0.0)
            self.pocket_size = config.get("pocket_size", DEFAULT_POCKET_SIZE)
            self.ball_size = config.get("ball_size", DEFAULT_BALL_SIZE)
            
            # Colors
            colors = config.get("colors", {})
            self.table_color = QColor(*colors.get("table", DEFAULT_TABLE_COLOR.getRgb()))
            self.pocket_color = QColor(*colors.get("pocket", DEFAULT_POCKET_COLOR.getRgb()))
            self.guide_color = QColor(*colors.get("guide", DEFAULT_GUIDE_COLOR.getRgb()))
            self.ball_color = QColor(*colors.get("ball", DEFAULT_BALL_COLOR.getRgb()))
            self.warning_color = QColor(*colors.get("warning", DEFAULT_WARNING_COLOR.getRgb()))
            self.success_color = QColor(*colors.get("success", DEFAULT_SUCCESS_COLOR.getRgb()))
            
            # Visibility
            visibility = config.get("visibility", {})
            self.show_table_outline = visibility.get("table_outline", True)
            self.show_pocket_zones = visibility.get("pocket_zones", True)
            self.show_trajectory = visibility.get("trajectory", True)
            self.show_rebound = visibility.get("rebound", True)
            
            # Grid settings
            self.snap_to_grid = config.get("snap_to_grid", False)
            self.grid_size = config.get("grid_size", 10)
            
            self.current_config_name = config_name
            self.update()
            self.configChanged.emit()
            
        except (FileNotFoundError, json.JSONDecodeError) as e:
            QMessageBox.warning(
                self, "Error Loading Configuration", 
                f"Could not load configuration: {str(e)}"
            )
    
    def paintEvent(self, event):
        """Draw the overlay with all its components."""
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing)
        
        # Draw background (fully transparent)
        painter.fillRect(self.rect(), QColor(0, 0, 0, 0))
        
        # Draw editing mode indicator
        if self.editing_mode:
            font = QFont("Arial", 12)
            painter.setFont(font)
            painter.setPen(QPen(QColor(255, 255, 255), 2))
            painter.drawText(10, 30, "EDITING MODE ON")
            
            # Draw instructions if in editing mode
            painter.setPen(QPen(QColor(200, 200, 200), 1))
            painter.drawText(10, 50, "ALT+Click to move pockets")
            painter.drawText(10, 70, "SHIFT+Drag to move table")
            painter.drawText(10, 90, "CTRL+Scroll to scale")
            painter.drawText(10, 110, "CTRL+ALT+Drag to rotate")
            painter.drawText(10, 130, f"Current Config: {self.current_config_name}")
        
        # Create a transform for all table-related elements
        transform = QTransform()
        transform.translate(self.table_rect.center().x(), self.table_rect.center().y())
        transform.rotate(self.rotation_angle)
        transform.scale(self.scale_factor, self.scale_factor)
        transform.translate(-self.table_rect.center().x(), -self.table_rect.center().y())
        
        # Save current painter state and apply transform
        painter.save()
        painter.setTransform(transform)
        
        # Draw table outline
        if self.show_table_outline:
            painter.setPen(QPen(self.table_color, 2))
            painter.setBrush(QBrush(self.table_color.lighter(120)))
            painter.drawRect(self.table_rect)
        
        # Draw pockets
        for i, pocket in enumerate(self.pockets):
            # Base pocket color
            pocket_color = self.pocket_color
            
            # Highlight if this pocket is being edited
            if self.editing_mode and self.moving_pocket_index == i:
                pocket_color = QColor(255, 128, 0, 200)  # Bright orange for active pocket
            
            painter.setPen(QPen(pocket_color.darker(120), 2))
            painter.setBrush(QBrush(pocket_color))
            painter.drawEllipse(pocket, self.pocket_size, self.pocket_size)
        
        # Restore painter state (remove transform)
        painter.restore()
        
        # Draw shot trajectory if we have mouse position
        if (self.show_trajectory and not self.moving_table and 
                not self.scaling_table and not self.rotating_table):
            self.drawShotTrajectory(painter)
        
        # Draw crosshair at mouse position in editing mode
        if self.editing_mode:
            painter.setPen(QPen(QColor(255, 255, 255), 1))
            size = 10
            painter.drawLine(self.mouse_pos.x() - size, self.mouse_pos.y(), 
                            self.mouse_pos.x() + size, self.mouse_pos.y())
            painter.drawLine(self.mouse_pos.x(), self.mouse_pos.y() - size,
                            self.mouse_pos.x(), self.mouse_pos.y() + size)
    
    def drawShotTrajectory(self, painter):
        """Draw the shot trajectory from cue ball to target and pockets."""
        # Assume cue ball is at mouse position for now
        mouse_pos = self.mouse_pos
        
        # Create a transform for all table-related elements
        transform = QTransform()
        transform.translate(self.table_rect.center().x(), self.table_rect.center().y())
        transform.rotate(self.rotation_angle)
        transform.scale(self.scale_factor, self.scale_factor)
        transform.translate(-self.table_rect.center().x(), -self.table_rect.center().y())
        
        # Apply inverse transform to mouse position to get position in table space
        inv_transform = transform.inverted()[0]
        table_space_mouse = inv_transform.map(QPointF(mouse_pos))
        
        # Get a default cue ball position (can be replaced with actual tracking later)
        if not self.cue_ball_pos:
            # Place the cue ball at a default position or wherever makes sense for your game
            self.cue_ball_pos = QPointF(
                self.table_rect.x() + self.table_rect.width() * 0.25,
                self.table_rect.y() + self.table_rect.height() * 0.5
            )
        
        # Target (object ball) is at mouse position
        target_ball_pos = table_space_mouse
        
        # Draw cue ball
        painter.setBrush(QBrush(self.ball_color))
        painter.setPen(QPen(self.ball_color.darker(120), 1))
        
        # Apply transform to cue ball position for drawing
        cue_ball_screen = transform.map(self.cue_ball_pos)
        painter.drawEllipse(cue_ball_screen, self.ball_size, self.ball_size)
        
        # Draw target position (where mouse is)
        painter.setBrush(QBrush(QColor(200, 200, 0, 180)))  # Yellowish
        painter.drawEllipse(mouse_pos, self.ball_size, self.ball_size)
        
        # Calculate and draw aim line
        cue_direction = QLineF(cue_ball_screen, mouse_pos)
        
        # Extend the line in both directions
        length = 2000  # Some large value to ensure it crosses the table
        extended_line = QLineF(
            cue_ball_screen.x() - math.cos(math.radians(cue_direction.angle())) * length,
            cue_ball_screen.y() - math.sin(math.radians(cue_direction.angle())) * length,
            cue_ball_screen.x() + math.cos(math.radians(cue_direction.angle())) * length,
            cue_ball_screen.y() + math.sin(math.radians(cue_direction.angle())) * length
        )
        
        # Draw aim line
        painter.setPen(QPen(self.guide_color, 2, Qt.DashLine))
        painter.drawLine(extended_line)
        
        # Draw aim from all pockets to target
        painter.setPen(QPen(self.guide_color, 1, Qt.DashLine))
        
        for i, pocket in enumerate(self.pockets):
            # Apply transform to pocket position
            pocket_screen = transform.map(QPointF(pocket))
            
            # Draw line from pocket to target
            painter.drawLine(pocket_screen, mouse_pos)
    
    def mousePressEvent(self, event):
        """Handle mouse press events."""
        if not self.editing_mode:
            return
            
        self.mouse_pressed = True
        self.drag_start_pos = event.pos()
        
        # Check if we're near a pocket
        if keyboard.is_pressed("alt"):
            closest_pocket = -1
            min_distance = float('inf')
            
            # Apply transform to get screen coordinates
            transform = QTransform()
            transform.translate(self.table_rect.center().x(), self.table_rect.center().y())
            transform.rotate(self.rotation_angle)
            transform.scale(self.scale_factor, self.scale_factor)
            transform.translate(-self.table_rect.center().x(), -self.table_rect.center().y())
            
            for i, pocket in enumerate(self.pockets):
                # Transform pocket to screen coords
                pocket_screen = transform.map(QPointF(pocket))
                distance = QLineF(pocket_screen, event.pos()).length()
                if distance < self.pocket_size + 10 and distance < min_distance:
                    closest_pocket = i
                    min_distance = distance
            
            if closest_pocket >= 0:
                self.moving_pocket_index = closest_pocket
                self.update()
        
        # Check if we're moving the table
        elif keyboard.is_pressed("shift"):
            self.moving_table = True
        
        # Check if we're scaling the table
        elif keyboard.is_pressed("ctrl"):
            if keyboard.is_pressed("alt"):
                self.rotating_table = True
            else:
                self.scaling_table = True
    
    def mouseReleaseEvent(self, event):
        """Handle mouse release events."""
        if not self.editing_mode:
            return
            
        self.mouse_pressed = False
        self.moving_pocket_index = -1
        self.moving_table = False
        self.scaling_table = False
        self.rotating_table = False
        self.update()
        
        # Signal that config might have changed
        self.configChanged.emit()
    
    def mouseMoveEvent(self, event):
        """Handle mouse move events."""
        self.mouse_pos = event.pos()
        
        if not self.editing_mode or not self.mouse_pressed:
            self.update()
            return
        
        # Calculate delta from drag start
        delta = event.pos() - self.drag_start_pos
        
        # Handle moving a pocket
        if self.moving_pocket_index >= 0:
            # Apply inverse transform to get position in table space
            transform = QTransform()
            transform.translate(self.table_rect.center().x(), self.table_rect.center().y())
            transform.rotate(self.rotation_angle)
            transform.scale(self.scale_factor, self.scale_factor)
            transform.translate(-self.table_rect.center().x(), -self.table_rect.center().y())
            
            inv_transform = transform.inverted()[0]
            table_space_pos = inv_transform.map(QPointF(event.pos()))
            
            # Update pocket position
            if self.snap_to_grid:
                x = round(table_space_pos.x() / self.grid_size) * self.grid_size
                y = round(table_space_pos.y() / self.grid_size) * self.grid_size
                self.pockets[self.moving_pocket_index] = QPoint(x, y)
            else:
                self.pockets[self.moving_pocket_index] = QPoint(
                    int(table_space_pos.x()),
                    int(table_space_pos.y())
                )
        
        # Handle moving the table
        elif self.moving_table:
            self.table_rect.translate(delta)
            self.drag_start_pos = event.pos()
            
            # Move pockets along with the table
            for i in range(len(self.pockets)):
                self.pockets[i] += delta
        
        # Handle rotating the table
        elif self.rotating_table:
            # Calculate angle between drag start and current pos
            center = QPointF(self.table_rect.center())
            start_angle = math.degrees(math.atan2(
                self.drag_start_pos.y() - center.y(),
                self.drag_start_pos.x() - center.x()
            ))
            current_angle = math.degrees(math.atan2(
                event.pos().y() - center.y(),
                event.pos().x() - center.x()
            ))
            
            # Update rotation and drag start
            self.rotation_angle += (current_angle - start_angle)
            self.drag_start_pos = event.pos()
        
        # Handle scaling the table 
        elif self.scaling_table:
            # Calculate scale factor based on distance from center
            center = QPointF(self.table_rect.center())
            start_dist = math.sqrt(
                (self.drag_start_pos.x() - center.x())**2 + 
                (self.drag_start_pos.y() - center.y())**2
            )
            current_dist = math.sqrt(
                (event.pos().x() - center.x())**2 + 
                (event.pos().y() - center.y())**2
            )
            
            if start_dist > 0:
                scale_change = current_dist / start_dist
                self.scale_factor *= scale_change
                self.scale_factor = max(0.1, min(5.0, self.scale_factor))  # Limit scale
                self.drag_start_pos = event.pos()
        
        self.update()
    
    def wheelEvent(self, event):
        """Handle mouse wheel events."""
        if not self.editing_mode:
            return
        
        # Scale with mouse wheel if CTRL is pressed
        if keyboard.is_pressed("ctrl"):
            delta = event.angleDelta().y() / 120.0  # Standard wheel step
            scale_change = 1.0 + (delta * 0.05)  # 5% per wheel step
            self.scale_factor *= scale_change
            self.scale_factor = max(0.1, min(5.0, self.scale_factor))  # Limit scale
            self.update()
            self.configChanged.emit()


class ControlPanel(QMainWindow):
    """Control panel window for configuring the overlay."""
    
    def __init__(self, overlay):
        super().__init__()
        self.overlay = overlay
        self.initUI()
        
        # Connect overlay signals
        self.overlay.configChanged.connect(self.updateUIFromOverlay)
    
    def initUI(self):
        """Initialize the control panel UI."""
        self.setWindowTitle("Pool Overlay Controls")
        self.setGeometry(100, 100, 400, 600)
        
        # Create central widget and layout
        central_widget = QWidget()
        layout = QVBoxLayout(central_widget)
        
        # Toggle overlay button
        self.toggle_overlay_btn = QPushButton("Show/Hide Overlay (F9)")
        self.toggle_overlay_btn.clicked.connect(self.overlay.toggleOverlayVisibility)
        layout.addWidget(self.toggle_overlay_btn)
        
        # Toggle editing mode button
        self.toggle_editing_btn = QPushButton("Toggle Editing Mode (F8)")
        self.toggle_editing_btn.clicked.connect(self.overlay.toggleEditingMode)
        layout.addWidget(self.toggle_editing_btn)
        
        # Create configuration group
        config_group = QGroupBox("Configuration")
        config_layout = QHBoxLayout()
        
        self.save_config_btn = QPushButton("Save Config (Ctrl+S)")
        self.save_config_btn.clicked.connect(self.overlay.saveConfigDialog)
        config_layout.addWidget(self.save_config_btn)
        
        self.load_config_btn = QPushButton("Load Config (Ctrl+O)")
        self.load_config_btn.clicked.connect(self.overlay.loadConfigDialog)
        config_layout.addWidget(self.load_config_btn)
        
        self.reset_pockets_btn = QPushButton("Reset Pockets (Ctrl+R)")
        self.reset_pockets_btn.clicked.connect(self.overlay.resetPocketPositions)
        config_layout.addWidget(self.reset_pockets_btn)
        
        config_group.setLayout(config_layout)
        layout.addWidget(config_group)
        
        # Create visibility group
        visibility_group = QGroupBox("Visibility")
        visibility_layout = QVBoxLayout()
        
        self.show_table_cb = QCheckBox("Show Table Outline")
        self.show_table_cb.setChecked(self.overlay.show_table_outline)
        self.show_table_cb.toggled.connect(self.updateOverlayFromUI)
        visibility_layout.addWidget(self.show_table_cb)
        
        self.show_pockets_cb = QCheckBox("Show Pocket Zones")
        self.show_pockets_cb.setChecked(self.overlay.show_pocket_zones)
        self.show_pockets_cb.toggled.connect(self.updateOverlayFromUI)
        visibility_layout.addWidget(self.show_pockets_cb)
        
        self.show_trajectory_cb = QCheckBox("Show Shot Trajectory")
        self.show_trajectory_cb.setChecked(self.overlay.show_trajectory)
        self.show_trajectory_cb.toggled.connect(self.updateOverlayFromUI)
        visibility_layout.addWidget(self.show_trajectory_cb)
        
        self.show_rebound_cb = QCheckBox("Show Rebound Prediction")
        self.show_rebound_cb.setChecked(self.overlay.show_rebound)
        self.show_rebound_cb.toggled.connect(self.updateOverlayFromUI)
        visibility_layout.addWidget(self.show_rebound_cb)
        
        self.snap_to_grid_cb = QCheckBox("Snap to Grid")
        self.snap_to_grid_cb.setChecked(self.overlay.snap_to_grid)
        self.snap_to_grid_cb.toggled.connect(self.updateOverlayFromUI)
        visibility_layout.addWidget(self.snap_to_grid_cb)
        
        visibility_group.setLayout(visibility_layout)
        layout.addWidget(visibility_group)
        
        # Create size controls
        size_group = QGroupBox("Sizes")
        size_layout = QFormLayout()
        
        self.pocket_size_slider = QSlider(Qt.Horizontal)
        self.pocket_size_slider.setRange(5, 50)
        self.pocket_size_slider.setValue(self.overlay.pocket_size)
        self.pocket_size_slider.valueChanged.connect(self.updateOverlayFromUI)
        size_layout.addRow("Pocket Size:", self.pocket_size_slider)
        
        self.ball_size_slider = QSlider(Qt.Horizontal)
        self.ball_size_slider.setRange(5, 30)
        self.ball_size_slider.setValue(self.overlay.ball_size)
        self.ball_size_slider.valueChanged.connect(self.updateOverlayFromUI)
        size_layout.addRow("Ball Size:", self.ball_size_slider)
        
        self.grid_size_slider = QSlider(Qt.Horizontal)
        self.grid_size_slider.setRange(5, 50)
        self.grid_size_slider.setValue(self.overlay.grid_size)
        self.grid_size_slider.valueChanged.connect(self.updateOverlayFromUI)
        size_layout.addRow("Grid Size:", self.grid_size_slider)
        
        size_group.setLayout(size_layout)
        layout.addWidget(size_group)
        
        # Create color buttons
        color_group = QGroupBox("Colors")
        color_layout = QVBoxLayout()
        
        self.table_color_btn = QPushButton("Set Table Color")
        self.table_color_btn.clicked.connect(
            lambda: self.setColor("table")
        )
        color_layout.addWidget(self.table_color_btn)
        
        self.pocket_color_btn = QPushButton("Set Pocket Color")
        self.pocket_color_btn.clicked.connect(
            lambda: self.setColor("pocket")
        )
        color_layout.addWidget(self.pocket_color_btn)
        
        self.guide_color_btn = QPushButton("Set Guide Color")
        self.guide_color_btn.clicked.connect(
            lambda: self.setColor("guide")
        )
        color_layout.addWidget(self.guide_color_btn)
        
        self.ball_color_btn = QPushButton("Set Ball Color")
        self.ball_color_btn.clicked.connect(
            lambda: self.setColor("ball")
        )
        color_layout.addWidget(self.ball_color_btn)
        
        color_group.setLayout(color_layout)
        layout.addWidget(color_group)
        
        # Add quit button at the bottom
        self.quit_btn = QPushButton("Quit")
        self.quit_btn.clicked.connect(self.close)
        layout.addWidget(self.quit_btn)
        
        # Set central widget
        self.setCentralWidget(central_widget)
    
    def updateOverlayFromUI(self):
        """Update overlay settings based on UI controls."""
        self.overlay.show_table_outline = self.show_table_cb.isChecked()
        self.overlay.show_pocket_zones = self.show_pockets_cb.isChecked()
        self.overlay.show_trajectory = self.show_trajectory_cb.isChecked()
        self.overlay.show_rebound = self.show_rebound_cb.isChecked()
        self.overlay.snap_to_grid = self.snap_to_grid_cb.isChecked()
        
        self.overlay.pocket_size = self.pocket_size_slider.value()
        self.overlay.ball_size = self.ball_size_slider.value()
        self.overlay.grid_size = self.grid_size_slider.value()
        
        self.overlay.update()
        
    def updateUIFromOverlay(self):
        """Update UI controls based on overlay settings."""
        self.show_table_cb.setChecked(self.overlay.show_table_outline)
        self.show_pockets_cb.setChecked(self.overlay.show_pocket_zones)
        self.show_trajectory_cb.setChecked(self.overlay.show_trajectory)
        self.show_rebound_cb.setChecked(self.overlay.show_rebound)
        self.snap_to_grid_cb.setChecked(self.overlay.snap_to_grid)
        
        self.pocket_size_slider.setValue(self.overlay.pocket_size)
        self.ball_size_slider.setValue(self.overlay.ball_size)
        self.grid_size_slider.setValue(self.overlay.grid_size)
    
    def setColor(self, color_type):
        """Open color dialog and set the chosen color."""
        current_color = getattr(self.overlay, f"{color_type}_color")
        color = QColorDialog.getColor(
            current_color, self, f"Select {color_type.title()} Color",
            QColorDialog.ShowAlphaChannel
        )
        
        if color.isValid():
            setattr(self.overlay, f"{color_type}_color", color)
            self.overlay.update()
    
    def closeEvent(self, event):
        """Handle window close event."""
        reply = QMessageBox.question(
            self, 'Confirm Exit',
            "Are you sure you want to exit? This will close both the control panel and overlay.",
            QMessageBox.Yes | QMessageBox.No, QMessageBox.No
        )
        
        if reply == QMessageBox.Yes:
            QApplication.instance().quit()
        else:
            event.ignore()


class PoolOverlayApp(QApplication):
    """Main application class."""
    
    def __init__(self, args):
        super().__init__(args)
        
        # Set application name and icon
        self.setApplicationName("Pool Game Overlay")
        
        # Create tray icon
        self.tray_icon = QSystemTrayIcon()
        self.tray_icon.setIcon(QIcon.fromTheme("games-config"))  # Fallback icon
        
        # Create tray menu
        tray_menu = QMenu()
        
        # Add actions to tray menu
        self.toggle_overlay_action = QAction("Show/Hide Overlay")
        self.toggle_overlay_action.triggered.connect(self.toggleOverlay)
        tray_menu.addAction(self.toggle_overlay_action)
        
        self.toggle_editing_action = QAction("Toggle Editing Mode")
        self.toggle_editing_action.triggered.connect(self.toggleEditingMode)
        tray_menu.addAction(self.toggle_editing_action)
        
        self.show_control_panel_action = QAction("Show Control Panel")
        self.show_control_panel_action.triggered.connect(self.showControlPanel)
        tray_menu.addAction(self.show_control_panel_action)
        
        tray_menu.addSeparator()
        
        quit_action = QAction("Quit")
        quit_action.triggered.connect(self.quit)
        tray_menu.addAction(quit_action)
        
        self.tray_icon.setContextMenu(tray_menu)
        
        # Make tray icon visible
        self.tray_icon.show()
        
        # Create overlay and control panel
        self.overlay = PoolOverlayWidget()
        self.control_panel = ControlPanel(self.overlay)
        
        # Show overlay and control panel
        self.overlay.show()
        self.control_panel.show()
        
        # Show welcome message
        self.tray_icon.showMessage(
            "Pool Game Overlay",
            "Pool Game Overlay is running. Right-click the tray icon for options.",
            QSystemTrayIcon.Information,
            3000
        )
    
    def toggleOverlay(self):
        """Toggle overlay visibility."""
        if self.overlay.isVisible():
            self.overlay.hide()
            self.toggle_overlay_action.setText("Show Overlay")
        else:
            self.overlay.show()
            self.toggle_overlay_action.setText("Hide Overlay")
    
    def toggleEditingMode(self):
        """Toggle overlay editing mode."""
        self.overlay.toggleEditingMode()
        self.toggle_editing_action.setText(
            "Disable Editing Mode" if self.overlay.editing_mode else "Enable Editing Mode"
        )
    
    def showControlPanel(self):
        """Show the control panel."""
        self.control_panel.show()
        self.control_panel.activateWindow()


def main():
    app = PoolOverlayApp(sys.argv)
    sys.exit(app.exec_())


if __name__ == "__main__":
    main()
