/**
 * @fileOverview Deterministic ATS scoring engine for Resume Manifests.
 * Calculates readiness based on structural and content benchmarks.
 */

import { ResumeData } from '@/hooks/use-resume-data';

export interface ATSResult {
  score: number;
  status: string;
  color: string;
  suggestions: string[];
}

const ACTION_VERBS = ['built', 'led', 'designed', 'improved', 'developed', 'implemented', 'created', 'optimized', 'automated', 'managed', 'engineered'];

export function calculateATSScore(data: ResumeData): ATSResult {
  let score = 0;
  const suggestions: string[] = [];

  // Identity Checks
  if (data.personalInfo.name) score += 10; else suggestions.push("Add your full name (+10)");
  if (data.personalInfo.email) score += 10; else suggestions.push("Add an email address (+10)");
  if (data.personalInfo.phone) score += 5; else suggestions.push("Add a phone number (+5)");
  
  // Content Depth
  if (data.summary.length > 50) score += 10; else suggestions.push("Write a longer summary (> 50 chars) (+10)");
  
  const hasActionVerb = ACTION_VERBS.some(verb => data.summary.toLowerCase().includes(verb));
  if (hasActionVerb) score += 10; else suggestions.push("Use action verbs (e.g., 'Led', 'Built') in summary (+10)");

  // Professional History
  if (data.experience.length > 0 && data.experience.some(e => e.description.length > 20)) {
    score += 15;
  } else {
    suggestions.push("Add detailed experience with bullet points (+15)");
  }

  // Academic & Projects
  if (data.education.length > 0) score += 10; else suggestions.push("Add your education details (+10)");
  if (data.projects.length > 0) score += 10; else suggestions.push("Add at least one project (+10)");

  // Skills & Links
  const totalSkills = (data.skills.technical?.length || 0) + (data.skills.soft?.length || 0) + (data.skills.tools?.length || 0);
  if (totalSkills >= 5) score += 10; else suggestions.push("Add at least 5 skills (+10)");

  if (data.links.linkedin) score += 5; else suggestions.push("Add a LinkedIn profile (+5)");
  if (data.links.github) score += 5; else suggestions.push("Add a GitHub profile (+5)");

  score = Math.min(100, score);

  let status = "Needs Work";
  let color = "text-red-500";
  let hsvColor = "hsl(0, 84%, 60%)";

  if (score > 40 && score <= 70) {
    status = "Getting There";
    color = "text-amber-500";
    hsvColor = "hsl(38, 92%, 50%)";
  } else if (score > 70) {
    status = "Strong Resume";
    color = "text-green-500";
    hsvColor = "hsl(142, 76%, 36%)";
  }

  return { score, status, color, suggestions: suggestions.slice(0, 3) };
}
