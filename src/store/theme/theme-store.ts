import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeStore } from "../../interfaces/";

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "light",
      getTheme: () => {
        const { theme } = get();
        return theme;
      },
      toggleTheme: () => {
        const currentTheme = get().getTheme();
        const theme = currentTheme === "light" ? "dark" : "light";
        set({ theme });
      },
    }),
    {
      name: "theme",
    }
  )
);
