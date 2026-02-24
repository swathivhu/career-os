
'use client';

import { RBStepLayout } from '@/components/rb/RBStepLayout';

export default function ProblemPage() {
  return (
    <RBStepLayout 
      step={1}
      title="The Strategic Problem"
      subtitle="Defining the friction in professional personal branding and the resume-building bottleneck."
      prompt="Initialize the AI Resume Builder project. Create a high-fidelity landing page with a focus on problem-solving for job seekers."
      nextRoute="/rb/02-market"
    >
      <div className="prose prose-stone max-w-none">
        <p className="text-lg leading-relaxed text-[#111111]/80 italic font-medium">
          Modern recruiting is deterministic and high-velocity. Applicants often fail not due to a lack of merit, but a failure of structural clarity and keyword alignment.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mt-xl">
          <div className="p-lg bg-white border border-[#111111]/5 space-y-md">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#8B0000]">Friction Point A</h3>
            <p className="text-sm leading-relaxed opacity-70">Lack of ATS-optimized formatting leads to immediate filtering by automated systems.</p>
          </div>
          <div className="p-lg bg-white border border-[#111111]/5 space-y-md">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#8B0000]">Friction Point B</h3>
            <p className="text-sm leading-relaxed opacity-70">Inability to bridge the gap between technical skills and business impact descriptions.</p>
          </div>
        </div>
      </div>
    </RBStepLayout>
  );
}
