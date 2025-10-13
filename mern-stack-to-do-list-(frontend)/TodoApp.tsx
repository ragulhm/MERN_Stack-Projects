import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { type Todo } from './types';
import Header from './components/Header';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import { useAuth } from './context/AuthContext';
import ConfirmationDialog from './components/ConfirmationDialog';
import { useToast } from './context/ToastContext';

function TodoApp() {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const [todos, setTodos] = useLocalStorage<Todo[]>(`todos_${user?.username || 'guest'}`, []);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  const addTodo = (title: string, description?: string, dueDate?: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      description,
      dueDate,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
    addToast('Task added successfully!', 'success');
  };

  const toggleTodo = (id: string) => {
    let toggledTaskTitle = '';
    let isCompleted = false;
    
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          toggledTaskTitle = todo.title;
          isCompleted = !todo.completed;
          return { ...todo, completed: isCompleted };
        }
        return todo;
      })
    );
    
    if (isCompleted) {
        addToast(`Task "${toggledTaskTitle}" marked as complete!`, 'success');
    } else {
        addToast(`Task "${toggledTaskTitle}" marked as active.`, 'info');
    }
  };

  const requestDeleteTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      setTodoToDelete(todo);
    }
  };

  const confirmDeleteTodo = () => {
    if (todoToDelete) {
      // Mark for deletion to trigger animation
      setTodos(todos.map(t => 
        t.id === todoToDelete.id ? { ...t, isDeleting: true } : t
      ));

      // Wait for animation to finish before removing from state
      setTimeout(() => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoToDelete.id));
        addToast('Task deleted.', 'info');
        setTodoToDelete(null);
      }, 500); // This duration should match the CSS animation duration
    }
  };

  const cancelDeleteTodo = () => {
    setTodoToDelete(null);
  };

  const updateTodo = (id: string, updatedTodo: Partial<Omit<Todo, 'id'>>) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      )
    );
    addToast('Task updated.', 'success');
  };
  
  const clearCompleted = () => {
    const completedCount = todos.filter(t => t.completed).length;
    if (completedCount > 0) {
        setTodos(todos.filter(todo => !todo.completed));
        addToast(`${completedCount} completed task${completedCount > 1 ? 's' : ''} cleared.`, 'info');
    }
  };
  
  const handleFilterChange = (newFilter: 'all' | 'active' | 'completed') => {
    setFilter(newFilter);
    setSearchQuery('');
  };

  const filteredTodos = todos.filter(todo => {
    const statusFilter =
      filter === 'active' ? !todo.completed : filter === 'completed' ? todo.completed : true;
      
    if (!statusFilter) return false;
    
    if (searchQuery.trim() === '') return true;

    const lowerCaseQuery = searchQuery.toLowerCase();
    const titleMatch = todo.title.toLowerCase().includes(lowerCaseQuery);
    const descriptionMatch = todo.description?.toLowerCase().includes(lowerCaseQuery) || false;

    return titleMatch || descriptionMatch;
  }).sort((a, b) => b.createdAt - a.createdAt);
  
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <>
    <div className="min-h-screen font-sans text-gray-800 transition-colors duration-500 dark:text-gray-200">
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-800 dark:to-purple-900"></div>
      <div className="relative flex flex-col items-center min-h-screen px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          <Header username={user?.username || 'User'} onLogout={logout} />
          <AddTodoForm onAddTodo={addTodo} />
          
          <div className="mt-6 relative">
             <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks by title or description..."
                className="w-full pl-4 pr-10 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-500"
                aria-label="Search tasks"
            />
            {searchQuery && (
                <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    aria-label="Clear search"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
          </div>

          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {filteredTodos.length === 0 && searchQuery.trim() !== '' ? (
                 <div className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    <p className="text-lg">No Results</p>
                    <p className="text-sm">No tasks found matching your search for "{searchQuery}".</p>
                </div>
            ) : (
                <TodoList 
                    todos={filteredTodos} 
                    onToggleTodo={toggleTodo} 
                    onDeleteTodo={requestDeleteTodo} 
                    onUpdateTodo={updateTodo}
                />
            )}
            
            {todos.length > 0 && (
                 <div className="flex items-center justify-between px-6 py-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                    <span>{activeCount} items left</span>
                    <div className="hidden sm:flex items-center space-x-2">
                        <button onClick={() => handleFilterChange('all')} className={`${filter === 'all' ? 'text-indigo-600 dark:text-indigo-400' : ''} hover:text-indigo-600 dark:hover:text-indigo-400 font-medium`}>All</button>
                        <button onClick={() => handleFilterChange('active')} className={`${filter === 'active' ? 'text-indigo-600 dark:text-indigo-400' : ''} hover:text-indigo-600 dark:hover:text-indigo-400 font-medium`}>Active</button>
                        <button onClick={() => handleFilterChange('completed')} className={`${filter === 'completed' ? 'text-indigo-600 dark:text-indigo-400' : ''} hover:text-indigo-600 dark:hover:text-indigo-400 font-medium`}>Completed</button>
                    </div>
                    <button onClick={clearCompleted} className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">Clear Completed</button>
                </div>
            )}
          </div>
          <div className="sm:hidden mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                  <button onClick={() => handleFilterChange('all')} className={`${filter === 'all' ? 'text-indigo-600 dark:text-indigo-400' : ''} hover:text-indigo-600 dark:hover:text-indigo-400 font-medium`}>All</button>
                  <button onClick={() => handleFilterChange('active')} className={`${filter === 'active' ? 'text-indigo-600 dark:text-indigo-400' : ''} hover:text-indigo-600 dark:hover:text-indigo-400 font-medium`}>Active</button>
                  <button onClick={() => handleFilterChange('completed')} className={`${filter === 'completed' ? 'text-indigo-600 dark:text-indigo-400' : ''} hover:text-indigo-600 dark:hover:text-indigo-400 font-medium`}>Completed</button>
              </div>
          </div>
        </div>
      </div>
      {todoToDelete && (
        <ConfirmationDialog
          title="Confirm Deletion"
          message={`Are you sure you want to permanently delete the task "${todoToDelete.title}"? This action cannot be undone.`}
          onConfirm={confirmDeleteTodo}
          onCancel={cancelDeleteTodo}
        />
      )}
    </div>
    <style>{`
      @keyframes slideInDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-add-item {
        animation: slideInDown 0.3s ease-out forwards;
      }
      
      @keyframes fadeOut {
        from {
          opacity: 1;
          transform: scale(1);
        }
        to {
          opacity: 0;
          transform: scale(0.9);
        }
      }
      .animate-delete-item {
        animation: fadeOut 0.5s ease-out forwards;
      }

      @keyframes flash-bg {
        0% { background-color: transparent; }
        25% { background-color: rgba(79, 70, 229, 0.1); }
        100% { background-color: transparent; }
      }
      .animate-feedback {
        animation: flash-bg 0.7s ease-out;
      }
    `}</style>
    </>
  );
}

export default TodoApp;