// Configuración general del sitio.
// Personaliza estos valores sin tocar ningún componente.

export interface SiteConfig {
  girlfriendName: string;
  authorName: string;
  /** Formato ISO "YYYY-MM-DD". Déjalo vacío ("") para ocultar referencias a la fecha exacta. */
  birthday: string;
  /** Formato ISO "YYYY-MM-DDTHH:mm:ss". Déjalo vacío para ocultar el countdown. */
  reunionDate: string;
  music: {
    enabled: boolean;
    title: string;
    artist: string;
    src: string;
  };
  theme: {
    accent: string;
  };
  /**
   * Envío automático de correo (EmailJS) cuando ella termina el
   * planificador de cita y cuando responde el juego del Sí/No.
   * Ver instrucciones de configuración en el README.
   */
  emailjs: {
    enabled: boolean;
    serviceId: string;
    templateId: string;
    publicKey: string;
  };
}

export const siteConfig: SiteConfig = {
  girlfriendName: "Carola",
  authorName: "Cristian",

  birthday: "",

  reunionDate: "",

  music: {
    enabled: true,
    title: "Mi amorcito",
    artist: "Disney",
    src: "/audio/song.mp3",
  },

  theme: {
    accent: "#8B3A3A",
  },

  emailjs: {
    enabled: true,
    serviceId: "service_x37bgjv",
    templateId: "template_93sxt4n",
    publicKey: "4v1nGdruFBKM_H8Ff",
  },
};
