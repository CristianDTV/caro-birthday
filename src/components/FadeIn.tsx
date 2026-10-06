import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  duration?: number;
}

/**
 * Aparición suave (fade + desplazamiento mínimo). Pensado para
 * elementos individuales dentro de una misma secuencia orquestada,
 * no para aplicar a todo indiscriminadamente.
 */
export function FadeIn({ children, delay = 0, y = 16, className = "", duration = 0.9 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
