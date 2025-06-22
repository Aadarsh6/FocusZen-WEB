import { createContext, useContext, useState, useEffect } from "react";

export const themeContext = createContext({
  theme: "dark",
  toggleMode: () => {},
});

// Optional: Check if theme was saved in localStorage before
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"; ;

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleMode = () => {
    setTheme((prev) => {
        console.log("Toggling theme")
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
      // return newTheme because you want to update your state to the new toggled value! React needs that return value to know:✅ What should the new state be?If you don’t return it, React doesn't know what to update.
    });
  };

  return (
    <themeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </themeContext.Provider>
  );
};
export const useTheme = () => useContext(themeContext);
