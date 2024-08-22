import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import todoStyles from "../../sass/todo/todo.module.scss";
import { Icon } from "../Icon";
import { SingleTodo } from "./SingleTodo";

import { useTodosStore } from "../../store/todos/todos-store";

import { Theme } from "../../interfaces/";
import { useThemeStore } from "../../store/theme/theme-store";

export const Todo = ({ theme }: { theme: Theme }) => {
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
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

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
  useEffect(() => {
    if (theme === "light") {
      (
        document.querySelector("body") || document.createElement("body")
      ).style.backgroundColor = "#FAFAFA";
      return;
    }
    (
      document.querySelector("body") || document.createElement("body")
    ).style.backgroundColor = "#171823";
  }, [theme]);

  const handleChangeBodyColor = () => {
    if (theme === "light") {
      (
        document.querySelector("body") || document.createElement("body")
      ).style.backgroundColor = "#171823";
      return;
    }

    (
      document.querySelector("body") || document.createElement("body")
    ).style.backgroundColor = "#FAFAFA";
  };

  return (
    <section className={`${todoStyles["todo"]}`}>
      <div className={`${todoStyles["todo__wrapperTitle"]}`}>
        <h1 className={`${todoStyles["todo__title"]}`}>todo</h1>
        <Icon
          name={`${theme === "light" ? "moon" : "sun"}`}
          className={`${todoStyles["todo__iconTheme"]}`}
          onClick={() => {
            toggleTheme();
            handleChangeBodyColor();
          }}
        />
      </div>
      <form
        className={`${todoStyles["todo__wrapperInput"]} ${
          theme === "light"
            ? todoStyles["todo__wrapperInput--light"]
            : todoStyles["todo__wrapperInput--dark"]
        }`}
        onSubmit={handleSumbit}
      >
        <input
          type="text"
          className={`${todoStyles["todo__input"]} ${
            theme === "dark" ? todoStyles["todo__input--dark"] : ""
          }`}
          placeholder="Create a new todo..."
          onChange={handleValue}
          value={value}
        />
      </form>
      {/* Modal */}
      <div
        className={`${todoStyles["todo__modalTodos"]} ${
          theme === "light" ? todoStyles["todo__modalTodos--light"] : ""
        }`}
        ref={container}
      >
        {activeStatus === "all" ? (
          allTodos.map((todo) => {
            return (
              <SingleTodo
                isCompleted={todo.isDone}
                text={todo.text}
                todoId={todo.id}
                theme={theme}
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
                theme={theme}
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
                theme={theme}
              />
            );
          })
        ) : (
          <></>
        )}

        {allTodos.length ? (
          <div
            className={`${todoStyles["todo__footerInfo"]} ${
              theme === "dark" ? todoStyles["todo__footerInfo--dark"] : ""
            }`}
          >
            <div
              className={`${todoStyles["todo__footerInfo__text"]} ${
                theme === "dark"
                  ? todoStyles["todo__footerInfo__text--dark"]
                  : todoStyles["todo__footerInfo__text--light"]
              }`}
            >
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
              className={`${todoStyles["todo__todosDetails"]} ${
                todoStyles["todo__todosDetails--desktop"]
              } ${
                theme === "dark"
                  ? todoStyles["todo__todosDetails--desktop--dark"]
                  : ""
              }`}
            >
              <div
                className={`${todoStyles["todo__todosDetails--item"]} ${
                  activeStatus === "all"
                    ? todoStyles["todo__todosDetails--active"]
                    : ""
                } ${
                  theme === "light"
                    ? todoStyles["todo__todosDetails--item--light"]
                    : todoStyles["todo__todosDetails--item--dark"]
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
                }
                ${
                  theme === "light"
                    ? todoStyles["todo__todosDetails--item--light"]
                    : todoStyles["todo__todosDetails--item--dark"]
                }
                `}
                onClick={() => setStatus("active")}
              >
                active
              </div>
              <div
                className={`${todoStyles["todo__todosDetails--item"]} ${
                  activeStatus === "completed"
                    ? todoStyles["todo__todosDetails--active"]
                    : ""
                } ${
                  theme === "light"
                    ? todoStyles["todo__todosDetails--item--light"]
                    : todoStyles["todo__todosDetails--item--dark"]
                }`}
                onClick={() => setStatus("completed")}
              >
                completed
              </div>
            </div>
            <div
              className={`${todoStyles["todo__footerInfo__text"]} ${
                theme === "light"
                  ? todoStyles["todo__footerInfo__text--light"]
                  : todoStyles["todo__footerInfo__text--dark"]
              }`}
              onClick={() => removeCompleteTodos()}
            >
              clear completed
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      {allTodos.length ? (
        <div
          className={`${todoStyles["todo__todosDetails"]} ${
            todoStyles["todo__todosDetails--mobile"]
          } 
    ${theme === "dark" ? todoStyles["todo__todosDetails--mobile--dark"] : ""}
    `}
        >
          <div
            className={`${todoStyles["todo__todosDetails--item"]} ${
              activeStatus === "all"
                ? todoStyles["todo__todosDetails--active"]
                : ""
            }
      ${
        theme === "light"
          ? todoStyles["todo__todosDetails--item--light"]
          : todoStyles["todo__todosDetails--item--dark"]
      }
      `}
            onClick={() => setStatus("all")}
          >
            all
          </div>
          <div
            className={`${todoStyles["todo__todosDetails--item"]} ${
              activeStatus === "active"
                ? todoStyles["todo__todosDetails--active"]
                : ""
            }
      ${
        theme === "light"
          ? todoStyles["todo__todosDetails--item--light"]
          : todoStyles["todo__todosDetails--item--dark"]
      }
      `}
            onClick={() => setStatus("active")}
          >
            active
          </div>
          <div
            className={`${todoStyles["todo__todosDetails--item"]} ${
              activeStatus === "completed"
                ? todoStyles["todo__todosDetails--active"]
                : ""
            }
      ${
        theme === "light"
          ? todoStyles["todo__todosDetails--item--light"]
          : todoStyles["todo__todosDetails--item--dark"]
      }
      `}
            onClick={() => setStatus("completed")}
          >
            completed
          </div>
        </div>
      ) : (
        <></>
      )}

      {activeStatus === "all" && allTodos.length >= 2 ? (
        <div className={`${todoStyles["todo__dragDropMessage"]}`}>
          Drag and drop to reorder list
        </div>
      ) : activeStatus === "active" && notCompleteTodos.length >= 2 ? (
        <div className={`${todoStyles["todo__dragDropMessage"]}`}>
          Drag and drop to reorder list
        </div>
      ) : activeStatus === "completed" && completeTodos.length >= 2 ? (
        <div className={`${todoStyles["todo__dragDropMessage"]}`}>
          Drag and drop to reorder list
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};
