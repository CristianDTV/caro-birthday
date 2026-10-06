export function FlowerDecoration({ className = "w-full max-w-md mx-auto h-auto mt-8" }) {
  // Función para dibujar una doble capa de pétalos y que se vean bien frondosos
  const renderPetals = (count: number, rx: number, ry: number, cy: number, color: string) =>
    Array.from({ length: count }).map((_, i) => (
      <ellipse
        key={i}
        cx="0"
        cy={cy}
        rx={rx}
        ry={ry}
        fill={color}
        transform={`rotate(${(360 / count) * i})`}
      />
    ));

  // Subcomponente interno para no repetir el código del girasol 6 veces
  const Sunflower = ({ x, y, scale = 1, rotate = 0 }: { x: number, y: number, scale?: number, rotate?: number }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotate})`}>
      {/* Capa trasera de pétalos */}
      {renderPetals(16, 7, 26, -26, "#F59E0B")} 
      {/* Capa delantera de pétalos más claros */}
      {renderPetals(12, 6, 20, -20, "#FBBF24")} 
      
      {/* Centro del girasol */}
      <circle cx="0" cy="0" r="18" fill="#451A03" />
      <circle cx="0" cy="0" r="13" fill="#78350F" stroke="#451A03" strokeWidth="2" strokeDasharray="3 3" />
    </g>
  );

  return (
    <svg
      viewBox="0 0 400 500" // <-- Proporción vertical para armar el ramo alto
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Envoltorio del ramo (Papel) */}
      <path d="M 160 400 L 240 400 L 380 120 L 20 120 Z" fill="#FDF3C7" />
      <path d="M 160 400 L 240 400 L 200 200 Z" fill="#FCE788" opacity="0.6" />

      {/* Tallos verdes asomando por debajo del papel */}
      <path d="M 175 400 L 165 440 M 190 400 L 185 450 M 210 400 L 215 445 M 225 400 L 235 440" 
            stroke="#4ADE80" strokeWidth="5" strokeLinecap="round" />

      {/* Lazo/Cinta rosa decorativa atando el ramo */}
      <path d="M 155 380 Q 200 400 245 380 L 235 410 Q 200 420 165 410 Z" fill="#F472B6" /> 
      <path d="M 200 400 Q 180 460 170 480 L 185 485 Q 195 440 210 405 Z" fill="#E11D48" />
      <path d="M 200 400 Q 220 460 230 480 L 215 485 Q 205 440 190 405 Z" fill="#E11D48" />

      {/* Hojas de relleno asomando entre los girasoles */}
      <path d="M 80 170 Q 30 140 40 100 Q 90 120 100 160 Z" fill="#4ADE80" />
      <path d="M 320 170 Q 370 140 360 100 Q 310 120 300 160 Z" fill="#4ADE80" />
      <path d="M 130 120 Q 90 70 120 30 Q 160 70 150 110 Z" fill="#22C55E" />
      <path d="M 270 120 Q 310 70 280 30 Q 240 70 250 110 Z" fill="#22C55E" />

      {/* 6 Girasoles armando la corona del ramo */}
      <Sunflower x={70} y={160} scale={1} rotate={-15} />
      <Sunflower x={330} y={160} scale={1} rotate={15} />
      <Sunflower x={130} y={80} scale={1.2} rotate={-5} />
      <Sunflower x={270} y={80} scale={1.2} rotate={5} />
      <Sunflower x={200} y={160} scale={1.4} /> {/* Girasol central más grande */}
      <Sunflower x={200} y={40} scale={1.1} />
    </svg>
  );
}