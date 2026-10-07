interface FlowerDecorationProps {
  variant?: "single" | "branch" | "field";
  className?: string;
}

export function FlowerDecoration({
  variant = "single",
  className = "w-full max-w-md mx-auto h-auto mt-8",
}: FlowerDecorationProps) {
  const Sunflower = ({
    x,
    y,
    scale = 1,
    rotate = 0,
  }: {
    x: number;
    y: number;
    scale?: number;
    rotate?: number;
  }) => (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      {/* Pétalos */}
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy="-13"
          rx="5"
          ry="14"
          fill={i % 2 === 0 ? "#FBBF24" : "#F59E0B"}
          transform={`rotate(${i * 30})`}
        />
      ))}

      {/* Centro */}
      <circle cx="0" cy="0" r="9" fill="#78350F" />
      <circle
        cx="0"
        cy="0"
        r="6"
        fill="#451A03"
        stroke="#92400E"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
    </g>
  );

  if (variant === "single") {
    return (
      <svg
        viewBox="0 0 60 60"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M30 56 C30 43 31 35 30 27"
          stroke="#4ADE80"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M30 43 C23 39 19 40 16 43 C22 45 27 45 30 43Z"
          fill="#22C55E"
        />
        <Sunflower x={30} y={22} scale={0.9} />
      </svg>
    );
  }

  if (variant === "branch") {
    return (
      <svg
        viewBox="0 0 180 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        aria-hidden="true"
      >
        {/* Rama */}
        <path
          d="M90 95 C88 70 75 52 48 34 M89 76 C105 58 119 42 132 25"
          stroke="#4ADE80"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Hojas */}
        <path
          d="M67 61 C53 52 44 53 38 58 C50 65 59 66 67 61Z"
          fill="#22C55E"
        />
        <path
          d="M105 60 C119 51 128 51 135 57 C123 64 113 65 105 60Z"
          fill="#22C55E"
        />
        <path
          d="M82 78 C69 72 61 74 57 80 C68 85 76 84 82 78Z"
          fill="#4ADE80"
        />

        {/* Flores */}
        <Sunflower x={43} y={29} scale={0.72} rotate={-15} />
        <Sunflower x={135} y={22} scale={0.72} rotate={12} />
        <Sunflower x={88} y={74} scale={0.55} />
      </svg>
    );
  }

  // field
  return (
    <svg
      viewBox="0 0 300 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
    >
      {/* Hierba */}
      <path
        d="M0 68 Q20 55 40 68 T80 68 T120 68 T160 68 T200 68 T240 68 T280 68 T320 68"
        stroke="#4ADE80"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Flores pequeñas */}
      <Sunflower x={25} y={53} scale={0.38} />
      <Sunflower x={58} y={42} scale={0.45} />
      <Sunflower x={92} y={55} scale={0.35} />
      <Sunflower x={125} y={38} scale={0.5} />
      <Sunflower x={160} y={54} scale={0.38} />
      <Sunflower x={195} y={40} scale={0.48} />
      <Sunflower x={228} y={54} scale={0.36} />
      <Sunflower x={260} y={42} scale={0.45} />
      <Sunflower x={290} y={55} scale={0.35} />
    </svg>
  );
}