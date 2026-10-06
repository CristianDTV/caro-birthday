import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { openWhenLetters, OpenWhenLetter } from "../data/openWhen";
import { Section } from "../components/Section";
import { SectionTitle } from "../components/SectionTitle";
import { Reveal } from "../components/Reveal";
import { Modal } from "../components/Modal";
import { FlowerDecoration } from "../components/FlowerDecoration";

/** Etapa 6 — sobres digitales interactivos. */
export function OpenWhen() {
  const [active, setActive] = useState<OpenWhenLetter | null>(null);

  return (
    <Section id="open-when" tone="warm" className="py-28">
      <SectionTitle eyebrow="para cuando lo necesites" title="Para cuando..." />

      <div className="w-full max-w-3xl grid sm:grid-cols-2 gap-5">
        {openWhenLetters.map((letter, index) => (
          <Reveal key={letter.id} delay={(index % 2) * 0.1}>
            <button
              onClick={() => setActive(letter)}
              className="group w-full flex items-center gap-4 rounded-sm bg-surface border border-ink/10 px-5 py-5 text-left hover:border-accent/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="shrink-0 w-11 h-11 rounded-full bg-[var(--warm)] flex items-center justify-center text-accent">
                <Mail className="w-4 h-4" strokeWidth={1.5} />
              </span>
              <span className="font-serif text-lg text-ink text-balance">{letter.label}</span>
            </button>
          </Reveal>
        ))}
      </div>

      <Modal isOpen={active !== null} onClose={() => setActive(null)} labelledBy="open-when-label">
        {active && (
          <motion.div
            initial={{ rotateX: -8, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-surface rounded-sm px-8 py-10 md:px-12 md:py-14 shadow-xl text-center"
          >
            <FlowerDecoration variant="single" className="w-8 h-8 mx-auto mb-6 opacity-80" />
            <p id="open-when-label" className="font-serif italic text-accent/80 text-sm mb-4">
              {active.label}
            </p>
            <p className="font-display text-xl md:text-2xl text-ink leading-relaxed text-balance whitespace-pre-line">
              {active.message}
            </p>
          </motion.div>
        )}
      </Modal>
    </Section>
  );
}
