/**
 * @file zellij-pattern.tsx
 * @description This file is kept for compatibility with existing code.
 * For new implementations, please use the more flexible custom-zellij-pattern.tsx component.
 * 
 * @see /docs/zellij-pattern-system.md for full documentation
 */

import { cn } from "@/lib/utils";

interface PatternProps {
  className?: string;
}

/**
 * @deprecated Use CustomZellijPattern from custom-zellij-pattern.tsx instead
 */
export function ZellijPattern({ className }: PatternProps) {
  return (
    <div 
      className={cn(
        "absolute inset-0 opacity-10 z-0 pointer-events-none",
        className
      )}
      style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c53030' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }}
    />
  );
}

/**
 * @deprecated Use CustomZellijPattern from custom-zellij-pattern.tsx instead
 */
export function MoroccanArchPattern({ className }: PatternProps) {
  return (
    <div 
      className={cn(
        "absolute inset-0 opacity-10 z-0 pointer-events-none",
        className
      )}
      style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232b6cb0' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }}
    />
  );
}