"use client";

import { useState } from "react";
import CustomZellijPattern from "@/components/ui/custom-zellij-pattern";
import { ZellijPattern } from "@/components/ui/pattern";

export default function PatternVisualizerPage() {
  const [selectedPattern, setSelectedPattern] = useState<string>("/assets/images/zellij-2.jpg");
  const [patternSize, setPatternSize] = useState<string>("250px");
  const [opacity, setOpacity] = useState<number>(0.3);
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");

  const patterns = [
    { name: "Zellij 2", url: "/assets/images/zellij-2.jpg" },
    { name: "Zellij Tile", url: "/assets/images/zellij-tile.jpg" },
    { name: "Pattern 1", url: "/pattern-options/moroccan-zellij-pattern1.svg" },
    { name: "Pattern 2", url: "/pattern-options/moroccan-zellij-pattern2.svg" },
    { name: "Pattern 3", url: "/pattern-options/moroccan-zellij-pattern3.svg" },
    { name: "Traditional", url: "/pattern-options/moroccan-zellij-traditional.svg" },
    { name: "Subtle", url: "/pattern-options/moroccan-seamless-subtle.svg" },
    { name: "Tarceeh", url: "/assets/patterns/Tarceeh 1-7-11imageOne.jpg" },
    { name: "Geometric", url: "/assets/patterns/istockphoto-182416152-612x612.jpg" },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Zellij Pattern Visualizer</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Pattern Options</h2>
            <div className="flex flex-wrap gap-2">
              {patterns.map((pattern) => (
                <button
                  key={pattern.url}
                  onClick={() => setSelectedPattern(pattern.url)}
                  className={`px-3 py-1 rounded text-sm ${
                    selectedPattern === pattern.url
                      ? "bg-moroccan-red text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {pattern.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Background Color</h2>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <span className="text-sm">{backgroundColor}</span>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {["#ffffff", "#8A1538", "#003366", "#E0C097", "#6E7154", "#2B6CB0", "#000000", "#f5f5f5"].map((color) => (
                <div
                  key={color}
                  onClick={() => setBackgroundColor(color)}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-300"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Pattern Settings</h2>
            
            <div>
              <label className="block text-sm mb-1">Size: {patternSize}</label>
              <input
                type="range"
                min="100"
                max="500"
                step="10"
                value={patternSize.replace("px", "")}
                onChange={(e) => setPatternSize(`${e.target.value}px`)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Opacity: {opacity}</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2 mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h2 className="text-lg font-semibold">Code:</h2>
            <pre className="bg-gray-800 text-white p-3 rounded text-xs overflow-auto">
{`<CustomZellijPattern
  imageUrl="${selectedPattern}"
  size="${patternSize}"
  opacity={${opacity}}
/>`}
            </pre>
          </div>
        </div>

        <div className="md:col-span-3">
          <div 
            className="relative h-96 rounded-lg shadow-lg overflow-hidden"
            style={{ backgroundColor }}
          >
            <CustomZellijPattern
              imageUrl={selectedPattern}
              size={patternSize}
              opacity={opacity}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-moroccan-red">Preview Content</h2>
                <p className="text-gray-700">Sample text to show how content looks with the pattern.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}