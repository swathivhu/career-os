'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { analyzeJobDescription } from '@/lib/analysis-engine';
import { useAnalysisHistory } from '@/hooks/use-analysis-history';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AnalyzePage() {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { saveAnalysis } = useAnalysisHistory();
  const router = useRouter();

  const isJdTooShort = jdText.trim().length > 0 && jdText.trim().length < 200;

  const handleAnalyze = () => {
    if (!jdText.trim()) {
      toast({
        title: "Missing Requirement",
        description: "Please paste a job description to initiate analysis.",
        variant: "destructive"
      });
      return;
    }

    if (isJdTooShort) {
      toast({
        title: "JD Too Short",
        description: "This description is very brief. For a deep analysis, please include full requirements.",
      });
    }

    setIsAnalyzing(true);
    
    // Simulate engine processing
    setTimeout(() => {
      const result = analyzeJobDescription(company, role, jdText);
      saveAnalysis(result);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Your strategic roadmap has been generated."
      });
      router.push(`/dashboard/results?id=${result.id}`);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline italic text-foreground leading-tight">Job Analysis Engine</h1>
        <p className="text-muted-foreground font-medium">Manifest a preparation roadmap from any job description.</p>
      </div>

      <Card className="rounded-none border-border/50 shadow-sm bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 text-primary">
            <Sparkles className="h-4 w-4" />
            Strategic Input
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Target Company</Label>
              <Input 
                id="company" 
                placeholder="e.g. Amazon, Swiggy" 
                className="rounded-none h-12 border-border/60 focus:ring-primary"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Target Role</Label>
              <Input 
                id="role" 
                placeholder="e.g. SDE Intern" 
                className="rounded-none h-12 border-border/60 focus:ring-primary"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jd" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Job Description</Label>
            <Textarea 
              id="jd" 
              placeholder="Paste the full job description text here..." 
              className="min-h-[300px] rounded-none border-border/60 focus:ring-primary font-body text-sm leading-relaxed"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
            
            {isJdTooShort && (
              <Alert className="rounded-none border-amber-200 bg-amber-50/30 text-amber-800 py-3 mt-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-[10px] font-bold uppercase tracking-widest">Input Warning</AlertTitle>
                <AlertDescription className="text-xs italic font-medium">
                  This JD is too short to analyze deeply. Paste full JD for better output.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="pt-2 border-t border-border/10 flex flex-col gap-4">
             <Button 
              className="w-full h-14 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-[0.2em] transition-all disabled:opacity-50" 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !jdText.trim()}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Synthesizing Roadmap...
                </>
              ) : (
                'Generate Strategic Roadmap'
              )}
            </Button>
            <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest font-bold opacity-60">
              Heuristic engine will extract skills and map interview rounds.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}