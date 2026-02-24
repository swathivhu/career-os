"use client";

import { useState, useEffect } from "react";

export interface TestItem {
  id: string;
  label: string;
  howTo: string;
}

export const TEST_CHECKLIST: TestItem[] = [
  { id: "jd-req", label: "JD required validation works", howTo: "Try to analyze with an empty JD field; it should be disabled." },
  { id: "short-jd", label: "Short JD warning shows for <200 chars", howTo: "Enter a brief JD and verify the amber warning alert appears." },
  { id: "skill-group", label: "Skills extraction groups correctly", howTo: "Analyze a JD with React, SQL, and AWS; confirm they appear in Web, Data, and Cloud." },
  { id: "round-map", label: "Round mapping changes based on company + skills", howTo: "Compare 'Amazon' vs a startup name; verify round structure differences." },
  { id: "score-det", label: "Score calculation is deterministic", howTo: "Run the same JD twice; verify the base score remains identical." },
  { id: "live-score", label: "Skill toggles update score live", howTo: "Toggle 'I know this' on a skill in results; verify the readiness index shifts." },
  { id: "persist-res", label: "Changes persist after refresh", howTo: "Toggle a skill, refresh the page, and verify the confidence state remains." },
  { id: "history-sync", label: "History saves and loads correctly", howTo: "Run an analysis, check the History page, and reopen it to verify data integrity." },
  { id: "export-content", label: "Export buttons copy the correct content", howTo: "Click 'Copy Strategy' and verify the clipboard contains the 7-day plan." },
  { id: "console-clean", label: "No console errors on core pages", howTo: "Check DevTools console on Analyze and Results pages; verify no red errors." },
];

export interface ProjectLinks {
  lovable: string;
  github: string;
  deployment: string;
}

export function useTestStatus() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [links, setLinks] = useState<ProjectLinks>({ lovable: "", github: "", deployment: "" });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedTests = localStorage.getItem("prp_tests");
    const storedLinks = localStorage.getItem("prp_final_submission");
    
    if (storedTests) {
      try {
        setCheckedIds(JSON.parse(storedTests));
      } catch (e) {
        console.error("Failed to parse tests", e);
      }
    }

    if (storedLinks) {
      try {
        setLinks(JSON.parse(storedLinks));
      } catch (e) {
        console.error("Failed to parse links", e);
      }
    }
    
    setIsLoaded(true);
  }, []);

  const toggleTest = (id: string) => {
    const newIds = checkedIds.includes(id)
      ? checkedIds.filter(i => i !== id)
      : [...checkedIds, id];
    
    setCheckedIds(newIds);
    localStorage.setItem("prp_tests", JSON.stringify(newIds));
  };

  const updateLink = (key: keyof ProjectLinks, value: string) => {
    const newLinks = { ...links, [key]: value };
    setLinks(newLinks);
    localStorage.setItem("prp_final_submission", JSON.stringify(newLinks));
  };

  const resetTests = () => {
    setCheckedIds([]);
    setLinks({ lovable: "", github: "", deployment: "" });
    localStorage.removeItem("prp_tests");
    localStorage.removeItem("prp_final_submission");
  };

  const passCount = checkedIds.length;
  const isFullyVerified = passCount === TEST_CHECKLIST.length;
  
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const hasAllLinks = !!(links.lovable && links.github && links.deployment && 
                       isValidUrl(links.lovable) && isValidUrl(links.github) && isValidUrl(links.deployment));
  
  const isShippable = isFullyVerified && hasAllLinks;

  const getStatus = () => {
    if (isShippable) return "Shipped";
    if (passCount > 0 || links.lovable || links.github || links.deployment) return "In Progress";
    return "Not Started";
  };

  return { 
    checkedIds, 
    toggleTest, 
    links, 
    updateLink, 
    resetTests, 
    passCount, 
    isFullyVerified, 
    hasAllLinks,
    isShippable,
    isLoaded,
    status: getStatus()
  };
}
