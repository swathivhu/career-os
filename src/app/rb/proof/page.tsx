
'use client';

import React from 'react';
import { useRBStatus, RBStep } from '@/hooks/use-rb-status';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { CheckCircle2, Copy, ShieldCheck, Link as LinkIcon, AlertCircle, Check } from 'lucide-react';
import Link from 'next/link';

export default function RBProofPage() {
  const { artifacts, links, updateLink, isShippable, isLoaded, status, completedStepsCount } = useRBStatus();

  const handleCopySubmission = () => {
    const text = `
------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployment}

Core Capabilities:
- ATS-optimized manifest generation
- AI-powered bullet point enhancement
- Multi-step state persistence
- Print-ready PDF export architecture
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
      return true;
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
          <p className="text-lg text-[#111111]/60 max-w-[720px] font-medium">Final artifact collection and strategic release manifest for the AI Resume Builder.</p>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto w-full px-xl py-xl grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <div className="lg:col-span-8 space-y-xl">
          <div className={`p-lg border-2 ${isShippable ? 'border-green-500/20 bg-green-500/5' : 'border-[#111111]/10 bg-white'} flex justify-between items-center transition-all duration-500`}>
            <div className="space-y-xs">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Strategic Status</span>
              <div className="flex items-center gap-sm">
                <h2 className="text-3xl font-headline italic">{status}</h2>
              </div>
            </div>
            {isShippable && (
              <Button onClick={handleCopySubmission} className="rounded-none h-12 bg-[#111111] text-white font-bold uppercase tracking-widest px-lg">
                <Copy className="h-4 w-4 mr-2" />
                Copy Final Submission
              </Button>
            )}
          </div>

          <div className="space-y-md">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 border-b border-[#111111]/10 pb-xs">01. Step Completion Summary</h3>
            <div className="bg-white border border-[#111111]/10 divide-y divide-[#111111]/5">
              {[
                'Problem', 'Market', 'Architecture', 'HLD', 'LLD', 'Build', 'Test', 'Ship'
              ].map((step, idx) => {
                const isDone = !!artifacts[idx + 1];
                return (
                  <div key={step} className="p-md flex items-center justify-between">
                    <span className={`text-sm font-bold uppercase tracking-widest ${isDone ? 'opacity-100' : 'opacity-30'}`}>
                      Step 0{idx + 1}: {step}
                    </span>
                    {isDone ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <div className="h-4 w-4 rounded-full border border-[#111111]/10" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-md">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 border-b border-[#111111]/10 pb-xs">02. Artifact Collection</h3>
            <div className="grid gap-lg p-lg bg-white border border-[#111111]/10">
              {(['lovable', 'github', 'deployment'] as const).map((key) => (
                <div key={key} className="space-y-sm">
                  <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">{key.replace(/^\w/, c => c.toUpperCase())} Link</Label>
                  <div className="flex gap-xs">
                    <Input 
                      placeholder={`https://${key}.com/...`} 
                      value={links[key]}
                      onChange={(e) => updateLink(key, e.target.value)}
                      className="rounded-none border-[#111111]/10 h-12 bg-[#F7F6F3] focus:ring-[#8B0000]"
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
          <div className="bg-[#111111] text-white p-lg space-y-md">
            <ShieldCheck className="h-8 w-8 text-[#8B0000]" />
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Deployment Integrity</h3>
            <p className="text-sm italic opacity-70 leading-relaxed">
              All architectural steps must be verified and artifacts uploaded before the project can be officially shippable.
            </p>
            <div className="pt-md border-t border-white/10">
              <p className="text-2xl font-headline italic">{completedStepsCount} / 8 Steps Verified</p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
