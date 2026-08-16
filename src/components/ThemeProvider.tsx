"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

export const THEME_STORAGE_KEY = "multiline-theme";
const THEME_EVENT = "multiline-theme-change";

const ThemeContext = createContext<ThemeContextValue | null>(null);

const applyThemeClass = (theme: ThemeMode) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

const getClientTheme = (): ThemeMode =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

/** Always "light" on the server and during hydration — matches SSR HTML. */
const getServerTheme = (): ThemeMode => "light";

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener(THEME_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(THEME_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
};

const emitThemeChange = () => {
  window.dispatchEvent(new Event(THEME_EVENT));
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = useSyncExternalStore(
    subscribe,
    getClientTheme,
    getServerTheme
  );

  const setTheme = useCallback((next: ThemeMode) => {
    applyThemeClass(next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    emitThemeChange();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};
