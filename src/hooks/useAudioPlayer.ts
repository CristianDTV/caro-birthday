import { useCallback, useEffect, useRef, useState } from "react";

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isReady: boolean;
  hasError: boolean;
}

export interface AudioPlayerControls extends AudioPlayerState {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
}

/**
 * Envuelve un <audio> nativo. Si `src` está vacío o el archivo no
 * existe, hasError queda en true y el resto de la app puede seguir
 * funcionando sin el reproductor.
 */
export function useAudioPlayer(src: string): AudioPlayerControls {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.6,
    isReady: false,
    hasError: !src,
  });

  useEffect(() => {
    if (!src) {
      setState((s) => ({ ...s, hasError: true }));
      return;
    }

    const audio = new Audio(src);
    audio.volume = state.volume;
    audioRef.current = audio;

    const onLoaded = () => setState((s) => ({ ...s, duration: audio.duration || 0, isReady: true }));
    const onTime = () => setState((s) => ({ ...s, currentTime: audio.currentTime }));
    const onEnded = () => setState((s) => ({ ...s, isPlaying: false, currentTime: 0 }));
    const onError = () => setState((s) => ({ ...s, hasError: true, isPlaying: false }));

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const play = useCallback(() => {
    audioRef.current
      ?.play()
      .then(() => setState((s) => ({ ...s, isPlaying: true })))
      .catch(() => setState((s) => ({ ...s, hasError: true })));
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setState((s) => ({ ...s, isPlaying: false }));
  }, []);

  const toggle = useCallback(() => {
    if (state.isPlaying) pause();
    else play();
  }, [state.isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
    setState((s) => ({ ...s, currentTime: time }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) audioRef.current.volume = volume;
    setState((s) => ({ ...s, volume }));
  }, []);

  return { ...state, play, pause, toggle, seek, setVolume };
}
