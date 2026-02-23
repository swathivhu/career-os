"use client";

import { Job } from "@/lib/jobs-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Briefcase, IndianRupee, Clock } from "lucide-react";

interface JobDetailsModalProps {
  job: Job | null;
  onClose: () => void;
}

export function JobDetailsModal({ job, onClose }: JobDetailsModalProps) {
  if (!job) return null;

  return (
    <Dialog open={!!job} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl rounded-none border-border bg-background p-0 overflow-hidden">
        <div className="h-2 w-full bg-primary" />
        <div className="p-lg space-y-md">
          <DialogHeader className="space-y-sm">
            <div className="flex justify-between items-start">
              <div className="space-y-xs">
                <DialogTitle className="text-3xl font-headline italic leading-tight">
                  {job.title}
                </DialogTitle>
                <p className="text-lg font-bold uppercase tracking-[0.2em] text-primary">
                  {job.company}
                </p>
              </div>
              <Badge variant="outline" className="rounded-none border-primary/20 text-primary uppercase tracking-widest text-[10px] px-sm">
                {job.source}
              </Badge>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-md pb-md border-b border-border/10">
            <div className="space-y-1">
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Location</p>
              <p className="text-xs font-bold flex items-center gap-1.5"><MapPin className="h-3 w-3 text-primary" /> {job.location}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Mode</p>
              <p className="text-xs font-bold uppercase">{job.mode}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Experience</p>
              <p className="text-xs font-bold flex items-center gap-1.5"><Briefcase className="h-3 w-3 text-primary" /> {job.experience}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Posted</p>
              <p className="text-xs font-bold flex items-center gap-1.5"><Clock className="h-3 w-3 text-primary" /> {job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo}d ago`}</p>
            </div>
          </div>

          <div className="space-y-sm">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">About the role</h4>
            <p className="text-sm leading-relaxed text-foreground/80 font-medium italic">
              "{job.description}"
            </p>
          </div>

          <div className="space-y-sm">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Primary Skillset</h4>
            <div className="flex flex-wrap gap-xs">
              {job.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="rounded-none bg-accent/10 hover:bg-accent/20 text-foreground font-bold uppercase tracking-wider text-[9px]">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-sm">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Remuneration</h4>
            <div className="flex items-center gap-sm bg-card border border-border/50 p-sm">
              <IndianRupee className="h-5 w-5 text-primary" />
              <span className="text-lg font-headline font-semibold">{job.salaryRange}</span>
            </div>
          </div>

          <div className="pt-md flex gap-sm">
            <Button asChild size="lg" className="flex-1 rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12">
              <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                Proceed to Application
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" onClick={onClose} className="rounded-none h-12 font-bold uppercase tracking-widest px-xl">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
