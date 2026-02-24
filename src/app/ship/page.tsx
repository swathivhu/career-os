"use client";

import { TopBar } from "@/components/layout/TopBar";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { useTestStatus } from "@/hooks/use-test-status";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Rocket, PackageCheck, Globe, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ShipPage() {
  const { isShippable, isLoaded } = useTestStatus();

  useEffect(() => {
    if (isLoaded && !isShippable) {
      redirect("/proof");
    }
  }, [isLoaded, isShippable]);

  if (!isLoaded || !isShippable) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <ContextHeader 
        title="Deployment Hub" 
        subtitle="Final verification and production release manifest. Project 2 is fully authenticated."
      />
      
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-xl py-xl flex flex-col items-center justify-center">
        <div className="max-w-[600px] text-center space-y-xl animate-in fade-in duration-1000">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <div className="relative p-xl bg-card border border-primary/20 rounded-full">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
          </div>

          <div className="space-y-md">
            <h2 className="text-5xl font-headline italic">Project 2 Shipped Successfully.</h2>
            <p className="text-xl text-muted-foreground font-medium italic opacity-80 leading-relaxed">
              "The strategic engine for the Placement Readiness Platform has been verified and deployed. All analysis parameters are fully operational."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md text-left">
            <div className="p-md bg-white border border-border/50 space-y-2">
              <div className="flex items-center gap-xs">
                <PackageCheck className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Verification</span>
              </div>
              <p className="text-sm font-bold uppercase">10/10 Tests Passed</p>
            </div>
            <div className="p-md bg-white border border-border/50 space-y-2">
              <div className="flex items-center gap-xs">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Distribution</span>
              </div>
              <p className="text-sm font-bold uppercase">Production Manifest</p>
            </div>
          </div>

          <div className="pt-md">
            <Button asChild variant="outline" className="rounded-none h-16 px-xl border-border hover:bg-accent/5 text-muted-foreground font-bold uppercase tracking-[0.2em] transition-all">
              <Link href="/dashboard">Return to Workspace</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
