import { motion, AnimatePresence } from "framer-motion";

interface HeartParticlesProps {
  active: boolean;
}

// Posiciones y retrasos fijos (deterministas) para un único momento
// orquestado, no partículas aleatorias repartidas por toda la página.
const HEARTS = [
  { x: "18%", delay: 0, scale: 0.8 },
  { x: "38%", delay: 0.4, scale: 0.6 },
  { x: "58%", delay: 0.15, scale: 0.9 },
  { x: "76%", delay: 0.55, scale: 0.65 },
  { x: "50%", delay: 0.3, scale: 0.75 },
];

function HeartIcon({ scale }: { scale: number }) {
  return (
    <svg viewBox="0 0 24 24" width={20 * scale} height={20 * scale} fill="var(--accent)" opacity={0.5}>
      <path d="M12 21s-6.7-4.35-9.3-8.1C.9 10.1 1.6 6.6 4.6 5.2c2.2-1 4.6-.2 5.9 1.6l1.5 2 1.5-2c1.3-1.8 3.7-2.6 5.9-1.6 3 1.4 3.7 4.9 1.9 7.7C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}

/** Momento único de corazones sutiles ascendiendo, disparado una sola vez. */
export function HeartParticles({ active }: HeartParticlesProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {active &&
          HEARTS.map((heart, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0"
              style={{ left: heart.x }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.7, 0], y: -180 }}
              transition={{ duration: 3.2, delay: heart.delay, ease: "easeOut" }}
            >
              <HeartIcon scale={heart.scale} />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
