import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { finalSequence, finalSignature } from "../data/finalMessage";
import { Section } from "../components/Section";

const LINE_DURATION = 2800; // Tiempo para que pueda leer cada frase con calma

export function FinalReveal() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const finished = step >= finalSequence.length;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!started || finished) return;
    timerRef.current = setTimeout(() => setStep((s) => s + 1), LINE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [started, step, finished]);

  return (
    <Section id="final-reveal" tone="surface" className="py-28">
      <motion.div
        onViewportEnter={() => setStarted(true)}
        viewport={{ once: true, amount: 0.6 }}
        className="w-full max-w-lg mx-auto text-center min-h-[200px] flex flex-col items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {!finished ? (
            // 1. Secuencia de mensajes ("Caro...", etc.)
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl md:text-4xl text-ink text-balance"
            >
              {finalSequence[step]}
            </motion.p>
          ) : (
            // 2. Solo la firma y el botón de repetir
            <motion.div
              key="signature"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6"
            >
              <p className="font-display text-3xl text-accent font-semibold">
                {finalSignature}
              </p>

              {/* Botón discreto para volver a ver la secuencia si se distrajo */}
              <button
                onClick={() => setStep(0)}
                className="text-xs font-sans text-muted hover:text-ink transition-colors flex items-center gap-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
                Volver a leer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}