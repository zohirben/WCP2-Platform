# Advanced Pool Game Overlay

A standalone application that creates a customizable, transparent overlay for pool games with trajectory prediction, rebound physics, and savable configurations.

![Pool Overlay Screenshot](./screenshot.png)

## Features

- **Transparent, Click-Through Overlay**: Works with any pool game or application
- **Fully Customizable Table & Pockets**: Adjust to match any pool game's dimensions
- **Pocket Configuration Mode**: Hold ALT to grab and drag pocket positions
- **Table Transformation**: Move, scale, and rotate the entire overlay
- **Shot Trajectory Prediction**: See guidelines from pockets to target
- **Save/Load Configurations**: Store settings per website/game
- **Hotkey Support**: Full keyboard shortcuts for all functions
- **System Tray Integration**: Quick access to controls
- **Snap-to-Grid**: Optional feature for precise pocket placement

## Installation

### Prerequisites

- Python 3.7+
- PyQt5
- Other dependencies listed in requirements.txt

### Setup

```bash
# Clone this repository
git clone https://github.com/yourusername/pool-overlay.git
cd pool-overlay

# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the application
python pool_overlay.py
```

## Usage

### Quick Start

1. Launch the application with `python pool_overlay.py`
2. A transparent overlay will appear on your screen
3. Position your pool game window under the overlay
4. Use hotkeys to adjust the overlay to match your game

### Controls

#### Keyboard Shortcuts

- `F8`: Toggle Editing Mode
- `F9`: Show/Hide Overlay
- `Ctrl+S`: Save Configuration
- `Ctrl+O`: Load Configuration
- `Ctrl+R`: Reset Pocket Positions

#### Editing Mode

When editing mode is active (press `F8`):
- `ALT` + Click/Drag: Move pocket positions
- `SHIFT` + Drag: Move the entire table overlay
- `CTRL` + Mouse Wheel: Scale the table overlay
- `CTRL` + `ALT` + Drag: Rotate the table overlay

### Configuring for Different Games

1. Launch your pool game
2. Switch to Editing Mode (`F8`)
3. Use `SHIFT` + Drag to position the overlay over your game
4. Use `CTRL` + Mouse Wheel to scale the overlay to match
5. Use `CTRL` + `ALT` + Drag to rotate if needed
6. Use `ALT` + Click/Drag to position each pocket precisely
7. Press `Ctrl+S` to save this configuration with a name
8. Next time, load this configuration with `Ctrl+O`

## Advanced Features

### Pocket Configuration

- When in editing mode, hold ALT and drag pockets to match the exact positions in your game
- Enable "Snap to Grid" in the control panel for precise placement
- Adjust pocket size in the control panel to match the game's visuals

### Table Transformation

- Hold SHIFT and drag to move the entire overlay
- Hold CTRL and use mouse wheel to scale the overlay
- Hold CTRL+ALT and drag to rotate the overlay

### Shot Prediction

- Move your mouse to see trajectory lines from pockets
- Shows potential shots and angles
- Visual indication for optimal shots

## Troubleshooting

**Overlay not visible**: Press F9 to toggle visibility or check the system tray icon.

**Can't interact with game**: Make sure you've disabled editing mode by pressing F8.

**Overlay doesn't match game**: Use editing mode to reposition, scale, and rotate the overlay.

## License

MIT License

## Acknowledgements

- PyQt5 for the cross-platform UI toolkit
- The open-source pool physics libraries that inspired this project
