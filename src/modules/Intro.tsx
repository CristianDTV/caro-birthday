import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "../data/site";
import { Button } from "../components/Button";
import { FlowerDecoration } from "../components/FlowerDecoration";

interface IntroProps {
  onEnter: () => void;
}

/** Etapa 1 — pantalla de entrada. */
export function Intro({ onEnter }: IntroProps) {
  return (
    <section
      id="intro"
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-center px-6 text-center bg-background overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--warm)_0%,_transparent_65%)] opacity-60" aria-hidden="true" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative font-serif italic text-accent/80 text-lg mb-6"
      >
        Para ti, {siteConfig.girlfriendName}.
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative font-display text-4xl sm:text-5xl md:text-6xl text-ink text-balance max-w-xl"
      >
        Preparé algo para ti.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-6 max-w-md text-base leading-relaxed text-muted font-sans text-balance"
      >
        Aunque hoy la distancia nos separe, quería encontrar una manera de estar contigo.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-12"
      >
        <Button onClick={onEnter}>Entrar ❤️</Button>
      </motion.div>

      <FlowerDecoration variant="single" className="relative w-10 h-10 mt-14 opacity-80" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-7 flex flex-col items-center gap-1 text-ink/40"
        aria-hidden="true"
      >
        <span className="text-[11px] font-sans tracking-wide">desliza para descubrir más</span>
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
        </motion.span>
      </motion.div>
    </section>
  );
}
