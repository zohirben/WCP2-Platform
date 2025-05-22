import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { MoroccanArchPattern } from "../ui/pattern";

export default function Footer() {
  return (
    <footer className="bg-moroccan-blue text-white relative overflow-hidden pt-16">
      <div 
        className="absolute inset-0 opacity-10 z-0 pointer-events-none animate-pattern-float"
        style={{
          backgroundImage: "url('/downloaded designs/Tarceeh 1-7-11imageOne.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "400px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">
          <div>
            <h3 className="font-amiri text-2xl font-bold mb-4">World Cup Morocco</h3>
            <p className="text-white/80 mb-4">
              Your essential travel companion for the World Cup in Morocco. Discover the beauty of Morocco while enjoying the beautiful game.
            </p>
            <div className="flex gap-4">
              <Link 
                href="#" 
                className={buttonVariants({ 
                  variant: "ghost", 
                  size: "icon", 
                  className: "rounded-full bg-white/10 hover:bg-white/20 text-white transition-transform hover:scale-110" 
                })}
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link 
                href="#" 
                className={buttonVariants({ 
                  variant: "ghost", 
                  size: "icon", 
                  className: "rounded-full bg-white/10 hover:bg-white/20 text-white transition-transform hover:scale-110" 
                })}
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link 
                href="#" 
                className={buttonVariants({ 
                  variant: "ghost", 
                  size: "icon", 
                  className: "rounded-full bg-white/10 hover:bg-white/20 text-white transition-transform hover:scale-110" 
                })}
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-amiri text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-white/80 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-amiri text-xl font-bold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="#" 
                  className="text-white/80 hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  Match Schedule
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-white/80 hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  Venues
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-white/80 hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  Travel Tips
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-white/80 hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  Local Customs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-amiri text-xl font-bold mb-4">Contact</h4>
            <address className="not-italic text-white/80 space-y-3">
              <p>Email: info@worldcup-morocco.com</p>
              <p>Phone: +212 5XX-XXXXXX</p>
              <p>Address: Casablanca, Morocco</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white/20 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm">
            &copy; {new Date().getFullYear()} World Cup Morocco. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/70">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-moroccan-red via-moroccan-sand to-moroccan-green" />
    </footer>
  );
}