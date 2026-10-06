import { Heart, Globe2, Laugh, Camera, Sparkles } from "lucide-react";
import { specialMoments, SpecialMoment } from "../data/specialMoments";
import { Section } from "../components/Section";
import { SectionTitle } from "../components/SectionTitle";
import { Reveal } from "../components/Reveal";

const icons: Record<SpecialMoment["icon"], typeof Heart> = {
  heart: Heart,
  globe: Globe2,
  laugh: Laugh,
  camera: Camera,
  sparkles: Sparkles,
};

/** Momentos especiales — hitos concretos, como páginas resaltadas de un diario. */
export function SpecialMoments() {
  return (
    <Section id="special-moments" tone="surface" className="py-28">
      <SectionTitle eyebrow="páginas que resalté" title="Momentos especiales" />

      <div className="w-full max-w-4xl grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {specialMoments.map((moment, index) => {
          const Icon = icons[moment.icon];
          return (
            <Reveal key={moment.id} delay={(index % 3) * 0.08}>
              <div className="h-full rounded-sm bg-blush/30 border border-ink/5 px-6 py-7 hover:bg-blush/45 transition-colors">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-surface text-accent shadow-sm mb-4">
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <h3 className="font-display text-xl text-ink mb-2 text-balance">{moment.label}</h3>
                <p className="text-base leading-relaxed text-muted font-sans">{moment.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
