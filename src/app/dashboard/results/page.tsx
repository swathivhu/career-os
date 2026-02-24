'use client';

import React, { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAnalysisHistory } from '@/hooks/use-analysis-history';
import { 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  Target, 
  ArrowLeft,
  FileText,
  Copy,
  Download,
  Zap,
  BookOpen,
  Building2,
  GitPullRequest
} from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';

function ResultsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { getAnalysis, updateAnalysis, isLoaded } = useAnalysisHistory();

  const result = useMemo(() => (id && isLoaded ? getAnalysis(id) : null), [id, isLoaded, getAnalysis]);
  
  const confidenceMap = useMemo(() => result?.skillConfidenceMap || {}, [result]);

  const liveScore = useMemo(() => {
    if (!result) return 0;
    const skills = Object.values(result.extractedSkills).flat();
    let adjustment = 0;
    skills.forEach(skill => {
      if (confidenceMap[skill] === 'know') adjustment += 2;
    });
    return Math.max(0, Math.min(100, result.baseScore + adjustment));
  }, [result, confidenceMap]);

  if (!isLoaded) return null;

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-md border border-dashed border-border">
        <h2 className="text-2xl font-headline italic">Roadmap Not Found.</h2>
        <p className="text-sm font-medium uppercase tracking-widest opacity-60">The analysis manifest is missing or has been deleted.</p>
        <Button asChild className="rounded-none bg-foreground text-background uppercase tracking-widest font-bold h-12 mt-4">
          <Link href="/dashboard/analyze">Initiate New Analysis</Link>
        </Button>
      </div>
    );
  }

  const toggleSkillConfidence = (skill: string) => {
    const current = confidenceMap[skill] || 'practice';
    const next = current === 'know' ? 'practice' : 'know';
    
    // Calculate new final score based on updated map
    const newConfidenceMap = { ...confidenceMap, [skill]: next };
    const allSkills = Object.values(result.extractedSkills).flat();
    let adjustment = 0;
    allSkills.forEach(s => {
      if (newConfidenceMap[s] === 'know') adjustment += 2;
    });
    const newFinalScore = Math.max(0, Math.min(100, result.baseScore + adjustment));

    const updatedResult = {
      ...result,
      skillConfidenceMap: newConfidenceMap,
      finalScore: newFinalScore,
      updatedAt: new Date().toISOString()
    };
    
    updateAnalysis(updatedResult);
    
    toast({
      title: "Confidence Shifted",
      description: `Skill: ${skill} marked as ${next === 'know' ? 'Authenticated' : 'Needs Practice'}.`
    });
  };

  const copyText = (content: string, title: string) => {
    navigator.clipboard.writeText(content);
    toast({ title: `${title} Captured`, description: "Content copied to system clipboard." });
  };

  const downloadReport = () => {
    const content = `
KODNEST PREMIUM BUILD SYSTEM - STRATEGIC REPORT
==============================================
Position: ${result.role}
Target: ${result.company}
Generated: ${new Date(result.createdAt).toLocaleString()}
Latest Status: ${new Date(result.updatedAt).toLocaleString()}
Readiness Index: ${liveScore}%

INTERVIEW ARCHITECTURE
---------------------
${result.roundMapping.map((r, i) => `[Round ${i + 1}] ${r.roundTitle}\nFocus: ${r.focusAreas.join(', ')}\nContext: ${r.whyItMatters}`).join('\n\n')}

7-DAY STRATEGY
--------------
${result.plan7Days.map(d => `Day ${d.day}: ${d.focus}\n- ${d.tasks.join('\n- ')}`).join('\n\n')}

HIGH-PROBABILITY QUESTIONS
--------------------------
${result.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
    `.trim();

    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${result.company.replace(/\s+/g, '_')}_Manifest.txt`;
    document.body.appendChild(element);
    element.click();
    toast({ title: "Report Distributed", description: "Strategic manifest saved to disk." });
  };

  const weakSkills = Object.values(result.extractedSkills)
    .flat()
    .filter(s => confidenceMap[s] !== 'know')
    .slice(0, 3);

  return (
    <div className="space-y-lg animate-in fade-in duration-700 pb-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md border-b border-border/10 pb-md">
        <div className="space-y-xs">
          <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent text-primary mb-xs" asChild>
            <Link href="/dashboard/history" className="text-[10px] font-bold uppercase tracking-[0.3em]">
              <ArrowLeft className="h-3 w-3 mr-2" /> Return to History
            </Link>
          </Button>
          <h1 className="text-4xl font-headline italic leading-tight">Roadmap: {result.role} @ {result.company}</h1>
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground opacity-60 italic">Strategic preparation manifest delivered.</p>
        </div>
        <div className="bg-card border border-border/50 p-lg rounded-none flex items-center gap-xl min-w-[280px]">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-xs">Readiness Index</p>
            <span className="text-3xl font-headline italic text-primary">{liveScore}%</span>
          </div>
          <div className="flex-grow">
            <Progress value={liveScore} className="h-1 bg-muted rounded-none" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-sm">
        <Button variant="outline" size="sm" onClick={() => copyText(result.plan7Days.map(d => `Day ${d.day}: ${d.focus}`).join('\n'), "Plan")} className="rounded-none h-10 border-border text-[10px] font-bold uppercase tracking-widest">
          <Copy className="h-3.5 w-3.5 mr-2" /> Copy Strategy
        </Button>
        <Button variant="outline" size="sm" onClick={() => downloadReport()} className="rounded-none h-10 border-border text-[10px] font-bold uppercase tracking-widest">
          <Download className="h-3.5 w-3.5 mr-2" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        <div className="lg:col-span-2 space-y-xl">
          {/* Round Mapping Section */}
          <Card className="rounded-none border-border/50 shadow-sm">
            <CardHeader className="border-b border-border/10">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2 text-foreground">
                <GitPullRequest className="h-4 w-4 text-primary" />
                01. Interview Architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-lg space-y-lg relative">
              <div className="absolute left-10 top-20 bottom-20 w-[1px] bg-border hidden md:block" />
              {result.roundMapping.map((round, idx) => (
                <div key={idx} className="flex gap-lg relative group">
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-10 h-10 rounded-none bg-background border border-border/80 flex items-center justify-center text-primary font-bold z-10 text-xs italic">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-1 space-y-sm pb-md border-b border-border/10 last:border-0">
                    <h4 className="font-headline italic text-xl leading-tight">{round.roundTitle}</h4>
                    <div className="flex flex-wrap gap-2">
                      {round.focusAreas.map(f => (
                        <Badge key={f} variant="outline" className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground border-border/40 px-xs rounded-none">
                          {f}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground font-medium italic opacity-80 leading-relaxed">
                      {round.whyItMatters}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skill Matrix */}
          <Card className="rounded-none border-border/50 shadow-sm">
            <CardHeader className="border-b border-border/10">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2 text-foreground">
                <Target className="h-4 w-4 text-primary" />
                02. Skill Proficiency Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-lg">
              <div className="flex flex-wrap gap-lg">
                {Object.entries(result.extractedSkills).map(([cat, skills]) => {
                  if (skills.length === 0) return null;
                  return (
                    <div key={cat} className="space-y-sm min-w-[140px]">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">{cat}</p>
                      <div className="flex flex-col gap-xs">
                        {skills.map(s => {
                          const isKnown = confidenceMap[s] === 'know';
                          return (
                            <button
                              key={s}
                              onClick={() => toggleSkillConfidence(s)}
                              className={`flex items-center justify-between px-sm py-2 text-xs font-bold uppercase tracking-widest border transition-standard ${
                                isKnown 
                                ? 'bg-primary/5 border-primary text-primary' 
                                : 'bg-background border-border text-muted-foreground hover:border-primary/40'
                              }`}
                            >
                              <span className="truncate mr-2">{s}</span>
                              {isKnown && <CheckCircle2 className="h-3 w-3 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-muted-foreground mt-lg italic uppercase tracking-widest font-bold opacity-40">
                Tip: Authenticate skills to recalibrate readiness score.
              </p>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card className="rounded-none border-border/50 shadow-sm">
            <CardHeader className="border-b border-border/10">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2 text-foreground">
                <HelpCircle className="h-4 w-4 text-primary" />
                03. High-Probability Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-lg">
              <div className="space-y-md">
                {result.questions.map((q, idx) => (
                  <div key={idx} className="p-lg bg-muted/20 border-l border-primary/20 space-y-xs">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Question {String(idx + 1).padStart(2, '0')}</span>
                    <p className="text-sm font-medium leading-relaxed italic text-foreground/90">"{q}"</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-xl">
          {/* Plan */}
          <Card className="rounded-none border-none bg-foreground text-background">
            <CardHeader className="border-b border-background/10">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Strategic 7-Day Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-lg space-y-md">
              {result.plan7Days.map((day, idx) => (
                <div key={idx} className="flex gap-md">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-none bg-white/10 flex items-center justify-center text-[10px] font-bold border border-white/20">
                      {day.day}
                    </div>
                    {idx < result.plan7Days.length - 1 && <div className="w-[1px] h-full bg-white/10 my-1" />}
                  </div>
                  <div className="pb-4 space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">{day.focus}</p>
                    {day.tasks.map((task, tIdx) => (
                      <p key={tIdx} className="text-xs font-medium italic opacity-70 leading-relaxed">• {task}</p>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Box */}
          <Card className="rounded-none border-primary/30 bg-primary/[0.03]">
            <CardHeader className="pb-xs">
              <CardTitle className="text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 text-primary">
                <Zap className="h-3 w-3" />
                Next Strategic Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-lg">
              {weakSkills.length > 0 && (
                <div className="space-y-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Focus Areas (Weak):</p>
                  <div className="flex flex-wrap gap-xs">
                    {weakSkills.map(s => <Badge key={s} variant="outline" className="rounded-none text-[10px] font-bold border-border">{s}</Badge>)}
                  </div>
                </div>
              )}
              <div className="p-md bg-white border border-primary/20 flex items-center gap-md">
                <BookOpen className="h-5 w-5 text-primary" />
                <p className="text-xs font-bold uppercase tracking-widest leading-tight">Start Day 1 strategic plan immediately.</p>
              </div>
            </CardContent>
          </Card>

          {/* Source Text */}
          <Card className="rounded-none border-border/50 shadow-sm bg-muted/30">
            <CardHeader className="pb-xs">
              <CardTitle className="text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 text-muted-foreground">
                <FileText className="h-3 w-3" />
                Original JD Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[240px] overflow-y-auto pr-xs custom-scrollbar">
                <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed font-medium italic">
                  {result.jdText}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-[9px] font-bold uppercase tracking-widest text-center opacity-30 italic">
            Manifest ID: {result.id.substring(0, 8)} | Demo Mode Intelligence
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-xl italic opacity-50 uppercase tracking-widest text-xs">Accessing strategic data...</div>}>
      <ResultsContent />
    </Suspense>
  );
}