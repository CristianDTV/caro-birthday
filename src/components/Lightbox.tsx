import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import { Memory } from "../data/memories";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface LightboxProps {
  items: Memory[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** Visor de imágenes con navegación por teclado, swipe y ESC. */
export function Lightbox({ items, activeIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = activeIndex !== null;
  const current = isOpen ? items[activeIndex as number] : null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(((activeIndex as number) + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate(((activeIndex as number) - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, activeIndex, items.length, onClose, onNavigate]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) onNavigate(((activeIndex as number) + 1) % items.length);
    else if (info.offset.x > 80) onNavigate(((activeIndex as number) - 1 + items.length) % items.length);
  };

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Visor de fotografías"
        >
          <div className="absolute inset-0 bg-ink/90" onClick={onClose} aria-hidden="true" />

          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-5 right-5 z-20 w-11 h-11 flex items-center justify-center rounded-full text-white/80 hover:text-white"
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>

          <button
            onClick={() => onNavigate(((activeIndex as number) - 1 + items.length) % items.length)}
            aria-label="Anterior"
            className="absolute left-2 md:left-6 z-20 w-11 h-11 flex items-center justify-center rounded-full text-white/70 hover:text-white"
          >
            <ChevronLeft className="w-7 h-7" strokeWidth={1.25} />
          </button>

          <motion.figure
            key={current.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 max-w-3xl w-full px-6"
          >
            <ImagePlaceholder src={current.src} alt={current.caption} aspect="aspect-[4/5] md:aspect-[16/10]" className="rounded-sm" />
            <figcaption className="mt-4 text-center text-white/90 font-hand text-2xl">
              {current.caption}
              {current.date && <span className="block text-xs text-white/50 mt-1 font-sans">{current.date}</span>}
            </figcaption>
          </motion.figure>

          <button
            onClick={() => onNavigate(((activeIndex as number) + 1) % items.length)}
            aria-label="Siguiente"
            className="absolute right-2 md:right-6 z-20 w-11 h-11 flex items-center justify-center rounded-full text-white/70 hover:text-white"
          >
            <ChevronRight className="w-7 h-7" strokeWidth={1.25} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
