'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useResumeData } from '@/hooks/use-resume-data';
import { calculateATSScore } from '@/lib/ats-engine';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Trash2, 
  Zap, 
  RotateCcw, 
  Target, 
  Sparkles,
  AlertCircle,
  CheckCircle2,
  X,
  Github,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function BuilderPage() {
  const { data, updateData, loadSampleData, resetData, isLoaded } = useResumeData();
  const [skillInputs, setSkillInputs] = useState({ technical: '', soft: '', tools: '' });

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
      : { id: crypto.randomUUID(), title: '', description: '', techStack: [], liveUrl: '', githubUrl: '' };
    
    updateData({ ...data, [category]: [...data[category], newItem] });
  };

  const removeItem = (category: 'education' | 'experience' | 'projects', index: number) => {
    const updated = [...data[category]];
    updated.splice(index, 1);
    updateData({ ...data, [category]: updated });
  };

  const addSkill = (category: keyof typeof data.skills, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInputs[category].trim()) {
      e.preventDefault();
      const skill = skillInputs[category].trim();
      if (!data.skills[category].includes(skill)) {
        updateData({
          ...data,
          skills: {
            ...data.skills,
            [category]: [...data.skills[category], skill]
          }
        });
      }
      setSkillInputs({ ...skillInputs, [category]: '' });
    }
  };

  const removeSkill = (category: keyof typeof data.skills, skill: string) => {
    updateData({
      ...data,
      skills: {
        ...data.skills,
        [category]: data.skills[category].filter(s => s !== skill)
      }
    });
  };

  const suggestSkills = () => {
    setTimeout(() => {
      updateData({
        ...data,
        skills: {
          technical: Array.from(new Set([...data.skills.technical, "TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"])),
          soft: Array.from(new Set([...data.skills.soft, "Team Leadership", "Problem Solving"])),
          tools: Array.from(new Set([...data.skills.tools, "Git", "Docker", "AWS"]))
        }
      });
    }, 1000);
  };

  const ACTION_VERBS = ['Built', 'Developed', 'Designed', 'Implemented', 'Led', 'Improved', 'Created', 'Optimized', 'Automated'];
  const NUMERIC_REGEX = /[0-9%kKxX+]/;

  const getBulletGuidance = (text: string) => {
    const firstWord = text.trim().split(/\s+/)[0];
    const hasVerb = ACTION_VERBS.some(v => v.toLowerCase() === firstWord?.toLowerCase());
    const hasNumbers = NUMERIC_REGEX.test(text);
    
    const issues = [];
    if (text.length > 0) {
      if (!hasVerb) issues.push("Start with a strong action verb.");
      if (!hasNumbers) issues.push("Add measurable impact (numbers).");
    }
    return issues;
  };

  const addProjectSkill = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = e.currentTarget;
      const val = input.value.trim();
      if (val) {
        const next = [...data.projects];
        if (!next[index].techStack.includes(val)) {
          next[index].techStack.push(val);
          updateData({ ...data, projects: next });
        }
        input.value = '';
      }
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F3] text-[#111111] font-body">
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
        <div className="lg:col-span-6 overflow-y-auto p-xl space-y-xl bg-white/50 border-r border-[#111111]/5">
          <header className="space-y-xs">
            <h2 className="text-4xl font-headline italic">Strategic Input</h2>
            <p className="text-sm font-medium uppercase tracking-widest opacity-40">Define your professional architecture.</p>
          </header>

          <div className="flex gap-md pb-md border-b border-[#111111]/5">
            <Button onClick={loadSampleData} variant="outline" className="rounded-none border-[#111111]/10 text-[10px] font-bold uppercase tracking-widest h-10 px-4">
              <Zap className="h-3 w-3 mr-2 text-[#8B0000]" />
              Load Sample Data
            </Button>
            <Button onClick={resetData} variant="ghost" className="rounded-none text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 h-10 px-4">
              <RotateCcw className="h-3 w-3 mr-2" />
              Reset Manifest
            </Button>
          </div>

          <section className="space-y-xl pb-xl">
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

            <div className="space-y-md">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B0000]">02. Strategic Summary</h3>
              <Textarea 
                value={data.summary} 
                onChange={(e) => updateData({ ...data, summary: e.target.value })} 
                className="min-h-[140px] rounded-none border-[#111111]/10 p-md italic leading-relaxed text-sm" 
                placeholder="A high-stakes professional overview of your career and unique value proposition..."
              />
            </div>

            <div className="space-y-md">
              <div className="flex justify-between items-center border-b border-[#111111]/5 pb-xs">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B0000]">03. Professional History</h3>
                <Button onClick={() => addItem('experience')} variant="ghost" size="sm" className="h-8 text-[9px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100">
                  <Plus className="h-3 w-3 mr-1" /> Add Entry
                </Button>
              </div>
              <div className="space-y-md">
                {data.experience.map((exp, idx) => {
                  const guidance = getBulletGuidance(exp.description);
                  return (
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
                      }} placeholder="Describe your structural impact..." className="min-h-[100px] rounded-none border-transparent bg-transparent p-0 italic text-sm" />
                      {guidance.map((g, i) => (
                        <p key={i} className="text-[9px] font-bold uppercase tracking-widest text-[#8B0000]/60 italic flex items-center gap-1 mt-1">
                          <AlertCircle className="h-2 w-2" /> {g}
                        </p>
                      ))}
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="space-y-md">
              <div className="flex justify-between items-center border-b border-[#111111]/5 pb-xs">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B0000]">04. Technical Domain</h3>
                <Button onClick={suggestSkills} variant="ghost" size="sm" className="h-8 text-[9px] font-bold uppercase tracking-widest text-[#8B0000]">
                  <Sparkles className="h-3 w-3 mr-1" /> Suggest Skills
                </Button>
              </div>
              <div className="space-y-lg">
                {(['technical', 'soft', 'tools'] as const).map((cat) => (
                  <div key={cat} className="space-y-sm">
                    <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                      {cat === 'technical' ? 'Technical Skills' : cat === 'soft' ? 'Soft Skills' : 'Tools & Technologies'} ({data.skills[cat].length})
                    </Label>
                    <div className="flex flex-wrap gap-2 p-2 border border-[#111111]/10 bg-white min-h-[48px]">
                      {data.skills[cat].map((skill) => (
                        <Badge key={skill} variant="secondary" className="rounded-none px-2 py-1 bg-[#111111]/5 text-[#111111] border-none flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest">
                          {skill}
                          <button onClick={() => removeSkill(cat, skill)} className="hover:text-[#8B0000]"><X className="h-3 w-3" /></button>
                        </Badge>
                      ))}
                      <input
                        value={skillInputs[cat]}
                        onChange={(e) => setSkillInputs({ ...skillInputs, [cat]: e.target.value })}
                        onKeyDown={(e) => addSkill(cat, e)}
                        placeholder="Add skill..."
                        className="flex-grow bg-transparent border-none focus:ring-0 text-sm italic h-8"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-md">
              <div className="flex justify-between items-center border-b border-[#111111]/5 pb-xs">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B0000]">05. Strategic Artifacts</h3>
                <Button onClick={() => addItem('projects')} variant="ghost" size="sm" className="h-8 text-[9px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100">
                  <Plus className="h-3 w-3 mr-1" /> Add Project
                </Button>
              </div>
              <Accordion type="multiple" className="w-full space-y-md">
                {data.projects.map((proj, idx) => (
                  <AccordionItem key={proj.id} value={proj.id} className="border border-[#111111]/5 bg-white/30 px-md">
                    <AccordionTrigger className="hover:no-underline py-md">
                      <div className="flex justify-between items-center w-full text-left">
                        <span className="font-headline italic text-lg">{proj.title || `Artifact 0${idx + 1}`}</span>
                        <Button onClick={(e) => { e.stopPropagation(); removeItem('projects', idx); }} variant="ghost" size="icon" className="h-6 w-6 text-[#8B0000] opacity-40 hover:opacity-100">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-md pb-md">
                      <div className="space-y-sm">
                        <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Project Title</Label>
                        <Input value={proj.title} onChange={(e) => {
                          const next = [...data.projects];
                          next[idx].title = e.target.value;
                          updateData({ ...data, projects: next });
                        }} className="rounded-none border-[#111111]/10 h-10" />
                      </div>
                      <div className="space-y-sm">
                        <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Description ({proj.description.length}/200)</Label>
                        <Textarea 
                          value={proj.description} 
                          maxLength={200}
                          onChange={(e) => {
                            const next = [...data.projects];
                            next[idx].description = e.target.value;
                            updateData({ ...data, projects: next });
                          }} 
                          className="min-h-[80px] rounded-none border-[#111111]/10 italic text-sm" 
                        />
                      </div>
                      <div className="space-y-sm">
                        <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Tech Stack (Enter to add)</Label>
                        <div className="flex flex-wrap gap-2 p-2 border border-[#111111]/10 bg-white">
                          {proj.techStack.map((s) => (
                            <Badge key={s} variant="outline" className="rounded-none text-[9px] uppercase font-bold tracking-widest py-1">
                              {s}
                              <button onClick={() => {
                                const next = [...data.projects];
                                next[idx].techStack = next[idx].techStack.filter(item => item !== s);
                                updateData({ ...data, projects: next });
                              }} className="ml-1"><X className="h-2 w-2" /></button>
                            </Badge>
                          ))}
                          <input onKeyDown={(e) => addProjectSkill(idx, e)} className="flex-grow bg-transparent border-none focus:ring-0 text-xs italic" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-md">
                        <div className="space-y-sm">
                          <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Live URL</Label>
                          <Input value={proj.liveUrl} onChange={(e) => {
                            const next = [...data.projects];
                            next[idx].liveUrl = e.target.value;
                            updateData({ ...data, projects: next });
                          }} className="rounded-none border-[#111111]/10 h-10" />
                        </div>
                        <div className="space-y-sm">
                          <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">GitHub URL</Label>
                          <Input value={proj.githubUrl} onChange={(e) => {
                            const next = [...data.projects];
                            next[idx].githubUrl = e.target.value;
                            updateData({ ...data, projects: next });
                          }} className="rounded-none border-[#111111]/10 h-10" />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="space-y-md">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B0000]">06. Academic Background</h3>
              {data.education.map((edu, idx) => (
                <Card key={idx} className="rounded-none border-[#111111]/5 bg-white/30 p-md relative group">
                  <Button onClick={() => removeItem('education', idx)} variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 text-[#8B0000]">
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
          </section>
        </div>

        <div className="lg:col-span-4 bg-[#111111] p-xl flex flex-col overflow-hidden">
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
                {suggestions.map((s, i) => (
                  <div key={i} className="flex gap-2 text-[11px] text-white/70 leading-relaxed italic">
                    <Target className="h-3 w-3 mt-0.5 shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex-grow overflow-y-auto bg-white p-lg shadow-2xl space-y-md font-body text-[10px] leading-relaxed select-none pointer-events-none origin-top scale-95 lg:scale-100">
            <div className={`space-y-md ${data.template === 'minimal' ? 'text-left' : 'text-center'}`}>
              <div className={`pb-md border-b-2 border-[#111111] ${data.template === 'modern' ? 'flex justify-between items-end text-left' : 'space-y-1'}`}>
                <h1 className={`${data.template === 'modern' ? 'text-2xl' : 'text-xl'} font-headline italic tracking-tight uppercase leading-none`}>
                  {data.personalInfo.name || 'Your Name'}
                </h1>
                <div className="flex gap-2 text-[8px] uppercase tracking-widest opacity-60">
                  <span>{data.personalInfo.email}</span>
                  <span>•</span>
                  <span>{data.personalInfo.location}</span>
                </div>
              </div>
            </div>

            {data.summary && (
              <div className="space-y-1">
                <h4 className="font-bold uppercase tracking-[0.3em] text-[#8B0000] border-b border-[#111111]/10 pb-0.5">Summary</h4>
                <p className="italic font-medium">{data.summary}</p>
              </div>
            )}

            {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0) && (
              <div className="space-y-2">
                <h4 className="font-bold uppercase tracking-[0.3em] text-[#8B0000] border-b border-[#111111]/10 pb-0.5">Domain Proficiency</h4>
                {data.skills.technical.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="font-bold uppercase tracking-widest opacity-40 mr-1">Tech:</span>
                    {data.skills.technical.map(s => <span key={s} className="bg-[#111111]/5 px-1 font-bold">{s}</span>)}
                  </div>
                )}
                {data.skills.soft.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="font-bold uppercase tracking-widest opacity-40 mr-1">Soft:</span>
                    {data.skills.soft.map(s => <span key={s} className="bg-[#111111]/5 px-1 font-bold">{s}</span>)}
                  </div>
                )}
              </div>
            )}

            {data.projects.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold uppercase tracking-[0.3em] text-[#8B0000] border-b border-[#111111]/10 pb-0.5">Strategic Artifacts</h4>
                {data.projects.map((proj, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-headline italic text-sm">{proj.title}</span>
                      <div className="flex gap-2">
                        {proj.githubUrl && <Github className="h-3 w-3 opacity-40" />}
                        {proj.liveUrl && <ExternalLink className="h-3 w-3 opacity-40" />}
                      </div>
                    </div>
                    <p className="opacity-70 italic">{proj.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.map(s => <span key={s} className="text-[8px] font-bold border border-[#111111]/10 px-1 uppercase tracking-tighter">{s}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
