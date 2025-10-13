import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './components/AuthPage';
import TodoApp from './TodoApp';
import { ToastProvider } from './context/ToastContext';

const AppContent: React.FC = () => {
  const { token } = useAuth();
  
  if (!token) {
    return <AuthPage />;
  }

  return <TodoApp />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;