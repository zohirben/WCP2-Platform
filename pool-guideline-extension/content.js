// Pool Game Assistant Content Script

// Global variables
let settings = {
  enabled: true,
  guidelineColor: '#00FF00',
  guidelineOpacity: 0.6,
  guidelineWidth: 2,
  activationKey: 'Shift',
  activeSites: ['discord.com', '*pool*', '*billiard*']
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

// Initialize
function init() {
  console.log('Pool Game Assistant: Initializing');
  // Load settings
  chrome.runtime.sendMessage({ action: 'getSettings' }, response => {
    if (response && response.settings) {
      settings = response.settings;
      console.log('Settings loaded:', settings);
      
      // Check if on a compatible site
      if (isCompatibleSite()) {
        console.log('Compatible site detected, starting detection loop');
        // Start looking for pool game
        detectPoolGame();
      } else {
        console.log('Not a compatible site');
      }
    }
  });
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
  
  pockets = [
    { x: x + width * 0.05, y: y + height * 0.05 }, // Top-left
    { x: x + width * 0.5, y: y + height * 0.03 },  // Top-center
    { x: x + width * 0.95, y: y + height * 0.05 }, // Top-right
    { x: x + width * 0.05, y: y + height * 0.95 }, // Bottom-left
    { x: x + width * 0.5, y: y + height * 0.97 },  // Bottom-center
    { x: x + width * 0.95, y: y + height * 0.95 }  // Bottom-right
  ];
  
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
  // In a real implementation, we'd use computer vision or game state analysis
  // For this demo, we'll use the mouse position as target ball
  // and estimate cue ball position
  
  // For demo purposes, assume cue ball is near bottom center
  const { width, height, x, y } = poolTableDimensions;
  
  // This is just an estimate - real implementation would need to detect the actual balls
  cueBall = {
    x: x + width * 0.5,
    y: y + height * 0.75,
    radius: Math.min(width, height) * 0.02
  };
  
  // Use mouse position as target ball
  targetBall = {
    x: mouseX,
    y: mouseY,
    radius: cueBall.radius
  };
}

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
