/**
 * @fileOverview Heuristic analysis engine for Job Descriptions.
 * Detects skills, calculates scores, and generates tailored prep content.
 */

export interface Round {
  name: string;
  focus: string;
  explanation: string;
}

export interface CompanyIntel {
  size: 'Startup' | 'Mid-size' | 'Enterprise';
  industry: string;
  hiringFocus: string;
}

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
  skillConfidenceMap?: Record<string, 'know' | 'practice'>;
  companyIntel: CompanyIntel;
  roundMapping: Round[];
}

const SKILL_CATEGORIES: Record<string, string[]> = {
  'Core CS': ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Data Structures', 'Algorithms'],
  'Languages': ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go', 'Rust'],
  'Web': ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL', 'Angular', 'Vue', 'HTML', 'CSS'],
  'Data': ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Oracle'],
  'Cloud/DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform'],
  'Testing': ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest', 'Mocha', 'Chai']
};

const ENTERPRISE_LIST = [
  'Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'TCS', 'Infosys', 'Wipro', 'Accenture', 
  'IBM', 'Oracle', 'SAP', 'Dell', 'Capgemini', 'Cognizant', 'HCL', 'Goldman Sachs', 'Morgan Stanley'
];

export function analyzeJobDescription(company: string, role: string, jdText: string): AnalysisResult {
  const detected: Record<string, string[]> = {};
  const lowerJD = jdText.toLowerCase();
  let categoriesFound = 0;

  // 1. Extract Skills
  Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
    const found = skills.filter(skill => {
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

  // 2. Company Intel Heuristics
  const isEnterprise = ENTERPRISE_LIST.some(e => company.toLowerCase().includes(e.toLowerCase()));
  const intel: CompanyIntel = {
    size: isEnterprise ? 'Enterprise' : 'Startup',
    industry: 'Technology Services',
    hiringFocus: isEnterprise 
      ? 'Structured DSA, Core CS fundamentals, and process adherence.' 
      : 'Practical problem solving, tech stack depth, and individual ownership.'
  };

  // 3. Dynamic Round Mapping
  const rounds: Round[] = [];
  if (intel.size === 'Enterprise') {
    rounds.push({ 
      name: 'Round 1: Online Assessment', 
      focus: 'Aptitude & Basic DSA', 
      explanation: 'Used to filter candidates based on logical speed and basic coding ability.' 
    });
    rounds.push({ 
      name: 'Round 2: Technical Interview I', 
      focus: 'Data Structures & Core CS', 
      explanation: 'Deep dive into memory management, OS fundamentals, and complex DSA problems.' 
    });
    rounds.push({ 
      name: 'Round 3: Technical Interview II', 
      focus: 'Projects & Advanced Topics', 
      explanation: 'Exploration of your past work and how you apply core concepts to real scenarios.' 
    });
    rounds.push({ 
      name: 'Round 4: HR / Behavioral', 
      focus: 'Culture & Communication', 
      explanation: 'Ensuring alignment with company values and assessing long-term growth potential.' 
    });
  } else {
    rounds.push({ 
      name: 'Round 1: Practical Coding Task', 
      focus: 'Stack Proficiency', 
      explanation: 'Often a take-home or live coding session focusing on building a functional feature.' 
    });
    rounds.push({ 
      name: 'Round 2: Technical Discussion', 
      focus: 'System Architecture', 
      explanation: 'Discussing tradeoffs, scalability, and how you choose tools for specific problems.' 
    });
    rounds.push({ 
      name: 'Round 3: Culture & Founder Fit', 
      focus: 'Impact & Agility', 
      explanation: 'Focuses on your ability to work in fast-paced environments and take ownership.' 
    });
  }

  // 4. Readiness Score
  let score = 35;
  score += Math.min(categoriesFound * 5, 30);
  if (company.trim()) score += 10;
  if (role.trim()) score += 10;
  if (jdText.length > 800) score += 10;
  score = Math.min(score, 100);

  // 5. Checklist (Simplified mapping)
  const checklist = rounds.map(r => ({
    round: r.name,
    items: [r.focus, 'Standard behavioral prep', 'Company research']
  }));

  // 6. 7-Day Plan
  const plan = [
    'Day 1-2: Basics of Core CS (OS, Networks) and mental math.',
    'Day 3-4: DSA intensive. Practice 5-10 LeetCode Mediums.',
    lowerJD.includes('react') || lowerJD.includes('frontend') 
      ? 'Day 5: Frontend deep dive (DOM, State, Lifecycle) and Resume projects.'
      : 'Day 5: Backend & System Design (Scaling, Load Balancing) and Resume projects.',
    'Day 6: Mock interview practice with behavioral questions.',
    'Day 7: Final revision of weak topics and company values research.'
  ];

  // 7. Questions
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

  const skillConfidenceMap: Record<string, 'know' | 'practice'> = {};
  Object.values(detected).flat().forEach(skill => {
    skillConfidenceMap[skill] = 'practice';
  });

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
    readinessScore: score,
    skillConfidenceMap,
    companyIntel: intel,
    roundMapping: rounds
  };
}
