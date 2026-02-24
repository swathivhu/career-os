
'use client';

import React from 'react';
import { useRBStatus, RBStep } from '@/hooks/use-rb-status';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RBLayout({ children }: { children: React.ReactNode }) {
  const { status, completedStepsCount, isLoaded } = useRBStatus();
  const pathname = usePathname();

  // Extract step number from path (e.g., /rb/01-problem -> 1)
  const stepMatch = pathname.match(/\/rb\/0(\d)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 0;

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F3] text-[#111111] font-body">
      {/* Top Bar */}
      <nav className="h-16 border-b border-[#111111]/10 px-xl flex items-center justify-between sticky top-0 bg-[#F7F6F3]/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-md">
          <Link href="/rb/01-problem" className="font-headline text-xl font-bold tracking-widest uppercase">
            AI Resume Builder
          </Link>
          <div className="h-6 w-[1px] bg-[#111111]/10" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
            Project 3 — Step {currentStep || 'Proof'} of 8
          </span>
        </div>

        <div className="flex items-center gap-xl">
          <div className="flex items-center gap-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Progress</span>
            <div className="h-1.5 w-32 bg-[#111111]/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#8B0000] transition-all duration-500" 
                style={{ width: `${(completedStepsCount / 8) * 100}%` }}
              />
            </div>
          </div>
          <Badge variant="outline" className={`rounded-none uppercase tracking-widest text-[9px] px-sm py-1 border-[#111111]/20 ${status === 'Shipped' ? 'bg-[#8B0000] text-white border-none' : ''}`}>
            {status}
          </Badge>
        </div>
      </nav>

      {children}

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
