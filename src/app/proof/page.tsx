"use client";

import { TopBar } from "@/components/layout/TopBar";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { ProofFooter } from "@/components/layout/ProofFooter";
import { useTestStatus, TEST_CHECKLIST } from "@/hooks/use-test-status";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  RotateCcw
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProofPage() {
  const { checkedIds, toggleTest, resetTests, passCount, isFullyVerified, isLoaded } = useTestStatus();

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background pb-xl">
      <TopBar />
      <ContextHeader 
        title="Proof Matrix" 
        subtitle="System integrity validation and verification checklist. Deployment is locked until all tests pass."
      />
      
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-xl py-xl flex flex-col items-center">
        <div className="w-full max-w-[800px] space-y-lg">
          
          {/* Summary Header */}
          <div className={`p-lg border-2 ${isFullyVerified ? 'border-green-500/20 bg-green-500/5' : 'border-primary/20 bg-primary/5'} flex flex-col md:flex-row justify-between items-center gap-md transition-all duration-500`}>
            <div className="space-y-xs text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Validation Status</span>
              <h2 className="text-3xl font-headline italic flex items-center gap-sm justify-center md:justify-start">
                {isFullyVerified ? <CheckCircle2 className="h-8 w-8 text-green-600" /> : <ShieldCheck className="h-8 w-8 text-primary" />}
                Tests Passed: {passCount} / {TEST_CHECKLIST.length}
              </h2>
            </div>
            
            {!isFullyVerified ? (
              <div className="flex items-center gap-xs text-primary font-bold uppercase tracking-widest text-xs animate-pulse">
                <AlertTriangle className="h-4 w-4" />
                Resolve all issues before shipping.
              </div>
            ) : (
              <div className="text-green-600 font-bold uppercase tracking-widest text-xs flex items-center gap-xs">
                <CheckCircle2 className="h-4 w-4" />
                System ready for deployment.
              </div>
            )}
          </div>

          {/* Checklist */}
          <div className="bg-card border border-border/50 divide-y divide-border/10">
            <div className="p-md bg-muted/30 border-b border-border/50">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-foreground">Verification Items</h3>
            </div>
            
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

          {/* Actions */}
          <div className="flex justify-between items-center pt-md">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetTests}
              className="rounded-none h-10 border-border hover:bg-destructive/5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-destructive"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-2" />
              Reset Test Status
            </Button>

            {isFullyVerified && (
              <Button asChild className="rounded-none h-14 px-xl bg-foreground text-background font-bold uppercase tracking-[0.2em] animate-in slide-in-from-bottom-2">
                <a href="/ship">Ship to Production</a>
              </Button>
            )}
          </div>
        </div>
      </main>

      <ProofFooter />
    </div>
  );
}
