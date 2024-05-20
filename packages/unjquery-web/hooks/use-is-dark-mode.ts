import { useEffect, useState } from "react";

export default function useIsDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      setIsDarkMode(prefersDarkMode);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        setIsDarkMode(mediaQueryList.matches);
      };

      mediaQueryList.addEventListener("change", handleChange);

      return () => {
        mediaQueryList.removeEventListener("change", handleChange);
      };
    }
  }, []);

  return isDarkMode;
}
