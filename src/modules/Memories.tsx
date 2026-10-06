import { useState } from "react";
import { memories } from "../data/memories";
import { Section } from "../components/Section";
import { SectionTitle } from "../components/SectionTitle";
import { Reveal } from "../components/Reveal";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { Lightbox } from "../components/Lightbox";

// Ángulos fijos (no aleatorios) para que cada polaroid tenga una
// inclinación ligeramente distinta pero el layout sea determinista.
const ROTATIONS = ["-2.5deg", "1.5deg", "-1deg", "2deg", "-2deg", "1deg"];
const OFFSETS = ["mt-0", "mt-6", "mt-2", "mt-8", "mt-1", "mt-5"];

/** Etapa 4 — galería tipo álbum de polaroids modernas + lightbox. */
export function Memories() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Section id="memories" tone="warm" className="py-28">
      <SectionTitle eyebrow="nuestro álbum" title="Momentos que guardo" />

      <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
        {memories.map((memory, index) => {
          const rotation = ROTATIONS[index % ROTATIONS.length];
          const offset = OFFSETS[index % OFFSETS.length];
          return (
            <Reveal key={memory.id} delay={(index % 4) * 0.08} className={offset}>
              <button
                onClick={() => setActiveIndex(index)}
                style={{ transform: `rotate(${rotation})` }}
                className="group block w-full bg-surface p-3 pb-5 shadow-[0_18px_34px_-18px_rgba(30,30,30,0.35)] transition-transform duration-500 ease-out hover:!rotate-0 hover:-translate-y-1 hover:shadow-[0_24px_40px_-16px_rgba(30,30,30,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4"
                aria-label={`Ver foto: ${memory.caption}`}
              >
                <ImagePlaceholder src={memory.src} alt={memory.caption} aspect="aspect-square" className="block" />
                <p className="font-hand text-lg text-ink/80 text-center mt-3 leading-none text-balance">
                  {memory.caption}
                </p>
                {memory.date && (
                  <p className="text-[11px] text-muted font-sans text-center mt-1">{memory.date}</p>
                )}
              </button>
            </Reveal>
          );
        })}
      </div>

      <Lightbox items={memories} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onNavigate={setActiveIndex} />
    </Section>
  );
}
