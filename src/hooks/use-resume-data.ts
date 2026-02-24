'use client';

import { useState, useEffect } from 'react';

export interface Education {
  institution: string;
  degree: string;
  year: string;
  location: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
}

export type ResumeTemplate = 'classic' | 'modern' | 'minimal';

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  links: {
    github: string;
    linkedin: string;
  };
  template: ResumeTemplate;
  colorTheme: string;
}

const STORAGE_KEY = 'resumeBuilderData';

const DEFAULT_DATA: ResumeData = {
  personalInfo: { name: '', email: '', phone: '', location: '' },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: {
    technical: [],
    soft: [],
    tools: []
  },
  links: { github: '', linkedin: '' },
  template: 'classic',
  colorTheme: 'hsl(168, 60%, 40%)'
};

const SAMPLE_DATA: ResumeData = {
  personalInfo: {
    name: 'Johnathan Doe',
    email: 'j.doe@premium.com',
    phone: '+44 20 7946 0958',
    location: 'London, UK'
  },
  summary: 'Architectural software engineer with 8+ years of experience in building deterministic build systems and premium SaaS platforms. Reduced deployment friction by 40% and improved system uptime to 99.99%. Expertise in distributed systems and performance-critical UI architecture.',
  education: [
    { institution: 'University of Oxford', degree: 'MSc Computer Science', year: '2016', location: 'Oxford' }
  ],
  experience: [
    {
      company: 'KodNest Systems',
      role: 'Lead Architect',
      duration: '2020 - Present',
      description: 'Developed the Premium Build System, reducing deployment friction by 45%. Optimized 50+ microservices for 2x performance gains.'
    }
  ],
  projects: [
    { 
      id: '1',
      title: 'Deterministic UI Framework', 
      description: 'Implemented a layout engine focused on 8px grid perfection used by 10k+ developers.', 
      techStack: ['TypeScript', 'React', 'Tailwind'],
      liveUrl: 'https://ui.kodnest.com',
      githubUrl: 'github.com/kodnest/ui' 
    }
  ],
  skills: {
    technical: ['React', 'Next.js', 'TypeScript', 'Rust', 'Distributed Systems'],
    soft: ['Team Leadership', 'Strategic Planning'],
    tools: ['Docker', 'AWS', 'CI/CD']
  },
  links: { github: 'github.com/jdoe', linkedin: 'linkedin.com/in/jdoe' },
  template: 'modern',
  colorTheme: 'hsl(168, 60%, 40%)'
};

export function useResumeData() {
  const [data, setData] = useState<ResumeData>(DEFAULT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (typeof parsed.skills === 'string') {
          parsed.skills = {
            technical: parsed.skills.split(',').map((s: string) => s.trim()).filter(Boolean),
            soft: [],
            tools: []
          };
        }
        setData(parsed);
      } catch (e) {
        console.error('Failed to parse resume data', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateData = (newData: ResumeData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const loadSampleData = () => {
    updateData(SAMPLE_DATA);
  };

  const resetData = () => {
    updateData(DEFAULT_DATA);
  };

  return { data, updateData, loadSampleData, resetData, isLoaded };
}