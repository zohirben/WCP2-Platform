#!/bin/bash

# Create assets directory if it doesn't exist
mkdir -p /workspaces/WCP2-Platform/pool-guideline-extension/assets

# Use ImageMagick to create simple icons with a pool ball design
# Create a 128x128 base icon
convert -size 128x128 xc:none -fill "#007BFF" -draw "circle 64,64 64,16" \
  -fill white -draw "circle 64,64 40,40" \
  -fill "#007BFF" -draw "text 58,70 '8'" \
  /workspaces/WCP2-Platform/pool-guideline-extension/assets/icon128.png

# Create the smaller icons by resizing
convert /workspaces/WCP2-Platform/pool-guideline-extension/assets/icon128.png -resize 48x48 /workspaces/WCP2-Platform/pool-guideline-extension/assets/icon48.png
convert /workspaces/WCP2-Platform/pool-guideline-extension/assets/icon128.png -resize 32x32 /workspaces/WCP2-Platform/pool-guideline-extension/assets/icon32.png
convert /workspaces/WCP2-Platform/pool-guideline-extension/assets/icon128.png -resize 24x24 /workspaces/WCP2-Platform/pool-guideline-extension/assets/icon24.png
convert /workspaces/WCP2-Platform/pool-guideline-extension/assets/icon128.png -resize 16x16 /workspaces/WCP2-Platform/pool-guideline-extension/assets/icon16.png

echo "Icon files created in assets directory"
