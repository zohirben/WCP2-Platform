#!/bin/bash

# This script helps manage zellij patterns for the World Cup Morocco platform

# Directory for pattern options
PATTERNS_DIR="./public/pattern-options"

# Create patterns directory if it doesn't exist
mkdir -p $PATTERNS_DIR

# Function to optimize a JPG image for web
optimize_pattern() {
  if [ ! -f "$1" ]; then
    echo "File not found: $1"
    return 1
  fi
  
  # Check if imagemagick is installed
  if ! command -v convert &> /dev/null; then
    echo "ImageMagick not found. Please install it to optimize images."
    echo "You can install it with: apt-get install imagemagick"
    return 1
  fi
  
  local filename=$(basename "$1")
  local output_path="$PATTERNS_DIR/${filename// /-}"
  
  # Optimize image for web
  convert "$1" -strip -quality 85 -resize 1000x1000\> "$output_path"
  
  echo "Image optimized and saved to: $output_path"
  return 0
}

# Function to list all available patterns
list_patterns() {
  echo "Available patterns:"
  find ./public -name "*.jpg" -o -name "*.svg" | grep -v "node_modules" | sort
}

# Function to open pattern visualizer
open_visualizer() {
  echo "To visualize patterns, visit: http://localhost:3000/pattern-visualizer"
}

# Main menu
case "$1" in
  optimize)
    if [ -z "$2" ]; then
      echo "Usage: $0 optimize <image-path>"
      exit 1
    fi
    optimize_pattern "$2"
    ;;
  list)
    list_patterns
    ;;
  visualize)
    open_visualizer
    ;;
  *)
    echo "World Cup Morocco Pattern Management Script"
    echo ""
    echo "Usage: $0 [command] [options]"
    echo ""
    echo "Commands:"
    echo "  optimize <image-path>   - Optimize an image for web use as pattern"
    echo "  list                   - List all available patterns"
    echo "  visualize              - Show how to access the pattern visualizer"
    ;;
esac