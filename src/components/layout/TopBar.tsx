"use client";

import { useTestStatus } from "@/hooks/use-test-status";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function TopBar() {
  const { status, passCount } = useTestStatus();
  
  return (
    <div className="w-full h-16 bg-card border-b border-border flex items-center justify-between px-xl sticky top-0 z-50">
      <div className="flex items-center gap-md">
        <Link href="/" className="font-headline text-xl font-bold tracking-widest text-foreground uppercase">
          KodNest
        </Link>
        <div className="h-6 w-[1px] bg-border hidden md:block" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground hidden md:inline">
          Premium Build System
        </span>
      </div>

      <div className="flex items-center gap-xl">
        <div className="flex items-center gap-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Progress</span>
          <div className="h-2 w-32 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-standard" 
              style={{ width: `${(passCount / 10) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-foreground">{passCount} / 10</span>
        </div>

        <div className="flex items-center gap-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</span>
          <Badge variant={status === "Shipped" ? "secondary" : "outline"} className="rounded-none uppercase tracking-widest text-[9px] px-xs">
            {status}
          </Badge>
        </div>
      </div>
    </div>
  );
}
