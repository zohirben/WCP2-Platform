# Icon Setup Instructions

## Option 1: Use Without Icons (Quickest Solution)
The extension has been modified to work without icons. You can load it as is without any additional steps.

## Option 2: Generate Icons (For Better UX)

### Method A: Using the HTML Generator
1. Open the `generate_icons.html` file in any web browser
2. Click the "Generate Icons" button
3. Download each icon by clicking the "Download" links
4. Place the downloaded icons in the `assets` folder of your extension

### Method B: Using the Shell Script (Requires ImageMagick)
If you have ImageMagick installed, you can run:
```bash
./create_icons.sh
```
This will generate all required icon files in the assets directory.

### Method C: Copy from Original Extension
You can also copy the icon files from the original 8ballhack-master extension:
```bash
mkdir -p assets
cp ../8ballhack-master/icons/icon16.png assets/
cp ../8ballhack-master/icons/icon48.png assets/
cp ../8ballhack-master/icons/icon128.png assets/
# Note: You'll still need to create icon24.png and icon32.png
```

## Restoring Icon References in manifest.json
If you decide to add icons, you can update the manifest.json to include them:

```json
"icons": {
  "16": "assets/icon16.png",
  "48": "assets/icon48.png",
  "128": "assets/icon128.png"
},
"action": {
  "default_icon": {
    "16": "assets/icon16.png",
    "24": "assets/icon24.png",
    "32": "assets/icon32.png"
  },
  "default_title": "Pool Game Assistant",
  "default_popup": "popup/popup.html"
},
```
