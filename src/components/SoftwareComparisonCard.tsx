"use client";

import { useState } from "react";
import type { SoftwareComparison } from "@/types/diagnostic";

interface SoftwareComparisonCardProps {
  comparisons: SoftwareComparison[];
}

const verdictBadge = (verdict: SoftwareComparison["verdict"]) => {
  switch (verdict) {
    case "快適":
      return "score-great";
    case "動作可能":
      return "score-good";
    case "ギリギリ":
      return "score-fair";
    default:
      return "score-poor";
  }
};

const progressColor = (pct: number) => {
  if (pct >= 85) return "progress-fill-green";
  if (pct >= 65) return "progress-fill-blue";
  if (pct >= 45) return "progress-fill-yellow";
  return "progress-fill-red";
};

const CATEGORIES = ["ビジネス", "クリエイティブ", "開発", "ゲーム", "AI"];

export function SoftwareComparisonCard({
  comparisons,
}: SoftwareComparisonCardProps) {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);

  const filtered = comparisons.filter((c) => c.category === activeTab);

  return (
    <div className="card p-4 space-y-3">
      <h3 className="font-medium text-slate-300">
        🖥 ソフトウェア互換性
      </h3>

      {/* Category tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`shrink-0 text-[11px] px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === cat
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                : "text-slate-500 hover:text-slate-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Software list */}
      <div className="space-y-2">
        {filtered.map((sw) => (
          <div
            key={sw.id}
            className="p-3 rounded-xl bg-slate-800/40 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{sw.icon}</span>
                <span className="text-sm font-medium text-slate-200">
                  {sw.name}
                </span>
              </div>
              <span className={`score-badge ${verdictBadge(sw.verdict)}`}>
                {sw.verdict}
              </span>
            </div>
            <div className="progress-bar h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-700 ${progressColor(sw.matchPercentage)}`}
                style={{ width: `${sw.matchPercentage}%` }}
              />
            </div>
            {sw.limitingFactor && (
              <p className="text-[10px] text-slate-500">
                制限要因: {sw.limitingFactor}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
