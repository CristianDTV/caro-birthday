import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { lastSurprise } from "../data/finalMessage";
import { Section } from "../components/Section";
import { FlowerDecoration } from "../components/FlowerDecoration";

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
      <path d="M19 15l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15z" opacity="0.7" />
    </svg>
  );
}

export function LastSurprise() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();

  // Controlamos la secuencia de mensajes de forma segura
  useEffect(() => {
    if (!isOpen || step >= lastSurprise.lines.length - 1) return;

    const timer = setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen, step]);

  const openSurprise = () => {
    setStep(0);
    setIsOpen(true);
  };

  const closeSurprise = () => {
    setIsOpen(false);
    setStep(0);
  };

  return (
    <Section
      id="last-surprise"
      tone="cream"
      className="min-h-[60vh] py-20 flex flex-col items-center justify-center"
    >
      {/* Contenedor flotante: el botón "respira" suavemente arriba y abajo */}
      <motion.div
        className="relative"
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Halo de luz que late detrás del botón */}
        <motion.span
          aria-hidden="true"
          className="absolute -inset-2 rounded-full bg-accent blur-xl"
          initial={{ opacity: 0.35, scale: 1 }}
          animate={
            reduceMotion
              ? { opacity: 0.4 }
              : { opacity: [0.35, 0.75, 0.35], scale: [1, 1.12, 1] }
          }
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.button
          onClick={openSurprise}
          whileHover={reduceMotion ? undefined : { scale: 1.06, y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97, y: 3 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          className="
            relative overflow-hidden rounded-full
            min-h-[56px] px-9 py-4
            bg-gradient-to-b from-white/25 to-transparent bg-accent
            text-white font-display text-lg md:text-xl tracking-wide
            flex items-center gap-3
            border border-white/30
            shadow-[inset_0_2px_0_rgba(255,255,255,0.45),inset_0_-4px_0_rgba(0,0,0,0.18),0_6px_0_rgba(0,0,0,0.16),0_14px_28px_-8px_rgba(0,0,0,0.35)]
            active:shadow-[inset_0_2px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.18),0_2px_0_rgba(0,0,0,0.16),0_6px_14px_-6px_rgba(0,0,0,0.35)]
            focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 focus-visible:ring-offset-2
          "
        >
          {/* Destello que cruza el botón cada pocos segundos */}
          {!reduceMotion && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              animate={{ x: ["0%", "450%"] }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2.8,
              }}
            />
          )}

          <SparkleIcon className="relative h-5 w-5 shrink-0" />
          <span className="relative">{lastSurprise.buttonLabel}</span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={closeSurprise}
              aria-label="Cerrar"
              className="absolute top-6 right-6 min-w-[44px] min-h-[44px] text-muted hover:text-ink text-sm font-sans"
            >
              cerrar
            </button>

            <FlowerDecoration variant="branch" className="w-40 h-28 mb-10 opacity-90" />

            <div className="min-h-[120px] flex items-center justify-center text-center max-w-md">
              <AnimatePresence mode="wait">
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-2xl md:text-3xl text-ink text-balance"
                >
                  {lastSurprise.lines[step]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}