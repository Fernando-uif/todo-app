import { useEffect, useRef } from "react";

import singleTodoStyle from "../../sass/todo/singleTodo.module.scss";
import { Icon } from "../Icon";
import { useTodosStore } from "../../store/todos/todos-store";

import type { SingleTodoProps } from "../../interfaces/SingleTodo.interface";

export const SingleTodo = ({
  text,
  isCompleted,
  todoId,
  theme,
}: SingleTodoProps) => {
  const removeTodo = useTodosStore((state) => state.removeTodo);
  const setComplete = useTodosStore((state) => state.setCompleteTodoToggle);
  const todo = useRef<HTMLDivElement>(null);
  useEffect(() => {
    todo.current?.addEventListener("dragstart", (event) => {
      event.stopPropagation();
      if (event.target === todo.current) {
        event.dataTransfer?.setData("text/plain", todoId);
        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed = "move";
        }
      }
      return;
    });
  }, [todoId]);

  return (
    <div
      className={`${singleTodoStyle["singleTodo"]} ${
        theme === "light"
          ? singleTodoStyle["singleTodo--light"]
          : singleTodoStyle["singleTodo--dark"]
      }`}
      draggable={true}
      ref={todo}
      id={todoId}
    >
      <div
        className={`${singleTodoStyle["singleTodo__wrapperTask"]}`}
        onDragStart={(event) => event.stopPropagation()}
        draggable={false}
      >
        <Icon
          name={`${
            isCompleted && theme === "light"
              ? "checkTodo"
              : !isCompleted && theme === "light"
              ? "nullTodo"
              : isCompleted && theme === "dark"
              ? "checkTodo"
              : "nullTodoDark"
          }`}
          className={`${singleTodoStyle["singleTodo__icon__check"]} ${
            theme === "light"
              ? singleTodoStyle["singleTodo__icon--light"]
              : singleTodoStyle["singleTodo__icon--dark"]
          } ${
            isCompleted ? singleTodoStyle["singleTodo__icon__complete"] : ""
          }`}
          onClick={() => setComplete(todoId)}
        />
        <span
          className={`${singleTodoStyle["singleTodo__text"]} ${
            isCompleted ? singleTodoStyle["singleTodo--complete"] : ""
          }
          ${
            theme === "light"
              ? singleTodoStyle["singleTodo__text--light"]
              : singleTodoStyle["singleTodo__text--dark"]
          } 
          ${
            theme === "light" && isCompleted
              ? singleTodoStyle["singleTodo--complete--light"]
              : theme === "dark" && isCompleted
              ? singleTodoStyle["singleTodo--complete--dark"]
              : ""
          }`}
          onDragStart={(event) => event.stopPropagation()}
          draggable={false}
        >
          {text}
        </span>
      </div>
      <Icon
        name="removeTodo"
        className={`${singleTodoStyle["singleTodo__icon__remove"]} ${
          theme === "dark"
            ? singleTodoStyle["singleTodo__icon__remove--dark"]
            : ""
        }`}
        onClick={() => removeTodo(todoId)}
      />
    </div>
  );
};
