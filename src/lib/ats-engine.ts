/**
 * @fileOverview Deterministic ATS scoring engine for Resume Manifests.
 * Calculates readiness based on structural and content benchmarks.
 */

import { ResumeData } from '@/hooks/use-resume-data';

export interface ATSResult {
  score: number;
  suggestions: string[];
}

export function calculateATSScore(data: ResumeData): ATSResult {
  let score = 0;
  const suggestions: string[] = [];

  // 1. Summary Length (40-120 words)
  const summaryWords = data.summary.trim().split(/\s+/).filter(w => w.length > 0).length;
  if (summaryWords >= 40 && summaryWords <= 120) {
    score += 15;
  } else if (data.summary.length > 0) {
    suggestions.push("Write a stronger summary (target 40–120 words).");
  } else {
    suggestions.push("Add a professional summary.");
  }

  // 2. Projects (at least 2)
  if (data.projects.length >= 2) {
    score += 10;
  } else {
    suggestions.push("Add at least 2 technical projects.");
  }

  // 3. Experience (at least 1)
  if (data.experience.length >= 1) {
    score += 10;
  } else {
    suggestions.push("Add at least one professional experience entry.");
  }

  // 4. Skills (>= 8 items)
  const skillsList = [
    ...data.skills.technical,
    ...data.skills.soft,
    ...data.skills.tools
  ];
  if (skillsList.length >= 8) {
    score += 10;
  } else {
    suggestions.push("Add more skills (target 8+ keywords).");
  }

  // 5. Links (GitHub or LinkedIn)
  if (data.links.github || data.links.linkedin) {
    score += 10;
  } else {
    suggestions.push("Include GitHub or LinkedIn links for verification.");
  }

  // 6. Measurable Impact (Numbers in bullets)
  const numberRegex = /[0-9%kKxX+]/;
  const hasImpact = [...data.experience, ...data.projects].some(item => 
    numberRegex.test(item.description)
  );
  if (hasImpact) {
    score += 15;
  } else {
    suggestions.push("Add measurable impact (numbers, %, metrics) to your bullets.");
  }

  // 7. Complete Education
  const hasEducation = data.education.length > 0 && data.education.every(edu => 
    edu.institution && edu.degree && edu.year
  );
  if (hasEducation) {
    score += 10;
  } else if (data.education.length === 0) {
    suggestions.push("Add your academic background.");
  }

  // 8. Personal Identity Check
  if (data.personalInfo.name && data.personalInfo.email && data.personalInfo.phone) {
    score += 20;
  } else {
    suggestions.push("Complete your personal identity section.");
  }

  return {
    score: Math.min(100, score),
    suggestions: suggestions.slice(0, 3) // Limit to 3 suggestions
  };
}
