import { useEffect, useState } from "react";

const useColorMode = () => {
  const [colorMode, setColorMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("color-theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const className = "dark";
      const bodyClass = window.document.body.classList;

      if (colorMode === "dark") {
        bodyClass.add(className);
      } else {
        bodyClass.remove(className);
      }

      localStorage.setItem("color-theme", colorMode);
    }
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;