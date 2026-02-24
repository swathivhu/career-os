'use client';

import React from 'react';
import { useRBStatus, RB_CHECKLIST } from '@/hooks/use-rb-status';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { CheckCircle2, Copy, ShieldCheck, Link as LinkIcon, Check, Activity, Target } from 'lucide-react';

export default function RBProofPage() {
  const { 
    artifacts, 
    links, 
    updateLink, 
    checklist, 
    toggleChecklist,
    isShippable, 
    isLoaded, 
    status, 
    completedStepsCount,
    passedTestsCount
  } = useRBStatus();

  const handleCopySubmission = () => {
    const text = `
------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployment}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------
`.trim();
    
    navigator.clipboard.writeText(text);
    toast({
      title: 'Submission Manifest Captured',
      description: 'Project metadata copied to system clipboard.',
    });
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return url.startsWith('http');
    } catch {
      return false;
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="flex-grow flex flex-col pb-xl">
      <header className="pt-xl pb-lg px-xl border-b border-[#111111]/5 bg-white/30">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-5xl font-headline leading-tight mb-xs italic">Verification Matrix</h1>
          <p className="text-lg text-[#111111]/60 max-w-[720px] font-medium leading-relaxed">Final artifact collection and strategic release manifest for the AI Resume Builder.</p>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto w-full px-xl py-xl grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <div className="lg:col-span-8 space-y-xl">
          {/* Shipped Banner */}
          <div className={`p-lg border-2 ${isShippable ? 'border-[#8B0000]/20 bg-[#8B0000]/5' : 'border-[#111111]/10 bg-white'} flex justify-between items-center transition-all duration-500`}>
            <div className="space-y-xs">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Strategic Status</span>
              <h2 className="text-3xl font-headline italic">{status}</h2>
              {isShippable && (
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#8B0000] italic">
                  Project 3 Shipped Successfully.
                </p>
              )}
            </div>
            {isShippable && (
              <Button onClick={handleCopySubmission} className="rounded-none h-12 bg-[#111111] text-white font-bold uppercase tracking-widest px-lg">
                <Copy className="h-4 w-4 mr-2" />
                Copy Final Submission
              </Button>
            )}
          </div>

          {/* Steps Progress */}
          <div className="space-y-md">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 border-b border-[#111111]/10 pb-xs flex items-center gap-2">
              <Activity className="h-3 w-3" />
              01. Step Completion Summary ({completedStepsCount}/8)
            </h3>
            <div className="bg-white border border-[#111111]/10 divide-y divide-[#111111]/5">
              {[
                'Problem', 'Market', 'Architecture', 'HLD', 'LLD', 'Build', 'Test', 'Ship'
              ].map((step, idx) => {
                const isDone = !!artifacts[idx + 1];
                return (
                  <div key={step} className="p-md flex items-center justify-between">
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${isDone ? 'opacity-100' : 'opacity-30'}`}>
                      Step 0{idx + 1}: {step}
                    </span>
                    {isDone ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <div className="h-4 w-4 rounded-full border border-[#111111]/10" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Test Checklist */}
          <div className="space-y-md">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 border-b border-[#111111]/10 pb-xs flex items-center gap-2">
              <Target className="h-3 w-3" />
              02. Functional Verification ({passedTestsCount}/10)
            </h3>
            <div className="bg-white border border-[#111111]/10 divide-y divide-[#111111]/5">
              {RB_CHECKLIST.map((item) => (
                <div key={item.id} className="p-md flex items-center gap-md hover:bg-[#F7F6F3]/50 transition-colors">
                  <Checkbox 
                    id={item.id} 
                    checked={checklist[item.id] || false} 
                    onCheckedChange={() => toggleChecklist(item.id)}
                    className="rounded-none border-[#111111]/20 data-[state=checked]:bg-[#8B0000] data-[state=checked]:border-[#8B0000]" 
                  />
                  <label htmlFor={item.id} className="text-[11px] font-bold uppercase tracking-widest opacity-80 cursor-pointer flex-grow">
                    {item.label}
                  </label>
                  {checklist[item.id] && <Badge variant="outline" className="border-none text-green-600 text-[9px] font-bold uppercase tracking-tighter">Verified</Badge>}
                </div>
              ))}
            </div>
          </div>

          {/* Artifact Collection */}
          <div className="space-y-md">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 border-b border-[#111111]/10 pb-xs flex items-center gap-2">
              <LinkIcon className="h-3 w-3" />
              03. Artifact Collection
            </h3>
            <div className="grid gap-lg p-lg bg-white border border-[#111111]/10">
              {(['lovable', 'github', 'deployment'] as const).map((key) => (
                <div key={key} className="space-y-sm">
                  <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">{key.replace(/^\w/, c => c.toUpperCase())} Link</Label>
                  <div className="flex gap-xs">
                    <Input 
                      placeholder={`https://${key === 'deployment' ? 'your-app' : key}.com/...`} 
                      value={links[key]}
                      onChange={(e) => updateLink(key, e.target.value)}
                      className="rounded-none border-[#111111]/10 h-12 bg-[#F7F6F3] focus:ring-[#8B0000] text-sm"
                    />
                    <div className={`flex items-center justify-center w-12 border border-[#111111]/10 ${isValidUrl(links[key]) ? 'bg-green-50 text-green-600' : 'bg-white'}`}>
                      {isValidUrl(links[key]) ? <Check className="h-5 w-5" /> : <LinkIcon className="h-5 w-5 opacity-20" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-xl">
          <div className="bg-[#111111] text-white p-lg space-y-md sticky top-24">
            <ShieldCheck className="h-8 w-8 text-[#8B0000]" />
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Deployment Integrity</h3>
            <p className="text-sm italic opacity-70 leading-relaxed">
              All architectural steps must be verified, functional tests passed, and artifacts uploaded before the project can be officially shippable.
            </p>
            <div className="pt-md border-t border-white/10 space-y-md">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Progress</span>
                <span className="text-2xl font-headline italic">
                  {Math.round(((completedStepsCount + passedTestsCount + (Object.values(links).filter(isValidUrl).length)) / 21) * 100)}%
                </span>
              </div>
              <div className="space-y-1 text-[10px] font-bold uppercase tracking-widest opacity-60">
                <p>• Steps: {completedStepsCount}/8</p>
                <p>• Tests: {passedTestsCount}/10</p>
                <p>• Artifacts: {Object.values(links).filter(isValidUrl).length}/3</p>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

function Badge({ children, variant, className }: any) {
  return (
    <span className={`inline-flex items-center rounded-none border px-2 py-0.5 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}
