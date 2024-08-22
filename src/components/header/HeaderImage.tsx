import headerStyles from "../../sass/header/headerImage.module.scss";
import { useThemeStore } from "../../store/theme/theme-store";
import { Todo } from "../todo/Todo";

export const HeaderImage = () => {
  const theme = useThemeStore((state) => state.getTheme());

  return (
    <section
      className={`${headerStyles["header"]} ${
        theme === "light"
          ? headerStyles["header--light"]
          : headerStyles["header--dark"]
      }`}
    >
      <Todo theme={theme} />
    </section>
  );
};
