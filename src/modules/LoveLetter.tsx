import { useState } from "react";
import { motion } from "framer-motion";
import { loveLetter, letterOpening } from "../data/letter";
import { siteConfig } from "../data/site";
import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { HeartParticles } from "../components/HeartParticles";

/** Etapa 9 — carta digital, el momento más íntimo de la experiencia. */
export function LoveLetter() {
  const [heartsActive, setHeartsActive] = useState(false);

  const paragraphs = loveLetter
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <Section id="love-letter" tone="cream" className="py-28">
      <div className="relative w-full max-w-prose mx-auto">
        <HeartParticles active={heartsActive} />

        <motion.div
          onViewportEnter={() => setHeartsActive(true)}
          viewport={{ once: true, amount: 0.5 }}
          className="relative bg-paper rounded-sm px-7 py-12 md:px-14 md:py-16 shadow-[0_30px_70px_-35px_rgba(30,30,30,0.35)] border border-ink/5"
        >
          <Reveal>
            <p className="font-hand text-3xl md:text-4xl text-accent text-center mb-2">{letterOpening}</p>
            <p className="font-serif italic text-muted text-sm text-center mb-14">
              una carta para {siteConfig.girlfriendName}
            </p>
          </Reveal>

          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <p className="font-serif text-lg md:text-xl leading-[1.9] text-ink whitespace-pre-line text-balance">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-14 text-right font-hand text-3xl text-accent">— {siteConfig.authorName}</p>
          </Reveal>
        </motion.div>
      </div>
    </Section>
  );
}
