
'use client';

import { RBStepLayout } from '@/components/rb/RBStepLayout';

export default function LLDPage() {
  return (
    <RBStepLayout 
      step={5}
      title="Low-Level Design"
      subtitle="Perfecting the component abstractions and design token integration."
      prompt="Polish the UI components. Ensure strict adherence to the spacing scale. Implement the real-time resume preview component."
      nextRoute="/rb/06-build"
    >
      <div className="space-y-md">
        <div className="h-2 w-full bg-[#111111]/5">
          <div className="h-full bg-[#8B0000] w-1/2" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Component Fidelity: 50% Verified</p>
      </div>
    </RBStepLayout>
  );
}
