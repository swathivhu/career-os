"use client";

import { useState, useEffect } from "react";

export interface TestItem {
  id: string;
  label: string;
  howTo: string;
}

export const TEST_CHECKLIST: TestItem[] = [
  { id: "pref-persist", label: "Preferences persist after refresh", howTo: "Go to Settings, save preferences, refresh page, and verify values remain." },
  { id: "score-calc", label: "Match score calculates correctly", howTo: "Check job cards on Dashboard; confirm scores align with your settings." },
  { id: "match-toggle", label: "'Show only matches' toggle works", howTo: "Toggle 'Matches Only' on Dashboard and verify non-matching jobs are hidden." },
  { id: "save-persist", label: "Save job persists after refresh", howTo: "Save a job, refresh, and verify it still appears in 'Saved' archives." },
  { id: "apply-tab", label: "Apply opens in new tab", howTo: "Click 'Apply' on any job and confirm it opens a new browser tab." },
  { id: "status-persist", label: "Status update persists after refresh", howTo: "Change a job status, refresh, and verify the badge color remains." },
  { id: "status-filter", label: "Status filter works correctly", howTo: "Filter Dashboard by 'Applied' and confirm only those jobs show." },
  { id: "digest-gen", label: "Digest generates top 10 by score", howTo: "Generate a digest and verify jobs are ordered by match percentage." },
  { id: "digest-persist", label: "Digest persists for the day", howTo: "Generate a digest, refresh, and confirm the same list is displayed." },
  { id: "no-errors", label: "No console errors on main pages", howTo: "Open Developer Tools (F12) and verify the console is clear of red errors." },
];

export function useTestStatus() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("job_tracker_tests");
    if (stored) {
      try {
        setCheckedIds(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse tests", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const toggleTest = (id: string) => {
    const newIds = checkedIds.includes(id)
      ? checkedIds.filter(i => i !== id)
      : [...checkedIds, id];
    
    setCheckedIds(newIds);
    localStorage.setItem("job_tracker_tests", JSON.stringify(newIds));
  };

  const resetTests = () => {
    setCheckedIds([]);
    localStorage.removeItem("job_tracker_tests");
  };

  const passCount = checkedIds.length;
  const isFullyVerified = passCount === TEST_CHECKLIST.length;

  return { checkedIds, toggleTest, resetTests, passCount, isFullyVerified, isLoaded };
}
