# Moroccan Zellij Pattern System

This document provides detailed information about the zellij pattern system implemented for the World Cup Morocco platform.

## Overview

The zellij pattern system adds authentic Moroccan visual elements to the platform through traditional geometric patterns. These patterns are implemented as background elements that enhance the visual appeal while maintaining functionality.

![Zellij Pattern Example](/zellij-2.jpg)

## Components

### 1. CustomZellijPattern Component

Located at: `/components/ui/custom-zellij-pattern.tsx`

A reusable React component for displaying consistent zellij patterns across the platform.

```jsx
<CustomZellijPattern
  imageUrl="/zellij-2.jpg"  // Path to the pattern image
  size="250px"              // Size of pattern tiles
  opacity={0.3}             // Transparency level
  className="your-custom-class" // Optional additional classes
/>
```

#### Props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageUrl` | string | "/zellij-2.jpg" | Path to the pattern image (from public folder) |
| `size` | string | "250px" | Size of the pattern tiles |
| `opacity` | number | 0.3 | Pattern opacity (0-1) |
| `className` | string | "" | Additional CSS classes |

### 2. Pattern Visualizer

Located at: `/app/pattern-visualizer/page.tsx`

An interactive tool for previewing and configuring zellij patterns. Use this tool to:
- Test different pattern images
- Adjust size and opacity settings
- Preview against different background colors
- Copy the component code for your implementation

Access at: [http://localhost:3000/pattern-visualizer](http://localhost:3000/pattern-visualizer)

## Available Patterns

The platform includes several zellij patterns:

1. **Main patterns:**
   - `/public/zellij-2.jpg` - Current header pattern (reddish)
   - `/public/zellij-tile.jpg` - Alternative pattern

2. **Additional options:**
   - `/public/pattern-options/moroccan-zellij-pattern1.svg` - Star-based pattern
   - `/public/pattern-options/moroccan-zellij-pattern2.svg` - Octagonal pattern
   - `/public/pattern-options/moroccan-zellij-pattern3.svg` - Grid pattern
   - `/public/pattern-options/moroccan-zellij-traditional.svg` - Traditional detailed pattern
   - `/public/pattern-options/moroccan-seamless-subtle.svg` - Subtle background pattern

## Pattern Management

### Using the manage-patterns.sh Script

This utility script helps manage zellij patterns in the project:

```bash
# Make script executable (if needed)
chmod +x manage-patterns.sh

# List all available patterns
./manage-patterns.sh list

# Optimize a new pattern image for web use
./manage-patterns.sh optimize "path/to/your/pattern.jpg"

# Get info about the pattern visualizer
./manage-patterns.sh visualize
```

### Adding New Patterns

1. Place your pattern image in the project
2. Optimize it using the script:
   ```bash
   ./manage-patterns.sh optimize "path/to/your/pattern.jpg"
   ```
3. Use the Pattern Visualizer to test your new pattern

## Usage Examples

### In Header (current implementation)

```jsx
// In header.tsx
import CustomZellijPattern from "../ui/custom-zellij-pattern";

export default function Header() {
  return (
    <header className="...">
      <CustomZellijPattern 
        imageUrl="/zellij-2.jpg"
        size="250px"
        opacity={0.3}
      />
      {/* Rest of header content */}
    </header>
  );
}
```

### In Other Sections

```jsx
// Example usage in a hero section
<section className="relative overflow-hidden bg-moroccan-red text-white">
  <CustomZellijPattern 
    imageUrl="/pattern-options/moroccan-seamless-subtle.svg" 
    opacity={0.15}
    size="200px"
  />
  <div className="container mx-auto relative z-10">
    {/* Section content */}
  </div>
</section>
```

## Design Considerations

1. **Accessibility**: Patterns have enough contrast with text for readability
2. **Performance**: SVG patterns are lightweight; JPGs are optimized
3. **Responsiveness**: Patterns adapt to different screen sizes
4. **Consistency**: Core Moroccan color palette maintained throughout

## Moroccan Color Palette

These colors are used throughout the platform and pair well with the zellij patterns:

- Moroccan Red: #8A1538
- Moroccan Blue: #003366
- Moroccan Sand: #E0C097
- Moroccan Green: #6E7154

## Enhancements & Future Work

Potential improvements to consider:

1. Animated pattern transitions on scroll
2. Dynamic pattern color adjustments based on content
3. Seasonal pattern variations for special events
4. User preference settings for pattern intensity

## Credits

The zellij patterns are based on traditional Moroccan geometric art, dating back centuries and found in mosques, madrasas, and palaces throughout Morocco.
