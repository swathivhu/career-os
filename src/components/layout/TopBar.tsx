"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTestStatus } from "@/hooks/use-test-status";

export function TopBar() {
  const pathname = usePathname();
  const { isFullyVerified } = useTestStatus();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Saved", href: "/saved" },
    { name: "Digest", href: "/digest" },
    { name: "Settings", href: "/settings" },
    { name: "Proof", href: "/proof" },
  ];

  if (isFullyVerified) {
    navLinks.push({ name: "Ship", href: "/ship" });
  }

  const NavItems = ({ className, onItemClick }: { className?: string; onItemClick?: () => void }) => (
    <nav className={cn("flex items-center", className)}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        const isShip = link.name === "Ship";
        
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onItemClick}
            className={cn(
              "relative px-sm py-xs text-[10px] font-bold uppercase tracking-[0.2em] transition-standard hover:text-primary flex items-center gap-xs",
              isActive ? "text-primary" : "text-muted-foreground",
              isShip && "text-primary animate-pulse"
            )}
          >
            {isShip && <Rocket className="h-3 w-3" />}
            {link.name}
            {isActive && (
              <span className="absolute bottom-0 left-sm right-sm h-[2px] bg-primary animate-in fade-in slide-in-from-bottom-1" />
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="w-full border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50 px-xl h-16 flex items-center justify-between">
      <div className="flex items-center gap-xs">
        <Link href="/" className="flex items-center gap-xs group">
          <span className="font-headline font-semibold text-xl uppercase tracking-widest text-primary group-hover:opacity-80 transition-standard">
            KodNest
          </span>
          <span className="hidden md:inline text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">
            Premium Build
          </span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <NavItems className="gap-md" />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-none">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-l border-border w-72">
            <SheetHeader className="mb-lg">
              <SheetTitle className="text-left font-headline uppercase tracking-widest text-primary">
                Menu
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "py-sm text-xs font-bold uppercase tracking-[0.2em] border-b border-border/50",
                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:flex items-center">
        <div className="h-8 w-[1px] bg-border mx-md" />
        <span className="text-[9px] font-bold uppercase tracking-tighter text-muted-foreground opacity-60">
          Job Notification Tracker v1.0
        </span>
      </div>
    </div>
  );
}
