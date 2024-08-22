import { Theme } from "./Theme.interface";

export interface SingleTodoProps {
  text: string;
  isCompleted: boolean;
  todoId: string;
  theme: Theme;
}
