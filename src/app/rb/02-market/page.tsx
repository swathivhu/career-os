
'use client';

import { RBStepLayout } from '@/components/rb/RBStepLayout';

export default function MarketPage() {
  return (
    <RBStepLayout 
      step={2}
      title="Market Positioning"
      subtitle="Analyzing the competitive landscape and defining the premium AI advantage."
      prompt="Enhance the landing page with market stats and a feature matrix comparing traditional builders with our AI-first approach."
      nextRoute="/rb/03-architecture"
    >
      <div className="space-y-lg">
        <div className="p-xl bg-white border border-[#111111]/5">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-md text-[#8B0000]">The Opportunity</h3>
          <p className="text-3xl font-headline italic leading-tight">70% of resumes are filtered before a human ever sees them.</p>
          <p className="mt-md text-sm text-[#111111]/60 leading-relaxed max-w-xl">
            Our solution targets the high-stakes tech market where precision and structural integrity are the only metrics that matter.
          </p>
        </div>
      </div>
    </RBStepLayout>
  );
}
