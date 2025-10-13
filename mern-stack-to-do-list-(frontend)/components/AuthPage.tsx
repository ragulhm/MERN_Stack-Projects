import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup, error } = useAuth();
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!username.trim() || !password.trim()) {
      setLocalError('Username and password cannot be empty.');
      return;
    }
    try {
      if (isLoginView) {
        await login(username, password);
      } else {
        await signup(username, password);
      }
    } catch (err: any) {
      // The context will set its own error message, which is caught by the useEffect
    }
  };
  
  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setLocalError(null);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans bg-gray-100 dark:bg-gray-900">
       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-800 dark:to-purple-900"></div>
       <div className="relative w-full max-w-sm p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
         <div>
           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
             {isLoginView ? 'Sign in to your account' : 'Create a new account'}
           </h2>
         </div>
         <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
           <div className="rounded-md shadow-sm -space-y-px">
             <div>
               <label htmlFor="username" className="sr-only">Username</label>
               <input
                 id="username"
                 name="username"
                 type="text"
                 autoComplete="username"
                 required
                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                 placeholder="Username"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
               />
             </div>
             <div>
               <label htmlFor="password" className="sr-only">Password</label>
               <input
                 id="password"
                 name="password"
                 type="password"
                 autoComplete={isLoginView ? "current-password" : "new-password"}
                 required
                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                 placeholder="Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
               />
             </div>
           </div>
           
           {localError && (
               <p className="text-sm text-red-500 text-center">{localError}</p>
           )}

           <div>
             <button
               type="submit"
               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
             >
               {isLoginView ? 'Sign in' : 'Sign up'}
             </button>
           </div>
           
           <div className="text-sm text-center">
             <button type="button" onClick={toggleView} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none">
               {isLoginView ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
             </button>
           </div>
         </form>
       </div>
     </div>
  );
};

export default AuthPage;
