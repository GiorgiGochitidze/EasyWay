import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Language = "ge" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem("language") as Language) || "ge"
  );

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ge" ? "en" : "ge"));
  };

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
