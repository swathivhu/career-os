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
import { Sparkles, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function AnalyzePage() {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { saveAnalysis } = useAnalysisHistory();
  const router = useRouter();

  const handleAnalyze = () => {
    if (!jdText.trim()) {
      toast({
        title: "Empty Job Description",
        description: "Please paste a job description to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate thinking time
    setTimeout(() => {
      const result = analyzeJobDescription(company, role, jdText);
      saveAnalysis(result);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Your personalized preparation plan is ready."
      });
      router.push(`/dashboard/results?id=${result.id}`);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Analysis</h1>
        <p className="text-muted-foreground">Paste a job description to generate a custom preparation roadmap.</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Analysis Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input 
                id="company" 
                placeholder="e.g. Google, Razorpay" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role / Position</Label>
              <Input 
                id="role" 
                placeholder="e.g. SDE Intern, Frontend Developer" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jd">Job Description</Label>
            <Textarea 
              id="jd" 
              placeholder="Paste the full job description here..." 
              className="min-h-[300px] leading-relaxed"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
            <p className="text-xs text-muted-foreground italic">
              Pro tip: Include tech stack and requirements for better skill extraction.
            </p>
          </div>

          <Button 
            className="w-full h-12 text-lg font-bold" 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Analyzing Skills...
              </>
            ) : (
              'Generate Roadmap'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
