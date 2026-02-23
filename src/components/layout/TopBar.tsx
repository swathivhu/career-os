import { Badge } from "@/components/ui/badge";

export function TopBar() {
  return (
    <div className="w-full border-b border-border bg-card px-sm h-14 flex items-center justify-between z-50">
      <div className="flex items-center gap-xs">
        <span className="font-headline font-semibold text-lg uppercase tracking-widest text-primary">KodNest</span>
        <span className="text-muted-foreground text-sm font-medium">Build System</span>
      </div>
      
      <div className="flex items-center gap-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Progress</span>
          <div className="h-1.5 w-32 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/4" />
          </div>
          <span className="text-xs font-semibold">Step 1 / 4</span>
        </div>
      </div>

      <div className="flex items-center">
        <Badge variant="outline" className="rounded-none border-primary text-primary px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest">
          In Progress
        </Badge>
      </div>
    </div>
  );
}
