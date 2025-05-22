# Pool Game Assistant

A modern browser extension that provides aiming guidelines for online pool/billiards games across various platforms including Discord games.

![Pool Game Assistant Screenshot](assets/screenshot.png)

## Features

- Works on multiple platforms (Discord, Miniclip, and other pool game websites)
- Automatically detects pool games in the browser
- Shows aiming guidelines when holding a customizable activation key (default: Shift)
- Calculates optimal shots from the cue ball to target balls to pockets
- Customizable guideline appearance (color, opacity, width)
- Adapts to different screen sizes and game layouts

## Installation

### From Source

1. Clone this repository or download the ZIP file
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the folder containing this extension
5. The extension will be installed and ready to use

## Usage

1. Navigate to any website with a pool/billiards game
2. The extension will automatically detect the game
3. Hold down the Shift key (or your configured activation key) to show aiming guidelines
4. Position your mouse over the ball you want to hit
5. The guidelines will show the optimal paths for pocketing the ball

## Configuration

Click on the extension icon in your browser toolbar to open the settings panel:

- **Enable/Disable**: Toggle the extension on or off
- **Guideline Color**: Choose the color of the aiming lines
- **Guideline Opacity**: Adjust how transparent the guidelines are
- **Guideline Width**: Set the thickness of the guidelines
- **Activation Key**: Change which key activates the guidelines
- **Active Websites**: Configure which websites the extension works on

## How It Works

The Pool Game Assistant uses advanced detection techniques to identify pool games running in your browser. It then:

1. Creates an overlay on top of the game
2. Calculates the positions of the table pockets
3. When you hold the activation key, it draws guidelines from each pocket to your cursor position
4. It calculates the path your cue ball should take to hit the target ball

## Compatibility

The extension is designed to work with various online pool games, including:

- Discord pool games
- Miniclip 8 Ball Pool
- Other web-based pool/billiards games

## Development

### Project Structure

```
pool-guideline-extension/
├── manifest.json           # Extension configuration
├── background.js           # Background service worker
├── content.js              # Main content script for detecting and overlaying games
├── styles.css              # CSS for the extension
├── assets/                 # Icons and images
└── popup/                  # Settings popup
    ├── popup.html          # Popup interface
    └── popup.js            # Popup functionality
```

### Contributing

Feel free to submit pull requests or open issues for any bugs or feature requests.

## License

MIT License

## Credits

Created as an improved version of the original 8ballhack extension, with modern features and cross-platform compatibility.
