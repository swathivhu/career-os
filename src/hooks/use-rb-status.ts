
'use client';

import { useState, useEffect } from 'react';

export interface RBLinks {
  lovable: string;
  github: string;
  deployment: string;
}

export type RBStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export function useRBStatus() {
  const [artifacts, setArtifacts] = useState<Record<string, string>>({});
  const [links, setLinks] = useState<RBLinks>({ lovable: '', github: '', deployment: '' });
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
    setIsLoaded(true);
  }, []);

  const saveArtifact = (step: RBStep, value: string) => {
    const newArtifacts = { ...artifacts, [step]: value };
    setArtifacts(newArtifacts);
    localStorage.setItem(`rb_step_${step}_artifact`, value);
  };

  const updateLink = (key: keyof RBLinks, value: string) => {
    const newLinks = { ...links, [key]: value };
    setLinks(newLinks);
    localStorage.setItem('rb_final_submission', JSON.stringify(newLinks));
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
  
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isShippable = completedStepsCount === 8 && 
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
    isStepComplete,
    canAccessStep,
    completedStepsCount,
    isShippable,
    isLoaded,
    status: getStatus()
  };
}
