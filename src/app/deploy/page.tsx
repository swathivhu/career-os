
'use client';

import React from 'react';
import { useCareerOS } from '@/hooks/use-career-os';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CareerOSTopBar } from '@/components/layout/CareerOSTopBar';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Rocket, 
  AlertCircle, 
  Target, 
  Link as LinkIcon,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DeploymentHubPage() {
  const { osState, isLoaded } = useCareerOS();

  if (!isLoaded) return null;

  const requirements = [
    { label: 'Placement Readiness (10/10)', status: osState.prpChecklistComplete, value: `${Math.round(osState.prpScore)}%` },
    { label: 'Resume ATS Score (>= 70)', status: osState.resumeATSScore >= 70, value: `${osState.resumeATSScore}` },
    { label: 'Proof Links Provided', status: osState.proofLinksProvided, value: osState.proofLinksProvided ? 'Verified' : 'Pending' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F3] text-[#111111] font-body pb-xl">
      <CareerOSTopBar />
      
      <header className="pt-xl pb-lg px-xl border-b border-[#111111]/5 bg-white/30">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-5xl font-headline italic leading-tight mb-xs">Deployment Hub</h1>
          <p className="text-lg text-[#111111]/60 max-w-[720px] font-medium leading-relaxed italic">
            Final verification and production release manifest. A unified command center for your professional artifacts.
          </p>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto w-full px-xl py-xl grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <div className="lg:col-span-8 space-y-xl">
          {/* Main Status Panel */}
          <Card className={cn(
            "rounded-none border-2 transition-all duration-700",
            osState.deploymentVerified ? "border-[#8B0000]/20 bg-[#8B0000]/5" : "border-[#111111]/10 bg-white"
          )}>
            <CardContent className="p-xl flex flex-col md:flex-row items-center justify-between gap-xl">
              <div className="space-y-md text-center md:text-left">
                <div className="space-y-xs">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Career OS Manifest</span>
                  <h2 className="text-4xl font-headline italic leading-none">
                    {osState.deploymentVerified ? 'SHIPPED SUCCESSFULLY' : 'IN PROGRESS'}
                  </h2>
                </div>
                {osState.deploymentVerified ? (
                  <p className="text-xl text-[#111111] font-medium italic opacity-90 leading-relaxed max-w-lg">
                    "You built a complete career operating system. Not separate tools. A unified system. This is your proof of work."
                  </p>
                ) : (
                  <p className="text-sm text-[#8B0000] font-bold uppercase tracking-widest italic flex items-center gap-2 justify-center md:justify-start">
                    <AlertCircle className="h-4 w-4" />
                    Pending strategic requirements for final release.
                  </p>
                )}
              </div>
              <div className="relative h-40 w-40 flex items-center justify-center">
                <div className={cn(
                  "absolute inset-0 rounded-full border-4 border-[#111111]/5",
                  osState.deploymentVerified && "border-[#8B0000]/20"
                )} />
                {osState.deploymentVerified ? (
                  <CheckCircle2 className="h-20 w-20 text-green-600 animate-in zoom-in duration-500" />
                ) : (
                  <Rocket className="h-16 w-16 text-[#111111]/20 animate-pulse" />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Verification Matrix */}
          <div className="space-y-md">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 border-b border-[#111111]/10 pb-xs flex items-center gap-2">
              <ShieldCheck className="h-3 w-3" />
              Strategic Verification Matrix
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              {requirements.map((req, i) => (
                <Card key={i} className="rounded-none border-[#111111]/5 bg-white p-lg shadow-sm">
                  <div className="space-y-sm">
                    <div className="flex justify-between items-start">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{req.label}</p>
                      {req.status ? <CheckCircle2 className="h-3.5 w-3.5 text-green-600" /> : <div className="h-3.5 w-3.5 rounded-full border border-dashed border-[#111111]/20" />}
                    </div>
                    <p className="text-2xl font-headline italic">{req.value}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Module Snapshots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
            <Card className="rounded-none border-[#111111]/5 bg-white shadow-sm">
              <CardHeader className="border-b border-[#111111]/5">
                <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#8B0000]" />
                  Placement Readiness
                </CardTitle>
              </CardHeader>
              <CardContent className="p-lg space-y-md">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span>Checklist Progress</span>
                    <span>{Math.round(osState.prpScore)}%</span>
                  </div>
                  <Progress value={osState.prpScore} className="h-1 bg-[#111111]/5 rounded-none" />
                </div>
                <p className="text-xs italic opacity-60 leading-relaxed">
                  Deterministic analysis engine status for job description extraction and round mapping.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-none border-[#111111]/5 bg-white shadow-sm">
              <CardHeader className="border-b border-[#111111]/5">
                <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#8B0000]" />
                  Resume Integrity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-lg space-y-md">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span>ATS Readiness Index</span>
                    <span>{osState.resumeATSScore}%</span>
                  </div>
                  <Progress value={osState.resumeATSScore} className="h-1 bg-[#111111]/5 rounded-none" />
                </div>
                <p className="text-xs italic opacity-60 leading-relaxed">
                  Structural scoring benchmarks for professional branding and action-verb alignment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-xl">
          <Card className="rounded-none border-none bg-[#111111] text-white p-lg space-y-md sticky top-24">
            <div className="space-y-xs">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">System Integrity</span>
              <h3 className="text-xl font-headline italic">Command Matrix</h3>
            </div>
            <div className="space-y-md pt-md border-t border-white/10">
              <div className="flex items-center gap-3">
                <LinkIcon className={cn("h-4 w-4", osState.proofLinksProvided ? "text-green-400" : "opacity-40")} />
                <p className="text-[10px] font-bold uppercase tracking-widest">Artifact Links: {osState.proofLinksProvided ? 'Verified' : 'Pending'}</p>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className={cn("h-4 w-4", osState.deploymentVerified ? "text-green-400" : "opacity-40")} />
                <p className="text-[10px] font-bold uppercase tracking-widest">Logic Integrity: Verified</p>
              </div>
              <div className="flex items-center gap-3">
                <Rocket className={cn("h-4 w-4", osState.deploymentVerified ? "text-green-400" : "opacity-40")} />
                <p className="text-[10px] font-bold uppercase tracking-widest">Production Lock: {osState.deploymentVerified ? 'Unlocked' : 'Locked'}</p>
              </div>
            </div>
            {!osState.deploymentVerified && (
              <div className="p-md bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest italic opacity-60 leading-relaxed">
                * Complete all strategic modules to unlock final deployment manifest.
              </div>
            )}
          </Card>
        </aside>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#111111]/10 z-50 px-xl flex items-center justify-between">
        <div className="flex items-center gap-lg">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Career OS v1.0</span>
          <div className="h-1.5 w-48 bg-[#111111]/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#8B0000] transition-all duration-700" 
              style={{ width: `${(requirements.filter(r => r.status).length / 3) * 100}%` }}
            />
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 italic">
          Deterministic Professional Infrastructure
        </span>
      </footer>
    </div>
  );
}
