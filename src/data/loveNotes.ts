// Pequeñas razones. Cada tarjeta muestra "title" y, al hacer clic,
// se revela "message". Agrega tantas como quieras.

export interface LoveNote {
  id: string;
  title: string;
  message: string;
}

export const loveNotes: LoveNote[] = [
  { id: "smile", title: "Tu sonrisa", message: "Tienes una sonrisa hermosa, que solo verla me hace pensar en ti todo el día" },
  { id: "laugh", title: "Tu risa", message: "Me encanta tu risa de bruja, cuando contamos cosas muy graciosas" },
  { id: "hands", title: "Tus manos", message: "Manos que dan gusto agarrar, tan pequeñas y preciosas" },
  { id: "voice", title: "Tu voz", message: "Una voz seria para la mayoria y una voz hermosa y tierna solamente para mi" },
  { id: "eyes", title: "Tu mirada", message: "Una miradita que encanta, además de ese color tan hermoso, una mirada llena de amor para las personas que te queremos mucho" },
  { id: "care", title: "La forma en la que cuidas a los demás", message: "La manera de ver el mundo aportando tanto con las herramientas que tienes disponibles es algo muy admirable, estoy orgullo de tí" },
  { id: "mornings", title: "Nuestras mañanas", message: "Hemos tenido esos momentos donde despertamos en la misma habitación, es algo indescriptible saber que estoy con mi amor llenó de mucho calorcito" },
  { id: "silence", title: "Nuestros silencios cómodos", message: "Cúando estudiamos, cúando pintamos, cúando simplemente necesitamos esos silencios. Me encanta esos silencios viendo su hermosa cara" },
];
