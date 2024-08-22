export interface ThemeStore {
  theme: Theme;
  getTheme: () => Theme;
  toggleTheme: () => void;
}
export type Theme = "light" | "dark";
