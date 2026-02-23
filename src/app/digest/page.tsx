"use client";

import { TopBar } from "@/components/layout/TopBar";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { JOBS_DATA, Job } from "@/lib/jobs-data";
import { useSettings } from "@/hooks/use-settings";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { 
  MailOpen, 
  Copy, 
  Mail, 
  RefreshCcw, 
  ArrowRight,
  ExternalLink,
  Lock,
  Zap
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ScoredJob extends Job {
  matchScore: number;
}

export default function DigestPage() {
  const { settings, hasPreferences, isLoaded } = useSettings();
  const [digest, setDigest] = useState<ScoredJob[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const today = format(new Date(), "yyyy-MM-dd");
  const digestKey = `jobTrackerDigest_${today}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(digestKey);
      if (stored) {
        setDigest(JSON.parse(stored));
      }
    }
  }, [digestKey]);

  const generateDigest = () => {
    if (!settings) return;
    setIsGenerating(true);

    setTimeout(() => {
      const scoredJobs: ScoredJob[] = JOBS_DATA.map(job => {
        let score = 0;
        
        // Keyword Matching (Title/Description)
        const keywords = settings.keywords.toLowerCase().split(",").map(k => k.trim());
        keywords.forEach(kw => {
          if (kw && (job.title.toLowerCase().includes(kw) || job.description.toLowerCase().includes(kw))) {
            score += 30;
          }
        });

        // Location Matching
        if (settings.location.toLowerCase() && job.location.toLowerCase().includes(settings.location.toLowerCase())) {
          score += 20;
        }

        // Mode Matching
        if (job.mode.toLowerCase() === settings.mode.toLowerCase()) {
          score += 20;
        }

        // Experience Level Match (Simplified mapping)
        const expMap: Record<string, string[]> = {
          'fresher': ['Fresher', '0-1'],
          'mid': ['1-3', '3-5'],
          'senior': ['3-5'],
        };
        if (expMap[settings.experience]?.includes(job.experience)) {
          score += 30;
        }

        return { ...job, matchScore: score };
      });

      // Sort by score (desc) then days ago (asc)
      const topJobs = scoredJobs
        .sort((a, b) => b.matchScore - a.matchScore || a.postedDaysAgo - b.postedDaysAgo)
        .slice(0, 10);

      setDigest(topJobs);
      localStorage.setItem(digestKey, JSON.stringify(topJobs));
      setIsGenerating(false);
      toast({
        title: "Digest Generated",
        description: "Your personalized 9AM digest is ready.",
      });
    }, 1500);
  };

  const copyToClipboard = () => {
    if (!digest) return;
    const text = digest.map((j, i) => `${i + 1}. ${j.title} @ ${j.company} (${j.matchScore}% Match)`).join("\n");
    navigator.clipboard.writeText(`Job Digest for ${format(new Date(), "MMMM do, yyyy")}\n\n${text}`);
    toast({ title: "Copied to Clipboard" });
  };

  const createEmailDraft = () => {
    if (!digest) return;
    const subject = encodeURIComponent(`My 9AM Job Digest - ${format(new Date(), "PP")}`);
    const body = encodeURIComponent(
      `Top 10 Opportunities for today:\n\n` + 
      digest.map(j => `- ${j.title} at ${j.company} (${j.matchScore}% Match)\n  Apply: ${j.applyUrl}`).join("\n\n")
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background pb-xl">
      <TopBar />
      <ContextHeader 
        title="Daily Digest" 
        subtitle="Aggregated summaries of the most relevant professional openings."
      />

      <main className="flex-grow w-full max-w-[1400px] mx-auto px-xl py-lg">
        {!hasPreferences ? (
          <div className="flex flex-col items-center justify-center py-xl space-y-md border border-dashed border-border opacity-60">
            <Lock className="h-10 w-10 text-muted-foreground" />
            <div className="text-center space-y-xs">
              <h2 className="text-2xl font-headline italic">Preferences Required</h2>
              <p className="text-sm font-medium uppercase tracking-[0.2em] max-w-sm mx-auto">
                Set discovery parameters to generate a personalized digest.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-none border-primary text-primary hover:bg-primary/5 uppercase tracking-widest font-bold">
              <a href="/settings">Configure Preferences</a>
            </Button>
          </div>
        ) : !digest ? (
          <div className="flex flex-col items-center justify-center py-xl space-y-md border border-dashed border-border">
            <div className="p-lg bg-card rounded-full border border-border/50">
              <MailOpen className="h-12 w-12 text-muted-foreground opacity-30" />
            </div>
            <div className="text-center space-y-xs">
              <h2 className="text-2xl font-headline italic">Next Delivery @ 09:00 AM</h2>
              <p className="text-sm font-medium uppercase tracking-[0.2em] opacity-50">
                Your daily automated digest is awaiting initialization.
              </p>
            </div>
            <Button 
              onClick={generateDigest}
              disabled={isGenerating}
              className="rounded-none h-14 px-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-[0.2em] transition-standard"
            >
              {isGenerating ? <RefreshCcw className="h-5 w-5 animate-spin mr-2" /> : <Zap className="h-5 w-5 mr-2" />}
              {isGenerating ? "Synthesizing..." : "Generate Today's Digest"}
            </Button>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold italic">
              Demo Mode: Daily 9AM trigger simulated manually.
            </p>
          </div>
        ) : (
          <div className="max-w-[800px] mx-auto space-y-lg">
            <div className="flex justify-between items-end border-b border-border/30 pb-md">
              <div className="space-y-xs">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Locked & Delivered</span>
                <h2 className="text-3xl font-headline italic">Top 10 Jobs For You</h2>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Cycle Manifested: {format(new Date(), "MMMM do, yyyy")} @ 09:00 AM
                </p>
              </div>
              <div className="flex gap-xs">
                <Button variant="outline" size="sm" onClick={copyToClipboard} className="rounded-none h-10 border-border hover:bg-accent/5 font-bold uppercase tracking-widest text-[10px]">
                  <Copy className="h-3.5 w-3.5 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={createEmailDraft} className="rounded-none h-10 border-border hover:bg-accent/5 font-bold uppercase tracking-widest text-[10px]">
                  <Mail className="h-3.5 w-3.5 mr-2" />
                  Email
                </Button>
              </div>
            </div>

            <div className="bg-card border border-border/50 p-xl shadow-sm space-y-lg">
              <div className="space-y-sm">
                {digest.map((job, idx) => (
                  <div key={job.id} className="group border-b border-border/10 last:border-0 pb-md last:pb-0 pt-md first:pt-0">
                    <div className="flex justify-between items-start gap-md">
                      <div className="space-y-1 flex-grow">
                        <div className="flex items-center gap-sm">
                          <span className="text-xs font-bold text-primary opacity-40 font-code">{String(idx + 1).padStart(2, '0')}</span>
                          <h3 className="text-xl font-headline group-hover:text-primary transition-standard leading-tight">
                            {job.title}
                          </h3>
                        </div>
                        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-8">
                          {job.company} — {job.location} ({job.mode})
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-xs font-bold text-primary uppercase tracking-widest">{job.matchScore}% Match</div>
                        <Button asChild variant="link" size="sm" className="h-auto p-0 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
                          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                            Apply <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-md border-t border-border/20 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>Digest ID: JD-{today.replace(/-/g, '')}</span>
                <span className="italic">This digest was generated based on your preferences.</span>
              </div>
            </div>

            <div className="flex justify-center pt-md">
              <Button 
                variant="ghost" 
                onClick={() => {
                  localStorage.removeItem(digestKey);
                  setDigest(null);
                }}
                className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary h-auto"
              >
                <RefreshCcw className="h-3 w-3 mr-2" />
                Reset Daily Cache (Dev Mode)
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
