// Sobres de "Open When". El mensaje solo se revela al abrir el sobre.

export interface OpenWhenLetter {
  id: string;
  label: string;
  message: string;
}

export const openWhenLetters: OpenWhenLetter[] = [
  { 
    id: "miss-me", 
    label: "Cuando me extrañes", 
    message: "Cierra los ojos mi amor, respira profundo y recuerda que, aunque no estemos en el mismo lugar, mi corazón siempre está contigo. Cuenta los días, las horas y los minutos mi amor, porque yo también lo estoy haciendo para volver a verte, darte un beso y abrazarte muy fuerte." 
  },
  { 
    id: "sad", 
    label: "Cuando estés triste", 
    message: "Mi amor, está bien no estar al 100% todos los días. Quiero que sepas que estoy aquí para ti, en las buenas, en las malas y en todas las que sea contigo. Eres una mujer fuerte y maravillosa. Tómate tu tiempo, respira, que yo siempre estaré aquí para sostener tu mano, para abrazarte cuando todo lo demás no sea lo que deseamos." 
  },
  { 
    id: "hard-day", 
    label: "Cuando tengas un día difícil", 
    message: "Sé que hoy fue un día pesado y que quizá sientas que estas sin energía, pero mírate mi amor, has superado el 100% de tus días malos. Estoy inmensamente orgulloso de ti, de tu esfuerzo y de tu resiliencia. Hoy te toca descansar mi vida, relajarte y dejar que yo te alegre." 
  },
  { 
    id: "smile", 
    label: "Cuando quieras sonreír", 
    message: "Solo quiero recordarte que tienes la sonrisa más hermosa del mundo mundial y que verla es una parte muy hermosa de mi vida. Espero que al leer esto se dibuje una en tu rostro. Y si no funciona, acuérdate de mis chistes buenisimos que te cuento mi amor, Te amo" 
  },
  { 
    id: "remember-love", 
    label: "Cuando necesites recordar cuánto te amo", 
    message: "Mi vida, te amo más de lo que las palabras pueden explicar. Te amo por quién eres, por cómo me haces sentir cuando estoy a tu lado y por como me haces sentir cada dia que hablo contigo, en todo momento. Nunca dudes de que eres el amor de mi vida. Siempre te voy a elegir." 
  },
  { 
    id: "remember-us", 
    label: "Cuando quieras recordarnos a nosotros", 
    message: "Pienso en cómo empezamos, en todas nuestras primeras veces y en todo lo que hemos construido juntos. Somos un equipo increíble, cada recuerdo a tu lado es mi lugar seguro. Gracias por hacer que 'nosotros' sea mi palabra favorita." 
  }
];
