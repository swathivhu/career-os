import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, AlertCircle, CheckCircle2, Monitor, Plus } from "lucide-react";

export function SecondaryPanel() {
  return (
    <div className="w-full h-full flex flex-col gap-md">
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-xs text-muted-foreground">Next Phase</h3>
        <p className="text-sm leading-relaxed mb-sm">
          Initialize the build manifest by executing the primary build logic. Ensure all architectural dependencies are verified before deployment.
        </p>
      </section>

      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-xs text-muted-foreground">Build Command</h3>
        <div className="relative group">
          <div className="bg-foreground text-background p-sm font-code text-xs rounded-sm border border-foreground/10">
            knest-build --env production --manifest v1.0.4
          </div>
          <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-8 w-8 text-background/50 hover:text-background hover:bg-white/10">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-xs mt-sm">
        <Button className="w-full rounded-none h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest">
          Build Project
        </Button>
        <Button variant="outline" className="w-full rounded-none h-11 border-border hover:bg-accent/5 font-bold uppercase tracking-widest">
          <CheckCircle2 className="h-4 w-4 mr-2" />
          It Worked
        </Button>
        <div className="grid grid-cols-2 gap-xs">
          <Button variant="outline" className="rounded-none h-10 border-border hover:bg-destructive/5 text-xs font-bold uppercase tracking-widest">
            <AlertCircle className="h-3.5 w-3.5 mr-2" />
            Error
          </Button>
          <Button variant="outline" className="rounded-none h-10 border-border hover:bg-accent/5 text-xs font-bold uppercase tracking-widest">
            <Monitor className="h-3.5 w-3.5 mr-2" />
            Proof
          </Button>
        </div>
      </div>
    </div>
  );
}
