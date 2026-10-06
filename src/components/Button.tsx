import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "ghost";
}

/**
 * Botón base. Área táctil mínima de 44px y microinteracción sutil
 * en hover/press, sin depender de hover para funcionar en móvil.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "solid", className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 min-h-[44px] px-7 py-3 rounded-full text-base tracking-wide transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4";

    const styles =
      variant === "solid"
        ? "bg-accent text-white hover:opacity-90 active:scale-[0.97] shadow-[0_8px_24px_-12px_rgba(139,58,58,0.55)]"
        : "bg-transparent text-ink border border-ink/20 hover:border-ink/40 active:scale-[0.97]";

    return (
      <button ref={ref} className={`${base} ${styles} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
