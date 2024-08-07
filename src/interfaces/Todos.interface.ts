export interface TodoStore {
  todos: Todo[];
  getTodos: () => Todo[];
  getTodoById: (id: string) => Todo | Todo[];
  setTodo: (todo: Todo) => void;
}

export interface Todo {
  text: string;
  isDone: boolean;
  id: string;
}
