/**
 * @fileOverview Hardened heuristic analysis engine for Job Descriptions.
 * Standardizes schema and handles edge cases for skill extraction.
 */

export interface AnalysisRound {
  roundTitle: string;
  focusAreas: string[];
  whyItMatters: string;
}

export interface AnalysisChecklist {
  roundTitle: string;
  items: string[];
}

export interface DayPlan {
  day: number;
  focus: string;
  tasks: string[];
}

export interface ExtractedSkills {
  coreCS: string[];
  languages: string[];
  web: string[];
  data: string[];
  cloud: string[];
  testing: string[];
  other: string[];
}

export interface AnalysisResult {
  id: string;
  createdAt: string;
  updatedAt: string;
  company: string;
  role: string;
  jdText: string;
  extractedSkills: ExtractedSkills;
  roundMapping: AnalysisRound[];
  checklist: AnalysisChecklist[];
  plan7Days: DayPlan[];
  questions: string[];
  baseScore: number;
  finalScore: number;
  skillConfidenceMap: Record<string, "know" | "practice">;
}

const SKILL_MAP: Record<string, string[]> = {
  coreCS: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Data Structures', 'Algorithms'],
  languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go', 'Rust'],
  web: ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL', 'Angular', 'Vue', 'HTML', 'CSS'],
  data: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Oracle'],
  cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform'],
  testing: ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest', 'Mocha', 'Chai']
};

export function analyzeJobDescription(company: string, role: string, jdText: string): AnalysisResult {
  const lowerJD = jdText.toLowerCase();
  const extracted: ExtractedSkills = {
    coreCS: [],
    languages: [],
    web: [],
    data: [],
    cloud: [],
    testing: [],
    other: []
  };

  let categoriesFound = 0;

  // 1. Extract Skills
  Object.entries(SKILL_MAP).forEach(([key, skills]) => {
    const found = skills.filter(skill => {
      const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedSkill}(?!\\w)`, 'i');
      return regex.test(lowerJD);
    });
    if (found.length > 0) {
      (extracted as any)[key] = found;
      categoriesFound++;
    }
  });

  // 2. Default behavior if no skills detected
  const totalSkills = Object.values(extracted).flat().length;
  if (totalSkills === 0) {
    extracted.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
  }

  // 3. Rounds & Mapping
  const isEnterprise = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'TCS', 'Infosys', 'Wipro', 'Accenture'].some(e => 
    company.toLowerCase().includes(e.toLowerCase())
  );

  const roundMapping: AnalysisRound[] = isEnterprise ? [
    { roundTitle: 'Round 1: Online Assessment', focusAreas: ['Aptitude', 'Basic DSA'], whyItMatters: 'Filters for logical speed.' },
    { roundTitle: 'Round 2: Technical I', focusAreas: ['Core CS', 'Complex DSA'], whyItMatters: 'Tests fundamental depth.' },
    { roundTitle: 'Round 3: Technical II', focusAreas: ['Projects', 'System Design'], whyItMatters: 'Tests application skills.' },
    { roundTitle: 'Round 4: Behavioral', focusAreas: ['Culture', 'Communication'], whyItMatters: 'Ensures long-term fit.' }
  ] : [
    { roundTitle: 'Round 1: Coding Task', focusAreas: ['Practical Stack', 'Feature Build'], whyItMatters: 'Tests execution speed.' },
    { roundTitle: 'Round 2: Technical Discussion', focusAreas: ['Architecture', 'Tradeoffs'], whyItMatters: 'Tests decision making.' },
    { roundTitle: 'Round 3: Founder Fit', focusAreas: ['Impact', 'Agility'], whyItMatters: 'Ensures startup alignment.' }
  ];

  // 4. Score Calculation
  let baseScore = 35;
  baseScore += Math.min(categoriesFound * 5, 30);
  if (company.trim()) baseScore += 10;
  if (role.trim()) baseScore += 10;
  if (jdText.length > 800) baseScore += 10;
  baseScore = Math.min(baseScore, 100);

  // 5. Questions Generation
  const questions: string[] = [];
  const allSkills = Object.values(extracted).flat();
  allSkills.forEach(skill => {
    if (questions.length < 10) {
      if (extracted.data.includes(skill)) questions.push(`Explain indexing in ${skill} and performance impacts.`);
      else if (extracted.web.includes(skill)) questions.push(`How do you handle state or lifecycle in ${skill}?`);
      else if (extracted.languages.includes(skill)) questions.push(`Explain concurrency or memory management in ${skill}.`);
      else questions.push(`Describe a specific challenge you solved using ${skill}.`);
    }
  });
  while (questions.length < 10) {
    questions.push("Explain your most significant technical project and your specific contribution.");
  }

  // 6. 7-Day Plan
  const isWeb = extracted.web.length > 0;
  const plan7Days: DayPlan[] = [
    { day: 1, focus: 'Fundamentals', tasks: ['Review OS & DBMS', 'Brush up mental aptitude'] },
    { day: 2, focus: 'DSA Core', tasks: ['Practice 5 Medium Arrays/Strings problems', 'Time complexity analysis'] },
    { day: 3, focus: 'DSA Advanced', tasks: ['Practice 3 Linked List/Tree problems', 'Recursion practice'] },
    { day: 4, focus: 'Tech Stack', tasks: isWeb ? ['Frontend deep dive (DOM/State)', 'API integration practice'] : ['Backend systems (Scaling/Caching)', 'Database optimization'] },
    { day: 5, focus: 'Resume & Projects', tasks: ['Project walkthrough preparation', 'Quantifying impact in bullets'] },
    { day: 6, focus: 'Mock Drills', tasks: ['Behavioral STAR method practice', 'Live coding simulation'] },
    { day: 7, focus: 'Final Push', tasks: ['Review company values', 'Address remaining weak areas'] }
  ];

  const skillConfidenceMap: Record<string, "know" | "practice"> = {};
  allSkills.forEach(skill => {
    skillConfidenceMap[skill] = "practice";
  });

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    company,
    role,
    jdText,
    extractedSkills: extracted,
    roundMapping,
    checklist: roundMapping.map(r => ({ roundTitle: r.roundTitle, items: [...r.focusAreas, 'Behavioral prep'] })),
    plan7Days,
    questions,
    baseScore,
    finalScore: baseScore, // Initially matches base score as all are 'practice'
    skillConfidenceMap
  };
}