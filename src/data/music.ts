// Reexporta la configuración de música desde site.ts para mantener
// un único punto de verdad, pero permite importarla de forma directa
// como pide la arquitectura de datos.
import { siteConfig } from "./site";

export const music = siteConfig.music;
