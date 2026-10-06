import { Pause, Play, Volume1, VolumeX } from "lucide-react";
import { useState } from "react";
import { AudioPlayerControls } from "../hooks/useAudioPlayer";

interface AudioPlayerUIProps {
  title: string;
  artist: string;
  player: AudioPlayerControls;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Reproductor discreto: título, artista, play/pause, progreso y volumen. */
export function AudioPlayerUI({ title, artist, player }: AudioPlayerUIProps) {
  const [showVolume, setShowVolume] = useState(false);
  const progress = player.duration > 0 ? (player.currentTime / player.duration) * 100 : 0;

  if (player.hasError) {
    return (
      <div className="w-full max-w-sm mx-auto text-center text-sm text-muted font-sans py-6">
        [INSERTAR CANCIÓN] — agrega el archivo de audio en <code>/public/audio</code>.
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-surface/80 backdrop-blur-sm rounded-2xl px-6 py-5 shadow-[0_20px_50px_-30px_rgba(30,30,30,0.35)] border border-ink/5">
      <div className="flex items-center gap-4">
        <button
          onClick={player.toggle}
          aria-label={player.isPlaying ? "Pausar" : "Reproducir"}
          className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full bg-accent text-white hover:opacity-90 active:scale-95 transition"
        >
          {player.isPlaying ? <Pause className="w-4 h-4" fill="currentColor" /> : <Play className="w-4 h-4 ml-0.5" fill="currentColor" />}
        </button>

        <div className="min-w-0 flex-1">
          <p className="font-serif text-[15px] text-ink truncate">{title}</p>
          <p className="text-xs text-muted truncate">{artist}</p>
        </div>

        <button
          onClick={() => setShowVolume((v) => !v)}
          aria-label="Volumen"
          className="w-11 h-11 shrink-0 flex items-center justify-center text-muted hover:text-ink"
        >
          {player.volume === 0 ? <VolumeX className="w-4 h-4" strokeWidth={1.5} /> : <Volume1 className="w-4 h-4" strokeWidth={1.5} />}
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3 text-[11px] text-muted font-sans">
        <span className="w-9 text-right">{formatTime(player.currentTime)}</span>
        <input
          type="range"
          min={0}
          max={player.duration || 0}
          value={player.currentTime}
          onChange={(e) => player.seek(Number(e.target.value))}
          aria-label="Progreso de la canción"
          className="flex-1 accent-[var(--accent)] h-1"
          style={{ background: `linear-gradient(to right, var(--accent) ${progress}%, var(--warm) ${progress}%)` }}
        />
        <span className="w-9">{formatTime(player.duration)}</span>
      </div>

      {showVolume && (
        <div className="mt-3 flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={player.volume}
            onChange={(e) => player.setVolume(Number(e.target.value))}
            aria-label="Volumen"
            className="w-full accent-[var(--accent)] h-1"
          />
        </div>
      )}
    </div>
  );
}
