import { CountdownValue } from "../hooks/useCountdown";

interface CountdownProps {
  value: CountdownValue;
}

const units: Array<{ key: keyof Omit<CountdownValue, "expired">; label: string }> = [
  { key: "days", label: "días" },
  { key: "hours", label: "horas" },
  { key: "minutes", label: "min" },
  { key: "seconds", label: "seg" },
];

/** Presentación visual del countdown. No decide si mostrarse u ocultarse. */
export function Countdown({ value }: CountdownProps) {
  if (value.expired) {
    return (
      <p className="font-serif italic text-2xl md:text-3xl text-accent text-center text-balance">
        Ya falta poco para volver a verte ❤️
      </p>
    );
  }

  return (
    <div className="flex items-start justify-center gap-6 md:gap-10">
      {units.map((unit) => (
        <div key={unit.key} className="flex flex-col items-center">
          <span className="font-display text-4xl md:text-6xl text-ink tabular-nums">
            {String(value[unit.key]).padStart(2, "0")}
          </span>
          <span className="mt-1 text-xs text-muted font-sans">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
