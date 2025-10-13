
import React from 'react';
import { type Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (id: string, updatedTodo: Partial<Omit<Todo, 'id'>>) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo, onDeleteTodo, onUpdateTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
        <p className="text-lg">Your task list is empty.</p>
        <p className="text-sm">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
