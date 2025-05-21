import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function MainNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-5">
      <div className="hidden md:flex items-center gap-5">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-foreground/80 hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C53030] after:origin-center after:scale-x-0 after:transition-transform hover:after:scale-x-100",
              pathname === link.href && "text-foreground after:scale-x-100 font-medium"
            )}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/auth/login"
          className={buttonVariants({
            variant: "outline",
            className: "border-[#C53030] text-[#C53030] hover:bg-[#C53030] hover:text-white transition-colors duration-300",
          })}
        >
          Login
        </Link>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <button className="flex h-10 w-10 items-center justify-center rounded-md border border-input">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-6 pt-16 text-lg font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-foreground/80 hover:text-foreground transition-colors",
                  pathname === link.href && "text-[#C53030] font-semibold"
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              className="bg-[#C53030] hover:bg-[#9B2C2C] text-white py-2 px-4 rounded-md text-center transition-colors"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}