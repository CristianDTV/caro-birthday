// Preguntas para armar "nuestra cita ideal". Cada pregunta tiene
// exactamente 4 opciones. Puedes agregar o quitar preguntas: el
// componente DatePlanner se adapta automáticamente.

export interface DateOption {
  id: string;
  label: string;
}

export interface DateQuestion {
  id: string;
  icon: "mapPin" | "utensils" | "clapperboard" | "moon";
  shortLabel: string; // se usa en el resumen final, ej. "Lugar"
  question: string;
  options: DateOption[]; // exactamente 4
}

export const datePlanIntro = "Vamos a planear nuestra cita ideal... tú decides.";

export const dateQuestions: DateQuestion[] = [
  {
    id: "place",
    icon: "mapPin",
    shortLabel: "Lugar",
    question: "¿Dónde quieres que sea nuestra cita?",
    options: [
      { id: "place-1", label: "☕ Una cafetería bonita" },
      { id: "place-2", label: "🍽️ Un restaurante" },
      { id: "place-3", label: "🌳 Un lugar al aire libre" },
      { id: "place-4", label: "🏡 Un Airbnb para nosotros" },
    ],
  },
  {
    id: "food",
    icon: "utensils",
    shortLabel: "Comida",
    question: "¿Qué se te antoja comer en nuestra cita?",
    options: [
      { id: "food-1", label: "🍕 Pizza" },
      { id: "food-2", label: "🌮 Comida mexicana" },
      { id: "food-3", label: "🍝 Comida italiana" },
      { id: "food-4", label: "🌊 Comida costeña" },
    ],
  },
  {
    id: "activity",
    icon: "clapperboard",
    shortLabel: "Actividad",
    question: "¿Qué te gustaría que hiciéramos juntos?",
    options: [
      { id: "activity-1", label: "🎬 Ver una película" },
      { id: "activity-2", label: "🚶 Dar un paseo y conversar" },
      { id: "activity-3", label: "📸 Tomarnos fotos y guardar recuerdo" },
      { id: "activity-4", label: "Todas las anteriores" },
    ],
  },
  {
    id: "time",
    icon: "moon",
    shortLabel: "Momento",
    question: "¿Cuándo te gustaría que tengamos nuestra cita?",
    options: [
      { id: "time-1", label: "📅 Un día planeado" },
      { id: "time-2", label: "✨ Un día sorpresa" },
      { id: "time-3", label: "🌅 Una tarde improvisada" },
      { id: "time-4", label: "💕 Cuando simplemente queramos vernos" },
    ],
  },
];

export const datePlanRecapTitle = "Así sería nuestra cita ideal";
export const datePlanCta = "Planeemos esta cita de verdad, pronto ❤️";
