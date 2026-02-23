"use client";

import { TopBar } from "@/components/layout/TopBar";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { ProofFooter } from "@/components/layout/ProofFooter";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { JobCard } from "@/components/jobs/JobCard";
import { JobDetailsModal } from "@/components/jobs/JobDetailsModal";
import { useState } from "react";
import { Job } from "@/lib/jobs-data";
import { Bookmark } from "lucide-react";

export default function SavedPage() {
  const { savedJobs, savedIds, toggleSave } = useSavedJobs();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-xl">
      <TopBar />
      <ContextHeader 
        title="Saved Archives" 
        subtitle="Opportunities curated for future review and application. Organized by preference."
      />
      
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-xl py-xl">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex justify-between items-center mb-md px-xs">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
              Your Curation ({savedJobs.length})
            </h2>
          </div>

          {savedJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {savedJobs.map(job => (
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
            <div className="text-center py-xl space-y-md opacity-30 select-none border border-dashed border-border">
              <div className="flex justify-center">
                <div className="p-lg border border-dashed border-border rounded-full">
                  <Bookmark className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-xs">
                <h2 className="text-2xl font-headline italic">Collection Empty.</h2>
                <p className="text-sm font-medium uppercase tracking-[0.2em]">
                  Save interesting opportunities to build your curation.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <JobDetailsModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />

      <ProofFooter />
    </div>
  );
}
