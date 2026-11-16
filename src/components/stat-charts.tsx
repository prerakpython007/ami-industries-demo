export function GrowthChart() {
  return (
    <svg
      viewBox="0 0 100 44"
      preserveAspectRatio="none"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nv-growth-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E02027" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E02027" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[11, 22, 33].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="100"
          y2={y}
          stroke="#000000"
          strokeOpacity="0.08"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      <path
        d="M0 36 L12 32 L24 34 L36 25 L48 27 L60 17 L72 19 L84 9 L100 4 L100 44 L0 44 Z"
        fill="url(#nv-growth-fill)"
        style={{ animation: "nv-fade-in 1s ease-out 0.3s both" }}
      />

      <path
        d="M0 36 L12 32 L24 34 L36 25 L48 27 L60 17 L72 19 L84 9 L100 4"
        fill="none"
        stroke="#E02027"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{
          strokeDasharray: 240,
          animation: "nv-line-draw 1.4s cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      />

      <circle
        cx="100"
        cy="4"
        r="2.6"
        fill="#E02027"
        style={{ animation: "nv-fade-in 0.4s ease-out 1.1s both" }}
      />
    </svg>
  );
}

export function InstallsChart() {
  const bars = [26, 34, 30, 44, 38, 56, 50, 72];

  return (
    <svg
      viewBox="0 0 100 44"
      preserveAspectRatio="none"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
    >
      {bars.map((height, index) => (
        <rect
          key={index}
          x={index * 12.5 + 1}
          y={44 - height}
          width="8.5"
          height={height}
          fill={index === bars.length - 1 ? "#E02027" : "#000000"}
          fillOpacity={index === bars.length - 1 ? 1 : 0.14}
          style={{
            transformOrigin: "bottom",
            animation: `nv-bar-grow 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + index * 0.07}s both`,
          }}
        />
      ))}
      <line
        x1="0"
        y1="43.5"
        x2="100"
        y2="43.5"
        stroke="#000000"
        strokeOpacity="0.15"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
