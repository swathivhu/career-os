
'use client';

import { useState, useEffect } from 'react';
import { useTestStatus } from './use-test-status';
import { useRBStatus } from './use-rb-status';
import { useResumeData } from './use-resume-data';
import { calculateATSScore } from '@/lib/ats-engine';

export interface CareerOSState {
  prpChecklistComplete: boolean;
  prpScore: number;
  resumeATSScore: number;
  proofLinksProvided: boolean;
  deploymentVerified: boolean;
}

const STORAGE_KEY = 'career_os_state';

export function useCareerOS() {
  const { passCount, isFullyVerified } = useTestStatus();
  const { links, completedStepsCount } = useRBStatus();
  const { data: resumeData, isLoaded: resumeLoaded } = useResumeData();
  
  const [osState, setOsState] = useState<CareerOSState>({
    prpChecklistComplete: false,
    prpScore: 0,
    resumeATSScore: 0,
    proofLinksProvided: false,
    deploymentVerified: false,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!resumeLoaded) return;

    const { score: atsScore } = calculateATSScore(resumeData);
    
    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return url.startsWith('http');
      } catch {
        return false;
      }
    };

    const hasLinks = isValidUrl(links.lovable) && isValidUrl(links.github) && isValidUrl(links.deployment);
    
    const newState: CareerOSState = {
      prpChecklistComplete: isFullyVerified,
      prpScore: (passCount / 10) * 100,
      resumeATSScore: atsScore,
      proofLinksProvided: hasLinks,
      deploymentVerified: isFullyVerified && atsScore >= 70 && hasLinks && completedStepsCount === 8,
    };

    setOsState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    setIsLoaded(true);
  }, [passCount, isFullyVerified, links, resumeData, resumeLoaded, completedStepsCount]);

  return { osState, isLoaded };
}
