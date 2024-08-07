import { ChangeEvent, FormEvent, useState } from "react";
import todoStyles from "../../sass/todo/todo.module.scss";
import { Icon } from "../Icon";
import { SingleTodo } from "./SingleTodo";

import { useTodosStore } from "../../store/todos/todos-store";

export const Todo = () => {
  const setTodo = useTodosStore((state) => state.setTodo);
  const allTodos = useTodosStore((state) => state.getTodos());
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
    console.log({
      id,
      isDone: false,
      text: value,
    });
    setValue("");
  };

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
      <div className={`${todoStyles["todo__modalTodos"]}`}>
        {/* TODO Aqui va el for */}
       
        {allTodos.map((todo) => {
          return <SingleTodo isCompleted={todo.isDone} text={todo.text} />;
        })}
        <div className={`${todoStyles["todo__footerInfo"]}`}>
          <div className={`${todoStyles["todo__footerInfo__totalItems"]}`}>
            5 items left
          </div>
          <div className={`${todoStyles["todo__footerInfo__text"]}`}>
            clear completed
          </div>
        </div>
      </div>
      <div className={`${todoStyles["todo__todosDetails"]}`}>
        <div className={`${todoStyles["todo__todosDetails--item"]}`}>all</div>
        <div className={`${todoStyles["todo__todosDetails--item"]}`}>
          active
        </div>
        <div className={`${todoStyles["todo__todosDetails--item"]}`}>
          completed
        </div>
      </div>
    </section>
  );
};
