export interface TodoStore {
  todos: Todo[];
  getStatus: () => "active" | "all" | "completed";
  actualStatus: "active" | "all" | "completed";
  getTodos: () => Todo[];
  getTodoById: (id: string) => Todo | Todo[];
  setTodo: (todo: Todo) => void;
  setStatus: (status: "active" | "all" | "completed") => void;
  removeTodo: (todoId: string) => void;
  setCompleteTodoToggle: (todoId: string) => void;
  removeCompleteTodos: () => void;
  getCompleteTodos: () => Todo[];
  getNotCompleteTodos: () => Todo[];
  moveTodo: (currentTodoId: string, setMoveTodoIs: string) => void;
}

export interface Todo {
  text: string;
  isDone: boolean;
  id: string;
}
