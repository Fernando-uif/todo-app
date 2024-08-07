

import headerStyles from "../../sass/header/headerImage.module.scss";
import { Todo } from "../todo/Todo";
export const HeaderImage = () => {
  return <section className={`${headerStyles["header"]}`}>
   
    <Todo/>
  </section>;
};
