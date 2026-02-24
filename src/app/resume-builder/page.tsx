
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ResumeBuilderLanding() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-xl text-center space-y-lg animate-in fade-in duration-700">
      <div className="max-w-[800px] space-y-md">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B0000]">Strategic Manifestation</span>
        <h1 className="text-6xl md:text-8xl font-headline italic leading-tight">Build a Resume That Gets Read.</h1>
        <p className="text-lg md:text-xl text-[#111111]/60 font-medium leading-relaxed max-w-[640px] mx-auto">
          Deterministic, ATS-optimized architecture designed for the high-stakes professional market. No fluff. Just structural clarity.
        </p>
      </div>

      <div className="pt-md">
        <Button asChild size="lg" className="h-16 px-xl bg-[#8B0000] hover:bg-[#8B0000]/90 text-white font-bold uppercase tracking-[0.2em] rounded-none transition-all">
          <Link href="/resume-builder/builder">
            Start Building Manifest
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-xl pt-xl max-w-[1000px] w-full border-t border-[#111111]/5">
        {[
          { title: 'ATS-Optimized', desc: 'Structural alignment with global recruiting algorithms.' },
          { title: 'Serif Design', desc: 'Large, confident typography that commands attention.' },
          { title: 'Zero Friction', desc: 'Logic-less layout processing for maximum speed.' }
        ].map((feat, i) => (
          <div key={i} className="space-y-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest">{feat.title}</h3>
            <p className="text-sm text-[#111111]/50 italic">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
