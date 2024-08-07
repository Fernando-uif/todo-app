import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo, TodoStore } from "../../interfaces/Todos.interface";

export const useTodosStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      getTodos: () => {
        const { todos } = get();
        return todos;
      },
      getTodoById: (id: string) => {
        const { todos } = get();
        const uniqueTodo = todos.find((todo) => todo.id === id);
        if (!uniqueTodo) {
          return todos;
        }
        return uniqueTodo;
      },
      setTodo: (todo: Todo) => {
        const { todos } = get();
        set({ todos: [...todos, todo] });
      },
    }),
    {
      name: "todos",
    }
  )
);
