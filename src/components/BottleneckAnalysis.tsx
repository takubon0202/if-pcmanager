"use client";

import type { ComponentScores } from "@/types/diagnostic";

interface BottleneckAnalysisProps {
  componentScores: ComponentScores;
}

const barColor = (score: number) => {
  if (score >= 75) return "bg-emerald-400";
  if (score >= 55) return "bg-blue-400";
  if (score >= 35) return "bg-yellow-400";
  return "bg-red-400";
};

const bottleneckAdvice: Record<string, string> = {
  cpu: "CPUの性能が他のパーツに比べて低く、処理速度が制限されています。CPU交換または買い替えが効果的です",
  memory:
    "メモリ容量が不足しています。複数アプリの同時使用やブラウザのタブを多く開くと速度低下の原因になります",
  storage:
    "ストレージの速度・容量がボトルネックです。SSDへの換装で体感速度が劇的に改善します",
  gpu: "GPU性能が不足しています。グラフィック処理やゲーム、動画編集で制限がかかります",
};

export function BottleneckAnalysis({
  componentScores,
}: BottleneckAnalysisProps) {
  const components = [
    componentScores.cpu,
    componentScores.memory,
    componentScores.storage,
    componentScores.gpu,
  ];
  const keys = ["cpu", "memory", "storage", "gpu"] as const;

  return (
    <div className="card p-4 space-y-3">
      <h3 className="font-medium text-slate-300">
        🔬 ボトルネック分析
      </h3>

      {/* Horizontal bar chart */}
      <div className="space-y-2.5">
        {components.map((comp, i) => {
          const isWeak = keys[i] === componentScores.bottleneck;
          return (
            <div key={keys[i]} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span
                  className={`font-medium ${isWeak ? "text-red-400" : "text-slate-300"}`}
                >
                  {comp.label}
                  {isWeak && " ← ボトルネック"}
                </span>
                <span className="text-slate-500">{comp.score}</span>
              </div>
              <div className="progress-bar h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-700 ${
                    isWeak ? "bg-red-400" : barColor(comp.score)
                  }`}
                  style={{ width: `${comp.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Advice */}
      {componentScores.bottleneck && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="text-xs text-red-300 leading-relaxed">
            {bottleneckAdvice[componentScores.bottleneck]}
          </p>
        </div>
      )}

      {!componentScores.bottleneck && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <p className="text-xs text-emerald-300">
            各コンポーネントのバランスが取れており、明確なボトルネックはありません
          </p>
        </div>
      )}
    </div>
  );
}
