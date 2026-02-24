'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useResumeData } from '@/hooks/use-resume-data';
import { calculateATSScore } from '@/lib/ats-engine';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Trash2, 
  Zap, 
  RotateCcw, 
  ChevronRight, 
  Target, 
  Sparkles,
  Info
} from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

export default function BuilderPage() {
  const { data, updateData, loadSampleData, resetData, isLoaded } = useResumeData();

  const { score, suggestions } = useMemo(() => calculateATSScore(data), [data]);

  if (!isLoaded) return null;

  const handlePersonalInfo = (key: string, value: string) => {
    updateData({ ...data, personalInfo: { ...data.personalInfo, [key]: value } });
  };

  const addItem = (category: 'education' | 'experience' | 'projects') => {
    const newItem = category === 'education' 
      ? { institution: '', degree: '', year: '', location: '' }
      : category === 'experience'
      ? { company: '', role: '', duration: '', description: '' }
      : { title: '', description: '', link: '' };
    
    updateData({ ...data, [category]: [...data[category], newItem] });
  };

  const removeItem = (category: 'education' | 'experience' | 'projects', index: number) => {
    const updated = [...data[category]];
    updated.splice(index, 1);
    updateData({ ...data, [category]: updated });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F3] text-[#111111] font-body">
      {/* Navigation */}
      <nav className="h-16 border-b border-[#111111]/10 px-xl flex items-center justify-between sticky top-0 bg-[#F7F6F3]/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-md">
          <Link href="/" className="font-headline text-xl font-bold tracking-widest uppercase">
            AI Resume Builder
          </Link>
        </div>
        <div className="flex items-center gap-lg">
          <Link href="/builder" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B0000]">Builder</Link>
          <Link href="/preview" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-colors">Preview</Link>
          <Link href="/proof" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-colors">Proof</Link>
        </div>
      </nav>

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-10 h-[calc(100vh-64px)] overflow-hidden">
        {/* Left: Form Workspace (60%) */}
        <div className="lg:col-span-6 overflow-y-auto p-xl space-y-xl bg-white/50 border-r border-[#111111]/5">
          <header className="space-y-xs">
            <h2 className="text-4xl font-headline italic">Strategic Input</h2>
            <p className="text-sm font-medium uppercase tracking-widest opacity-40">Define your professional architecture.</p>
          </header>

          <div className="flex gap-md pb-md border-b border-[#111111]/5">
            <Button onClick={loadSampleData} variant="outline" className="rounded-none border-[#111111]/10 text-[10px] font-bold uppercase tracking-widest">
              <Zap className="h-3 w-3 mr-2 text-[#8B0000]" />
              Load Sample Data
            </Button>
            <Button onClick={resetData} variant="ghost" className="rounded-none text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100">
              <RotateCcw className="h-3 w-3 mr-2" />
              Reset Manifest
            </Button>
          </div>

          {/* Sections */}
          <section className="space-y-xl">
            {/* Personal Info */}
            <div className="space-y-md">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B0000]">01. Personal Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-sm">
                  <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Full Name</Label>
                  <Input value={data.personalInfo.name} onChange={(e) => handlePersonalInfo('name', e.target.value)} className="rounded-none border-[#111111]/10 h-12 focus:ring-[#8B0000]" placeholder="Johnathan Doe" />
                </div>
                <div className="space-y-sm">
                  <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Email Address</Label>
                  <Input value={data.personalInfo.email} onChange={(e) => handlePersonalInfo('email', e.target.value)} className="rounded-none border-[#111111]/10 h-12 focus:ring-[#8B0000]" placeholder="j.doe@example.com" />
                </div>
                <div className="space-y-sm">
                  <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Phone Number</Label>
                  <Input value={data.personalInfo.phone} onChange={(e) => handlePersonalInfo('phone', e.target.value)} className="rounded-none border-[#111111]/10 h-12 focus:ring-[#8B0000]" placeholder="+44 20 7946 0958" />
                </div>
                <div className="space-y-sm">
                  <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Location</Label>
                  <Input value={data.personalInfo.location} onChange={(e) => handlePersonalInfo('location', e.target.value)} className="rounded-none border-[#111111]/10 h-12 focus:ring-[#8B0000]" placeholder="London, UK" />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-md">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B0000]">02. Strategic Summary</h3>
              <Textarea 
                value={data.summary} 
                onChange={(e) => updateData({ ...data, summary: e.target.value })} 
                className="min-h-[140px] rounded-none border-[#111111]/10 p-md italic leading-relaxed text-sm" 
                placeholder="A high-stakes professional overview of your career and unique value proposition..."
              />
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 italic">Word count: {data.summary.trim().split(/\s+/).filter(Boolean).length} (Target: 40-120)</p>
            </div>

            {/* Experience */}
            <div className="space-y-md">
              <div className="flex justify-between items-center border-b border-[#111111]/5 pb-xs">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B0000]">03. Professional History</h3>
                <Button onClick={() => addItem('experience')} variant="ghost" size="sm" className="h-8 text-[9px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100">
                  <Plus className="h-3 w-3 mr-1" /> Add Entry
                </Button>
              </div>
              <div className="space-y-md">
                {data.experience.map((exp, idx) => (
                  <Card key={idx} className="rounded-none border-[#111111]/5 bg-white/30 p-md relative group">
                    <Button onClick={() => removeItem('experience', idx)} variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 text-[#8B0000] hover:bg-transparent">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                    <div className="grid grid-cols-2 gap-md mb-md">
                      <Input value={exp.company} onChange={(e) => {
                        const next = [...data.experience];
                        next[idx].company = e.target.value;
                        updateData({ ...data, experience: next });
                      }} placeholder="Company" className="rounded-none border-transparent border-b-[#111111]/10 bg-transparent h-10 px-0" />
                      <Input value={exp.role} onChange={(e) => {
                        const next = [...data.experience];
                        next[idx].role = e.target.value;
                        updateData({ ...data, experience: next });
                      }} placeholder="Role" className="rounded-none border-transparent border-b-[#111111]/10 bg-transparent h-10 px-0" />
                    </div>
                    <Textarea value={exp.description} onChange={(e) => {
                      const next = [...data.experience];
                      next[idx].description = e.target.value;
                      updateData({ ...data, experience: next });
                    }} placeholder="Describe your structural impact and measurable achievements..." className="min-h-[100px] rounded-none border-transparent bg-transparent p-0 italic text-sm" />
                  </Card>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-md">
              <div className="flex justify-between items-center border-b border-[#111111]/5 pb-xs">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B0000]">04. Academic Background</h3>
                <Button onClick={() => addItem('education')} variant="ghost" size="sm" className="h-8 text-[9px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100">
                  <Plus className="h-3 w-3 mr-1" /> Add Entry
                </Button>
              </div>
              <div className="space-y-md">
                {data.education.map((edu, idx) => (
                  <Card key={idx} className="rounded-none border-[#111111]/5 bg-white/30 p-md relative group">
                    <Button onClick={() => removeItem('education', idx)} variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 text-[#8B0000] hover:bg-transparent">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                    <div className="grid grid-cols-2 gap-md">
                      <Input value={edu.institution} onChange={(e) => {
                        const next = [...data.education];
                        next[idx].institution = e.target.value;
                        updateData({ ...data, education: next });
                      }} placeholder="Institution" className="rounded-none border-transparent border-b-[#111111]/10 bg-transparent h-10 px-0" />
                      <Input value={edu.degree} onChange={(e) => {
                        const next = [...data.education];
                        next[idx].degree = e.target.value;
                        updateData({ ...data, education: next });
                      }} placeholder="Degree" className="rounded-none border-transparent border-b-[#111111]/10 bg-transparent h-10 px-0" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-md">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B0000]">05. Technical Domain</h3>
              <Input value={data.skills} onChange={(e) => updateData({ ...data, skills: e.target.value })} placeholder="React, TypeScript, Node.js, SQL, Distributed Systems..." className="rounded-none border-[#111111]/10 h-12 focus:ring-[#8B0000]" />
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 italic">Separate skills with commas for optimal parser detection.</p>
            </div>

            {/* Links */}
            <div className="space-y-md">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B0000]">06. Identity Verification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-sm">
                  <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">GitHub</Label>
                  <Input value={data.links.github} onChange={(e) => updateData({...data, links: {...data.links, github: e.target.value}})} className="rounded-none border-[#111111]/10 h-12 focus:ring-[#8B0000]" placeholder="github.com/username" />
                </div>
                <div className="space-y-sm">
                  <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">LinkedIn</Label>
                  <Input value={data.links.linkedin} onChange={(e) => updateData({...data, links: {...data.links, linkedin: e.target.value}})} className="rounded-none border-[#111111]/10 h-12 focus:ring-[#8B0000]" placeholder="linkedin.com/in/username" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Live Preview & Score Panel (40%) */}
        <div className="lg:col-span-4 bg-[#111111] p-xl flex flex-col overflow-hidden">
          {/* Score & Suggestions */}
          <div className="mb-xl space-y-md">
            <div className="flex justify-between items-end mb-xs">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">ATS Readiness Index</span>
              <span className={`text-2xl font-headline italic ${score >= 80 ? 'text-green-400' : 'text-white'}`}>{score}%</span>
            </div>
            <Progress value={score} className="h-1 bg-white/10 rounded-none [&>div]:bg-[#8B0000]" />
            
            {suggestions.length > 0 && (
              <div className="mt-md p-md bg-white/5 border border-white/10 space-y-sm">
                <div className="flex items-center gap-2 text-[#8B0000]">
                  <Sparkles className="h-3 w-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Structural Optimization</span>
                </div>
                <div className="space-y-2">
                  {suggestions.map((s, i) => (
                    <div key={i} className="flex gap-2 text-[11px] text-white/70 leading-relaxed italic">
                      <Target className="h-3 w-3 mt-0.5 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <header className="flex justify-between items-center mb-md border-b border-white/10 pb-md">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Real-time Manifest</span>
            <Button asChild variant="outline" size="sm" className="rounded-none border-white/20 text-white text-[9px] font-bold uppercase tracking-widest hover:bg-white/5">
              <Link href="/preview">Full Preview</Link>
            </Button>
          </header>

          <div className="flex-grow overflow-y-auto bg-white p-lg shadow-2xl space-y-md font-body text-[10px] leading-relaxed select-none pointer-events-none origin-top scale-95 lg:scale-100">
            {/* Live Resume Rendering */}
            <div className="text-center space-y-1 pb-md border-b-2 border-[#111111]">
              <h1 className="text-xl font-headline italic tracking-tight uppercase leading-none">{data.personalInfo.name || 'Your Name'}</h1>
              <div className="flex justify-center gap-2 uppercase tracking-widest opacity-60 flex-wrap">
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
              </div>
            </div>

            {data.summary && (
              <div className="space-y-1">
                <h4 className="font-bold uppercase tracking-[0.3em] text-[#8B0000] border-b border-[#111111]/10 pb-0.5">Summary</h4>
                <p className="italic font-medium">{data.summary}</p>
              </div>
            )}

            {data.experience.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold uppercase tracking-[0.3em] text-[#8B0000] border-b border-[#111111]/10 pb-0.5">Experience</h4>
                {data.experience.map((exp, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="flex justify-between font-bold">
                      <span className="text-sm font-headline italic">{exp.company}</span>
                      <span className="opacity-40">{exp.duration}</span>
                    </div>
                    <p className="font-bold uppercase tracking-widest opacity-70">{exp.role}</p>
                    <p className="opacity-80 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {data.education.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold uppercase tracking-[0.3em] text-[#8B0000] border-b border-[#111111]/10 pb-0.5">Education</h4>
                {data.education.map((edu, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="flex justify-between font-bold">
                      <span className="font-headline italic">{edu.institution}</span>
                      <span className="opacity-40">{edu.year}</span>
                    </div>
                    <p className="opacity-70">{edu.degree}</p>
                  </div>
                ))}
              </div>
            )}

            {data.skills && (
              <div className="space-y-1">
                <h4 className="font-bold uppercase tracking-[0.3em] text-[#8B0000] border-b border-[#111111]/10 pb-0.5">Skills</h4>
                <p className="font-bold uppercase tracking-widest leading-loose">{data.skills}</p>
              </div>
            )}

            {(data.links.github || data.links.linkedin) && (
              <div className="space-y-1">
                <h4 className="font-bold uppercase tracking-[0.3em] text-[#8B0000] border-b border-[#111111]/10 pb-0.5">Identities</h4>
                <div className="flex gap-4">
                  {data.links.github && <span>GitHub: {data.links.github}</span>}
                  {data.links.linkedin && <span>LinkedIn: {data.links.linkedin}</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
