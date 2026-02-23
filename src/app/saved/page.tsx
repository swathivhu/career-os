import { TopBar } from "@/components/layout/TopBar";
import { ContextHeader } from "@/components/layout/ContextHeader";

export default function SavedPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <ContextHeader 
        title="Saved Notifications" 
        subtitle="This section will be built in the next step."
      />
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-xl mt-xl">
        <div className="h-[400px] border border-dashed border-border flex items-center justify-center">
          <span className="text-muted-foreground text-sm uppercase tracking-widest font-medium opacity-40">
            Collection Area
          </span>
        </div>
      </main>
    </div>
  );
}
