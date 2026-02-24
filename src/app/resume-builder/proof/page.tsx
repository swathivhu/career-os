
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';

export default function BuilderProofPage() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-xl space-y-xl animate-in slide-in-from-bottom-4 duration-1000">
      <div className="text-center space-y-md max-w-[640px]">
        <ShieldCheck className="h-16 w-16 text-[#8B0000] mx-auto opacity-20" />
        <h1 className="text-5xl font-headline italic">Strategic Verification</h1>
        <p className="text-lg text-[#111111]/60 font-medium">
          The following artifacts represent the structural integrity of the AI Resume Builder Manifest System.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg max-w-[1200px] w-full">
        {[
          { title: 'Data Schema', status: 'Verified', icon: <FileCheck className="h-5 w-5" /> },
          { title: 'Live Preview', status: 'Operational', icon: <CheckCircle2 className="h-5 w-5" /> },
          { title: 'Layout Logic', status: 'Hardened', icon: <ShieldCheck className="h-5 w-5" /> }
        ].map((art, i) => (
          <Card key={i} className="rounded-none border-[#111111]/5 bg-white shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-[#111111]/40">{art.title}</CardTitle>
              <div className="text-[#8B0000]">{art.icon}</div>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-headline italic">{art.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-lg border-2 border-dashed border-[#111111]/10 text-center max-w-[640px] w-full">
        <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-30 italic">
          Final deployment artifacts awaiting official submission.
        </p>
      </div>
    </div>
  );
}
