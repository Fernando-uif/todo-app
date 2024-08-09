import singleTodoStyle from "../../sass/todo/singleTodo.module.scss";
import type { SingleTodoProps } from "../../interfaces/SingleTodo.interface";
import { Icon } from "../Icon";
import { useTodosStore } from "../../store/todos/todos-store";

export const SingleTodo = ({ text, isCompleted, todoId }: SingleTodoProps) => {
  const removeTodo = useTodosStore((state) => state.removeTodo);
  const setComplete = useTodosStore((state) => state.setCompleteTodoToggle);

  return (
    <div className={`${singleTodoStyle["singleTodo"]}`}>
      <div className={`${singleTodoStyle["singleTodo__wrapperTask"]}`}>
        <Icon
          name={`${isCompleted ? "checkTodo" : "nullTodo"}`}
          className={`${singleTodoStyle["singleTodo__icon__check"]}`}
          onClick={() => setComplete(todoId)}
        />
        <span className={`${singleTodoStyle["singleTodo__text"]}`}>{text}</span>
      </div>
      <Icon
        name="removeTodo"
        className={`${singleTodoStyle["singleTodo__icon__remove"]}`}
        onClick={() => removeTodo(todoId)}
      />
    </div>
  );
};
