import React, { useState, useEffect } from 'react';
import { SuccessIcon } from './icons/SuccessIcon';
import { InfoIcon } from './icons/InfoIcon';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onDismiss: () => void;
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <SuccessIcon />,
  info: <InfoIcon />,
  error: <InfoIcon />, // Using Info for error for now
};

const colors: Record<ToastType, string> = {
    success: 'bg-green-500 dark:bg-green-600',
    info: 'bg-blue-500 dark:bg-blue-600',
    error: 'bg-red-500 dark:bg-red-600',
}

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            const exitTimer = setTimeout(onDismiss, 300); // Corresponds to animation duration
            return () => clearTimeout(exitTimer);
        }, 3700); // Start exit animation before removing

        return () => clearTimeout(timer);
    }, [onDismiss]);

    const handleDismiss = () => {
        setIsExiting(true);
        setTimeout(onDismiss, 300);
    };

  return (
    <div
      className={`relative flex items-center p-4 text-white rounded-lg shadow-lg overflow-hidden ${colors[type]} ${isExiting ? 'animate-slide-out' : 'animate-slide-in'}`}
      role="alert"
    >
      <div className="flex-shrink-0 w-6 h-6">{icons[type]}</div>
      <p className="ml-3 font-medium text-sm">{message}</p>
      <button onClick={handleDismiss} className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-full inline-flex items-center justify-center hover:bg-white/20 transition-colors">
          <span className="sr-only">Dismiss</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
      </button>
       <style>{`
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
         @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        .animate-slide-in {
            animation: slideIn 0.3s ease-out forwards;
        }
        .animate-slide-out {
            animation: slideOut 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default Toast;