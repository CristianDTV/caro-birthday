/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        ink: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        gold: "var(--gold)",
        warm: "var(--warm)",
        blush: "var(--blush)",
        paper: "var(--paper)",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Work Sans'", "system-ui", "sans-serif"],
        hand: ["'Caveat'", "'Segoe Script'", "cursive"],
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
};
