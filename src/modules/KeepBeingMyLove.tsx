import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { commitment } from "../data/commitment";
import { Section } from "../components/Section";
import { FlowerDecoration } from "../components/FlowerDecoration";
import { sendUpdate } from "../lib/sendUpdate";

export function KeepBeingMyLove() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [committed, setCommitted] = useState(false);

  const moveNoButton = () => {
    // Genera posiciones aleatorias en los ejes X e Y para que el botón "huya"
    const maxX = 120; // Límite de movimiento a los lados
    const maxY = 100; // Límite de movimiento arriba/abajo
    
    const randomX = Math.random() * (maxX * 2) - maxX;
    const randomY = Math.random() * (maxY * 2) - maxY;

    setOffset({ x: randomX, y: randomY });
    setAttempts((a) => a + 1);
  };

  const handleYesClick = () => setCommitted(true);

  useEffect(() => {
    if (!committed) return;
    const message =
      attempts === 0
        ? "Dijo que sí a la primera ❤️"
        : `Dijo que sí ❤️ (pero antes intentó decir "no" ${attempts} ${attempts === 1 ? "vez" : "veces"} 😏)`;
    sendUpdate("💍 Sigue siendo tu amorcito", message);
  }, [committed, attempts]);

  const tease = commitment.teases[attempts % commitment.teases.length];

  return (
    <Section id="keep-being-my-love" tone="warm" className="py-28 overflow-hidden">
      <AnimatePresence mode="wait">
        {!committed ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.4 } }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-3 text-balance max-w-sm">
              {commitment.question}
            </h2>

            <p aria-live="polite" className="h-6 font-serif italic text-accent/80 text-sm mb-10">
              {attempts > 0 && tease}
            </p>

            <div className="relative flex items-center gap-6">
              {/* Botón "No" convertido en motion.button para animar su escape */}
              <motion.button
                onMouseEnter={moveNoButton} // Huye al pasar el mouse (Computadora)
                onClick={moveNoButton}      // Huye al tocarlo (Celular)
                animate={{ x: offset.x, y: offset.y }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="relative z-10 min-w-[120px] min-h-[52px] px-7 py-3 rounded-full border border-ink/20 text-ink text-base hover:border-ink/40 bg-background transition-colors focus-visible:outline-none"
              >
                {commitment.noLabel}
              </motion.button>

              {/* Botón "Sí" se queda completamente quieto */}
              <button
                onClick={handleYesClick}
                className="relative z-20 min-w-[120px] min-h-[52px] px-7 py-3 rounded-full bg-accent text-white text-base shadow-[0_8px_24px_-12px_rgba(139,58,58,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 hover:scale-105 transition-transform"
              >
                {commitment.yesLabel}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <FlowerDecoration variant="branch" className="w-32 h-20 mb-6 opacity-90" />
            <p className="font-display text-2xl md:text-3xl text-ink text-balance max-w-sm">
              {commitment.successMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}