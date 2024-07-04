import { RefineThemes } from "@refinedev/antd";
import { ConfigProvider, theme } from "antd";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type ColorContextType = {
  mode: string;
  setMode: (mode: string) => void;
};

export const ColorContext = createContext<ColorContextType>({} as ColorContextType);

export const ColorContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  // const isSystemPreferenceDark = window?.matchMedia("(prefers-color-scheme: light)").matches;

  // const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(colorModeFromLocalStorage || "light");

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
    document.documentElement.classList.add(mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.documentElement.classList.remove("light");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;

  return (
    <ColorContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ConfigProvider
        // you can change the theme colors here. example: ...RefineThemes.Magenta,
        theme={{
          ...RefineThemes.Blue,
          algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ColorContext.Provider>
  );
};

export const useColorContext = () => useContext(ColorContext);
