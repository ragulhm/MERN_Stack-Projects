
import React from 'react';
import { MOCK_BIO } from '../constants';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">About Me</h2>
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex-shrink-0">
          <img 
            src={MOCK_BIO.imageUrl} 
            alt={MOCK_BIO.name} 
            className="w-60 h-60 rounded-full object-cover shadow-lg border-4 border-gray-200 dark:border-gray-700"
          />
        </div>
        <div className="flex-grow text-lg text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed">
            <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">{MOCK_BIO.name}</h3>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">{MOCK_BIO.title}</p>
            {MOCK_BIO.summary.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
