'use client';

import React, { Suspense } from 'react';
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
  FileText
} from 'lucide-react';
import Link from 'next/link';

function ResultsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { getAnalysis, isLoaded } = useAnalysisHistory();

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

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
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
            <span className="text-2xl font-extrabold text-primary">{result.readinessScore}%</span>
          </div>
          <Progress value={result.readinessScore} className="w-32 h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Skills & Checklist */}
        <div className="lg:col-span-2 space-y-8">
          {/* Extracted Skills */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Key Skills Detected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {Object.entries(result.extractedSkills).map(([cat, skills]) => (
                  <div key={cat} className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{cat}</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(s => (
                        <Badge key={s} variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 transition-colors border-none">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Round-wise Checklist */}
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
                      <div key={i} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Interview Questions */}
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

        {/* Right Column: 7-Day Plan */}
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

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Original JD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
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
