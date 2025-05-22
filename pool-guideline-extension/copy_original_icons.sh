#!/bin/bash

# Create assets directory if it doesn't exist
mkdir -p /workspaces/WCP2-Platform/pool-guideline-extension/assets

# Copy existing icons from the original extension
cp /workspaces/WCP2-Platform/8ballhack-master/icons/icon16.png /workspaces/WCP2-Platform/pool-guideline-extension/assets/
cp /workspaces/WCP2-Platform/8ballhack-master/icons/icon48.png /workspaces/WCP2-Platform/pool-guideline-extension/assets/
cp /workspaces/WCP2-Platform/8ballhack-master/icons/icon128.png /workspaces/WCP2-Platform/pool-guideline-extension/assets/

# Create 24px and 32px by resizing from 48px
if command -v convert &> /dev/null; then
  convert /workspaces/WCP2-Platform/pool-guideline-extension/assets/icon48.png -resize 24x24 /workspaces/WCP2-Platform/pool-guideline-extension/assets/icon24.png
  convert /workspaces/WCP2-Platform/pool-guideline-extension/assets/icon48.png -resize 32x32 /workspaces/WCP2-Platform/pool-guideline-extension/assets/icon32.png
  echo "All icon files copied and created in assets directory"
else
  echo "Icons 16px, 48px, and 128px copied. Please generate 24px and 32px manually."
fi
