// Galería de recuerdos. El tamaño "large" ocupa más espacio en la
// composición asimétrica del componente MemoryGallery.

export interface Memory {
  id: string;
  src: string;
  caption: string;
  date?: string;
  size?: "large" | "small";
}

export const memories: Memory[] = [
  { id: "mem-1", src: "/images/memories/01.gif", caption: "Cúando agarraste mi télefono y te tomaste fotos para que te recuerde Jajaa", size: "large" },
  { id: "mem-2", src: "/images/memories/02.webp", caption: "Nuestro lugar más sabroso de comida Jaja", size: "small" },
  { id: "mem-3", src: "/images/memories/03.webp", caption: "Es una foto que me encanta, me hace acordar a la historia del árbol de cuarzo rosadito que tenias en HIAS ", size: "small" },
  { id: "mem-4", src: "/images/memories/04.gif", caption: "Me gusta mucho hacer algo que nos gusta y competir, debemos hacer penitencias para el perdedor mi amor Jajaja", size: "small" },
  { id: "mem-5", src: "/images/memories/05.webp", caption: "Es un recuerdo que me gusta mucho, por que estoy muy orgullo de lo que estas logrando, entonces es una foto que hace referencia a tu inteligencia, diciplina por lograr algo que te gusta mucho", size: "large" },
  { id: "mem-6", src: "/images/memories/06.webp", caption: "Es una salida al oriente que me gustó mucho, yo diría que se repita cúando tengamos tiempo", size: "small" },
];
