"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { Trophy } from "lucide-react";
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
          ? "bg-white/80 bg-opacity-80 backdrop-blur-md shadow-md py-3 border-b border-moroccan-red/10" 
          : "bg-transparent py-5"
      )}
    >
      <CustomZellijPattern
        imageUrl="/-2.jpg"
        size="250px"
        opacity={0.3}
      />
      <div className="container mx-auto px-4 flex items-center justify-between relative">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-moroccan-red text-white transition-transform group-hover:scale-110">
            <Trophy size={20} />
          </div>
          <span className="font-amiri text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-moroccan-red to-moroccan-blue">
            {SITE_CONFIG.name}
          </span>
        </Link>
        <MainNav />
      </div>
    </header>
  );
}