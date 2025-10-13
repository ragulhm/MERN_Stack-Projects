
export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  createdAt: number;
  isDeleting?: boolean;
}