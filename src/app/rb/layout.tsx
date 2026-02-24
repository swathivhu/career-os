
'use client';

import React from 'react';
import { useRBStatus } from '@/hooks/use-rb-status';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CareerOSTopBar } from '@/components/layout/CareerOSTopBar';

export default function RBLayout({ children }: { children: React.ReactNode }) {
  const { status, completedStepsCount, isLoaded } = useRBStatus();
  const pathname = usePathname();

  // Extract step number from path (e.g., /rb/01-problem -> 1)
  const stepMatch = pathname.match(/\/rb\/0(\d)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 0;

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F3] text-[#111111] font-body">
      <CareerOSTopBar />
      {/* Sub Top Bar */}
      <nav className="h-12 border-b border-[#111111]/10 px-xl flex items-center justify-between sticky top-14 bg-[#F7F6F3]/80 backdrop-blur-md z-40">
        <div className="flex items-center gap-md">
          <Link href="/rb/01-problem" className="font-headline text-sm font-bold tracking-widest uppercase">
            Resume Builder Track
          </Link>
          <div className="h-4 w-[1px] bg-[#111111]/10" />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40">
            Step {currentStep || 'Proof'} of 8
          </span>
        </div>

        <div className="flex items-center gap-xl">
          <div className="flex items-center gap-sm">
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">Track Progress</span>
            <div className="h-1 w-24 bg-[#111111]/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#8B0000] transition-all duration-500" 
                style={{ width: `${(completedStepsCount / 8) * 100}%` }}
              />
            </div>
          </div>
          <Badge variant="outline" className={`rounded-none uppercase tracking-widest text-[8px] px-sm py-0.5 border-[#111111]/20 ${status === 'Shipped' ? 'bg-[#8B0000] text-white border-none' : ''}`}>
            {status}
          </Badge>
        </div>
      </nav>

      <div className="flex-1 flex flex-col pb-16">
        {children}
      </div>

      {/* Proof Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#111111]/10 z-50 px-xl flex items-center justify-between">
        <div className="flex items-center gap-lg">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Proof Matrix</span>
          <div className="flex items-center gap-md">
            {[
              { id: 'ui', label: 'UI Built' },
              { id: 'logic', label: 'Logic Working' },
              { id: 'test', label: 'Test Passed' },
              { id: 'deploy', label: 'Deployed' },
            ].map((req) => (
              <div key={req.id} className="flex items-center space-x-2">
                <Checkbox id={req.id} className="rounded-none border-[#111111]/20 data-[state=checked]:bg-[#8B0000] data-[state=checked]:border-[#8B0000]" />
                <label htmlFor={req.id} className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {req.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-md">
          <Link href="/rb/proof" className="text-[10px] font-bold uppercase tracking-widest hover:text-[#8B0000] transition-colors">
            Final Proof Page
          </Link>
          <div className="h-4 w-[1px] bg-[#111111]/10" />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 italic">
            Integrity Verified
          </span>
        </div>
      </footer>
    </div>
  );
}
