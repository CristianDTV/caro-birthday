import emailjs from "@emailjs/browser";
import { siteConfig } from "../data/site";

/**
 * Envía un correo con EmailJS. Si no está configurado (enabled=false
 * o faltan credenciales), no hace nada — nunca rompe la experiencia
 * de ella por un error de configuración tuyo.
 *
 * El template de EmailJS debe tener estas variables disponibles:
 *   {{subject}}, {{message}}, {{girlfriend_name}}
 */
export async function sendUpdate(subject: string, message: string) {
  const { enabled, serviceId, templateId, publicKey } = siteConfig.emailjs;

  if (!enabled || !serviceId || !templateId || !publicKey) {
    return;
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        subject,
        message,
        girlfriend_name: siteConfig.girlfriendName,
      },
      { publicKey }
    );
  } catch (error) {
    // No interrumpas la experiencia de ella si el envío falla.
    console.error("No se pudo enviar la actualización por correo:", error);
  }
}
