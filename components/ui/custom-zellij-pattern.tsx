import React from "react";
import { cn } from "@/lib/utils";

/**
 * @file custom-zellij-pattern.tsx
 * @description A reusable component for displaying Zellij patterns across the World Cup Morocco platform.
 * 
 * # Zellij Pattern System
 * 
 * This component implements a customizable background pattern system based on traditional Moroccan
 * zellij tile artwork. The system allows for consistent visual identity throughout the platform
 * while providing flexibility for different contexts.
 * 
 * ## Features:
 * - Customizable opacity, size, and source image
 * - Responsive design considerations
 * - Seamless tiling for any container size
 * - Non-intrusive (pointer-events-none) to avoid interfering with UI interactions
 * 
 * ## Implementation:
 * - Used in header.tsx as subtle background texture
 * - Can be used in any container with position: relative
 * - Pattern Visualizer available at /pattern-visualizer for testing configurations
 * 
 * ## Pattern Assets:
 * - Main patterns: /public/zellij-2.jpg and /public/zellij-tile.jpg
 * - Additional options in /public/pattern-options/
 * - Use manage-patterns.sh script to add new patterns
 */

interface CustomZellijPatternProps {
  /** Optional className to extend the component's styles */
  className?: string;
  
  /** Path to the zellij pattern image (relative to /public) */
  imageUrl?: string;
  
  /** Size of the background pattern (CSS background-size value) */
  size?: string;
  
  /** Opacity of the pattern (0-1) */
  opacity?: number;
}
export default function CustomZellijPattern({
  className = "",
  imageUrl = "/zellij-2.jpg",
  size = "250px",
  opacity = 0.3,
}: CustomZellijPatternProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundRepeat: "repeat",
        backgroundSize: size,
        opacity: opacity,
      }}
    />
  );
}