import { siteConfig } from "../data/site";
import { useCountdown } from "../hooks/useCountdown";
import { Section } from "../components/Section";
import { Countdown } from "../components/Countdown";
import { FadeIn } from "../components/FadeIn";

/** Etapa 8 — distancia y countdown (si hay fecha configurada). */
export function Distance() {
  const countdown = useCountdown(siteConfig.reunionDate);

  return (
    <Section id="distance" tone="surface" className="py-28">
      <FadeIn className="text-center">
        <p className="font-display text-3xl md:text-4xl text-ink mb-3">
          {siteConfig.authorName} <span className="text-accent">❤</span> {siteConfig.girlfriendName}
        </p>
        <p className="text-muted font-sans text-base mb-14">Dos lugares. Una historia.</p>
      </FadeIn>

      {countdown.isConfigured && (
        <FadeIn delay={0.15}>
          <Countdown value={countdown} />
        </FadeIn>
      )}
    </Section>
  );
}
