import { Checkbox } from "@/components/ui/checkbox";

export function ProofFooter() {
  const steps = [
    { label: "UI Built", id: "ui-built" },
    { label: "Logic Working", id: "logic-working" },
    { label: "Test Passed", id: "test-passed" },
    { label: "Deployed", id: "deployed" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 border-t border-border bg-card z-50 px-xl flex items-center justify-between">
      <div className="flex items-center gap-lg">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mr-sm">Verification Matrix:</span>
        <div className="flex items-center gap-md">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center space-x-2 group">
              <Checkbox id={step.id} className="rounded-none border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
              <label
                htmlFor={step.id}
                className="text-xs font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 uppercase tracking-widest cursor-pointer group-hover:text-primary transition-standard"
              >
                {step.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
        System integrity: <span className="text-primary font-bold">100% Verified</span>
      </div>
    </footer>
  );
}
