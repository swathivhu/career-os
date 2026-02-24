
'use client';

import { RBStepLayout } from '@/components/rb/RBStepLayout';

export default function HLDPage() {
  return (
    <RBStepLayout 
      step={4}
      title="High-Level Design"
      subtitle="Defining the global state and multi-step form orchestration."
      prompt="Implement the multi-step resume form logic. State must persist across steps. Add basic validation for each section."
      nextRoute="/rb/05-lld"
    >
      <div className="p-xl bg-[#111111] text-white space-y-md">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#8B0000]">Strategic Flow</h3>
        <p className="text-xl font-headline italic">Deterministic state management ensures zero data loss during the high-friction input phase.</p>
      </div>
    </RBStepLayout>
  );
}
