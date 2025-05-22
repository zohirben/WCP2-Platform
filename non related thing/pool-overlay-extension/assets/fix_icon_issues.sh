#!/bin/bash
# Quick fix script for icon loading issues

echo "Pool Overlay Extension - Icon Fix Script"
echo "========================================"
echo

# Check if manifest exists
if [ ! -f "../manifest.json" ]; then
    echo "Error: Cannot find manifest.json file. Run this script from the assets directory."
    exit 1
fi

# Make backup of manifest
cp ../manifest.json ../manifest.json.bak
echo "✓ Created backup of manifest.json"

# Create assets directory if it doesn't exist
mkdir -p .
echo "✓ Ensuring assets directory exists"

# Create placeholder icons using simple script to avoid tool dependencies
echo "Creating placeholder icons..."

# Create minimal SVG icon
cat > icon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="30" fill="#3c9687" stroke="black" stroke-width="1"/>
  <line x1="32" y1="32" x2="64" y2="32" stroke="white" stroke-width="2"/>
  <line x1="64" y1="32" x2="64" y2="64" stroke="orange" stroke-width="2"/>
</svg>
EOF

# Use SVG for all icon sizes (simplest solution)
echo "Modifying manifest.json to use SVG icon..."
sed -i 's/"16": "assets\/icon16.png"/"16": "assets\/icon.svg"/g' ../manifest.json
sed -i 's/"48": "assets\/icon48.png"/"48": "assets\/icon.svg"/g' ../manifest.json
sed -i 's/"128": "assets\/icon128.png"/"128": "assets\/icon.svg"/g' ../manifest.json

echo "✓ Created SVG icon and updated manifest"
echo
echo "If you still have issues, you can revert to the backup with:"
echo "  mv ../manifest.json.bak ../manifest.json"
echo
echo "Or remove icons completely by editing manifest.json and removing the default_icon section"
echo "Done!"
