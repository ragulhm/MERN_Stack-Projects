
import React, { useState } from 'react';

interface AddTodoFormProps {
  onAddTodo: (title: string, description?: string, dueDate?: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title.trim(), description.trim(), dueDate);
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg flex flex-col gap-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Create a new todo..."
        className="w-full bg-transparent text-lg focus:outline-none placeholder-gray-400 dark:placeholder-gray-500"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a description (optional)"
        rows={2}
        className="w-full bg-transparent text-sm focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 resize-none"
      />
      <div className="flex items-center gap-4">
         <label htmlFor="dueDate" className="text-sm text-gray-500 dark:text-gray-400">Due Date:</label>
         <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-transparent text-sm focus:outline-none"
         />
         <button 
           type="submit"
           className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors"
         >
           Add Task
         </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
