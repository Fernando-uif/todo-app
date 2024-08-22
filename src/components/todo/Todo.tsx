import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import todoStyles from "../../sass/todo/todo.module.scss";
import { Icon } from "../Icon";
import { SingleTodo } from "./SingleTodo";

import { useTodosStore } from "../../store/todos/todos-store";

export const Todo = () => {
  const setTodo = useTodosStore((state) => state.setTodo);
  const allTodos = useTodosStore((state) => state.getTodos());
  const setStatus = useTodosStore((state) => state.setStatus);
  const activeStatus = useTodosStore((state) => state.getStatus());
  const notCompleteTodos = useTodosStore((state) =>
    state.getNotCompleteTodos()
  );
  const completeTodos = useTodosStore((state) => state.getCompleteTodos());
  const moveTodo = useTodosStore((state) => state.moveTodo);
  const removeCompleteTodos = useTodosStore(
    (state) => state.removeCompleteTodos
  );

  const container = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState("");

  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = crypto.randomUUID();
    setTodo({
      id,
      isDone: false,
      text: value,
    });

    setValue("");
  };
  useEffect(() => {
    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const targetId = (event.target as HTMLElement).id;
      const todoId = event.dataTransfer?.getData("text/plain");

      if (todoId && targetId) {
        moveTodo(todoId, targetId);
      }
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault(); // Necesario para permitir el drop
    };

    if (container.current) {
      container.current.addEventListener("drop", handleDrop);
      container.current.addEventListener("dragover", handleDragOver);
    }
  }, [moveTodo]);

  return (
    <section className={`${todoStyles["todo"]}`}>
      <div className={`${todoStyles["todo__wrapperTitle"]}`}>
        <h1 className={`${todoStyles["todo__title"]}`}>todo</h1>
        <Icon name={`moon`} className={`${todoStyles["todo__iconTheme"]}`} />
      </div>
      <form
        className={`${todoStyles["todo__wrapperInput"]}`}
        onSubmit={handleSumbit}
      >
        <input
          type="text"
          className={`${todoStyles["todo__input"]}`}
          placeholder="Create a new todo..."
          onChange={handleValue}
          value={value}
        />
      </form>
      {/* Modal */}
      <div className={`${todoStyles["todo__modalTodos"]}`} ref={container}>
        {activeStatus === "all" ? (
          allTodos.map((todo) => {
            return (
              <SingleTodo
                isCompleted={todo.isDone}
                text={todo.text}
                todoId={todo.id}
              />
            );
          })
        ) : activeStatus === "completed" ? (
          completeTodos.map((todo) => {
            return (
              <SingleTodo
                isCompleted={todo.isDone}
                text={todo.text}
                todoId={todo.id}
              />
            );
          })
        ) : activeStatus === "active" ? (
          notCompleteTodos.map((todo) => {
            return (
              <SingleTodo
                isCompleted={todo.isDone}
                text={todo.text}
                todoId={todo.id}
              />
            );
          })
        ) : (
          <></>
        )}

        {allTodos.length ? (
          <div className={`${todoStyles["todo__footerInfo"]}`}>
            <div className={`${todoStyles["todo__footerInfo__totalItems"]}`}>
              {activeStatus === "all"
                ? allTodos.length
                : activeStatus === "active"
                ? notCompleteTodos.length
                : activeStatus === "completed"
                ? completeTodos.length
                : ""}{" "}
              items left
            </div>
            <div
              className={`${todoStyles["todo__footerInfo__text"]}`}
              onClick={() => removeCompleteTodos()}
            >
              clear completed
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={`${todoStyles["todo__todosDetails"]}`}>
        <div
          className={`${todoStyles["todo__todosDetails--item"]} ${
            activeStatus === "all"
              ? todoStyles["todo__todosDetails--active"]
              : ""
          }`}
          onClick={() => setStatus("all")}
        >
          all
        </div>
        <div
          className={`${todoStyles["todo__todosDetails--item"]} ${
            activeStatus === "active"
              ? todoStyles["todo__todosDetails--active"]
              : ""
          }`}
          onClick={() => setStatus("active")}
        >
          active
        </div>
        <div
          className={`${todoStyles["todo__todosDetails--item"]} ${
            activeStatus === "completed"
              ? todoStyles["todo__todosDetails--active"]
              : ""
          }`}
          onClick={() => setStatus("completed")}
        >
          completed
        </div>
      </div>
      {allTodos.length ? (
        <div className={`${todoStyles["todo__dragDropMessage"]}`}>
          Drag and drop to reorder list
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};
