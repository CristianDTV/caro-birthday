// Momentos especiales: hitos concretos y memorables (distinto de
// "loveNotes", que son cualidades/razones, no hechos puntuales).

export interface SpecialMoment {
  id: string;
  icon: "heart" | "globe" | "laugh" | "camera" | "sparkles";
  label: string;
  description: string;
}

export const specialMoments: SpecialMoment[] = [
  {
    id: "first-date",
    icon: "heart",
    label: "Nuestra primera cita",
    description: "Recuerdo claramente cuando después del flexi viernes salimos a comer helado y contarnos cosas de colegios y anécdotas, aunque la cita oficial sería la del centro histórico para mí es la cita 0, ya que los programadores contamos desde el 0 Jajaja",
  },
  {
    id: "first-trip",
    icon: "globe",
    label: "Nuestro primer viaje",
    description: "El viaje a Baños, me gustó mucho, es verdad que nos faltó hacer más cosas, ya que baños es grande, pero estoy seguro que tendremos muchos viajes más juntos, en donde pasemos días maravillosos junto a usted",
  },
  {
    id: "funniest",
    icon: "laugh",
    label: "Nuestro momento más divertido",
    description: "Yo creó que fue cuando te conté el tema de que casi fui monaguillo, mi momento más triste de niño",
  },
  {
    id: "favorite-memory",
    icon: "camera",
    label: "Nuestro recuerdo favorito",
    description: "Mi recuerdo favorito es cuando te vuelva a ver nuevamente, quisiera besaste mucho más, abrazarte mucho más, tener momentos bonitos, sin desperdiciar el tiempo que tenemos",
  },
  {
    id: "never-forget",
    icon: "sparkles",
    label: "Un momento que nunca quiero olvidar",
    description: "La vez que te pedí que fueras mi novía en el CafeLab, mi idea era que en el café aparezca ´Quieres ser mi novia?´, pero estaba tan nervicio que me olvidé de pedirlo Jajaja",
  },
];
