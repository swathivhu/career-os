
'use client';

import React from 'react';
import Link from 'next/link';
import { useResumeData } from '@/hooks/use-resume-data';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Zap, RotateCcw, LayoutPanelLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

export default function BuilderPage() {
  const { data, updateData, loadSampleData, isLoaded } = useResumeData();

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
        {/* Left: Form Workspace (70%) */}
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
            <Button onClick={() => window.location.reload()} variant="ghost" className="rounded-none text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100">
              <RotateCcw className="h-3 w-3 mr-2" />
              Reset State
            </Button>
          </div>

          {/* Sections */}
          <section className="space-y-lg">
            {/* Personal Info */}
            <div className="space-y-md">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B0000]">01. Personal Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-sm">
                  <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Full Name</Label>
                  <Input value={data.personalInfo.name} onChange={(e) => handlePersonalInfo('name', e.target.value)} className="rounded-none border-[#111111]/10 h-12 focus:ring-[#8B0000]" placeholder="John Doe" />
                </div>
                <div className="space-y-sm">
                  <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Email Address</Label>
                  <Input value={data.personalInfo.email} onChange={(e) => handlePersonalInfo('email', e.target.value)} className="rounded-none border-[#111111]/10 h-12 focus:ring-[#8B0000]" placeholder="john@example.com" />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-md">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B0000]">02. Professional Summary</h3>
              <Textarea 
                value={data.summary} 
                onChange={(e) => updateData({ ...data, summary: e.target.value })} 
                className="min-h-[120px] rounded-none border-[#111111]/10 p-md italic leading-relaxed" 
                placeholder="A brief strategic overview of your career..."
              />
            </div>

            {/* Experience */}
            <div className="space-y-md">
              <div className="flex justify-between items-center border-b border-[#111111]/5 pb-xs">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B0000]">03. Professional History</h3>
                <Button onClick={() => addItem('experience')} variant="ghost" size="sm" className="h-8 text-[9px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100">
                  <Plus className="h-3 w-3 mr-1" /> Add Entry
                </Button>
              </div>
              {data.experience.map((exp, idx) => (
                <Card key={idx} className="rounded-none border-[#111111]/5 bg-white/30 p-md relative group">
                  <Button onClick={() => removeItem('experience', idx)} variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 text-[#8B0000]">
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
                  }} placeholder="Description of achievements..." className="min-h-[80px] rounded-none border-transparent bg-transparent p-0 italic text-sm" />
                </Card>
              ))}
            </div>

            {/* Skills */}
            <div className="space-y-md">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B0000]">04. Technical Capabilities</h3>
              <Input value={data.skills} onChange={(e) => updateData({ ...data, skills: e.target.value })} placeholder="React, Node.js, TypeScript..." className="rounded-none border-[#111111]/10 h-12 focus:ring-[#8B0000]" />
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 italic">Separate skills with commas for optimal processing.</p>
            </div>
          </section>
        </div>

        {/* Right: Live Preview Panel (30%) */}
        <div className="lg:col-span-4 bg-[#111111] p-xl flex flex-col overflow-hidden">
          <header className="flex justify-between items-center mb-xl border-b border-white/10 pb-md">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Real-time Manifest</span>
            <Button asChild variant="outline" size="sm" className="rounded-none border-white/20 text-white text-[9px] font-bold uppercase tracking-widest hover:bg-white/5">
              <Link href="/preview">Full Preview</Link>
            </Button>
          </header>

          <div className="flex-grow overflow-y-auto bg-white p-lg shadow-2xl space-y-md font-body text-[10px] leading-relaxed select-none pointer-events-none origin-top scale-95 lg:scale-100">
            <div className="text-center space-y-1 pb-md border-b border-[#111111]/10">
              <h1 className="text-xl font-headline italic tracking-tight uppercase">{data.personalInfo.name || 'Your Name'}</h1>
              <p className="uppercase tracking-widest opacity-60">
                {data.personalInfo.email && `${data.personalInfo.email} | `}
                {data.personalInfo.location || 'Location'}
              </p>
            </div>

            {data.summary && (
              <div className="space-y-1">
                <h4 className="font-bold uppercase tracking-widest border-b border-[#111111]/5 pb-0.5">Summary</h4>
                <p className="italic">{data.summary}</p>
              </div>
            )}

            {data.experience.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold uppercase tracking-widest border-b border-[#111111]/5 pb-0.5">Experience</h4>
                {data.experience.map((exp, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="flex justify-between font-bold">
                      <span>{exp.company}</span>
                      <span>{exp.duration}</span>
                    </div>
                    <p className="italic">{exp.role}</p>
                    <p className="opacity-70">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {data.skills && (
              <div className="space-y-1">
                <h4 className="font-bold uppercase tracking-widest border-b border-[#111111]/5 pb-0.5">Skills</h4>
                <p>{data.skills}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
