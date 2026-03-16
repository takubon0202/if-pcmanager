"use client";

interface ScoreGaugeProps {
  score: number;
  label: string;
  detail: string;
  isBottleneck?: boolean;
}

export function ScoreGauge({ score, label, detail, isBottleneck }: ScoreGaugeProps) {
  const radius = 40;
  const stroke = 6;
  const circumference = Math.PI * radius; // semicircle
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 75
      ? "#4ADE80"
      : score >= 55
        ? "#60A5FA"
        : score >= 35
          ? "#FACC15"
          : "#F87171";

  return (
    <div className={`flex flex-col items-center p-3 rounded-2xl transition-all ${
      isBottleneck
        ? "bg-red-500/10 border border-red-500/30"
        : "bg-slate-800/40"
    }`}>
      <svg width="96" height="56" viewBox="0 0 96 56">
        {/* Background arc */}
        <path
          d="M 8 52 A 40 40 0 0 1 88 52"
          fill="none"
          stroke="rgba(51,65,85,0.6)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* Score arc */}
        <path
          d="M 8 52 A 40 40 0 0 1 88 52"
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
        {/* Score text */}
        <text
          x="48"
          y="48"
          textAnchor="middle"
          fill={color}
          fontSize="20"
          fontWeight="800"
        >
          {score}
        </text>
      </svg>
      <p className="text-xs font-bold text-slate-200 mt-1">{label}</p>
      <p className="text-[10px] text-slate-500 truncate max-w-full">{detail}</p>
      {isBottleneck && (
        <span className="text-[9px] font-bold text-red-400 mt-1 uppercase tracking-wider">
          ボトルネック
        </span>
      )}
    </div>
  );
}
