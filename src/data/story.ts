// Línea de tiempo de la relación.
// Agrega, elimina o reordena los objetos libremente: el componente Story
// los renderiza dinámicamente en el orden en que aparecen aquí.

export interface StoryItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
}

export const storyItems: StoryItem[] = [
  {
    id: "story-1",
    date: "07 de Noviembre del 2023",
    title: "Nuestro primer encuentro en la oficina (Versión animada)",
    description: "Cómo empezó todo",
    image: "/images/story/01.gif",
  },
  {
    id: "story-2",
    date: "No recuerdo la fecha, no se si navidad en el intercambio Jajaja 2023",
    title: "Intercambio de regalos",
    description: "Apostamos por saber cúal era nuestro amigo secreto",
    image: "/images/story/02.webp",
  },
  {
    id: "story-3",
    date: "13 al 15 de Julio 2026",
    title: "Airbnb",
    description: "Pintando juntitos, ese día fue un recuerdo inolvidable",
    image: "/images/story/03.webp",
  },
  {
    id: "story-4",
    date: "13 de Agosto 2026",
    title: "Día de pilates",
    description: "Me gusto ese día siendo tu estudiante de pilates",
    image: "/images/story/04.webp",
  },
];
