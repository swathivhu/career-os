'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useResumeData, ResumeTemplate } from '@/hooks/use-resume-data';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Printer, Copy, Github, ExternalLink, Layout, Palette } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const COLOR_OPTIONS = [
  { name: 'Teal', value: 'hsl(168, 60%, 40%)' },
  { name: 'Navy', value: 'hsl(220, 60%, 35%)' },
  { name: 'Burgundy', value: 'hsl(345, 60%, 35%)' },
  { name: 'Forest', value: 'hsl(150, 50%, 30%)' },
  { name: 'Charcoal', value: 'hsl(0, 0%, 25%)' },
];

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

SKILLS
Technical: ${data.skills.technical.join(', ')}
Soft Skills: ${data.skills.soft.join(', ')}
Tools: ${data.skills.tools.join(', ')}

EXPERIENCE
${data.experience.map(exp => `
${exp.company} - ${exp.role} (${exp.duration})
${exp.description}
`).join('\n')}

PROJECTS
${data.projects.map(proj => `
${proj.title} (${proj.techStack.join(', ')})
${proj.description}
Links: ${proj.githubUrl} ${proj.liveUrl}
`).join('\n')}

EDUCATION
${data.education.map(edu => `
${edu.institution} - ${edu.degree} (${edu.year})
`).join('\n')}
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
      <nav className="h-14 border-b border-[#111111]/5 px-xl flex items-center justify-between bg-[#F7F6F3]/50 sticky top-0 z-50 backdrop-blur-sm print:hidden">
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
              <TabsList className="bg-[#111111]/5 border border-[#111111]/10 w-full rounded-none h-8 p-0">
                <TabsTrigger value="classic" className="flex-1 rounded-none text-[8px] font-bold uppercase tracking-widest data-[state=active]:bg-[#111111] data-[state=active]:text-white h-full">Classic</TabsTrigger>
                <TabsTrigger value="modern" className="flex-1 rounded-none text-[8px] font-bold uppercase tracking-widest data-[state=active]:bg-[#111111] data-[state=active]:text-white h-full">Modern</TabsTrigger>
                <TabsTrigger value="minimal" className="flex-1 rounded-none text-[8px] font-bold uppercase tracking-widest data-[state=active]:bg-[#111111] data-[state=active]:text-white h-full">Minimal</TabsTrigger>
              </TabsList>
            </Tabs>
         </div>
         <div className="flex items-center gap-sm">
          <div className="flex gap-1 mr-4">
             {COLOR_OPTIONS.map(c => (
               <button 
                 key={c.value} 
                 onClick={() => updateData({...data, colorTheme: c.value})}
                 className={cn(
                   "w-4 h-4 rounded-full border border-white/20",
                   data.colorTheme === c.value && "ring-2 ring-primary ring-offset-2"
                 )}
                 style={{backgroundColor: c.value}}
               />
             ))}
          </div>
          <Button onClick={copyAsText} variant="ghost" size="sm" className="h-8 text-[9px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100">
            <Copy className="h-3 w-3 mr-1" /> Copy as Text
          </Button>
          <Button onClick={() => window.print()} variant="ghost" size="sm" className="h-8 text-[9px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100">
            <Printer className="h-3 w-3 mr-1" /> Print Manifest
          </Button>
         </div>
      </nav>

      <div className="flex-grow p-xl flex justify-center print:p-0 print:block">
        <div className={cn(
          "max-w-[850px] w-full bg-white min-h-[1100px] shadow-sm print:shadow-none p-xl print:p-0",
          data.template === 'minimal' ? 'font-sans' : 'font-serif'
        )}>
          {data.template === 'modern' ? (
            <div className="grid grid-cols-12 h-full gap-xl">
               {/* Modern Sidebar */}
               <aside className="col-span-4 p-lg -ml-xl -mt-xl -mb-xl print:-ml-0 print:-mt-0" style={{ backgroundColor: data.colorTheme, color: 'white' }}>
                  <div className="space-y-xl">
                    <header className="space-y-md">
                      <h1 className="text-4xl font-headline italic uppercase leading-none border-b border-white/20 pb-md">
                        {data.personalInfo.name || 'Manifest Identity'}
                      </h1>
                      <div className="space-y-sm text-sm font-bold uppercase tracking-widest opacity-80">
                        <p>{data.personalInfo.email}</p>
                        <p>{data.personalInfo.phone}</p>
                        <p>{data.personalInfo.location}</p>
                      </div>
                    </header>

                    {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
                      <section className="space-y-md">
                        <h2 className="text-xs font-bold uppercase tracking-[0.4em] border-b border-white/20 pb-xs">Skills</h2>
                        <div className="space-y-4">
                          {data.skills.technical.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {data.skills.technical.map(s => <span key={s} className="bg-white/10 px-2 py-1 rounded-none text-[10px] font-bold uppercase">{s}</span>)}
                            </div>
                          )}
                        </div>
                      </section>
                    )}

                    <section className="space-y-md">
                      <h2 className="text-xs font-bold uppercase tracking-[0.4em] border-b border-white/20 pb-xs">Artifacts</h2>
                      <div className="space-y-2 text-[10px] font-bold uppercase tracking-widest opacity-80">
                         {data.links.github && <p className="truncate">GH: {data.links.github}</p>}
                         {data.links.linkedin && <p className="truncate">LI: {data.links.linkedin}</p>}
                      </div>
                    </section>
                  </div>
               </aside>

               {/* Modern Main Content */}
               <main className="col-span-8 space-y-xl">
                  {data.summary && (
                    <section className="space-y-md">
                      <h2 className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: data.colorTheme }}>01. Strategic Summary</h2>
                      <p className="text-lg leading-relaxed italic font-medium">{data.summary}</p>
                    </section>
                  )}

                  {data.experience.length > 0 && (
                    <section className="space-y-md">
                      <h2 className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: data.colorTheme }}>02. Professional History</h2>
                      <div className="space-y-lg">
                        {data.experience.map((exp, i) => (
                          <div key={i} className="space-y-sm page-break-inside-avoid">
                            <div className="flex justify-between items-baseline">
                              <h3 className="text-2xl font-headline italic">{exp.company}</h3>
                              <span className="text-xs font-bold uppercase tracking-widest opacity-40">{exp.duration}</span>
                            </div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-60">{exp.role}</p>
                            <p className="text-md leading-relaxed opacity-80 whitespace-pre-wrap">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {data.projects.length > 0 && (
                    <section className="space-y-md">
                      <h2 className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: data.colorTheme }}>03. Strategic Artifacts</h2>
                      <div className="space-y-lg">
                        {data.projects.map((proj, i) => (
                          <div key={i} className="space-y-sm page-break-inside-avoid">
                            <div className="flex justify-between items-baseline">
                              <h3 className="text-2xl font-headline italic">{proj.title}</h3>
                            </div>
                            <p className="text-md leading-relaxed opacity-80 whitespace-pre-wrap italic">{proj.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
               </main>
            </div>
          ) : (
            <div className="space-y-xl">
              <header className={cn(
                "border-b-2 pb-xl",
                data.template === 'minimal' ? 'text-left border-[#111111]/10' : 'text-center border-[#111111]'
              )}>
                <div className="space-y-2">
                  <h1 className={cn(
                    "font-headline italic uppercase tracking-tighter leading-none",
                    data.template === 'minimal' ? 'text-4xl' : 'text-6xl'
                  )}>
                    {data.personalInfo.name || 'Manifest Identity'}
                  </h1>
                  <div className={cn(
                    "flex gap-md text-sm font-bold uppercase tracking-[0.2em] opacity-60 flex-wrap",
                    data.template === 'minimal' ? 'justify-start' : 'justify-center'
                  )}>
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
                  </div>
                </div>
              </header>

              <div className="space-y-xl">
                {data.summary && (
                  <section className="space-y-md">
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: data.colorTheme }}>01. Strategic Summary</h2>
                    <p className="text-lg leading-relaxed italic font-medium">{data.summary}</p>
                  </section>
                )}

                {data.experience.length > 0 && (
                  <section className="space-y-md">
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: data.colorTheme }}>02. Professional History</h2>
                    <div className="space-y-lg">
                      {data.experience.map((exp, i) => (
                        <div key={i} className="space-y-sm page-break-inside-avoid">
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-2xl font-headline italic">{exp.company}</h3>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-40">{exp.duration}</span>
                          </div>
                          <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-60">{exp.role}</p>
                          <p className="text-md leading-relaxed opacity-80 whitespace-pre-wrap">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {data.projects.length > 0 && (
                  <section className="space-y-md">
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: data.colorTheme }}>03. Strategic Artifacts</h2>
                    <div className="space-y-lg">
                      {data.projects.map((proj, i) => (
                        <div key={i} className="space-y-sm page-break-inside-avoid">
                          <h3 className="text-2xl font-headline italic">{proj.title}</h3>
                          <p className="text-md leading-relaxed opacity-80 whitespace-pre-wrap italic">{proj.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {proj.techStack.map(s => <span key={s} className="text-[10px] font-bold border border-[#111111]/10 px-1 uppercase tracking-tighter">{s}</span>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { background-color: white !important; -webkit-print-color-adjust: exact; }
          .page-break-inside-avoid { page-break-inside: avoid; }
          @page { margin: 1.5cm; }
          .print-hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}