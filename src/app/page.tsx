import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-grow flex items-center justify-center px-xl py-xl">
        <div className="max-w-[800px] w-full text-center space-y-lg">
          <div className="space-y-sm">
            <h1 className="text-5xl md:text-7xl font-headline leading-[1.1] tracking-tight text-foreground">
              Stop Missing The <br />
              <span className="text-primary italic underline decoration-primary/20 underline-offset-8">Right Jobs.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-[600px] mx-auto opacity-80 leading-relaxed">
              Precision-matched job discovery delivered daily at 9AM.
            </p>
          </div>
          
          <div className="pt-md">
            <Button asChild size="lg" className="rounded-none h-14 px-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-[0.2em] transition-standard">
              <Link href="/settings" className="flex items-center gap-sm">
                Start Tracking
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="pt-xl grid grid-cols-3 gap-md border-t border-border/30 mt-xl opacity-40">
            <div className="text-center">
              <span className="block text-xs font-bold uppercase tracking-widest mb-xs">Frequency</span>
              <span className="text-sm font-medium">Daily @ 09:00</span>
            </div>
            <div className="text-center">
              <span className="block text-xs font-bold uppercase tracking-widest mb-xs">Precision</span>
              <span className="text-sm font-medium">99% Match Rate</span>
            </div>
            <div className="text-center">
              <span className="block text-xs font-bold uppercase tracking-widest mb-xs">Delivery</span>
              <span className="text-sm font-medium">Direct Inbox</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
