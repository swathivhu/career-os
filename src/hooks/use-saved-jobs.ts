"use client";

import { useState, useEffect } from "react";
import { Job, JOBS_DATA } from "@/lib/jobs-data";

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("saved_jobs");
    if (stored) {
      try {
        setSavedIds(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved jobs", e);
      }
    }
  }, []);

  const toggleSave = (job: Job) => {
    const newIds = savedIds.includes(job.id)
      ? savedIds.filter(id => id !== job.id)
      : [...savedIds, job.id];
    
    setSavedIds(newIds);
    localStorage.setItem("saved_jobs", JSON.stringify(newIds));
  };

  const savedJobs = JOBS_DATA.filter(job => savedIds.includes(job.id));

  return { savedIds, savedJobs, toggleSave };
}
