import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ButtonCTAProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "moroccan";
  showArrow?: boolean;
}

export function ButtonCTA({ 
  href, 
  children, 
  className, 
  variant = "default",
  showArrow = false
}: ButtonCTAProps) {
  const isExternal = href.startsWith('http');
  
  const buttonClasses = cn(
    buttonVariants({ 
      variant: variant === "moroccan" ? "default" : variant,
      size: "lg" 
    }),
    variant === "moroccan" && "bg-[#C53030] hover:bg-[#9B2C2C] text-white border-2 border-[#9B2C2C]",
    "relative overflow-hidden group transition-all duration-300",
    className
  );

  const ButtonContent = () => (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showArrow && (
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
      <span className="absolute inset-0 w-full h-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses}>
        <ButtonContent />
      </a>
    );
  }

  return (
    <Link href={href} className={buttonClasses}>
      <ButtonContent />
    </Link>
  );
}