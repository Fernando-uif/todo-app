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
        set({ todos: [todo, ...todos] });
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
      removeCompleteTodos: () => {
        const { todos } = get();
        const restTodos = todos.filter((todo) => todo.isDone === false);
        set({ todos: restTodos });
      },
      getCompleteTodos: () => {
        const { todos } = get();
        const restCompleteTodos = todos.filter((todo) => todo.isDone === true);
        return restCompleteTodos;
      },
      getNotCompleteTodos: () => {
        const { todos } = get();
        const restCompleteTodos = todos.filter((todo) => todo.isDone === false);
        return restCompleteTodos;
      },
      moveTodo: (currentTodoId: string, setMoveTodoId: string) => {
        const todos = get().getTodos();
        if (!currentTodoId || !setMoveTodoId) return;
        const currentTodoIndex = todos.indexOf(
          todos.find((todo) => todo.id === currentTodoId) || todos[0]
        );
        const setMoveTodoIndex = todos.indexOf(
          todos.find((todo) => todo.id === setMoveTodoId) || todos[0]
        );
        const [todoToMove] = todos.splice(currentTodoIndex, 1);

        const newPosition = setMoveTodoIndex + 1;

        const safeNewPosition = Math.min(newPosition, todos.length);

        todos.splice(safeNewPosition, 0, todoToMove);

        set({ todos });
      },
    }),
    {
      name: "todos",
    }
  )
);
