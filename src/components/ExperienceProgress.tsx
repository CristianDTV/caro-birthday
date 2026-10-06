import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface ExperienceProgressProps {
  current: number;
  total: number;
}

/**
 * Indicador discreto de avance dentro de la historia, con una
 * pequeña flecha animada que sugiere "sigue bajando" mientras no sea
 * la última sección.
 */
export function ExperienceProgress({ current, total }: ExperienceProgressProps) {
  const percent = ((current + 1) / total) * 100;
  const isLast = current >= total - 1;

  return (
    <div
      className="fixed z-40 flex items-center gap-3 text-ink/50 font-sans text-[11px] tracking-wide
                 bottom-4 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:translate-x-0 md:right-6 md:top-1/2 md:-translate-y-1/2 md:flex-col"
      aria-hidden="true"
    >
      <span className="tabular-nums">{String(current + 1).padStart(2, "0")}</span>

      {/* barra horizontal — móvil */}
      <div className="relative w-24 h-px bg-ink/10 overflow-hidden md:hidden">
        <div className="absolute left-0 top-0 h-px bg-accent/60 transition-all duration-500 ease-out" style={{ width: `${percent}%` }} />
      </div>

      {/* barra vertical — desktop */}
      <div className="hidden md:block relative w-px h-24 bg-ink/10 overflow-hidden">
        <div className="absolute left-0 top-0 w-px bg-accent/60 transition-all duration-500 ease-out" style={{ height: `${percent}%` }} />
      </div>

      <span className="tabular-nums">{String(total).padStart(2, "0")}</span>

      {!isLast && (
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-accent/70 md:mt-1"
        >
          <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
        </motion.span>
      )}
    </div>
  );
}
