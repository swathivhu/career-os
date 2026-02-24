"use client";

import { useState, useEffect } from "react";

export type JobStatus = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected';

export interface StatusHistoryEntry {
  jobId: string;
  title: string;
  company: string;
  status: JobStatus;
  timestamp: string;
}

export function useJobStatus() {
  const [statuses, setStatuses] = useState<Record<string, JobStatus>>({});
  const [history, setHistory] = useState<StatusHistoryEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedStatuses = localStorage.getItem("job_tracker_statuses");
    const storedHistory = localStorage.getItem("job_tracker_status_history");
    
    if (storedStatuses) {
      try {
        setStatuses(JSON.parse(storedStatuses));
      } catch (e) {
        console.error("Failed to parse statuses", e);
      }
    }
    
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
    
    setIsLoaded(true);
  }, []);

  const updateStatus = (jobId: string, title: string, company: string, newStatus: JobStatus) => {
    const updatedStatuses = { ...statuses, [jobId]: newStatus };
    setStatuses(updatedStatuses);
    localStorage.setItem("job_tracker_statuses", JSON.stringify(updatedStatuses));

    // Update history
    const newEntry: StatusHistoryEntry = {
      jobId,
      title,
      company,
      status: newStatus,
      timestamp: new Date().toISOString(),
    };
    
    const updatedHistory = [newEntry, ...history].slice(0, 50); // Keep last 50 updates
    setHistory(updatedHistory);
    localStorage.setItem("job_tracker_status_history", JSON.stringify(updatedHistory));
  };

  return { statuses, history, updateStatus, isLoaded };
}
