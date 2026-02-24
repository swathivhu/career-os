"use client";

import { TopBar } from "@/components/layout/TopBar";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { SecondaryPanel } from "@/components/layout/SecondaryPanel";
import { ProofFooter } from "@/components/layout/ProofFooter";
import { Card } from "@/components/ui/card";

export default function DesignSystemDemo() {
  return (
    <div className="min-h-screen bg-background flex flex-col pb-xl">
      <TopBar />
      <ContextHeader 
        title="Workspace Manifest" 
        subtitle="This environment is configured with the KodNest Premium design tokens. Clean, coherent, and intentional."
      />
      
      <main className="main-content-area flex-grow">
        {/* Primary Workspace (70%) */}
        <div className="w-full md:w-[70%] space-y-md">
          <section className="space-y-sm">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-primary/60 border-b border-primary/10 pb-xs">
              01. Architectural Foundation
            </h2>
            <Card className="rounded-none border border-border/50 p-lg bg-card/50">
              <div className="space-y-md">
                <p className="text-lg font-headline italic text-foreground opacity-90 leading-relaxed">
                  "The design system prioritize clarity over flash. Every spacing value, color choice, and typographic scale is derived from a central logic."
                </p>
                <div className="grid grid-cols-2 gap-md pt-md border-t border-border/10">
                  <div className="space-y-xs">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Typography</span>
                    <p className="text-sm font-medium">Literata & Inter</p>
                  </div>
                  <div className="space-y-xs">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Color Palette</span>
                    <p className="text-sm font-medium">Off-White, Deep Red, Charcoal</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-sm">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-primary/60 border-b border-primary/10 pb-xs">
              02. Component Standards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="p-md border border-border/30 bg-white space-y-xs">
                <h4 className="text-sm font-bold uppercase tracking-widest">Predictable Layout</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Content blocks use consistent padding and border logic to maintain rhythm.
                </p>
              </div>
              <div className="p-md border border-border/30 bg-white space-y-xs">
                <h4 className="text-sm font-bold uppercase tracking-widest">Coherent Actions</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Buttons and inputs follow a strict 2px radius and standard transition timing.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Secondary Panel (30%) */}
        <SecondaryPanel />
      </main>

      <ProofFooter />
    </div>
  );
}
