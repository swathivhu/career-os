'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useResumeData } from '@/hooks/use-resume-data';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Printer, Copy, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function FullPreviewPage() {
  const { data, updateData, isLoaded } = useResumeData();

  const isComplete = useMemo(() => {
    return (
      data.personalInfo.name && 
      (data.experience.length > 0 || data.projects.length > 0)
    );
  }, [data]);

  useEffect(() => {
    if (isLoaded && !isComplete) {
      toast({
        title: "Manifest Incomplete",
        description: "Your resume may look incomplete. Consider adding a name and at least one project or experience entry.",
        variant: "destructive"
      });
    }
  }, [isLoaded, isComplete]);

  const copyAsText = () => {
    const text = `
${data.personalInfo.name || 'Your Name'}
${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}
${data.links.github ? 'GitHub: ' + data.links.github : ''}
${data.links.linkedin ? 'LinkedIn: ' + data.links.linkedin : ''}

SUMMARY
${data.summary}

EXPERIENCE
${data.experience.map(exp => `
${exp.company} - ${exp.role} (${exp.duration})
${exp.description}
`).join('\n')}

EDUCATION
${data.education.map(edu => `
${edu.institution} - ${edu.degree} (${edu.year})
`).join('\n')}

PROJECTS
${data.projects.map(proj => `
${proj.title} (${proj.link})
${proj.description}
`).join('\n')}

SKILLS
${data.skills}
    `.trim();

    navigator.clipboard.writeText(text);
    toast({
      title: "Manifest Captured",
      description: "Plain-text version copied to system clipboard."
    });
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col selection:bg-[#8B0000] selection:text-white print:bg-white print:p-0">
      {/* Mini Nav for easy return */}
      <nav className="h-12 border-b border-[#111111]/5 px-xl flex items-center justify-between bg-[#F7F6F3]/50 sticky top-0 z-50 backdrop-blur-sm print:hidden">
         <div className="flex items-center gap-md">
            <Button asChild variant="ghost" size="sm" className="h-8 text-[9px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100">
              <Link href="/builder">
                <ArrowLeft className="h-3 w-3 mr-1" /> Return to Builder
              </Link>
            </Button>
            <div className="h-4 w-[1px] bg-[#111111]/10" />
            <Tabs 
              value={data.template} 
              onValueChange={(v) => updateData({ ...data, template: v as any })}
              className="w-48"
            >
              <TabsList className="bg-[#111111]/5 border border-[#111111]/10 w-full rounded-none h-7 p-0">
                <TabsTrigger value="classic" className="flex-1 rounded-none text-[8px] font-bold uppercase tracking-widest data-[state=active]:bg-[#111111] data-[state=active]:text-white h-full">Classic</TabsTrigger>
                <TabsTrigger value="modern" className="flex-1 rounded-none text-[8px] font-bold uppercase tracking-widest data-[state=active]:bg-[#111111] data-[state=active]:text-white h-full">Modern</TabsTrigger>
                <TabsTrigger value="minimal" className="flex-1 rounded-none text-[8px] font-bold uppercase tracking-widest data-[state=active]:bg-[#111111] data-[state=active]:text-white h-full">Minimal</TabsTrigger>
              </TabsList>
            </Tabs>
         </div>
         <div className="flex items-center gap-sm">
          <Button onClick={copyAsText} variant="ghost" size="sm" className="h-8 text-[9px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100">
            <Copy className="h-3 w-3 mr-1" /> Copy as Text
          </Button>
          <Button onClick={() => window.print()} variant="ghost" size="sm" className="h-8 text-[9px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100">
            <Printer className="h-3 w-3 mr-1" /> Print Manifest
          </Button>
         </div>
      </nav>

      <div className="flex-grow p-xl flex justify-center print:p-0 print:block">
        <div className="max-w-[800px] w-full space-y-xl print:max-w-none print:w-full print:space-y-lg">
          {/* Header */}
          <header className={`border-b-2 border-[#111111] pb-xl print:pb-8 ${data.template === 'minimal' ? 'text-left' : data.template === 'modern' ? 'flex justify-between items-end' : 'text-center'} space-y-md`}>
            <div className="space-y-2">
              <h1 className={`${data.template === 'minimal' ? 'text-4xl' : 'text-6xl'} font-headline italic uppercase tracking-tighter leading-none print:text-5xl`}>
                {data.personalInfo.name || 'Manifest Identity'}
              </h1>
              {data.template !== 'modern' && (
                <div className={`flex ${data.template === 'minimal' ? 'justify-start' : 'justify-center'} gap-md text-sm font-bold uppercase tracking-[0.2em] opacity-60 flex-wrap print:text-xs`}>
                  {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                  {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                  {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
                </div>
              )}
            </div>
            
            {data.template === 'modern' && (
              <div className="flex flex-col items-end text-right gap-1 text-[10px] font-bold uppercase tracking-widest opacity-60 print:text-[9px]">
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
              </div>
            )}
            
            {(data.links.github || data.links.linkedin) && data.template !== 'modern' && (
              <div className={`flex ${data.template === 'minimal' ? 'justify-start' : 'justify-center'} gap-xl pt-md print:pt-4 print:text-[10px]`}>
                {data.links.github && <span className="text-[10px] font-bold border-b border-[#111111] uppercase tracking-widest">gh://{data.links.github}</span>}
                {data.links.linkedin && <span className="text-[10px] font-bold border-b border-[#111111] uppercase tracking-widest">in://{data.links.linkedin}</span>}
              </div>
            )}
          </header>

          {/* Content */}
          <div className="space-y-xl print:space-y-8">
            {/* Summary */}
            {data.summary && (
              <section className="space-y-md print:space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#8B0000] print:text-[10px]">01. Strategic Summary</h2>
                <p className={`${data.template === 'minimal' ? 'text-md' : 'text-lg'} leading-relaxed italic font-medium print:text-sm`}>
                  {data.summary}
                </p>
              </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <section className="space-y-md print:space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#8B0000] print:text-[10px]">02. Professional History</h2>
                <div className="space-y-lg print:space-y-6">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="space-y-sm print:space-y-1 page-break-inside-avoid">
                      <div className="flex justify-between items-baseline">
                        <h3 className={`${data.template === 'minimal' ? 'text-xl' : 'text-2xl'} font-headline italic print:text-lg`}>{exp.company}</h3>
                        <span className="text-xs font-bold uppercase tracking-widest opacity-40 print:text-[9px]">{exp.duration}</span>
                      </div>
                      <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-60 print:text-[10px]">{exp.role}</p>
                      <p className="text-md leading-relaxed opacity-80 whitespace-pre-wrap print:text-sm">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <section className="space-y-md print:space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#8B0000] print:text-[10px]">03. Academic Background</h2>
                <div className={`${data.template === 'minimal' ? 'space-y-md' : 'grid grid-cols-1 md:grid-cols-2 gap-lg print:gap-4'}`}>
                  {data.education.map((edu, i) => (
                    <div key={i} className="space-y-1 print:space-y-0.5">
                      <h3 className="text-xl font-headline italic print:text-lg">{edu.institution}</h3>
                      <p className="text-sm font-bold uppercase tracking-widest print:text-[10px]">{edu.degree}</p>
                      <p className="text-xs font-bold opacity-40 print:text-[9px]">{edu.year} | {edu.location}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {data.skills && (
              <section className="space-y-md print:space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#8B0000] print:text-[10px]">04. Technical Domain</h2>
                <p className="text-sm font-bold uppercase tracking-[0.2em] leading-loose print:text-xs">
                  {data.skills}
                </p>
              </section>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
              <section className="space-y-md print:space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#8B0000] print:text-[10px]">05. Strategic Artifacts</h2>
                <div className="space-y-lg print:space-y-6">
                  {data.projects.map((proj, i) => (
                    <div key={i} className="space-y-sm print:space-y-1 page-break-inside-avoid">
                      <div className="flex justify-between items-baseline">
                        <h3 className={`${data.template === 'minimal' ? 'text-xl' : 'text-2xl'} font-headline italic print:text-lg`}>{proj.title}</h3>
                        <span className="text-[10px] font-bold border-b border-[#111111] opacity-40 uppercase tracking-widest print:text-[9px]">{proj.link}</span>
                      </div>
                      <p className="text-md leading-relaxed opacity-80 whitespace-pre-wrap italic print:text-sm">
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <footer className="pt-xl border-t border-[#111111]/10 text-center print:pt-8 print:mt-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-20 italic">
              Manifest Generated via AI Resume Builder Premium System
            </p>
          </footer>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            -webkit-print-color-adjust: exact;
          }
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
          @page {
            margin: 2cm;
          }
        }
      `}</style>
    </div>
  );
}
