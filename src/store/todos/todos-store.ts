import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo, TodoStore } from "../../interfaces/Todos.interface";

export const useTodosStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      actualStatus: "all",
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
      setStatus: (status: "active" | "all" | "completed") => {
        set({ actualStatus: status });
        return;
      },
      getStatus: () => {
        const { actualStatus } = get();

        return actualStatus;
      },
      removeTodo: (todoId: string) => {
        const { todos } = get();

        const restTodos = todos.filter((todo) => todo.id !== todoId);
        set({ todos: restTodos });
        return;
      },
      setCompleteTodoToggle: (todoId: string) => {
        const { todos } = get();
        const restTodos = todos.map((todo) => {
          if (todo.id === todoId) {
            if (todo.isDone === true) {
              todo.isDone = false;
            } else {
              todo.isDone = true;
            }
          }
          return todo;
        });

        set({ todos: restTodos });
      },
    }),
    {
      name: "todos",
    }
  )
);
