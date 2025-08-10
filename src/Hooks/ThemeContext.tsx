import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface ThemeContextType {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeContextComponentProps {
  children: ReactNode;
}

export const ThemeContextComponent = ({ children }: ThemeContextComponentProps) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const storedValue = localStorage.getItem("isDark");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  const contextValue: ThemeContextType = {
    isDark,
    setIsDark,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
