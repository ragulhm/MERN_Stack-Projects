import type { ReactElement } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  id:string;
  name: string;
  level: number; // 1-100
  // Fix: Use ReactElement instead of JSX.Element to resolve namespace error.
  icon: ReactElement;
}

export interface Bio {
  name: string;
  title: string;
  summary: string;
  imageUrl: string;
}
