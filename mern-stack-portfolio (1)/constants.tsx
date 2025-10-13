
import React from 'react';
import type { Project, Skill, Bio } from './types';

// SVG Icons for Skills
const ReactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 text-cyan-400">
    <circle cx="0" cy="0" r="2.05" fill="currentColor"></circle>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"></ellipse>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse>
    </g>
  </svg>
);

const NodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-8 h-8 text-green-500">
    <path fill="currentColor" d="M232.53,103.87,152.17,55.91a24,24,0,0,0-24.34,0L47.47,103.87a24,24,0,0,0-12,20.84v95.82a24,24,0,0,0,12,20.84l80.36,47.96a24,24,0,0,0,24.34,0l80.36-47.96a24,24,0,0,0,12-20.84V124.71A24,24,0,0,0,232.53,103.87ZM134,225.43v-41.9a8,8,0,0,0-12,0v41.9l-70.36-42V136.25a8,8,0,0,0-16,0v47.22L122,217.14a8,8,0,0,0,8,0l12.16-7.25,18.06-10.77,34.14-20.35v-47.2a8,8,0,0,0-16,0v43.43L144.1,192.3a8,8,0,0,0-8.21,1.14,8,8,0,0,0-3.89,7.11v41.52Zm84.5-98.12-20.67,12.32a8,8,0,1,0,8.34,13.7l20.67-12.32a8,8,0,0,0-8.34-13.7ZM128,24,103.8,38.54l24.34,14.5,24.34-14.5Zm-94.5,69.57L54.17,81.25a8,8,0,0,0-8.34-13.7L25.16,79.87a8,8,0,1,0,8.34,13.7Z"></path>
  </svg>
);

const MongoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-green-600">
    <path fill="currentColor" d="M16.14,4.23c-2.3-1.84-4.59-2.6-4.59-2.6s-2.29.76-4.59,2.6c-2.3,1.84-3.22,5.59-3.22,5.59s5.32,1.84,7.81,1.84,7.81-1.84,7.81-1.84-0.92-3.75-3.22-5.59m-5.33,1.15c.69,0,1.38,0,2.07.23,0,.23-.23.46-.23.69s.23.46.23.69c0,.23,0,.69,0,1.15,0,.23-.23.46-.23.46s-.23.23-.46.23c-.23.23-.46.23-.69.23-.23,0-.23,0-.23-.23s0-.23-.23-.23c-.23,0-.46,0-.46-.23s-.23-.23-.23-.46,0-.23,0-.46c0-.23,0-.46.23-.46,.23-.23.23-.46.23-.46,0-.23,0-.46.23-.69m1.15,13.82c0-1.84-1.61-4.15-1.61-4.15s1.61,2.53,1.61,4.15c0,1.61-1.15,2.07-1.15,2.07s1.15-.46,1.15-2.07"></path>
  </svg>
);

const ExpressIcon = () => (
  <span className="text-gray-500 dark:text-gray-400 font-bold text-3xl">ex</span>
);

export const MOCK_BIO: Bio = {
  name: 'Jane Doe',
  title: 'Full-Stack Developer | React & Node.js Expert',
  summary: `
    I am a passionate MERN stack developer with a knack for building elegant, efficient, and scalable web applications. 
    With over 5 years of experience, I specialize in creating dynamic user interfaces with React and robust server-side logic with Node.js and Express. 
    My goal is to translate complex business requirements into high-quality, user-centric solutions. When I'm not coding, I enjoy exploring new technologies and contributing to open-source projects.
  `,
  imageUrl: 'https://picsum.photos/id/237/400/400',
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce website with product listings, a shopping cart, user authentication, and an admin panel for managing products and orders.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'JWT'],
    imageUrl: 'https://picsum.photos/seed/project1/600/400',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: '2',
    title: 'Real-Time Chat Application',
    description: 'A responsive chat application using WebSockets for instant messaging, featuring private chats, group channels, and online user status indicators.',
    techStack: ['React', 'Node.js', 'Socket.IO', 'Tailwind CSS'],
    imageUrl: 'https://picsum.photos/seed/project2/600/400',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: '3',
    title: 'Project Management Dashboard',
    description: 'A Kanban-style project management tool that allows users to create tasks, assign them to team members, and track progress through different stages.',
    techStack: ['React', 'Firebase', 'React DnD', 'Context API'],
    imageUrl: 'https://picsum.photos/seed/project3/600/400',
    repoUrl: '#',
  },
  {
    id: '4',
    title: 'Data Visualization App',
    description: 'An application that fetches data from a third-party API and displays it in interactive charts and graphs using D3.js and Recharts.',
    techStack: ['React', 'D3.js', 'Recharts', 'TypeScript'],
    imageUrl: 'https://picsum.photos/seed/project4/600/400',
    liveUrl: '#',
    repoUrl: '#',
  },
];

export const MOCK_SKILLS: Skill[] = [
  { id: '1', name: 'React', level: 95, icon: <ReactIcon /> },
  { id: '2', name: 'Node.js', level: 90, icon: <NodeIcon /> },
  { id: '3', name: 'MongoDB', level: 85, icon: <MongoIcon /> },
  { id: '4', name: 'Express.js', level: 90, icon: <ExpressIcon /> },
  { id: '5', name: 'TypeScript', level: 88, icon: <span className="text-blue-500 font-bold text-3xl">TS</span> },
  { id: '6', name: 'Tailwind CSS', level: 98, icon: <span className="text-teal-400 font-bold text-xl">TWCSS</span> },
];
