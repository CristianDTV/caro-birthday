import { storyItems } from "../data/story";
import { Section } from "../components/Section";
import { SectionTitle } from "../components/SectionTitle";
import { Reveal } from "../components/Reveal";

/** Etapa 3 — línea de tiempo de la relación (data-driven). */
export function Story() {
  return (
    <Section id="story" tone="surface" className="py-28">
      <SectionTitle eyebrow="nuestra historia" title="Cómo llegamos hasta aquí" />

      <div className="relative w-full max-w-3xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-ink/10 md:-translate-x-1/2" aria-hidden="true" />

        <ol className="space-y-16">
          {storyItems.map((item, index) => {
            const isRight = index % 2 === 1;
            return (
              <li key={item.id} className="relative pl-12 md:pl-0">
                <span
                  className="absolute left-4 md:left-1/2 top-1.5 w-2.5 h-2.5 rounded-full bg-accent -translate-x-1/2"
                  aria-hidden="true"
                />
                <Reveal
                  className={`md:w-[45%] ${isRight ? "md:ml-[55%]" : "md:mr-[55%] md:text-right md:ml-0"}`}
                >
                  <p className="font-serif italic text-sm text-accent/80 mb-2">{item.date}</p>
                  <h3 className="font-display text-2xl text-ink mb-2 text-balance">{item.title}</h3>
                  <p className="text-base leading-relaxed text-muted font-sans mb-4">{item.description}</p>
                  
                  {/* AQUÍ ESTÁ LA MAGIA: 
                      Usamos una imagen estándar con 'h-auto' para que respete la proporción original de cada foto. 
                      Agregamos 'max-h-[400px] object-contain' para que las fotos verticales no se hagan gigantes. */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className={`w-full h-auto max-h-[450px] object-contain rounded-lg shadow-sm bg-ink/5 ${isRight ? "" : "md:ml-auto"}`}
                    />
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}