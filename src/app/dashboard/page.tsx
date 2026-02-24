"use client";

import { useState, useMemo } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { ProofFooter } from "@/components/layout/ProofFooter";
import { SecondaryPanel } from "@/components/layout/SecondaryPanel";
import { JOBS_DATA, Job } from "@/lib/jobs-data";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilterBar } from "@/components/jobs/JobFilterBar";
import { JobDetailsModal } from "@/components/jobs/JobDetailsModal";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { useJobStatus } from "@/hooks/use-job-status";
import { useSettings } from "@/hooks/use-settings";
import { Ghost } from "lucide-react";

export default function DashboardPage() {
  const { settings } = useSettings();
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    mode: "",
    experience: "",
    source: "",
    status: "",
    matchesOnly: false,
  });

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { savedIds, toggleSave } = useSavedJobs();
  const { statuses } = useJobStatus();

  const scoredJobs = useMemo(() => {
    return JOBS_DATA.map(job => {
      if (!settings) return { ...job, matchScore: 0 };
      
      let score = 0;
      const keywords = settings.keywords.toLowerCase().split(",").map(k => k.trim());
      keywords.forEach(kw => {
        if (kw && (job.title.toLowerCase().includes(kw) || job.description.toLowerCase().includes(kw))) {
          score += 30;
        }
      });
      if (settings.location && job.location.toLowerCase().includes(settings.location.toLowerCase())) {
        score += 20;
      }
      if (job.mode.toLowerCase() === settings.mode.toLowerCase()) {
        score += 20;
      }
      const expMap: Record<string, string[]> = {
        'fresher': ['Fresher', '0-1'],
        'mid': ['1-3', '3-5'],
        'senior': ['3-5'],
      };
      if (expMap[settings.experience]?.includes(job.experience)) {
        score += 30;
      }
      return { ...job, matchScore: Math.min(score, 100) };
    });
  }, [settings]);

  const filteredJobs = useMemo(() => {
    return scoredJobs.filter(job => {
      const matchesSearch = !filters.search || 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.skills.some(s => s.toLowerCase().includes(filters.search.toLowerCase()));
      
      const matchesLocation = !filters.location || job.location === filters.location;
      const matchesMode = !filters.mode || job.mode === filters.mode;
      const matchesExp = !filters.experience || job.experience === filters.experience;
      const matchesSource = !filters.source || job.source === filters.source;
      
      const currentStatus = statuses[job.id] || 'Not Applied';
      const matchesStatus = !filters.status || currentStatus === filters.status;

      const matchesScoring = !filters.matchesOnly || job.matchScore > 0;

      return matchesSearch && matchesLocation && matchesMode && matchesExp && matchesSource && matchesStatus && matchesScoring;
    }).sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
  }, [filters, statuses, scoredJobs]);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-xl">
      <TopBar />
      <ContextHeader 
        title="Active Pulse" 
        subtitle="Real-time monitoring of job opportunities matching your profile parameters."
      />
      
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-xl py-lg flex flex-col md:flex-row gap-xl">
        {/* Primary Workspace (70%) */}
        <div className="w-full md:w-[70%] space-y-md">
          <JobFilterBar filters={filters} setFilters={setFilters} />
          
          <div className="space-y-xs">
            <div className="flex justify-between items-center mb-sm px-xs">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Matched Opportunities ({filteredJobs.length})
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                Sorted by Latest
              </span>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
                {filteredJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onView={setSelectedJob}
                    onSave={toggleSave}
                    isSaved={savedIds.includes(job.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-xl space-y-md opacity-30 select-none border border-dashed border-border mt-md">
                <div className="flex justify-center">
                  <Ghost className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="space-y-xs">
                  <h2 className="text-2xl font-headline italic">No matches found.</h2>
                  <p className="text-sm font-medium uppercase tracking-[0.2em]">
                    Try adjusting your filters to broaden the scope.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Secondary Panel (30%) */}
        <aside className="w-full md:w-[30%]">
          <div className="sticky top-24">
            <SecondaryPanel />
          </div>
        </aside>
      </main>

      <JobDetailsModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />
      
      <ProofFooter />
    </div>
  );
}
