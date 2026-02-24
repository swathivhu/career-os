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
  Layout, 
  Target, 
  ArrowLeft,
  FileText,
  Copy,
  Download,
  Zap,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';

function ResultsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { getAnalysis, updateAnalysis, isLoaded } = useAnalysisHistory();

  if (!isLoaded) return null;

  const result = id ? getAnalysis(id) : null;

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
        <h2 className="text-2xl font-bold">Plan Not Found</h2>
        <p className="text-muted-foreground">The analysis you are looking for does not exist or was deleted.</p>
        <Button asChild>
          <Link href="/dashboard/analyze">Analyze New JD</Link>
        </Button>
      </div>
    );
  }

  const confidenceMap = result.skillConfidenceMap || {};

  // Live score calculation
  const liveScore = useMemo(() => {
    const skills = Object.values(result.extractedSkills).flat();
    let adjustment = 0;
    skills.forEach(skill => {
      if (confidenceMap[skill] === 'know') adjustment += 2;
      else if (confidenceMap[skill] === 'practice') adjustment -= 2;
    });
    return Math.max(0, Math.min(100, result.readinessScore + adjustment));
  }, [result, confidenceMap]);

  const toggleSkillConfidence = (skill: string) => {
    const current = confidenceMap[skill] || 'practice';
    const next = current === 'know' ? 'practice' : 'know';
    
    const updatedResult = {
      ...result,
      skillConfidenceMap: {
        ...confidenceMap,
        [skill]: next
      }
    };
    updateAnalysis(updatedResult);
    
    toast({
      title: "Proficiency Updated",
      description: `Marked ${skill} as ${next === 'know' ? '"Known"' : '"Needs Practice"'}.`
    });
  };

  const copyToClipboard = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${title} Copied`,
      description: "Content has been copied to your clipboard."
    });
  };

  const downloadAsTxt = () => {
    const content = `
Strategic Roadmap for ${result.role} @ ${result.company}
Generated: ${new Date(result.createdAt).toLocaleDateString()}
Readiness Score: ${liveScore}%

7-DAY PLAN
${result.plan.map((day, i) => `Day ${i + 1}: ${day}`).join('\n')}

INTERVIEW ROUNDS CHECKLIST
${result.checklist.map(r => `\n${r.round}\n${r.items.map(item => `- ${item}`).join('\n')}`).join('\n')}

TOP 10 INTERVIEW QUESTIONS
${result.questions.map((q, i) => `${i + 1}. [${q.skill}] ${q.question}`).join('\n')}

JD SUMMARY
${result.jdText.substring(0, 500)}...
    `.trim();

    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${result.company.replace(/\s+/g, '_')}_Prep_Plan.txt`;
    document.body.appendChild(element);
    element.click();
    toast({ title: "Report Downloaded", description: "Your prep plan has been saved as a text file." });
  };

  const weakSkills = Object.values(result.extractedSkills)
    .flat()
    .filter(s => confidenceMap[s] !== 'know')
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent text-primary mb-2" asChild>
            <Link href="/dashboard/history">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to History
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Roadmap: {result.role}</h1>
          <p className="text-muted-foreground">Strategic preparation guide for {result.company}.</p>
        </div>
        <div className="bg-card border p-4 rounded-xl flex items-center gap-6">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Readiness</p>
            <span className="text-2xl font-extrabold text-primary">{liveScore}%</span>
          </div>
          <Progress value={liveScore} className="w-32 h-2" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.plan.join('\n'), "7-Day Plan")} className="gap-2">
          <Copy className="h-3.5 w-3.5" /> Copy Plan
        </Button>
        <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.questions.map(q => q.question).join('\n'), "Questions")} className="gap-2">
          <Copy className="h-3.5 w-3.5" /> Copy Questions
        </Button>
        <Button variant="outline" size="sm" onClick={downloadAsTxt} className="gap-2">
          <Download className="h-3.5 w-3.5" /> Download TXT
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Key Skills Detected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6">
                {Object.entries(result.extractedSkills).map(([cat, skills]) => (
                  <div key={cat} className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{cat}</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(s => {
                        const isKnown = confidenceMap[s] === 'know';
                        return (
                          <button
                            key={s}
                            onClick={() => toggleSkillConfidence(s)}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                              isKnown 
                              ? 'bg-primary/10 border-primary text-primary' 
                              : 'bg-muted border-transparent text-muted-foreground hover:border-primary/50'
                            }`}
                          >
                            {isKnown && <CheckCircle2 className="h-3 w-3" />}
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-4 italic">
                Tip: Click tags to toggle proficiency. Score updates automatically.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Layout className="h-5 w-5 text-primary" />
                Interview Rounds Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {result.checklist.map((round, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-bold text-foreground/90">{round.round}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {round.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg text-sm group cursor-default">
                        <CheckCircle2 className="h-4 w-4 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Likely Interview Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.questions.map((q, idx) => (
                  <div key={idx} className="p-4 bg-muted/20 rounded-xl border border-muted/50 space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{q.skill}</p>
                    <p className="text-sm font-medium leading-relaxed italic">"{q.question}"</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-sm bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Clock className="h-5 w-5" />
                7-Day Crash Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.plan.map((day, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs font-bold border border-primary-foreground/30">
                      {idx + 1}
                    </div>
                    {idx < result.plan.length - 1 && <div className="w-0.5 h-full bg-primary-foreground/20 my-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium leading-relaxed opacity-90">{day}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-muted/50">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Next Strategic Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weakSkills.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium">Focus on weak areas:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {weakSkills.map(s => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}
                  </div>
                </div>
              )}
              <div className="p-3 bg-white rounded-lg border border-primary/20 flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <p className="text-sm font-bold">Start Day 1 plan now.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Original JD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {result.jdText}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-12">Loading results...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
