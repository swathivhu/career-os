
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Rocket, PenTool, LayoutDashboard } from 'lucide-react';

export default function CareerOSLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F3] text-[#111111] font-body">
      {/* Top Bar Placeholder */}
      <nav className="h-16 border-b border-[#111111]/10 px-xl flex items-center justify-between sticky top-0 bg-[#F7F6F3]/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-md">
          <Link href="/" className="font-headline text-xl font-bold tracking-widest uppercase flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-[#8B0000]" />
            Career OS
          </Link>
        </div>
        <div className="flex items-center gap-lg">
          <Link href="/dashboard" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-colors">Placement</Link>
          <Link href="/rb/01-problem" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-colors">Resume Builder</Link>
          <Link href="/deploy" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-colors">Deployment Hub</Link>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center p-xl text-center space-y-lg animate-in fade-in duration-700">
        <div className="max-w-[900px] space-y-md">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B0000]">Strategic Professional Infrastructure</span>
          <h1 className="text-6xl md:text-8xl font-headline italic leading-tight">Your Career, Hardened.</h1>
          <p className="text-lg md:text-xl text-[#111111]/60 font-medium leading-relaxed max-w-[720px] mx-auto">
            A unified operating system for high-stakes placement prep, ATS-optimized personal branding, and verifiable proof-of-work deployment.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-md pt-md">
          <Button asChild size="lg" className="h-16 px-xl bg-[#111111] hover:bg-[#111111]/90 text-white font-bold uppercase tracking-[0.2em] rounded-none transition-all">
            <Link href="/dashboard">
              Enter Command Center
              <LayoutDashboard className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-16 px-xl border-[#111111]/20 text-[#111111] font-bold uppercase tracking-[0.2em] rounded-none transition-all hover:bg-[#8B0000]/5">
            <Link href="/deploy">
              View Deployment Hub
              <Rocket className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl pt-xl max-w-[1000px] w-full border-t border-[#111111]/5">
          {[
            { title: 'Placement Readiness', desc: 'Deterministic analysis of JD requirements and interview round mapping.', icon: <LayoutDashboard className="h-5 w-5 mb-2 text-[#8B0000]" /> },
            { title: 'Resume Architecture', desc: 'Structural branding with real-time ATS optimization scoring.', icon: <PenTool className="h-5 w-5 mb-2 text-[#8B0000]" /> },
            { title: 'Verifiable Proof', desc: 'A hardened deployment matrix for project artifacts and professional verification.', icon: <Rocket className="h-5 w-5 mb-2 text-[#8B0000]" /> }
          ].map((feat, i) => (
            <div key={i} className="space-y-sm text-left flex flex-col">
              {feat.icon}
              <h3 className="text-xs font-bold uppercase tracking-widest">{feat.title}</h3>
              <p className="text-sm text-[#111111]/50 italic">{feat.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-12 border-t border-[#111111]/5 text-center bg-white/30">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-20 italic">
          © {new Date().getFullYear()} Career OS — KodNest Premium Build System
        </p>
      </footer>
    </div>
  );
}
