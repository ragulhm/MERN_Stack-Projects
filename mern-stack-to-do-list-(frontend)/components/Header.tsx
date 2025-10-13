import React from 'react';

interface HeaderProps {
    username: string;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  return (
    <header className="flex justify-between items-center mb-8 w-full">
      <h1 className="text-4xl font-bold tracking-widest text-white uppercase">
        Todo
      </h1>
      <div className="flex items-center space-x-4 text-white">
          <span>Welcome, <span className="font-semibold">{username}</span></span>
          <button 
            onClick={onLogout}
            className="px-3 py-1.5 text-sm font-medium bg-white/20 rounded-md hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          >
              Logout
          </button>
      </div>
    </header>
  );
};

export default Header;
