import { ReactNode, forwardRef } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  tone?: "cream" | "surface" | "warm";
}

const toneStyles: Record<NonNullable<SectionProps["tone"]>, string> = {
  cream: "bg-background",
  surface: "bg-surface",
  warm: "bg-[var(--warm)]/40",
};

/**
 * Contenedor de sección con identidad visual leve, para que cada
 * etapa se sienta distinta sin romper el lenguaje visual común.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className = "", tone = "cream" }, ref) => (
    <section
      id={id}
      ref={ref}
      // Quitamos el px-6 de aquí para que la sección de color siga tocando los bordes
      className={`relative w-full min-h-screen flex flex-col items-center justify-center py-24 ${toneStyles[tone]} ${className}`}
    >
      {/* NUEVO CONTENEDOR: Limita el ancho a max-w-5xl (1024px) y lo centra */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {children}
      </div>
    </section>
  )
);
Section.displayName = "Section";