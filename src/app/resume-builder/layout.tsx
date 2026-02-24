
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Toaster } from '@/components/ui/toaster';

export default function ResumeBuilderLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/resume-builder' },
    { label: 'Builder', href: '/resume-builder/builder' },
    { label: 'Preview', href: '/resume-builder/preview' },
    { label: 'Proof', href: '/resume-builder/proof' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F3] text-[#111111] font-body">
      {/* Top Bar */}
      <nav className="h-16 border-b border-[#111111]/10 px-xl flex items-center justify-between sticky top-0 bg-[#F7F6F3]/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-md">
          <Link href="/resume-builder" className="font-headline text-xl font-bold tracking-widest uppercase">
            AI Resume Builder
          </Link>
          <div className="h-6 w-[1px] bg-[#111111]/10 hidden md:block" />
          <div className="hidden md:flex items-center gap-lg ml-md">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#8B0000] ${
                  pathname === item.href ? 'text-[#8B0000]' : 'opacity-40'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">System Status</span>
          <Badge variant="outline" className="rounded-none uppercase tracking-widest text-[9px] px-sm py-1 border-[#111111]/20">
            Operational
          </Badge>
        </div>
      </nav>

      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
