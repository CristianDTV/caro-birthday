import { useCallback, useEffect, useState } from "react";

/**
 * Hook mínimo de localStorage. Se usa únicamente para banderas de
 * experiencia (p. ej. experienceStarted, musicEnabled), nunca para
 * contenido personal.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage no disponible (modo privado, cuotas, etc.) — no romper la app.
    }
  }, [key, value]);

  const update = useCallback((next: T | ((prev: T) => T)) => {
    setValue((prev) => (next instanceof Function ? next(prev) : next));
  }, []);

  return [value, update] as const;
}
