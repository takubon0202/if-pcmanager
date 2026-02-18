"use client";

import { useState } from "react";
import type { LaptopRecommendation } from "@/types";
import { LAPTOP_DATABASE } from "@/data/laptops";
import EmailReportButton from "./EmailReportButton";

const PURPOSES = [
  { id: "web", label: "Web閲覧・動画視聴", icon: "🌐" },
  { id: "office", label: "ビジネス・Office", icon: "📊" },
  { id: "programming", label: "プログラミング", icon: "👨‍💻" },
  { id: "design", label: "デザイン・動画編集", icon: "🎨" },
  { id: "gaming", label: "ゲーミング", icon: "🎮" },
  { id: "ai", label: "AI・機械学習", icon: "🤖" },
];

const SIZES = [
  { id: "13", label: '13"以下', desc: "軽量・携帯性重視" },
  { id: "14-15", label: '14-15"', desc: "バランス型" },
  { id: "16+", label: '16"以上', desc: "画面の大きさ重視" },
  { id: "any", label: "こだわらない", desc: "" },
];

const OS_OPTIONS = [
  { id: "windows", label: "Windows", icon: "🪟", desc: "" },
  { id: "mac", label: "Mac", icon: "🍎", desc: "Apple Siliconで高性能＆長時間バッテリー" },
  { id: "any", label: "どちらでも良い", icon: "🔄", desc: "" },
];

const PRIORITIES = [
  { id: "performance", label: "⚡ 性能重視" },
  { id: "portable", label: "🪶 軽さ重視" },
  { id: "battery", label: "🔋 バッテリー重視" },
  { id: "cost", label: "💰 コスパ重視" },
  { id: "display", label: "🖥 画面品質重視" },
];

type Step = "purpose" | "os" | "budget" | "size" | "priority" | "result";

export function LaptopView() {
  const [step, setStep] = useState<Step>("purpose");
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [budget, setBudget] = useState({ min: 50000, max: 200000 });
  const [size, setSize] = useState<string | null>(null);
  const [osPreference, setOsPreference] = useState<string | null>(null);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<LaptopRecommendation[]>([]);

  const togglePurpose = (id: string) => {
    setSelectedPurposes((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const togglePriority = (id: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const findRecommendations = () => {
    const effectiveMin = Math.min(budget.min, budget.max);
    const effectiveMax = Math.max(budget.min, budget.max);

    const results = LAPTOP_DATABASE.filter((laptop) => {
      if (laptop.price < effectiveMin || laptop.price > effectiveMax) return false;
      if (osPreference === "mac" && laptop.brand !== "Apple") return false;
      if (osPreference === "windows" && laptop.brand === "Apple") return false;
      return true;
    })
      .map((laptop) => {
        let matchScore = 0;
        const gpuIsIntegrated = laptop.specs.gpu === "内蔵" || laptop.specs.gpu.startsWith("内蔵");

        selectedPurposes.forEach((purpose) => {
          if (purpose === "gaming" && !gpuIsIntegrated) matchScore += 20;
          if (purpose === "programming" && parseInt(laptop.specs.memory) >= 16) matchScore += 15;
          if (purpose === "design" && laptop.specs.display.includes("有機EL")) matchScore += 15;
          if (purpose === "office") matchScore += 10;
          if (purpose === "web") matchScore += 10;
          if (purpose === "ai" && (laptop.specs.gpu.includes("RTX") || laptop.specs.cpu.includes("M4"))) matchScore += 20;
        });

        // サイズフィルタリング
        if (size && size !== "any") {
          const displaySize = parseFloat(laptop.specs.display);
          if (size === "13" && displaySize <= 13.9) matchScore += 10;
          if (size === "14-15" && displaySize >= 14 && displaySize <= 15.9) matchScore += 10;
          if (size === "16+" && displaySize >= 16) matchScore += 10;
        }

        selectedPriorities.forEach((priority) => {
          if (priority === "portable" && parseFloat(laptop.specs.weight) < 1.5) matchScore += 15;
          if (priority === "battery" && parseInt(laptop.specs.battery) >= 10) matchScore += 15;
          if (priority === "cost" && laptop.price < 150000) matchScore += 10;
          if (priority === "performance" && parseInt(laptop.specs.memory) >= 16) matchScore += 15;
          if (priority === "display" && (laptop.specs.display.includes("有機EL") || laptop.specs.display.includes("Retina") || laptop.specs.display.includes("WQXGA"))) matchScore += 15;
        });
        return { ...laptop, matchScore };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

    setRecommendations(results);
    setStep("result");
  };

  return (
    <div className="p-4 space-y-5 animate-fade-in">
      <div className="text-center">
        <h2 className="text-xl font-bold gradient-text">💻 ノートPC提案</h2>
        <p className="text-sm text-slate-400 mt-1">
          あなたにぴったりのノートPCを見つけます
        </p>
      </div>

      {/* ステップインジケーター */}
      <div className="flex justify-center gap-2">
        {(["purpose", "os", "budget", "size", "priority", "result"] as Step[]).map((s) => (
          <div
            key={s}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              step === s ? "bg-indigo-500 glow" : "bg-slate-700"
            }`}
          />
        ))}
      </div>

      {/* Step 1: 用途 */}
      {step === "purpose" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-5 space-y-3">
            <h3 className="font-medium text-slate-200">用途を選んでください（複数可）</h3>
            <div className="grid grid-cols-2 gap-2">
              {PURPOSES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => togglePurpose(p.id)}
                  className={`card p-3 text-center transition-all ${
                    selectedPurposes.includes(p.id) ? "card-active" : ""
                  }`}
                >
                  <span className="text-2xl">{p.icon}</span>
                  <p className="mt-1 text-sm text-slate-300">{p.label}</p>
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setStep("os")}
            disabled={selectedPurposes.length === 0}
            className="btn-primary w-full py-3"
          >
            次へ →
          </button>
        </div>
      )}

      {/* Step 2: OS選択 */}
      {step === "os" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-5 space-y-3">
            <h3 className="font-medium text-slate-200">OSの希望は？</h3>
            <div className="space-y-2">
              {OS_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setOsPreference(o.id)}
                  className={`card w-full p-3 text-left transition-all ${
                    osPreference === o.id ? "card-active" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{o.icon}</span>
                    <div>
                      <p className="font-medium text-sm text-slate-200">{o.label}</p>
                      {o.desc && <p className="text-xs text-slate-400">{o.desc}</p>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {osPreference === "mac" && (
              <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <p className="text-xs text-indigo-300">
                  💡 Apple Siliconチップ搭載のMacは、省電力ながら高い処理性能を発揮し、バッテリー駆動時間も15〜22時間と非常に優秀です。クリエイティブ用途やプログラミングに最適です。
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep("purpose")} className="btn-secondary flex-1 py-3">
              ← 戻る
            </button>
            <button
              onClick={() => setStep("budget")}
              disabled={!osPreference}
              className="btn-primary flex-1 py-3"
            >
              次へ →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: 予算 */}
      {step === "budget" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-5 space-y-4">
            <h3 className="font-medium text-slate-200">予算を設定</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400">下限</label>
                <input
                  type="range"
                  min={30000}
                  max={500000}
                  step={10000}
                  value={budget.min}
                  onChange={(e) => setBudget((prev) => ({ ...prev, min: Number(e.target.value) }))}
                />
                <p className="text-center text-sm font-medium text-indigo-300">
                  {budget.min.toLocaleString()}円
                </p>
              </div>
              <div>
                <label className="text-sm text-slate-400">上限</label>
                <input
                  type="range"
                  min={30000}
                  max={500000}
                  step={10000}
                  value={budget.max}
                  onChange={(e) => setBudget((prev) => ({ ...prev, max: Number(e.target.value) }))}
                />
                <p className="text-center text-sm font-medium text-indigo-300">
                  {budget.max.toLocaleString()}円
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep("os")} className="btn-secondary flex-1 py-3">
              ← 戻る
            </button>
            <button onClick={() => setStep("size")} className="btn-primary flex-1 py-3">
              次へ →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: サイズ */}
      {step === "size" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-5 space-y-3">
            <h3 className="font-medium text-slate-200">画面サイズの好みは？</h3>
            <div className="space-y-2">
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={`card w-full p-3 text-left transition-all ${
                    size === s.id ? "card-active" : ""
                  }`}
                >
                  <p className="font-medium text-sm text-slate-200">{s.label}</p>
                  {s.desc && <p className="text-xs text-slate-500">{s.desc}</p>}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep("budget")} className="btn-secondary flex-1 py-3">
              ← 戻る
            </button>
            <button
              onClick={() => setStep("priority")}
              disabled={!size}
              className="btn-primary flex-1 py-3"
            >
              次へ →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: 優先度 */}
      {step === "priority" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-5 space-y-3">
            <h3 className="font-medium text-slate-200">重視するポイント（複数可）</h3>
            <div className="flex flex-wrap gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => togglePriority(p.id)}
                  className={`chip ${selectedPriorities.includes(p.id) ? "chip-active" : ""}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep("size")} className="btn-secondary flex-1 py-3">
              ← 戻る
            </button>
            <button
              onClick={findRecommendations}
              disabled={selectedPriorities.length === 0}
              className="btn-primary flex-1 py-3"
            >
              🔍 おすすめを見る
            </button>
          </div>
        </div>
      )}

      {/* Step 5: 結果 */}
      {step === "result" && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="font-medium text-slate-200">おすすめノートPC</h3>
          {recommendations.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-slate-400">
                条件に合うPCが見つかりませんでした。
                <br />
                予算を調整してみてください。
              </p>
            </div>
          ) : (
            recommendations.map((laptop, i) => (
              <div key={i} className="card p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-200">{laptop.name}</p>
                    <p className="text-xs text-slate-500">{laptop.brand}</p>
                  </div>
                  <p className="text-indigo-400 font-bold text-lg">
                    ¥{laptop.price.toLocaleString()}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { label: "CPU", value: laptop.specs.cpu },
                    { label: "メモリ", value: laptop.specs.memory },
                    { label: "ストレージ", value: laptop.specs.storage },
                    { label: "GPU", value: laptop.specs.gpu },
                    { label: "画面", value: laptop.specs.display },
                    { label: "重量", value: laptop.specs.weight },
                  ].map((spec) => (
                    <div key={spec.label} className="p-2 rounded-lg bg-slate-800/50">
                      <p className="text-slate-500">{spec.label}</p>
                      <p className="text-slate-300">{spec.value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500">品番: {laptop.modelNumber}</p>
                {laptop.url && (
                  <a
                    href={laptop.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary block text-center py-2 text-sm"
                  >
                    詳細を見る →
                  </a>
                )}
              </div>
            ))
          )}
          {recommendations.length > 0 && (
            <EmailReportButton
              payload={{
                type: "laptop",
                laptops: recommendations,
                conditions: {
                  purposes: selectedPurposes.map(
                    (id) => PURPOSES.find((p) => p.id === id)?.label ?? id
                  ),
                  os: OS_OPTIONS.find((o) => o.id === osPreference)?.label ?? "指定なし",
                  budget: `¥${budget.min.toLocaleString()} 〜 ¥${budget.max.toLocaleString()}`,
                  size:
                    SIZES.find((s) => s.id === size)?.label ?? "指定なし",
                  priorities: selectedPriorities.map(
                    (id) => PRIORITIES.find((p) => p.id === id)?.label ?? id
                  ),
                },
              }}
            />
          )}

          <button
            onClick={() => {
              setStep("purpose");
              setSelectedPurposes([]);
              setOsPreference(null);
              setBudget({ min: 50000, max: 200000 });
              setSize(null);
              setSelectedPriorities([]);
              setRecommendations([]);
            }}
            className="btn-secondary w-full py-3"
          >
            最初からやり直す
          </button>
        </div>
      )}
    </div>
  );
}
