import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T)
) => {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);

    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
};
