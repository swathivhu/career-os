"use client";

import { Job } from "@/lib/jobs-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Briefcase, 
  Calendar, 
  Bookmark, 
  Eye, 
  ExternalLink,
  IndianRupee
} from "lucide-react";
import { useState, useEffect } from "react";

interface JobCardProps {
  job: Job;
  onView: (job: Job) => void;
  onSave: (job: Job) => void;
  isSaved: boolean;
}

export function JobCard({ job, onView, onSave, isSaved }: JobCardProps) {
  return (
    <div className="group bg-card border border-border/50 hover:border-primary/40 transition-standard p-md flex flex-col justify-between space-y-md">
      <div className="space-y-sm">
        <div className="flex justify-between items-start">
          <div className="space-y-xs">
            <h3 className="text-xl font-headline group-hover:text-primary transition-standard leading-tight">
              {job.title}
            </h3>
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground opacity-80">
              {job.company}
            </p>
          </div>
          <Badge variant="outline" className="rounded-none border-primary/20 text-primary font-bold text-[10px] uppercase tracking-widest">
            {job.source}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-y-xs gap-x-md text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-xs">
            <MapPin className="h-3.5 w-3.5 text-primary/60" />
            {job.location} ({job.mode})
          </div>
          <div className="flex items-center gap-xs">
            <Briefcase className="h-3.5 w-3.5 text-primary/60" />
            Exp: {job.experience}
          </div>
          <div className="flex items-center gap-xs">
            <IndianRupee className="h-3.5 w-3.5 text-primary/60" />
            {job.salaryRange}
          </div>
          <div className="flex items-center gap-xs">
            <Calendar className="h-3.5 w-3.5 text-primary/60" />
            {job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo}d ago`}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-xs pt-xs border-t border-border/10">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onView(job)}
          className="flex-1 rounded-none border-border hover:bg-accent/5 text-[10px] font-bold uppercase tracking-widest h-9"
        >
          <Eye className="h-3.5 w-3.5 mr-2" />
          View
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onSave(job)}
          className={`h-9 w-9 p-0 rounded-none border-border transition-standard ${isSaved ? 'bg-primary/5 text-primary border-primary/30' : 'hover:bg-accent/5'}`}
        >
          <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
        </Button>
        <Button 
          asChild 
          size="sm" 
          className="flex-1 rounded-none bg-foreground text-background font-bold uppercase tracking-widest h-9"
        >
          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3.5 w-3.5 mr-2" />
            Apply
          </a>
        </Button>
      </div>
    </div>
  );
}
