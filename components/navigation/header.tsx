"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { Trophy, MapPin, Calendar } from "lucide-react";
import MainNav from "./main-nav";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import CustomZellijPattern from "../ui/custom-zellij-pattern";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3 border-b border-moroccan-red/20" 
          : "bg-white/90 backdrop-blur-sm py-4 border-b border-moroccan-red/10"
      )}
    >
      <CustomZellijPattern
        imageUrl="/zellij-2.jpg"
        size="200px"
        opacity={scrolled ? 0.05 : 0.1}
        priority={true}
        lazy={false}
      />
      <div className="container mx-auto px-4 flex items-center justify-between relative">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-moroccan-red to-moroccan-blue text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
            <Trophy size={22} className="text-moroccan-sand" />
          </div>
          <div className="flex flex-col">
            <span className="font-amiri text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-moroccan-red via-moroccan-blue to-moroccan-red">
              {SITE_CONFIG.name}
            </span>
            <span className="text-xs text-moroccan-blue/70 font-medium tracking-wide hidden sm:block">
              Your Travel Companion
            </span>
          </div>
        </Link>
        
        {/* Quick Info Bar - Hidden on mobile */}
        <div className="hidden xl:flex items-center gap-6 text-sm text-moroccan-blue/80">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-moroccan-red" />
            <span>World Cup 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-moroccan-red" />
            <span>Morocco</span>
          </div>
        </div>

        <MainNav />
      </div>
    </header>
  );
}