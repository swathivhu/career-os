"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Sparkles, CheckCircle2, AlertCircle, Image as ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function SecondaryPanel() {
  const copyPrompt = () => {
    navigator.clipboard.writeText("Generate a premium SaaS build system manifest.");
    toast({ title: "Prompt Copied", description: "Command copied to system clipboard." });
  };

  return (
    <aside className="w-full md:w-[30%] space-y-md">
      <section className="space-y-sm">
        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Step Execution</h3>
        <p className="text-sm leading-relaxed text-foreground opacity-80">
          Initialize the build manifest by executing the primary build logic. Ensure all architectural dependencies are verified.
        </p>
      </section>

      <section className="space-y-sm">
        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Current Prompt</h3>
        <div className="bg-foreground text-background p-md font-code text-xs leading-relaxed border border-foreground/10 group relative">
          Initialize KodNest design tokens and global layout structure for Project 1.
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={copyPrompt}
            className="absolute top-1 right-1 text-background/50 hover:text-background hover:bg-white/10 h-8 w-8"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-xs pt-xs">
        <Button className="w-full rounded-none h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-[0.2em] transition-standard">
          <Sparkles className="h-4 w-4 mr-2" />
          Build in Lovable
        </Button>
        
        <div className="grid grid-cols-2 gap-xs">
          <Button variant="outline" className="rounded-none h-12 border-border hover:bg-accent/5 font-bold uppercase tracking-widest text-[10px]">
            <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
            It Worked
          </Button>
          <Button variant="outline" className="rounded-none h-12 border-border hover:bg-destructive/5 font-bold uppercase tracking-widest text-[10px]">
            <AlertCircle className="h-4 w-4 mr-2 text-destructive" />
            Error
          </Button>
        </div>

        <Button variant="outline" className="w-full rounded-none h-12 border-border hover:bg-accent/5 font-bold uppercase tracking-widest text-[10px]">
          <ImageIcon className="h-4 w-4 mr-2" />
          Add Screenshot
        </Button>
      </div>
    </aside>
  );
}
