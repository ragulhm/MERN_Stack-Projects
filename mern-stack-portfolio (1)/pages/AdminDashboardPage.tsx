
import React, { useState } from 'react';
import { MOCK_PROJECTS, MOCK_SKILLS, MOCK_BIO } from '../constants';
import type { Project, Skill, Bio } from '../types';

// Define components inside the main file but outside the main component body.
const BioEditor: React.FC<{ bio: Bio, onSave: (updatedBio: Bio) => void }> = ({ bio, onSave }) => {
    const [formData, setFormData] = useState(bio);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full input-style" />
            </div>
            <div>
                <label className="block text-sm font-medium">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full input-style" />
            </div>
            <div>
                <label className="block text-sm font-medium">Summary</label>
                <textarea name="summary" value={formData.summary} onChange={handleChange} rows={5} className="mt-1 block w-full input-style" />
            </div>
            <button onClick={() => onSave(formData)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Bio</button>
        </div>
    );
};


const ProjectEditor: React.FC<{ projects: Project[], onUpdate: (projects: Project[]) => void }> = ({ projects, onUpdate }) => {
    return (
        <div className="space-y-4">
            {projects.map((p, i) => (
                <div key={p.id} className="p-4 border dark:border-gray-700 rounded-md">
                    <h4 className="font-bold">{p.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{p.description}</p>
                    <div className="mt-2 text-right">
                        <button className="text-sm px-3 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600">Edit</button>
                        <button className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                    </div>
                </div>
            ))}
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add New Project</button>
        </div>
    );
};


const SkillsEditor: React.FC<{ skills: Skill[], onUpdate: (skills: Skill[]) => void }> = ({ skills, onUpdate }) => {
    return (
         <div className="space-y-4">
            {skills.map((s, i) => (
                <div key={s.id} className="p-4 border dark:border-gray-700 rounded-md flex items-center justify-between">
                    <div>
                        <h4 className="font-bold">{s.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Level: {s.level}%</p>
                    </div>
                    <div className="text-right">
                        <button className="text-sm px-3 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600">Edit</button>
                        <button className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                    </div>
                </div>
            ))}
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add New Skill</button>
        </div>
    );
};

const AdminDashboardPage: React.FC = () => {
  const [bio, setBio] = useState(MOCK_BIO);
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [skills, setSkills] = useState(MOCK_SKILLS);
  const [activeTab, setActiveTab] = useState('bio');

  const handleSaveBio = (updatedBio: Bio) => {
    setBio(updatedBio);
    alert('Bio updated! (Note: Changes are not persistent and will reset on refresh)');
  };

  const tabs = [
      { id: 'bio', label: 'Bio / About Info' },
      { id: 'projects', label: 'Projects' },
      { id: 'skills', label: 'Skills' },
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Admin Dashboard</h2>
      
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                        activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
      </div>

      <div className="p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md mb-6">
          <p><strong>Note:</strong> This is a simulated admin panel. Any changes made here are stored in the browser's memory and will be lost upon reloading the page. In a full MERN application, these actions would interact with a backend API and a database.</p>
      </div>

      <div className="mt-6">
        {activeTab === 'bio' && <BioEditor bio={bio} onSave={handleSaveBio} />}
        {activeTab === 'projects' && <ProjectEditor projects={projects} onUpdate={setProjects} />}
        {activeTab === 'skills' && <SkillsEditor skills={skills} onUpdate={setSkills} />}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
