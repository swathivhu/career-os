
'use client';

import React, { useState } from 'react';
import { useRBStatus, RBStep } from '@/hooks/use-rb-status';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Copy, Sparkles, CheckCircle2, AlertCircle, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RBStepLayoutProps {
  step: RBStep;
  title: string;
  subtitle: string;
  prompt: string;
  nextRoute?: string;
  children: React.ReactNode;
}

export function RBStepLayout({ step, title, subtitle, prompt, nextRoute, children }: RBStepLayoutProps) {
  const { saveArtifact, isStepComplete, canAccessStep } = useRBStatus();
  const [artifactInput, setArtifactInput] = useState('');
  const router = useRouter();

  if (!canAccessStep(step)) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-xl text-center space-y-md">
        <h2 className="text-3xl font-headline italic">Step Locked.</h2>
        <p className="text-sm font-medium uppercase tracking-widest opacity-40 max-w-sm">
          Complete previous architectural milestones to unlock this strategic phase.
        </p>
        <Button onClick={() => router.push(`/rb/0${step - 1}-`)} variant="outline" className="rounded-none border-[#111111]/20">
          Return to Previous Step
        </Button>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    toast({ title: 'Prompt Captured', description: 'Copy this into Lovable to initiate the build.' });
  };

  const handleUpload = () => {
    saveArtifact(step, 'verified');
    toast({ title: 'Artifact Stored', description: 'Milestone verified. You may proceed.' });
  };

  return (
    <div className="flex-grow flex flex-col pb-xl">
      {/* Context Header */}
      <header className="pt-xl pb-lg px-xl border-b border-[#111111]/5 bg-white/30">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-5xl font-headline leading-tight mb-xs italic">{title}</h1>
          <p className="text-lg text-[#111111]/60 max-w-[720px] font-medium leading-relaxed">{subtitle}</p>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-[1400px] mx-auto w-full px-xl py-xl grid grid-cols-1 lg:grid-cols-10 gap-xl">
        <div className="lg:col-span-7 space-y-lg">
          {children}
          
          {nextRoute && (
            <div className="pt-lg border-t border-[#111111]/5">
              <Button 
                disabled={!isStepComplete(step)}
                onClick={() => router.push(nextRoute)}
                className="rounded-none h-14 px-lg bg-[#111111] text-white font-bold uppercase tracking-[0.2em] disabled:opacity-20"
              >
                Proceed to Next Strategic Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {!isStepComplete(step) && (
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B0000] mt-4 italic">
                  * Upload build artifact in the secondary panel to unlock next step.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Secondary Build Panel */}
        <aside className="lg:col-span-3 space-y-xl">
          <div className="sticky top-24 space-y-lg">
            <section className="space-y-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Lovable Manifest</h3>
              <div className="relative group">
                <Textarea 
                  readOnly 
                  value={prompt}
                  className="min-h-[160px] rounded-none border-[#111111]/10 bg-white font-code text-xs p-md focus:ring-0 leading-relaxed"
                />
                <Button 
                  onClick={handleCopy}
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 hover:bg-[#111111]/5"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </section>

            <div className="space-y-sm">
              <Button className="w-full rounded-none h-14 bg-[#8B0000] hover:bg-[#8B0000]/90 text-white font-bold uppercase tracking-[0.2em]">
                <Sparkles className="h-4 w-4 mr-2" />
                Build in Lovable
              </Button>

              <div className="grid grid-cols-2 gap-xs">
                <Button onClick={handleUpload} variant="outline" className="rounded-none h-12 border-[#111111]/10 hover:bg-green-50 text-[10px] font-bold uppercase tracking-widest group">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                  It Worked
                </Button>
                <Button variant="outline" className="rounded-none h-12 border-[#111111]/10 hover:bg-red-50 text-[10px] font-bold uppercase tracking-widest">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
                  Error
                </Button>
              </div>

              <Button onClick={handleUpload} variant="outline" className="w-full rounded-none h-12 border-[#111111]/10 hover:bg-[#111111]/5 text-[10px] font-bold uppercase tracking-widest">
                <ImageIcon className="h-4 w-4 mr-2" />
                Add Screenshot
              </Button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
