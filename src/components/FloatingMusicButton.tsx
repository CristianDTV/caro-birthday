import { AnimatePresence, motion } from "framer-motion";
import { Music2, X } from "lucide-react";
import { useState } from "react";
import { AudioPlayerControls } from "../hooks/useAudioPlayer";
import { AudioPlayerUI } from "./AudioPlayerUI";

interface FloatingMusicButtonProps {
  title: string;
  artist: string;
  player: AudioPlayerControls;
}

/**
 * Reemplaza la sección completa de música: un control discreto y
 * persistente. No reproduce nada por sí solo — el audio ya se inició
 * (o no) desde el botón "Entrar" de la Intro; esto solo da acceso a
 * pausar, reanudar y ver el progreso sin interrumpir la narrativa.
 */
export function FloatingMusicButton({ title, artist, player }: FloatingMusicButtonProps) {
  const [open, setOpen] = useState(false);

  if (player.hasError) return null;

  return (
    <div className="fixed z-40 bottom-4 left-4 md:bottom-6 md:left-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-14 left-0 w-72"
          >
            <div className="relative">
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar reproductor"
                className="absolute -top-2 -right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-surface shadow-md text-ink hover:opacity-80"
              >
                <X className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <AudioPlayerUI title={title} artist={artist} player={player} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={player.isPlaying ? "Pausar música" : "Reproducir música"}
        aria-expanded={open}
        className="relative w-12 h-12 rounded-full bg-surface shadow-[0_10px_30px_-12px_rgba(30,30,30,0.4)] border border-ink/5 flex items-center justify-center text-accent hover:opacity-90 active:scale-95 transition"
      >
        <Music2 className="w-4 h-4" strokeWidth={1.5} />
        {player.isPlaying && (
          <motion.span
            className="absolute inset-0 rounded-full border border-accent/40"
            animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}
