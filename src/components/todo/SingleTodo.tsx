import singleTodoStyle from "../../sass/todo/singleTodo.module.scss";
import type { SingleTodoProps } from "../../interfaces/SingleTodo.interface";
import { Icon } from "../Icon";
import { useTodosStore } from "../../store/todos/todos-store";
import { useEffect, useRef } from "react";

export const SingleTodo = ({ text, isCompleted, todoId }: SingleTodoProps) => {
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
      className={`${singleTodoStyle["singleTodo"]}`}
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
          name={`${isCompleted ? "checkTodo" : "nullTodo"}`}
          className={`${singleTodoStyle["singleTodo__icon__check"]}`}
          onClick={() => setComplete(todoId)}
        />
        <span
          className={`${singleTodoStyle["singleTodo__text"]} ${
            isCompleted ? singleTodoStyle["singleTodo--complete"] : ""
          }`}
          onDragStart={(event) => event.stopPropagation()}
          draggable={false}
        >
          {text}
        </span>
      </div>
      <Icon
        name="removeTodo"
        className={`${singleTodoStyle["singleTodo__icon__remove"]}`}
        onClick={() => removeTodo(todoId)}
      />
    </div>
  );
};
