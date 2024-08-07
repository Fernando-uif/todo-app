import singleTodoStyle from "../../sass/todo/singleTodo.module.scss";
import type { SingleTodoProps } from "../../interfaces/SingleTodo.interface";
import { Icon } from "../Icon";

export const SingleTodo = ({ text, isCompleted }: SingleTodoProps) => {
  return (
    <div  className={`${singleTodoStyle["singleTodo"]}`} draggable={true}>
      <div className={`${singleTodoStyle["singleTodo__wrapperTask"]}`}>
        <Icon
          name={`${isCompleted ? "checkTodo" : "nullTodo"}`}
          className={`${singleTodoStyle["singleTodo__icon__check"]}`}
        />
        <span className={`${singleTodoStyle["singleTodo__text"]}`}>{text}</span>
      </div>
      <Icon
        name="removeTodo"
        className={`${singleTodoStyle["singleTodo__icon__remove"]}`}
      />
    </div>
  );
};
