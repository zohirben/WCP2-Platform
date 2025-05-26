import React, { useState, useEffect, useRef, useCallback } from "react";
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
 * - Lazy loading with Intersection Observer for performance optimization
 * - Progressive loading with placeholder and fade-in animation
 * - Memory optimization with proper cleanup
 * 
 * ## Implementation:
 * - Used in header.tsx as subtle background texture
 * - Can be used in any container with position: relative
 * - Pattern Visualizer available at /pattern-visualizer for testing configurations
 * 
 * ## Pattern Assets:
 * - Main patterns: /public/assets/images/zellij-2.jpg and /public/assets/images/zellij-tile.jpg
 * - Additional options in /public/pattern-options/
 * - SVG patterns provide better scaling for responsive designs
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
  
  /** Enable/disable lazy loading (default: true) */
  lazy?: boolean;
  
  /** Loading priority (default: false for better performance) */
  priority?: boolean;
  
  /** Root margin for intersection observer (default: "50px") */
  rootMargin?: string;
}
export default function CustomZellijPattern({
  className = "",
  imageUrl = "/zellij-2.jpg",
  size = "250px",
  opacity = 0.3,
  lazy = true,
  priority = false,
  rootMargin = "50px",
}: CustomZellijPatternProps) {
  const [isLoaded, setIsLoaded] = useState(!lazy || priority);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazy);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isLoaded, rootMargin]);

  // Image preloading with proper cleanup
  const preloadImage = useCallback(() => {
    if (!isLoaded || isImageLoaded) return;

    const img = new Image();
    imageRef.current = img;

    img.onload = () => {
      setIsImageLoaded(true);
    };

    img.onerror = () => {
      console.warn(`Failed to load zellij pattern: ${imageUrl}`);
      setIsImageLoaded(false);
    };

    img.src = imageUrl;
  }, [isLoaded, isImageLoaded, imageUrl]);

  // Start preloading when component becomes visible
  useEffect(() => {
    if (isLoaded) {
      preloadImage();
    }

    // Cleanup function
    return () => {
      if (imageRef.current) {
        imageRef.current.onload = null;
        imageRef.current.onerror = null;
        imageRef.current = null;
      }
    };
  }, [isLoaded, preloadImage]);

  // Don't render anything if not visible and lazy loading is enabled
  if (lazy && !isVisible && !priority) {
    return (
      <div
        ref={containerRef}
        className={cn("absolute inset-0 pointer-events-none", className)}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500",
        isImageLoaded ? "opacity-100" : "opacity-0",
        className
      )}
      style={{
        backgroundImage: isImageLoaded ? `url(${imageUrl})` : undefined,
        backgroundRepeat: "repeat",
        backgroundSize: size,
        opacity: isImageLoaded ? opacity : 0,
      }}
      aria-hidden="true"
    >
      {/* Loading placeholder with subtle animation */}
      {isLoaded && !isImageLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-moroccan-red/5 to-moroccan-blue/5 animate-pulse"
          style={{ opacity: opacity * 0.3 }}
        />
      )}
    </div>
  );
}