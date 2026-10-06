interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
}

/**
 * Encabezado de sección. El "eyebrow" es opcional y minúsculo/itálico,
 * nunca ALL-CAPS, y solo se usa cuando aporta contexto real.
 */
export function SectionTitle({ eyebrow, title, align = "center" }: SectionTitleProps) {
  return (
    <div className={`mb-12 max-w-2xl ${align === "center" ? "text-center mx-auto" : "text-left"}`}>
      {eyebrow && (
        <p className="font-serif italic text-[15px] text-accent/80 mb-3">{eyebrow}</p>
      )}
      <h2 className="font-display text-4xl md:text-5xl text-ink text-balance">{title}</h2>
    </div>
  );
}
