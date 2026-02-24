
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
  title: string;
  description: string;
  link: string;
}

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
  skills: string;
  links: {
    github: string;
    linkedin: string;
  };
}

const DEFAULT_DATA: ResumeData = {
  personalInfo: { name: '', email: '', phone: '', location: '' },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: '',
  links: { github: '', linkedin: '' }
};

const SAMPLE_DATA: ResumeData = {
  personalInfo: {
    name: 'Johnathan Doe',
    email: 'j.doe@premium.com',
    phone: '+44 20 7946 0958',
    location: 'London, UK'
  },
  summary: 'Architectural software engineer with 8+ years of experience in building deterministic build systems and premium SaaS platforms. Focused on performance and structural integrity.',
  education: [
    { institution: 'University of Oxford', degree: 'MSc Computer Science', year: '2016', location: 'Oxford' }
  ],
  experience: [
    {
      company: 'KodNest Systems',
      role: 'Lead Architect',
      duration: '2020 - Present',
      description: 'Spearheaded the development of the Premium Build System, reducing deployment friction by 40%.'
    }
  ],
  projects: [
    { title: 'Deterministic UI Framework', description: 'A layout engine focused on 8px grid perfection.', link: 'github.com/kodnest/ui' }
  ],
  skills: 'React, Next.js, TypeScript, Rust, Distributed Systems, UI/UX Design',
  links: { github: 'github.com/jdoe', linkedin: 'linkedin.com/in/jdoe' }
};

export function useResumeData() {
  const [data, setData] = useState<ResumeData>(DEFAULT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('ai_resume_builder_data');
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse resume data', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateData = (newData: ResumeData) => {
    setData(newData);
    localStorage.setItem('ai_resume_builder_data', JSON.stringify(newData));
  };

  const loadSampleData = () => {
    updateData(SAMPLE_DATA);
  };

  return { data, updateData, loadSampleData, isLoaded };
}
