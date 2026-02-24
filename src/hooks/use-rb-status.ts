
'use client';

import { useState, useEffect } from 'react';

export interface RBLinks {
  lovable: string;
  github: string;
  deployment: string;
}

export type RBStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const RB_CHECKLIST = [
  { id: 'save', label: 'All form sections save to localStorage' },
  { id: 'preview', label: 'Live preview updates in real-time' },
  { id: 'template', label: 'Template switching preserves data' },
  { id: 'theme', label: 'Color theme persists after refresh' },
  { id: 'ats', label: 'ATS score calculates correctly' },
  { id: 'live', label: 'Score updates live on edit' },
  { id: 'export', label: 'Export buttons work (copy/download)' },
  { id: 'empty', label: 'Empty states handled gracefully' },
  { id: 'mobile', label: 'Mobile responsive layout works' },
  { id: 'console', label: 'No console errors on any page' },
];

export function useRBStatus() {
  const [artifacts, setArtifacts] = useState<Record<string, string>>({});
  const [links, setLinks] = useState<RBLinks>({ lovable: '', github: '', deployment: '' });
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedArtifacts: Record<string, string> = {};
    for (let i = 1; i <= 8; i++) {
      const art = localStorage.getItem(`rb_step_${i}_artifact`);
      if (art) storedArtifacts[i] = art;
    }
    setArtifacts(storedArtifacts);

    const storedLinks = localStorage.getItem('rb_final_submission');
    if (storedLinks) {
      try {
        setLinks(JSON.parse(storedLinks));
      } catch (e) {
        console.error('Failed to parse RB links', e);
      }
    }

    const storedChecklist = localStorage.getItem('rb_checklist');
    if (storedChecklist) {
      try {
        setChecklist(JSON.parse(storedChecklist));
      } catch (e) {
        console.error('Failed to parse RB checklist', e);
      }
    }

    setIsLoaded(true);
  }, []);

  const saveArtifact = (step: RBStep, value: string) => {
    const newArtifacts = { ...artifacts, [step]: value };
    setArtifacts(newArtifacts);
    localStorage.setItem(`rb_step_${step}_artifact`, value);
    window.dispatchEvent(new Event('storage'));
  };

  const updateLink = (key: keyof RBLinks, value: string) => {
    const newLinks = { ...links, [key]: value };
    setLinks(newLinks);
    localStorage.setItem('rb_final_submission', JSON.stringify(newLinks));
    window.dispatchEvent(new Event('storage'));
  };

  const toggleChecklist = (id: string) => {
    const newChecklist = { ...checklist, [id]: !checklist[id] };
    setChecklist(newChecklist);
    localStorage.setItem('rb_checklist', JSON.stringify(newChecklist));
    window.dispatchEvent(new Event('storage'));
  };

  const isStepComplete = (step: RBStep) => !!artifacts[step];
  
  const canAccessStep = (step: RBStep) => {
    if (step === 1) return true;
    for (let i = 1; i < step; i++) {
      if (!artifacts[i]) return false;
    }
    return true;
  };

  const completedStepsCount = Object.keys(artifacts).length;
  const passedTestsCount = Object.values(checklist).filter(Boolean).length;
  
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return url.startsWith('http');
    } catch {
      return false;
    }
  };

  const isShippable = completedStepsCount === 8 && 
                     passedTestsCount === RB_CHECKLIST.length &&
                     isValidUrl(links.lovable) && 
                     isValidUrl(links.github) && 
                     isValidUrl(links.deployment);

  const getStatus = () => {
    if (isShippable) return 'Shipped';
    if (completedStepsCount > 0) return 'In Progress';
    return 'Not Started';
  };

  return {
    artifacts,
    saveArtifact,
    links,
    updateLink,
    checklist,
    toggleChecklist,
    isStepComplete,
    canAccessStep,
    completedStepsCount,
    passedTestsCount,
    isShippable,
    isLoaded,
    status: getStatus()
  };
}
