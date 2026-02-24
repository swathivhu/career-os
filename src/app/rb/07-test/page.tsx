
'use client';

import { RBStepLayout } from '@/components/rb/RBStepLayout';

export default function TestPage() {
  return (
    <RBStepLayout 
      step={7}
      title="Verification & Validation"
      subtitle="Executing the test matrix and verifying structural integrity."
      prompt="Review all core flows: Form input, AI enhancement, and PDF export. Ensure no console errors and perfect responsive behavior."
      nextRoute="/rb/08-ship"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        {['Schema', 'State', 'Export', 'AI'].map(t => (
          <div key={t} className="p-md border border-green-600/20 bg-green-50 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-700">{t} OK</span>
          </div>
        ))}
      </div>
    </RBStepLayout>
  );
}
