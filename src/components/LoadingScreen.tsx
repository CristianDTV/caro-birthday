import { motion } from "framer-motion";

interface LoadingScreenProps {
  girlfriendName: string;
}

/** Pantalla de carga breve, sin spinner genérico. */
export function LoadingScreen({ girlfriendName }: LoadingScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.3em" }}
        animate={{ opacity: 1, letterSpacing: "0.05em" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-2xl md:text-3xl text-ink/70"
      >
        Para {girlfriendName}
      </motion.p>
    </motion.div>
  );
}
