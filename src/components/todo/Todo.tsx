import { ChangeEvent, FormEvent, useState } from "react";
import todoStyles from "../../sass/todo/todo.module.scss";
import { Icon } from "../Icon";
import { SingleTodo } from "./SingleTodo";

export const Todo = () => {
  const [value, setValue] = useState("");
  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        <SingleTodo isCompleted={true} text="helllo1" />
        <SingleTodo isCompleted={false} text="helllo2" />
        <SingleTodo isCompleted={false} text="helllo3" />

        <div className={`${todoStyles["todo__"]}`}>
            
        </div>
      </div>
    </section>
  );
};
