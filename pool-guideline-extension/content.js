// Pool Game Assistant Content Script

// Global variables
let settings = {
  enabled: true,
  guidelineColor: '#00FF00',
  guidelineOpacity: 0.6,
  guidelineWidth: 2,
  activationKey: 'Shift',
  activeSites: ['discord.com', '*pool*', '*billiard*'],
  allowAnyWebsite: false,
  manualMode: false
};

let canvas = null;
let ctx = null;
let isKeyPressed = false;
let gameCanvas = null;
let poolGameDetected = false;
let poolTableDimensions = { width: 0, height: 0, x: 0, y: 0 };
let pockets = [];
let cueBall = null;
let targetBall = null;
let overlay = null;
let poolStick = null;
let toggleButton = null;

// Initialize
function init() {
  console.log('Pool Game Assistant: Initializing');
  // Load settings
  chrome.runtime.sendMessage({ action: 'getSettings' }, response => {
    if (response && response.settings) {
      settings = { ...settings, ...response.settings };
      console.log('Settings loaded:', settings);
      
      // Create toggle button regardless of site compatibility
      createToggleButton();
      
      // Check if on a compatible site or if manual mode is enabled
      if (isCompatibleSite() || settings.allowAnyWebsite) {
        console.log('Compatible site detected or manual mode enabled');
        // Start looking for pool game
        detectPoolGame();
      } else {
        console.log('Not a compatible site');
      }
    }
  });
  
  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateSettings') {
      settings = { ...settings, ...request.settings };
      console.log('Settings updated:', settings);
      
      // If allowAnyWebsite was toggled, update the toggle button visibility
      if (settings.allowAnyWebsite !== undefined) {
        if (toggleButton) {
          toggleButton.style.display = settings.allowAnyWebsite ? 'block' : 'none';
        }
        
        // If allowing any website now, start detection if not already done
        if (settings.allowAnyWebsite && !poolGameDetected) {
          detectPoolGame();
        }
      }
      
      sendResponse({ success: true });
    } else if (request.action === 'getDetectionStatus') {
      sendResponse({ 
        poolGameDetected: poolGameDetected,
        manualMode: settings.manualMode
      });
    } else if (request.action === 'toggleManualMode') {
      settings.manualMode = !settings.manualMode;
      
      if (toggleButton) {
        toggleButton.textContent = settings.manualMode ? 'Disable Pool Assistant' : 'Enable Pool Assistant';
      }
      
      if (settings.manualMode) {
        // Force create the overlay if it doesn't exist
        if (!poolGameDetected) {
          poolGameDetected = true;
          
          // Use viewport as game area
          poolTableDimensions = {
            width: window.innerWidth * 0.8,
            height: window.innerHeight * 0.8,
            x: window.innerWidth * 0.1,
            y: window.innerHeight * 0.1
          };
          
          // Estimate pockets
          estimatePockets();
          
          // Set up the overlay
          setupOverlay();
        } else {
          if (overlay) {
            overlay.style.display = 'block';
          }
        }
      } else {
        // Hide the overlay
        if (overlay) {
          overlay.style.display = 'none';
        }
      }
      
      // Update settings in storage
      chrome.runtime.sendMessage({ 
        action: 'updateSettings',
        settings: { manualMode: settings.manualMode }
      });
      
      sendResponse({ manualMode: settings.manualMode });
    }
    
    return true; // Required for async response
  });
}

// Create toggle button for manual activation
function createToggleButton() {
  // Remove any existing button
  if (toggleButton) {
    toggleButton.remove();
  }
  
  // Create the toggle button
  toggleButton = document.createElement('button');
  toggleButton.id = 'pool-assistant-toggle';
  toggleButton.className = 'pool-assistant-button';
  toggleButton.textContent = settings.manualMode ? 'Disable Pool Assistant' : 'Enable Pool Assistant';
  toggleButton.style.display = settings.allowAnyWebsite ? 'block' : 'none';
  
  // Add click event
  toggleButton.addEventListener('click', () => {
    settings.manualMode = !settings.manualMode;
    toggleButton.textContent = settings.manualMode ? 'Disable Pool Assistant' : 'Enable Pool Assistant';
    
    if (settings.manualMode) {
      // Force create the overlay if it doesn't exist
      if (!poolGameDetected) {
        poolGameDetected = true;
        
        // Use viewport as game area
        poolTableDimensions = {
          width: window.innerWidth * 0.8,
          height: window.innerHeight * 0.8,
          x: window.innerWidth * 0.1,
          y: window.innerHeight * 0.1
        };
        
        // Estimate pockets
        estimatePockets();
        
        // Set up the overlay
        setupOverlay();
      } else {
        if (overlay) {
          overlay.style.display = 'block';
        }
      }
    } else {
      // Hide the overlay
      if (overlay) {
        overlay.style.display = 'none';
      }
    }
    
    // Update settings in storage
    chrome.runtime.sendMessage({ 
      action: 'updateSettings',
      settings: { manualMode: settings.manualMode }
    });
  });
  
  // Add the button to the page
  document.body.appendChild(toggleButton);
}

// Check if current site is in the list of compatible sites
function isCompatibleSite() {
  const currentHost = window.location.hostname;
  return settings.activeSites.some(site => {
    if (site.includes('*')) {
      const regex = new RegExp(site.replace(/\*/g, '.*'));
      return regex.test(currentHost);
    }
    return currentHost.includes(site);
  });
}

// Poll for pool game detection
function detectPoolGame() {
  const detectInterval = setInterval(() => {
    // Look for canvas elements that might be part of a pool game
    const canvases = document.querySelectorAll('canvas');
    
    if (canvases.length > 0) {
      for (let i = 0; i < canvases.length; i++) {
        const canvas = canvases[i];
        // Check if it's likely a pool game canvas (dimensions, visible, etc.)
        if (canvas.width > 300 && canvas.height > 200 && isElementVisible(canvas)) {
          console.log('Potential pool game canvas detected:', canvas);
          
          // Additional checks could be performed here
          
          gameCanvas = canvas;
          poolGameDetected = true;
          
          // Analyze the canvas to find pool table
          analyzePoolTable(gameCanvas);
          
          // Set up the overlay
          setupOverlay();
          
          // Clear the detection interval
          clearInterval(detectInterval);
          break;
        }
      }
    }
    
    // Fallback if we need to support games without canvas
    if (!poolGameDetected) {
      const gameElements = document.querySelectorAll('.game-container, #game, [id*="game"], [class*="game"]');
      for (const el of gameElements) {
        if (el.offsetWidth > 300 && el.offsetHeight > 200 && isElementVisible(el)) {
          console.log('Potential pool game container detected:', el);
          
          // Create overlay for this element
          const rect = el.getBoundingClientRect();
          poolTableDimensions = { 
            width: rect.width, 
            height: rect.height, 
            x: rect.left, 
            y: rect.top 
          };
          
          // Estimate pockets based on container size
          estimatePockets();
          
          poolGameDetected = true;
          setupOverlay();
          clearInterval(detectInterval);
          break;
        }
      }
    }
  }, 1000); // Check every second
}

// Check if an element is visible
function isElementVisible(element) {
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && 
         style.visibility !== 'hidden' && 
         element.offsetWidth > 0 && 
         element.offsetHeight > 0;
}

// Analyze pool table dimensions and find pockets
function analyzePoolTable(canvas) {
  const rect = canvas.getBoundingClientRect();
  poolTableDimensions = { 
    width: rect.width, 
    height: rect.height, 
    x: rect.left, 
    y: rect.top 
  };
  
  // Estimating pocket positions - these will need to be adjusted based on actual game
  estimatePockets();
}

// Estimate pocket positions based on table dimensions
function estimatePockets() {
  // Standard pool table has 6 pockets
  // These positions are based on percentage of table width/height
  // and will need to be fine-tuned for specific games
  const { width, height, x, y } = poolTableDimensions;
  
  // Check if we're in manual mode to use a more generous pocket layout
  if (settings.manualMode) {
    // In manual mode, create 8 pockets (4 corners, 4 sides) for better coverage
    pockets = [
      { x: x + width * 0.05, y: y + height * 0.05 },  // Top-left
      { x: x + width * 0.33, y: y + height * 0.03 },  // Top-left-center
      { x: x + width * 0.66, y: y + height * 0.03 },  // Top-right-center
      { x: x + width * 0.95, y: y + height * 0.05 },  // Top-right
      { x: x + width * 0.03, y: y + height * 0.5 },   // Middle-left
      { x: x + width * 0.97, y: y + height * 0.5 },   // Middle-right
      { x: x + width * 0.05, y: y + height * 0.95 },  // Bottom-left
      { x: x + width * 0.33, y: y + height * 0.97 },  // Bottom-left-center
      { x: x + width * 0.66, y: y + height * 0.97 },  // Bottom-right-center
      { x: x + width * 0.95, y: y + height * 0.95 }   // Bottom-right
    ];
  } else {
    // Standard 6 pocket pool table
    pockets = [
      { x: x + width * 0.05, y: y + height * 0.05 }, // Top-left
      { x: x + width * 0.5, y: y + height * 0.03 },  // Top-center
      { x: x + width * 0.95, y: y + height * 0.05 }, // Top-right
      { x: x + width * 0.05, y: y + height * 0.95 }, // Bottom-left
      { x: x + width * 0.5, y: y + height * 0.97 },  // Bottom-center
      { x: x + width * 0.95, y: y + height * 0.95 }  // Bottom-right
    ];
  }
  
  console.log('Estimated pockets:', pockets);
}

// Set up the canvas overlay for drawing guidelines
function setupOverlay() {
  // Remove any existing overlay
  if (overlay) overlay.remove();
  
  // Create overlay
  overlay = document.createElement('div');
  overlay.id = 'pool-assistant-overlay';
  overlay.style.position = 'fixed';
  overlay.style.pointerEvents = 'none';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.zIndex = '9999';
  
  // Create canvas for drawing
  canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'absolute';
  canvas.style.pointerEvents = 'none';
  
  // Add canvas to overlay and overlay to body
  overlay.appendChild(canvas);
  document.body.appendChild(overlay);
  
  // Get canvas context
  ctx = canvas.getContext('2d');
  
  // Set up event listeners
  setupEventListeners();
  
  // If the overlay is being set up for manual mode
  if (settings.manualMode) {
    // Add a helper label for first-time users
    const helperLabel = document.createElement('div');
    helperLabel.textContent = 'Hold ' + settings.activationKey + ' key and move mouse to use guidelines';
    helperLabel.style.position = 'fixed';
    helperLabel.style.bottom = '20px';
    helperLabel.style.left = '50%';
    helperLabel.style.transform = 'translateX(-50%)';
    helperLabel.style.background = 'rgba(0,0,0,0.7)';
    helperLabel.style.color = 'white';
    helperLabel.style.padding = '8px 12px';
    helperLabel.style.borderRadius = '4px';
    helperLabel.style.fontSize = '14px';
    helperLabel.style.zIndex = '10000';
    helperLabel.style.pointerEvents = 'none';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      helperLabel.style.transition = 'opacity 1s ease';
      helperLabel.style.opacity = '0';
      setTimeout(() => {
        helperLabel.remove();
      }, 1000);
    }, 5000);
    
    document.body.appendChild(helperLabel);
  }
  
  console.log('Overlay setup complete');
}

// Set up event listeners for keyboard and mouse
function setupEventListeners() {
  // Keydown event
  document.addEventListener('keydown', function(event) {
    if (event.key === settings.activationKey) {
      isKeyPressed = true;
      drawGuidelines();
    }
  });
  
  // Keyup event
  document.addEventListener('keyup', function(event) {
    if (event.key === settings.activationKey) {
      isKeyPressed = false;
      clearGuidelines();
    }
  });
  
  // Mouse move event
  document.addEventListener('mousemove', function(event) {
    if (isKeyPressed) {
      // Update mouse position
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      
      // Find cue ball and target ball
      findBalls(mouseX, mouseY);
      
      // Draw guidelines
      drawGuidelines();
    }
  });
  
  // Window resize event
  window.addEventListener('resize', function() {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Re-analyze pool table dimensions
      if (gameCanvas) {
        analyzePoolTable(gameCanvas);
      }
      
      // Redraw guidelines if active
      if (isKeyPressed) {
        drawGuidelines();
      }
    }
  });
}

// Find cue ball and target ball based on mouse position
function findBalls(mouseX, mouseY) {
  // Get table dimensions
  const { width, height, x, y } = poolTableDimensions;
  
  // Ball radius based on table size
  const ballRadius = Math.min(width, height) * 0.02;
  
  // In manual mode, allow the user to set both cue ball and target
  if (settings.manualMode) {
    // Check if this is the first time we're setting up in manual mode
    if (!manualCueBallSet) {
      // Set initial cue ball position
      cueBall = {
        x: mouseX - 100, // Offset from mouse so it's not directly under cursor
        y: mouseY,
        radius: ballRadius
      };
      
      // Store this state
      manualCueBallSet = true;
      
      // Remember last click for delayed double-click detection
      lastManualClick = Date.now();
    }
    
    // Allow user to move cue ball with double ESC key
    document.addEventListener('keydown', function(e) {
      // If user presses ESC twice within 500ms
      if (e.key === 'Escape') {
        const now = Date.now();
        if (now - lastEscPress < 500) {
          // Reset cue ball position to be near mouse
          cueBall = {
            x: mouseX - 100,
            y: mouseY,
            radius: ballRadius
          };
        }
        lastEscPress = now;
      }
    });
    
    // Use mouse position as target ball
    targetBall = {
      x: mouseX,
      y: mouseY,
      radius: ballRadius
    };
  } else {
    // For regular mode - use standard approach
    // This is just an estimate - real implementation would try to detect the actual balls
    cueBall = {
      x: x + width * 0.5,
      y: y + height * 0.75,
      radius: ballRadius
    };
    
    // Use mouse position as target ball
    targetBall = {
      x: mouseX,
      y: mouseY,
      radius: ballRadius
    };
  }
}

// Track manual mode variables
let manualCueBallSet = false;
let lastManualClick = 0;
let lastEscPress = 0;

// Draw the aiming guidelines
function drawGuidelines() {
  if (!ctx || !poolGameDetected) return;
  
  // Clear the canvas
  clearGuidelines();
  
  // Set drawing styles
  ctx.strokeStyle = settings.guidelineColor;
  ctx.globalAlpha = settings.guidelineOpacity;
  ctx.lineWidth = settings.guidelineWidth;
  
  // Draw trajectory lines from pockets to target
  for (const pocket of pockets) {
    drawAimingLine(pocket, targetBall);
  }
  
  // Draw cue ball projection if we know where it is
  if (cueBall) {
    drawProjectedPath(cueBall, targetBall);
  }
}

// Draw a single aiming line from pocket to target
function drawAimingLine(pocket, target) {
  ctx.beginPath();
  ctx.moveTo(pocket.x, pocket.y);
  ctx.lineTo(target.x, target.y);
  ctx.stroke();
  
  // Draw a small circle at the pocket
  ctx.beginPath();
  ctx.arc(pocket.x, pocket.y, 5, 0, Math.PI * 2);
  ctx.stroke();
}

// Draw the projected path from cue ball to target to pocket
function drawProjectedPath(cueBall, targetBall) {
  // Find pockets that have good angles
  for (const pocket of pockets) {
    // Calculate vectors
    const targetToPocket = {
      x: pocket.x - targetBall.x,
      y: pocket.y - targetBall.y
    };
    
    // Normalize vector
    const magnitude = Math.sqrt(targetToPocket.x * targetToPocket.x + targetToPocket.y * targetToPocket.y);
    const normalizedVector = {
      x: targetToPocket.x / magnitude,
      y: targetToPocket.y / magnitude
    };
    
    // Calculate where cue ball should hit target ball
    // For a straight shot, cue ball should hit the opposite side of the target ball
    // from the pocket
    const cueBallHitPoint = {
      x: targetBall.x - normalizedVector.x * targetBall.radius * 2,
      y: targetBall.y - normalizedVector.y * targetBall.radius * 2
    };
    
    // Draw the projected path
    ctx.beginPath();
    ctx.moveTo(cueBall.x, cueBall.y);
    ctx.lineTo(cueBallHitPoint.x, cueBallHitPoint.y);
    ctx.stroke();
    
    // Draw the projected path from target ball to pocket
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(targetBall.x, targetBall.y);
    ctx.lineTo(pocket.x, pocket.y);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Just draw for one good angle for now
    // In a complete implementation, we'd calculate all possible shots
    break;
  }
}

// Clear all guidelines
function clearGuidelines() {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Run initialization when document is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
