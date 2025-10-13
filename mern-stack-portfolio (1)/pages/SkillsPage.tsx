
import React from 'react';
import { MOCK_SKILLS } from '../constants';
import type { Skill } from '../types';

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
    <div className="mb-4">{skill.icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{skill.name}</h3>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <div 
        className="bg-blue-600 h-2.5 rounded-full" 
        style={{ width: `${skill.level}%` }}
      ></div>
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{skill.level}% Proficient</p>
  </div>
);

const SkillsPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Technical Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {MOCK_SKILLS.map(skill => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillsPage;
