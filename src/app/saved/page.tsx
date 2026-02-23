import { TopBar } from "@/components/layout/TopBar";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Bookmark } from "lucide-react";

export default function SavedPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <ContextHeader 
        title="Saved Archives" 
        subtitle="Opportunities curated for future review and application."
      />
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-xl py-xl flex items-center justify-center">
        <div className="text-center space-y-md opacity-30 select-none">
          <div className="flex justify-center">
            <div className="p-lg border border-dashed border-border rounded-full">
              <Bookmark className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-xs">
            <h2 className="text-2xl font-headline italic">Collection Empty.</h2>
            <p className="text-sm font-medium uppercase tracking-[0.2em]">
              Save interesting opportunities to build your curation.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
