
"use client";

import { TopBar } from "@/components/layout/TopBar";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { ProofFooter } from "@/components/layout/ProofFooter";
import { useTestStatus, TEST_CHECKLIST } from "@/hooks/use-test-status";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  RotateCcw,
  Link as LinkIcon,
  Copy,
  Check
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

export default function ProofPage() {
  const { 
    checkedIds, 
    toggleTest, 
    links, 
    updateLink, 
    resetTests, 
    passCount, 
    isFullyVerified, 
    isShippable,
    isLoaded,
    status
  } = useTestStatus();

  const steps = [
    { name: "Step 1: Route Shell", done: true },
    { name: "Step 2: Landing & Empty States", done: true },
    { name: "Step 3: Realistic Data & Rendering", done: true },
    { name: "Step 4: Search & Filters", done: true },
    { name: "Step 5: Daily Digest Engine", done: true },
    { name: "Step 6: Status Tracking", done: true },
    { name: "Step 7: Test Checklist", done: passCount === TEST_CHECKLIST.length },
    { name: "Step 8: Submission & Ship", done: isShippable },
  ];

  const handleCopySubmission = () => {
    const text = `
------------------------------------------
Job Notification Tracker — Final Submission

Lovable Project:
${links.lovable}

GitHub Repository:
${links.github}

Live Deployment:
${links.deployment}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
------------------------------------------
`.trim();
    
    navigator.clipboard.writeText(text);
    toast({
      title: "Submission Copied",
      description: "Final project manifest copied to clipboard.",
    });
  };

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background pb-xl">
      <TopBar />
      <ContextHeader 
        title="Proof Matrix" 
        subtitle="Final verification and artifact collection for Project 1 — Job Notification Tracker."
      />
      
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-xl py-xl grid grid-cols-1 lg:grid-cols-12 gap-xl">
        {/* Left Column: Verification & Artifacts */}
        <div className="lg:col-span-8 space-y-xl">
          
          {/* Project Status Header */}
          <div className={`p-lg border-2 ${isShippable ? 'border-green-500/20 bg-green-500/5' : 'border-primary/20 bg-primary/5'} flex flex-col md:flex-row justify-between items-center gap-md transition-all duration-500`}>
            <div className="space-y-xs text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Project 1 Status</span>
              <div className="flex items-center gap-sm justify-center md:justify-start">
                <h2 className="text-3xl font-headline italic">
                  {status}
                </h2>
                <Badge variant={status === "Shipped" ? "secondary" : "outline"} className={`rounded-none uppercase tracking-widest text-[10px] ${status === "Shipped" ? "bg-green-100 text-green-700" : ""}`}>
                  {status === "Shipped" ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <ShieldCheck className="h-3 w-3 mr-1" />}
                  {status}
                </Badge>
              </div>
            </div>
            
            {!isShippable ? (
              <div className="flex items-center gap-xs text-primary font-bold uppercase tracking-widest text-xs animate-pulse">
                <AlertTriangle className="h-4 w-4" />
                Resolve all steps and provide links to ship.
              </div>
            ) : (
              <Button onClick={handleCopySubmission} className="rounded-none h-12 bg-foreground text-background font-bold uppercase tracking-widest px-lg">
                <Copy className="h-4 w-4 mr-2" />
                Copy Final Submission
              </Button>
            )}
          </div>

          {/* Section A: Checklist */}
          <div className="space-y-md">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60 border-b border-primary/10 pb-xs">
              01. Verification Matrix ({passCount}/10)
            </h3>
            <div className="bg-card border border-border/50 divide-y divide-border/10">
              {TEST_CHECKLIST.map((item) => (
                <div key={item.id} className="p-md flex items-center justify-between hover:bg-muted/10 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <Checkbox 
                      id={item.id} 
                      checked={checkedIds.includes(item.id)}
                      onCheckedChange={() => toggleTest(item.id)}
                      className="h-5 w-5 rounded-none border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label
                      htmlFor={item.id}
                      className={`text-sm font-bold uppercase tracking-widest cursor-pointer transition-colors ${checkedIds.includes(item.id) ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                      {item.label}
                    </label>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none opacity-40 group-hover:opacity-100 transition-opacity">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="rounded-none border-border bg-popover text-xs font-medium max-w-xs uppercase tracking-wider">
                        {item.howTo}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: Artifact Collection */}
          <div className="space-y-md">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60 border-b border-primary/10 pb-xs">
              02. Artifact Collection
            </h3>
            <div className="grid gap-lg p-lg bg-card border border-border/50">
              <div className="space-y-sm">
                <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Lovable Project Link</Label>
                <div className="flex gap-xs">
                  <Input 
                    placeholder="https://lovable.dev/projects/..." 
                    value={links.lovable}
                    onChange={(e) => updateLink("lovable", e.target.value)}
                    className="rounded-none border-border/60 h-12 bg-background/50 focus:ring-primary"
                  />
                  <div className={`flex items-center justify-center w-12 border border-border/50 ${links.lovable ? 'bg-green-50 text-green-600' : 'bg-muted'}`}>
                    {links.lovable ? <Check className="h-5 w-5" /> : <LinkIcon className="h-5 w-5 opacity-20" />}
                  </div>
                </div>
              </div>
              <div className="space-y-sm">
                <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">GitHub Repository Link</Label>
                <div className="flex gap-xs">
                  <Input 
                    placeholder="https://github.com/user/repo" 
                    value={links.github}
                    onChange={(e) => updateLink("github", e.target.value)}
                    className="rounded-none border-border/60 h-12 bg-background/50 focus:ring-primary"
                  />
                  <div className={`flex items-center justify-center w-12 border border-border/50 ${links.github ? 'bg-green-50 text-green-600' : 'bg-muted'}`}>
                    {links.github ? <Check className="h-5 w-5" /> : <LinkIcon className="h-5 w-5 opacity-20" />}
                  </div>
                </div>
              </div>
              <div className="space-y-sm">
                <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Live Deployment URL</Label>
                <div className="flex gap-xs">
                  <Input 
                    placeholder="https://project.vercel.app" 
                    value={links.deployment}
                    onChange={(e) => updateLink("deployment", e.target.value)}
                    className="rounded-none border-border/60 h-12 bg-background/50 focus:ring-primary"
                  />
                  <div className={`flex items-center justify-center w-12 border border-border/50 ${links.deployment ? 'bg-green-50 text-green-600' : 'bg-muted'}`}>
                    {links.deployment ? <Check className="h-5 w-5" /> : <LinkIcon className="h-5 w-5 opacity-20" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Step Completion Summary */}
        <aside className="lg:col-span-4 space-y-xl">
          <div className="sticky top-24 space-y-lg">
            <div className="bg-card border border-border/50 p-lg space-y-md">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-foreground border-b border-border/30 pb-xs">
                Step Completion Summary
              </h3>
              <div className="space-y-sm">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                    <span className={step.done ? "text-foreground" : "text-muted-foreground opacity-40"}>
                      {step.name}
                    </span>
                    {step.done ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                    ) : (
                      <div className="h-3.5 w-3.5 rounded-full border border-border/50" />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="pt-md border-t border-border/30 mt-md">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetTests}
                  className="w-full rounded-none h-10 border-border hover:bg-destructive/5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-destructive"
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-2" />
                  Reset Project Matrix
                </Button>
              </div>
            </div>

            {isShippable && (
              <div className="bg-green-50 border border-green-200 p-lg text-center space-y-md animate-in slide-in-from-right-4 duration-500">
                <p className="text-xs font-bold text-green-700 uppercase tracking-widest">
                  Ready for submission
                </p>
                <Button asChild className="w-full rounded-none h-14 bg-green-600 hover:bg-green-700 text-white font-bold uppercase tracking-[0.2em]">
                  <a href="/ship">Proceed to Launch</a>
                </Button>
              </div>
            )}
          </div>
        </aside>
      </main>

      <ProofFooter />
    </div>
  );
}
