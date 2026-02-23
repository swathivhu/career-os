import { TopBar } from "@/components/layout/TopBar";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { MailOpen } from "lucide-react";

export default function DigestPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <ContextHeader 
        title="Daily Digest" 
        subtitle="Aggregated summaries of the most relevant professional openings."
      />
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-xl py-xl flex items-center justify-center">
        <div className="text-center space-y-md opacity-30 select-none">
          <div className="flex justify-center">
            <div className="p-lg border border-dashed border-border rounded-full">
              <MailOpen className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-xs">
            <h2 className="text-2xl font-headline italic">Next Delivery @ 09:00 AM</h2>
            <p className="text-sm font-medium uppercase tracking-[0.2em]">
              Your first automated digest is being prepared.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
