
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_BIO } from '../constants';

const HomePage: React.FC = () => {
  return (
    <div className="text-center flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-4xl w-full animate-fade-in-up">
        <img 
          src={MOCK_BIO.imageUrl} 
          alt={MOCK_BIO.name} 
          className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-blue-500 dark:border-blue-400 object-cover"
        />
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-2">
          {MOCK_BIO.name}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {MOCK_BIO.title}
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Welcome to my digital space. I build high-quality web applications with a focus on performance and user experience.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/projects"
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-transform duration-200"
          >
            View My Work
          </Link>
          <Link 
            to="/contact"
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-blue-700 dark:text-blue-300 bg-gray-200 dark:bg-gray-700 rounded-md shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transform hover:scale-105 transition-transform duration-200"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
