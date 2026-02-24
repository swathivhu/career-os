
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCareerOS } from '@/hooks/use-career-os';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LayoutDashboard, PenTool, Rocket, ShieldCheck } from 'lucide-react';

export function CareerOSTopBar() {
  const pathname = usePathname();
  const { osState } = useCareerOS();

  const navItems = [
    { label: 'Placement', href: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: 'Resume Builder', href: '/builder', icon: <PenTool className="h-4 w-4" /> },
    { label: 'Deployment Hub', href: '/deploy', icon: <Rocket className="h-4 w-4" /> },
  ];

  return (
    <div className="w-full h-14 bg-[#111111] border-b border-white/10 flex items-center justify-between px-xl sticky top-0 z-[60] text-white">
      <div className="flex items-center gap-md">
        <Link href="/" className="font-headline text-lg font-bold tracking-widest uppercase flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#8B0000]" />
          Career OS
        </Link>
        <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
        <nav className="hidden md:flex items-center gap-lg">
          {navItems.map((item) => {
            // Determine if the current item is active based on the path
            let isActive = false;
            if (item.href === '/builder') {
              isActive = ['/builder', '/preview', '/proof'].some(path => pathname.startsWith(path)) || pathname.startsWith('/rb/');
            } else {
              isActive = pathname.startsWith(item.href);
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-2",
                  isActive ? "text-white" : "text-white/40 hover:text-white"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-lg">
        <div className="hidden sm:flex items-center gap-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Readiness</span>
          <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#8B0000] transition-all duration-500" 
              style={{ width: `${osState.prpScore}%` }}
            />
          </div>
        </div>
        <Badge variant="outline" className={cn(
          "rounded-none uppercase tracking-widest text-[9px] px-sm py-1 border-white/20",
          osState.deploymentVerified ? "bg-[#8B0000] text-white border-none" : "text-white/60"
        )}>
          {osState.deploymentVerified ? 'SHIPPED' : 'IN PROGRESS'}
        </Badge>
      </div>
    </div>
  );
}
