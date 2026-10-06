import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Utensils, Clapperboard, Moon, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { dateQuestions, datePlanIntro, datePlanRecapTitle, datePlanCta, DateQuestion } from "../data/datePlanner";
import { Section } from "../components/Section";
import { SectionTitle } from "../components/SectionTitle";
import { FadeIn } from "../components/FadeIn";
import { sendUpdate } from "../lib/sendUpdate";

const icons: Record<DateQuestion["icon"], typeof MapPin> = {
  mapPin: MapPin,
  utensils: Utensils,
  clapperboard: Clapperboard,
  moon: Moon,
};

/** Etapa — ella va construyendo "nuestra cita ideal" eligiendo entre 4 opciones por pregunta. */
export function DatePlanner() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const total = dateQuestions.length;
  const isDone = stepIndex >= total;
  const currentQuestion = !isDone ? dateQuestions[stepIndex] : null;
  const sentRef = useRef(false);

  const choose = (questionId: string, optionLabel: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionLabel }));
    setStepIndex((i) => i + 1);
  };

  const recapItems = useMemo(
    () => dateQuestions.map((q) => ({ ...q, chosen: answers[q.id] })),
    [answers]
  );

  useEffect(() => {
    if (!isDone || sentRef.current) return;
    sentRef.current = true;
    const message = recapItems.map((item) => `${item.shortLabel}: ${item.chosen}`).join("\n");
    sendUpdate("💌 Eligió nuestra cita ideal", message);
  }, [isDone, recapItems]);

  return (
    <Section id="date-planner" tone="surface" className="py-28">
      <SectionTitle eyebrow="un juego rápido" title="Elige nuestra cita ideal" />

      {!isDone && (
        <p className="text-sm text-muted font-sans text-center -mt-8 mb-10">{datePlanIntro}</p>
      )}

      {/* indicador de paso propio de este módulo */}
      {!isDone && (
        <div className="flex items-center justify-center gap-2 mb-10" aria-hidden="true">
          {dateQuestions.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === stepIndex ? "w-6 bg-accent" : i < stepIndex ? "w-1.5 bg-accent/40" : "w-1.5 bg-ink/15"
              }`}
            />
          ))}
        </div>
      )}

      <div className="w-full max-w-xl min-h-[340px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentQuestion ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <h3 className="font-display text-2xl md:text-3xl text-ink text-center mb-8 text-balance">
                {currentQuestion.question}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => choose(currentQuestion.id, option.label)}
                    className="min-h-[88px] rounded-sm bg-background border border-ink/10 px-4 py-5 text-center font-serif text-lg text-ink hover:border-accent/40 hover:bg-blush/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="recap"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <FadeIn>
                <p className="font-serif italic text-accent/80 text-center mb-2">{datePlanRecapTitle}</p>
              </FadeIn>

              <div className="mt-8 space-y-3">
                {recapItems.map((item, index) => {
                  const Icon = icons[item.icon];
                  return (
                    <FadeIn key={item.id} delay={0.1 + index * 0.08}>
                      <div className="flex items-center gap-4 bg-background border border-ink/10 rounded-sm px-5 py-4">
                        <span className="shrink-0 w-9 h-9 rounded-full bg-blush/40 flex items-center justify-center text-accent">
                          <Icon className="w-4 h-4" strokeWidth={1.5} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs text-muted font-sans">{item.shortLabel}</p>
                          <p className="font-serif text-lg text-ink truncate">{item.chosen}</p>
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>

              <FadeIn delay={0.5}>
                <div className="flex items-center justify-center gap-2 mt-10 text-accent">
                  <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                  <p className="font-display text-xl text-center text-balance">{datePlanCta}</p>
                </div>
              </FadeIn>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
