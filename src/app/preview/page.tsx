
'use client';

import React from 'react';
import Link from 'next/link';
import { useResumeData } from '@/hooks/use-resume-data';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function FullPreviewPage() {
  const { data, isLoaded } = useResumeData();

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col selection:bg-[#8B0000] selection:text-white">
      {/* Mini Nav for easy return */}
      <nav className="h-12 border-b border-[#111111]/5 px-xl flex items-center bg-[#F7F6F3]/50 sticky top-0 z-50 backdrop-blur-sm print:hidden">
         <Button asChild variant="ghost" size="sm" className="h-8 text-[9px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100">
            <Link href="/builder">
              <ArrowLeft className="h-3 w-3 mr-1" /> Return to Builder
            </Link>
          </Button>
      </nav>

      <div className="flex-grow p-xl flex justify-center">
        <div className="max-w-[800px] w-full space-y-xl">
          {/* Header */}
          <header className="text-center space-y-md border-b-2 border-[#111111] pb-xl">
            <h1 className="text-6xl font-headline italic uppercase tracking-tighter leading-none">
              {data.personalInfo.name || 'Manifest Identity'}
            </h1>
            <div className="flex justify-center gap-md text-sm font-bold uppercase tracking-[0.2em] opacity-60">
              <span>{data.personalInfo.email}</span>
              <span>•</span>
              <span>{data.personalInfo.phone}</span>
              <span>•</span>
              <span>{data.personalInfo.location}</span>
            </div>
          </header>

          {/* Content */}
          <div className="space-y-xl">
            {/* Summary */}
            {data.summary && (
              <section className="space-y-md">
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#8B0000]">01. Strategic Summary</h2>
                <p className="text-lg leading-relaxed italic font-medium">
                  {data.summary}
                </p>
              </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <section className="space-y-md">
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#8B0000]">02. Professional History</h2>
                <div className="space-y-lg">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="space-y-sm">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-2xl font-headline italic">{exp.company}</h3>
                        <span className="text-xs font-bold uppercase tracking-widest opacity-40">{exp.duration}</span>
                      </div>
                      <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-60">{exp.role}</p>
                      <p className="text-md leading-relaxed opacity-80 whitespace-pre-wrap">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <section className="space-y-md">
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#8B0000]">03. Academic Background</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                  {data.education.map((edu, i) => (
                    <div key={i} className="space-y-1">
                      <h3 className="text-xl font-headline italic">{edu.institution}</h3>
                      <p className="text-sm font-bold uppercase tracking-widest">{edu.degree}</p>
                      <p className="text-xs font-bold opacity-40">{edu.year} | {edu.location}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {data.skills && (
              <section className="space-y-md">
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#8B0000]">04. Technical Domain</h2>
                <p className="text-sm font-bold uppercase tracking-[0.2em] leading-loose">
                  {data.skills}
                </p>
              </section>
            )}
          </div>

          <footer className="pt-xl border-t border-[#111111]/10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-20 italic">
              Manifest Generated via KodNest Premium Build System
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
