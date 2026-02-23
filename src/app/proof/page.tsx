import { TopBar } from "@/components/layout/TopBar";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { ShieldCheck } from "lucide-react";

export default function ProofPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <ContextHeader 
        title="Proof Matrix" 
        subtitle="Verification artifacts and system integrity validation."
      />
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-xl py-xl flex items-center justify-center">
        <div className="text-center space-y-md opacity-30 select-none">
          <div className="flex justify-center">
            <div className="p-lg border border-dashed border-border rounded-full">
              <ShieldCheck className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-xs">
            <h2 className="text-2xl font-headline italic">Integrity Verified.</h2>
            <p className="text-sm font-medium uppercase tracking-[0.2em]">
              Artifact collection will manifest here upon system execution.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
