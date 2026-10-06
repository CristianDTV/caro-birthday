import { useState } from "react";
import { motion } from "framer-motion";
import { loveNotes } from "../data/loveNotes";
import { Section } from "../components/Section";
import { SectionTitle } from "../components/SectionTitle";
import { Reveal } from "../components/Reveal";

/** Etapa 5 — tarjetas que se revelan al tocar/hacer clic. */
export function LoveNotes() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section id="love-notes" tone="cream" className="py-28">
      <SectionTitle eyebrow="pequeñas razones" title="Cosas que amo de ti" />

      <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-4">
        {loveNotes.map((note, index) => {
          const isOpen = openId === note.id;
          return (
            <Reveal key={note.id} delay={(index % 3) * 0.06}>
              <button
                onClick={() => setOpenId(isOpen ? null : note.id)}
                aria-expanded={isOpen}
                className="relative w-full min-h-[132px] rounded-sm border border-ink/10 bg-surface p-5 text-left overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <motion.div
                  initial={false}
                  animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? -6 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-5"
                >
                  <p className="font-display text-lg text-ink text-balance">{note.title}</p>
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 8 }}
                  transition={{ duration: 0.4, delay: isOpen ? 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <p className="font-serif italic text-base leading-relaxed text-accent text-balance">
                    {note.message}
                  </p>
                </motion.div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
