import { useEffect, useState } from "react";

/**
 * Observa una lista de elementos por id y devuelve el índice del que
 * está actualmente más visible en el viewport. Se usa para el
 * indicador de progreso de la experiencia.
 */
export function useActiveSection(ids: string[]) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const index = ids.indexOf(visible.target.id);
          if (index !== -1) setActiveIndex(index);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-10% 0px -10% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeIndex;
}
