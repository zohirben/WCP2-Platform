# Don't worry about missing icons

This extension uses placeholder icons that should work fine. If you encounter the "Could not load icon" error when loading the extension, try one of these solutions:

## Solution 1: Use the extension without icons
1. Open manifest.json
2. Remove the entire "default_icon" section from the action property
3. Save and reload the extension

## Solution 2: Create your own icons
1. Use any image editing tool to create square PNG images
2. Save them in the assets folder as:
   - icon16.png (16×16 pixels)
   - icon48.png (48×48 pixels)
   - icon128.png (128×128 pixels)
3. Reload the extension

## Solution 3: Use the provided SVG icon
1. Open manifest.json
2. Change the icon references to point to the SVG instead:
   ```json
   "default_icon": {
      "16": "assets/icon.svg",
      "48": "assets/icon.svg",
      "128": "assets/icon.svg"
   }
   ```
3. Save and reload the extension
