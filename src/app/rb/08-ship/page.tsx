'use client';

import { RBStepLayout } from '@/components/rb/RBStepLayout';
import { useRBStatus } from '@/hooks/use-rb-status';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ShipPage() {
  const { isShippable } = useRBStatus();

  return (
    <RBStepLayout 
      step={8}
      title="Launch Sequence"
      subtitle="Final deployment and project manifestation. High-integrity release verified."
      prompt="Deploy the final manifest. Verify structural integrity of the print engine. Project 3 is ready for strategic submission."
      nextRoute="/rb/proof"
    >
      <div className="space-y-xl">
        <div className="p-xl bg-[#8B0000] text-white text-center space-y-md">
          <ShieldCheck className="h-12 w-12 mx-auto mb-md opacity-20" />
          <h2 className="text-4xl font-headline italic leading-tight">Strategic Deployment Confirmed.</h2>
          <p className="text-sm uppercase tracking-[0.3em] font-bold opacity-60 italic">Release Manifest 0.1.0-alpha</p>
        </div>

        {isShippable && (
          <div className="p-xl bg-white border border-[#111111]/5 text-center space-y-lg animate-in fade-in duration-1000">
            <div className="relative inline-block">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
            <div className="space-y-md border-y border-[#111111]/5 py-lg">
              <p className="text-xl text-[#111111] font-medium italic opacity-90 leading-relaxed max-w-lg mx-auto">
                "You built a real product. Not a tutorial. Not a clone. A structured tool that solves a real problem."
              </p>
              <p className="text-lg text-[#8B0000] font-bold uppercase tracking-widest italic">
                This is your proof of work.
              </p>
            </div>
            <Button asChild className="rounded-none h-14 px-lg bg-[#111111] text-white font-bold uppercase tracking-widest">
              <Link href="/rb/proof">Go to Final Proof Matrix</Link>
            </Button>
          </div>
        )}
      </div>
    </RBStepLayout>
  );
}
