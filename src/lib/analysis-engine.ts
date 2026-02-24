/**
 * @fileOverview Heuristic analysis engine for Job Descriptions.
 * Detects skills, calculates scores, and generates tailored prep content.
 */

export interface AnalysisResult {
  id: string;
  createdAt: string;
  company: string;
  role: string;
  jdText: string;
  extractedSkills: Record<string, string[]>;
  plan: string[];
  checklist: { round: string; items: string[] }[];
  questions: { skill: string; question: string }[];
  readinessScore: number;
}

const SKILL_CATEGORIES: Record<string, string[]> = {
  'Core CS': ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Data Structures', 'Algorithms'],
  'Languages': ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go', 'Rust'],
  'Web': ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL', 'Angular', 'Vue', 'HTML', 'CSS'],
  'Data': ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Oracle'],
  'Cloud/DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform'],
  'Testing': ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest', 'Mocha', 'Chai']
};

export function analyzeJobDescription(company: string, role: string, jdText: string): AnalysisResult {
  const detected: Record<string, string[]> = {};
  const lowerJD = jdText.toLowerCase();
  let categoriesFound = 0;

  // 1. Extract Skills
  Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
    const found = skills.filter(skill => {
      // Regex to find word with boundaries (e.g. "Go" shouldn't match "Google")
      const regex = new RegExp(`\\b${skill.toLowerCase().replace('.', '\\.')}\\b`, 'i');
      return regex.test(lowerJD);
    });
    if (found.length > 0) {
      detected[category] = found;
      categoriesFound++;
    }
  });

  const hasSkills = Object.keys(detected).length > 0;
  if (!hasSkills) {
    detected['General'] = ['General fresher stack'];
  }

  // 2. Readiness Score
  let score = 35;
  score += Math.min(categoriesFound * 5, 30);
  if (company.trim()) score += 10;
  if (role.trim()) score += 10;
  if (jdText.length > 800) score += 10;
  score = Math.min(score, 100);

  // 3. Round-wise Checklist
  const checklist = [
    { 
      round: 'Round 1: Aptitude / Basics', 
      items: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Core Subject MCQs'] 
    },
    { 
      round: 'Round 2: DSA + Core CS', 
      items: ['Linked Lists & Trees', 'Sorting/Searching', 'OS Process Mgmt', 'DBMS Normalization'] 
    },
    { 
      round: 'Round 3: Tech Interview', 
      items: ['Project Deep Dive', ...Object.values(detected).flat().slice(0, 3).map(s => `${s} Principles`), 'System Design Basics'] 
    },
    { 
      round: 'Round 4: Managerial / HR', 
      items: ['Conflict Resolution', 'Why this company?', 'Strengths/Weaknesses', 'Career Goals'] 
    }
  ];

  // 4. 7-Day Plan
  const plan = [
    'Day 1-2: Basics of Core CS (OS, Networks) and mental math.',
    'Day 3-4: DSA intensive. Practice 5-10 LeetCode Mediums.',
    lowerJD.includes('react') || lowerJD.includes('frontend') 
      ? 'Day 5: Frontend deep dive (DOM, State, Lifecycle) and Resume projects.'
      : 'Day 5: Backend & System Design (Scaling, Load Balancing) and Resume projects.',
    'Day 6: Mock interview practice with behavioral questions.',
    'Day 7: Final revision of weak topics and company values research.'
  ];

  // 5. Questions
  const questions: { skill: string; question: string }[] = [];
  Object.entries(detected).forEach(([cat, skills]) => {
    skills.forEach(skill => {
      if (questions.length < 10) {
        if (cat === 'Data') questions.push({ skill, question: `Explain indexing in ${skill} and how it impacts query performance.` });
        else if (cat === 'Web') questions.push({ skill, question: `How does state management differ in ${skill} compared to traditional paradigms?` });
        else if (cat === 'Languages') questions.push({ skill, question: `Explain memory management and concurrency in ${skill}.` });
        else questions.push({ skill, question: `What are the core design patterns used when working with ${skill}?` });
      }
    });
  });

  if (questions.length < 10) {
    questions.push({ skill: 'General', question: 'Explain one challenging project you have worked on in detail.' });
  }

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    company,
    role,
    jdText,
    extractedSkills: detected,
    plan,
    checklist,
    questions: questions.slice(0, 10),
    readinessScore: score
  };
}
