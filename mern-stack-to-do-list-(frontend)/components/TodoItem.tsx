import React, { useState, useRef, useEffect } from 'react';
import { type Todo } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { TrashIcon } from './icons/TrashIcon';
import { EditIcon } from './icons/EditIcon';
import AlertDialog from './AlertDialog';

interface TodoItemProps {
  todo: Todo;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (id: string, updatedTodo: Partial<Omit<Todo, 'id'>>) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleTodo, onDeleteTodo, onUpdateTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const [editedDescription, setEditedDescription] = useState(todo.description || '');
    const [editedDueDate, setEditedDueDate] = useState(todo.dueDate || '');
    const [isNew, setIsNew] = useState(true);
    const [isTitleEmptyError, setIsTitleEmptyError] = useState(false);
    const [feedbackAnimation, setFeedbackAnimation] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);
    const isInitialRenderForFeedback = useRef(true);

    useEffect(() => {
        // Remove the 'new' status after the entry animation completes
        const timer = setTimeout(() => setIsNew(false), 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);
    
    // Effect for feedback animations on toggle or update
    useEffect(() => {
        if (isInitialRenderForFeedback.current) {
            isInitialRenderForFeedback.current = false;
            return;
        }
        
        setFeedbackAnimation('animate-feedback');
        const timer = setTimeout(() => setFeedbackAnimation(''), 700); // Must be >= animation duration
        return () => clearTimeout(timer);
    }, [todo.completed, todo.title, todo.description, todo.dueDate]);

    const handleUpdate = () => {
        if (editedTitle.trim() === '') {
            setIsTitleEmptyError(true);
            return;
        }
        onUpdateTodo(todo.id, { 
            title: editedTitle.trim(),
            description: editedDescription.trim(),
            dueDate: editedDueDate,
        });
        setIsEditing(false);
    };
    
    const handleCancel = () => {
        setEditedTitle(todo.title);
        setEditedDescription(todo.description || '');
        setEditedDueDate(todo.dueDate || '');
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleUpdate();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };
    
    const handleCloseErrorDialog = () => {
        setIsTitleEmptyError(false);
        inputRef.current?.focus();
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString(undefined, {
             year: 'numeric', month: 'long', day: 'numeric'
        });
    };

  return (
    <li className={`group flex items-center px-6 py-4 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${isNew ? 'animate-add-item' : ''} ${feedbackAnimation} ${todo.isDeleting ? 'animate-delete-item' : ''}`}>
        <div className="flex items-center flex-grow">
            <button
                onClick={() => onToggleTodo(todo.id)}
                className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300
                ${todo.completed 
                    ? 'border-indigo-500 bg-gradient-to-br from-indigo-500 to-purple-600' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'}`}
                aria-label="Toggle task completion"
            >
                {todo.completed && <CheckIcon />}
            </button>
            <div className="ml-4 flex-grow">
                {isEditing ? (
                    <div className="flex flex-col gap-2" onKeyDown={handleKeyDown}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="w-full bg-transparent text-lg focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 border-b border-indigo-500"
                        />
                        <textarea
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            placeholder="Description"
                            rows={1}
                            className="w-full bg-transparent text-sm text-gray-500 dark:text-gray-400 focus:outline-none resize-none border-b border-indigo-300"
                        />
                        <input
                            type="date"
                            value={editedDueDate}
                            onChange={(e) => setEditedDueDate(e.target.value)}
                            className="bg-transparent text-sm text-gray-500 dark:text-gray-400 focus:outline-none w-max"
                        />
                    </div>
                ) : (
                    <div className="cursor-pointer" onClick={() => onToggleTodo(todo.id)}>
                        <p className={`transition-colors duration-300 ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
                            {todo.title}
                        </p>
                        {todo.description && (
                            <p className={`text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300 ${todo.completed ? 'line-through' : ''}`}>
                                {todo.description}
                            </p>
                        )}
                        {todo.dueDate && (
                             <p className={`text-xs mt-1 text-indigo-600 dark:text-indigo-400 transition-colors duration-300 ${todo.completed ? 'line-through' : ''}`}>
                                Due: {formatDate(todo.dueDate)}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
            {isEditing ? (
                 <>
                    <button 
                        onClick={handleUpdate} 
                        className="px-3 py-1 text-sm rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        aria-label="Save changes"
                    >
                        Save
                    </button>
                    <button 
                        onClick={handleCancel} 
                        className="px-3 py-1 text-sm rounded-md font-medium text-gray-700 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        aria-label="Cancel editing"
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <button onClick={() => setIsEditing(true)} className="p-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-500" aria-label="Edit task">
                        <EditIcon />
                    </button>
                    <button onClick={() => onDeleteTodo(todo.id)} className="p-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500" aria-label="Delete task">
                        <TrashIcon />
                    </button>
                </>
            )}
        </div>
        {isTitleEmptyError && (
            <AlertDialog
                title="Invalid Input"
                message="Task title cannot be empty. Please provide a title before saving."
                onClose={handleCloseErrorDialog}
            />
        )}
    </li>
  );
};

export default TodoItem;