import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { Section } from "../components/Section";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { FadeIn } from "../components/FadeIn";

/** Etapa 2 — bienvenida emocional. */
export function Welcome() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <Section id="welcome" tone="cream">
      <div ref={ref} className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-4xl w-full">
        <FadeIn className="order-2 md:order-1">
          <p className="font-serif italic text-accent/80 text-base mb-3">hoy</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-6 text-balance">Hoy es tu día.</h2>
          <p className="text-base leading-relaxed text-muted max-w-sm font-sans">
            En este día tan especial para usted mi amor, quisiera decirte que estoy muy agradecido de estar junto a usted. He preparado muchas cosas diferentes, esperó que en tu día, recuerdes lo increible persona que eres para mí y para toda la gente que te apoya, te amo mi vida ❤️.
          </p>
        </FadeIn>

        <motion.div style={{ y }} className="order-1 md:order-2">
          <ImagePlaceholder
            src="/images/story/welcome.webp"
            alt="Foto de Caro"
            aspect="aspect-[4/5]"
            className="rounded-sm shadow-[0_30px_60px_-30px_rgba(30,30,30,0.35)]"
          />
        </motion.div>
      </div>
    </Section>
  );
}
