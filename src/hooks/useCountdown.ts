import { useEffect, useState } from "react";

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

const EMPTY: CountdownValue = { days: 0, hours: 0, minutes: 0, seconds: 0, expired: false };

function computeCountdown(target: number): CountdownValue {
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

/**
 * targetDate: string ISO. Si viene vacío/indefinido o es inválido,
 * el hook devuelve un estado neutro y expired=false para que la UI
 * pueda ocultar el countdown sin romperse.
 */
export function useCountdown(targetDate?: string) {
  const targetTime = targetDate ? new Date(targetDate).getTime() : NaN;
  const isValid = !Number.isNaN(targetTime);

  const [value, setValue] = useState<CountdownValue>(() =>
    isValid ? computeCountdown(targetTime) : EMPTY
  );

  useEffect(() => {
    if (!isValid) {
      setValue(EMPTY);
      return;
    }
    setValue(computeCountdown(targetTime));
    const interval = setInterval(() => {
      setValue(computeCountdown(targetTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetTime, isValid]);

  return { ...value, isConfigured: isValid };
}
