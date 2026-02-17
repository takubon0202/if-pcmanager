"use client";

import { useState } from "react";
import type { LaptopRecommendation } from "@/types";
import { LAPTOP_DATABASE } from "@/data/laptops";

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

const PRIORITIES = [
  { id: "performance", label: "性能重視" },
  { id: "portable", label: "軽さ重視" },
  { id: "battery", label: "バッテリー重視" },
  { id: "cost", label: "コスパ重視" },
  { id: "display", label: "画面品質重視" },
];

type Step = "purpose" | "budget" | "size" | "priority" | "result";

export function LaptopView() {
  const [step, setStep] = useState<Step>("purpose");
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [budget, setBudget] = useState({ min: 50000, max: 200000 });
  const [size, setSize] = useState<string | null>(null);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<
    LaptopRecommendation[]
  >([]);

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
    const results = LAPTOP_DATABASE.filter((laptop) => {
      if (laptop.price < budget.min || laptop.price > budget.max) return false;
      return true;
    })
      .map((laptop) => {
        let matchScore = 0;

        // 用途マッチング
        selectedPurposes.forEach((purpose) => {
          if (purpose === "gaming" && laptop.specs.gpu !== "内蔵")
            matchScore += 20;
          if (purpose === "programming" && parseInt(laptop.specs.memory) >= 16)
            matchScore += 15;
          if (
            purpose === "design" &&
            laptop.specs.display.includes("有機EL")
          )
            matchScore += 15;
          if (purpose === "office") matchScore += 10;
          if (purpose === "web") matchScore += 10;
          if (
            purpose === "ai" &&
            (laptop.specs.gpu.includes("RTX") ||
              laptop.specs.cpu.includes("M4"))
          )
            matchScore += 20;
        });

        // 優先度マッチング
        selectedPriorities.forEach((priority) => {
          if (
            priority === "portable" &&
            parseFloat(laptop.specs.weight) < 1.5
          )
            matchScore += 15;
          if (
            priority === "battery" &&
            parseInt(laptop.specs.battery) >= 10
          )
            matchScore += 15;
          if (priority === "cost" && laptop.price < 150000)
            matchScore += 10;
          if (
            priority === "performance" &&
            parseInt(laptop.specs.memory) >= 16
          )
            matchScore += 15;
        });

        return { ...laptop, matchScore };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

    setRecommendations(results);
    setStep("result");
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">ノートPC提案</h2>
        <p className="text-sm text-gray-500 mt-1">
          あなたにぴったりのノートPCを見つけます
        </p>
      </div>

      {/* ステップインジケーター */}
      <div className="flex justify-center gap-2">
        {(["purpose", "budget", "size", "priority", "result"] as Step[]).map(
          (s, i) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full ${
                step === s ? "bg-blue-500" : "bg-gray-200"
              }`}
            />
          )
        )}
      </div>

      {/* Step 1: 用途選択 */}
      {step === "purpose" && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700">
            用途を選んでください（複数可）
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {PURPOSES.map((p) => (
              <button
                key={p.id}
                onClick={() => togglePurpose(p.id)}
                className={`p-3 rounded-xl border-2 text-sm transition-all ${
                  selectedPurposes.includes(p.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <span className="text-lg">{p.icon}</span>
                <p className="mt-1">{p.label}</p>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep("budget")}
            disabled={selectedPurposes.length === 0}
            className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium
                       disabled:opacity-50 hover:bg-blue-600 transition-colors"
          >
            次へ
          </button>
        </div>
      )}

      {/* Step 2: 予算 */}
      {step === "budget" && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">予算を設定</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500">下限</label>
              <input
                type="range"
                min={30000}
                max={500000}
                step={10000}
                value={budget.min}
                onChange={(e) =>
                  setBudget((prev) => ({
                    ...prev,
                    min: Number(e.target.value),
                  }))
                }
                className="w-full"
              />
              <p className="text-center text-sm font-medium">
                {budget.min.toLocaleString()}円
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">上限</label>
              <input
                type="range"
                min={30000}
                max={500000}
                step={10000}
                value={budget.max}
                onChange={(e) =>
                  setBudget((prev) => ({
                    ...prev,
                    max: Number(e.target.value),
                  }))
                }
                className="w-full"
              />
              <p className="text-center text-sm font-medium">
                {budget.max.toLocaleString()}円
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStep("purpose")}
              className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl"
            >
              戻る
            </button>
            <button
              onClick={() => setStep("size")}
              className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium"
            >
              次へ
            </button>
          </div>
        </div>
      )}

      {/* Step 3: サイズ */}
      {step === "size" && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700">画面サイズの好みは？</h3>
          <div className="space-y-2">
            {SIZES.map((s) => (
              <button
                key={s.id}
                onClick={() => setSize(s.id)}
                className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                  size === s.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <p className="font-medium text-sm">{s.label}</p>
                {s.desc && (
                  <p className="text-xs text-gray-500">{s.desc}</p>
                )}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStep("budget")}
              className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl"
            >
              戻る
            </button>
            <button
              onClick={() => setStep("priority")}
              disabled={!size}
              className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium disabled:opacity-50"
            >
              次へ
            </button>
          </div>
        </div>
      )}

      {/* Step 4: 優先度 */}
      {step === "priority" && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700">
            重視するポイント（複数可）
          </h3>
          <div className="flex flex-wrap gap-2">
            {PRIORITIES.map((p) => (
              <button
                key={p.id}
                onClick={() => togglePriority(p.id)}
                className={`px-4 py-2 rounded-full border-2 text-sm transition-all ${
                  selectedPriorities.includes(p.id)
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-700"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStep("size")}
              className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl"
            >
              戻る
            </button>
            <button
              onClick={findRecommendations}
              disabled={selectedPriorities.length === 0}
              className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium disabled:opacity-50"
            >
              おすすめを見る
            </button>
          </div>
        </div>
      )}

      {/* Step 5: 結果 */}
      {step === "result" && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700">おすすめノートPC</h3>
          {recommendations.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              条件に合うPCが見つかりませんでした。
              <br />
              予算を調整してみてください。
            </p>
          ) : (
            recommendations.map((laptop, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-xl border border-gray-200 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-800">{laptop.name}</p>
                    <p className="text-xs text-gray-500">{laptop.brand}</p>
                  </div>
                  <p className="text-blue-600 font-bold">
                    ¥{laptop.price.toLocaleString()}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                  <p>CPU: {laptop.specs.cpu}</p>
                  <p>メモリ: {laptop.specs.memory}</p>
                  <p>ストレージ: {laptop.specs.storage}</p>
                  <p>GPU: {laptop.specs.gpu}</p>
                  <p>画面: {laptop.specs.display}</p>
                  <p>重量: {laptop.specs.weight}</p>
                </div>
                <p className="text-xs text-gray-400">
                  品番: {laptop.modelNumber}
                </p>
                {laptop.url && (
                  <a
                    href={laptop.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium"
                  >
                    詳細を見る →
                  </a>
                )}
              </div>
            ))
          )}
          <button
            onClick={() => {
              setStep("purpose");
              setSelectedPurposes([]);
              setBudget({ min: 50000, max: 200000 });
              setSize(null);
              setSelectedPriorities([]);
              setRecommendations([]);
            }}
            className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl"
          >
            最初からやり直す
          </button>
        </div>
      )}
    </div>
  );
}
