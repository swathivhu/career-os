"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function ProofFooter() {
  const requirements = [
    { id: "ui", label: "UI Built" },
    { id: "logic", label: "Logic Working" },
    { id: "test", label: "Test Passed" },
    { id: "deploy", label: "Deployed" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border z-50 px-xl flex items-center justify-between">
      <div className="flex items-center gap-lg">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Proof Matrix</span>
        <div className="flex items-center gap-md">
          {requirements.map((req) => (
            <div key={req.id} className="flex items-center space-x-2 group cursor-pointer">
              <Checkbox id={req.id} className="rounded-none border-primary/40 data-[state=checked]:bg-primary" />
              <label htmlFor={req.id} className="text-[10px] font-bold uppercase tracking-widest text-foreground/70 group-hover:text-primary transition-standard cursor-pointer">
                {req.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-xs">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-50">System Integrity</span>
        <div className="h-1 w-24 bg-secondary">
          <div className="h-full bg-primary w-full" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">100% Verified</span>
      </div>
    </footer>
  );
}
