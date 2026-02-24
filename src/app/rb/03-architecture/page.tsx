
'use client';

import { RBStepLayout } from '@/components/rb/RBStepLayout';

export default function ArchitecturePage() {
  return (
    <RBStepLayout 
      step={3}
      title="System Architecture"
      subtitle="Mapping the data flow from raw user input to AI-enhanced professional manifests."
      prompt="Create the core application structure: Dashboard, Editor, and Preview shell. Use a persistent sidebar for navigation."
      nextRoute="/rb/04-hld"
    >
      <div className="space-y-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {['Input Engine', 'LLM Processor', 'Manifest Generator'].map((layer, i) => (
            <div key={i} className="p-md border border-[#111111]/10 bg-white text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Layer 0{i+1}</span>
              <p className="font-headline italic text-lg mt-2">{layer}</p>
            </div>
          ))}
        </div>
      </div>
    </RBStepLayout>
  );
}
