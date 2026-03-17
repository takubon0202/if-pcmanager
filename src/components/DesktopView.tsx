"use client";

import { useState } from "react";
import type { DesktopRecommendation } from "@/types";
import { DESKTOP_DATABASE } from "@/data/desktops";
import EmailReportButton from "./EmailReportButton";

const PURPOSES = [
  { id: "web", label: "Web閲覧・事務作業", icon: "🌐" },
  { id: "office", label: "ビジネス・Office", icon: "📊" },
  { id: "programming", label: "プログラミング・開発", icon: "👨‍💻" },
  { id: "design", label: "動画編集・3Dモデリング", icon: "🎨" },
  { id: "gaming-fhd", label: "ゲーミング（フルHD）", icon: "🎮" },
  { id: "gaming-4k", label: "ゲーミング（WQHD/4K）", icon: "🕹️" },
  { id: "ai", label: "AI・機械学習", icon: "🤖" },
  { id: "streaming", label: "配信・ストリーミング", icon: "📡" },
];

const FORM_FACTORS = [
  { id: "full", label: "フルタワー", desc: "拡張性最大・ハイエンド向け", icon: "🏗️" },
  { id: "mid", label: "ミドルタワー", desc: "バランス型・最も人気", icon: "🖥️" },
  { id: "mini", label: "ミニタワー", desc: "省スペース・コスパ重視", icon: "📦" },
  { id: "sff", label: "小型・スリム", desc: "Mac mini / Mac Studio / 省スペースPC", icon: "💎" },
  { id: "aio", label: "一体型", desc: "iMac等・モニター一体で省スペース", icon: "🍎" },
  { id: "any", label: "こだわらない", desc: "", icon: "🔄" },
];

const PRIORITIES = [
  { id: "performance", label: "⚡ 性能重視" },
  { id: "quiet", label: "🤫 静音重視" },
  { id: "expandability", label: "🔧 拡張性重視" },
  { id: "cost", label: "💰 コスパ重視" },
  { id: "compact", label: "📐 省スペース重視" },
  { id: "creator", label: "🎬 クリエイター向け" },
];

type Step = "purpose" | "budget" | "formFactor" | "priority" | "result";

function getGpuTier(gpuStr: string): number {
  const g = gpuStr.toLowerCase();
  // NVIDIA
  if (g.includes("5090")) return 10;
  if (g.includes("5080")) return 9;
  if (g.includes("5070 ti")) return 8;
  if (g.includes("5070")) return 7;
  if (g.includes("5060 ti")) return 6;
  if (g.includes("5060")) return 5;
  if (g.includes("4090")) return 9.5;
  if (g.includes("4080 super")) return 8.5;
  if (g.includes("4080")) return 8;
  if (g.includes("4070 ti super")) return 7.5;
  if (g.includes("4070 ti")) return 7;
  if (g.includes("4070 super")) return 6.5;
  if (g.includes("4070")) return 6;
  if (g.includes("4060 ti")) return 5;
  if (g.includes("4060")) return 4;
  if (g.includes("3060")) return 3;
  // AMD
  if (g.includes("rx 9070")) return 7;
  if (g.includes("rx 7900")) return 8;
  if (g.includes("rx 7800")) return 6;
  if (g.includes("rx 7600")) return 4;
  // Apple Silicon
  if (g.includes("m3 ultra") && g.includes("80")) return 9;
  if (g.includes("m3 ultra")) return 8;
  if (g.includes("m4 max") && g.includes("40")) return 8.5;
  if (g.includes("m4 max")) return 7.5;
  if (g.includes("m5 max")) return 8.5;
  if (g.includes("m5 pro")) return 7;
  if (g.includes("m5")) return 5.5;
  if (g.includes("m4 pro") && g.includes("20")) return 6.5;
  if (g.includes("m4 pro")) return 6;
  if (g.includes("m4") && g.includes("10コア")) return 4.5;
  if (g.includes("m4")) return 4;
  if (g.includes("m2 ultra")) return 7.5;
  if (g.includes("m3 pro")) return 5.5;
  if (g.includes("m3")) return 4;
  if (g.includes("m2")) return 3.5;
  if (g.includes("m1")) return 3;
  // Integrated
  if (g.includes("内蔵") || g.includes("uhd") || g.includes("radeon 7")) return 1;
  return 2;
}

function getMemoryGB(memStr: string): number {
  const match = memStr.match(/(\d+)\s*GB/i);
  return match ? parseInt(match[1]) : 8;
}

function getCpuTier(cpuStr: string): number {
  const c = cpuStr.toLowerCase();
  // Intel / AMD Desktop
  if (c.includes("ultra 9") || c.includes("9950x") || c.includes("9900x")) return 10;
  if (c.includes("ultra 7") || c.includes("i9-14") || c.includes("9800x3d") || c.includes("7950x")) return 8;
  if (c.includes("i7-14") || c.includes("7800x3d") || c.includes("9700x") || c.includes("7700x") || c.includes("7700")) return 7;
  if (c.includes("ultra 5") || c.includes("i5-14") || c.includes("7500f") || c.includes("9600x") || c.includes("7600")) return 5;
  if (c.includes("5700x") || c.includes("5800x")) return 5;
  if (c.includes("5600x") || c.includes("5600")) return 4;
  if (c.includes("5500") || c.includes("4500")) return 3;
  if (c.includes("ryzen 5 pro") || c.includes("ryzen 7 pro")) return 5;
  if (c.includes("i3") || c.includes("ryzen 3")) return 2;
  // Apple Silicon
  if (c.includes("m3 ultra") || c.includes("m2 ultra")) return 10;
  if (c.includes("m5 max")) return 10;
  if (c.includes("m4 max") && c.includes("16コア")) return 9.5;
  if (c.includes("m4 max")) return 9;
  if (c.includes("m5 pro")) return 9;
  if (c.includes("m5")) return 8;
  if (c.includes("m4 pro") && c.includes("14コア")) return 8;
  if (c.includes("m4 pro")) return 7;
  if (c.includes("m4")) return 6;
  if (c.includes("m3 pro")) return 6;
  if (c.includes("m3")) return 5;
  if (c.includes("m2")) return 4.5;
  if (c.includes("m1")) return 4;
  if (c.includes("a18")) return 4;
  return 3;
}

export function DesktopView() {
  const [step, setStep] = useState<Step>("purpose");
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [budget, setBudget] = useState({ min: 80000, max: 400000 });
  const [formFactor, setFormFactor] = useState<string | null>(null);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<DesktopRecommendation[]>([]);

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

    const results = DESKTOP_DATABASE.filter((desktop) => {
      if (desktop.price < effectiveMin || desktop.price > effectiveMax) return false;

      // フォームファクターフィルタ
      if (formFactor && formFactor !== "any") {
        const ff = desktop.specs.formFactor;
        if (formFactor === "full" && !ff.includes("フルタワー")) return false;
        if (formFactor === "mid" && !ff.includes("ミドルタワー")) return false;
        if (formFactor === "mini" && !ff.includes("ミニタワー")) return false;
        if (formFactor === "sff" && !ff.includes("小型") && !ff.includes("スリム") && !ff.includes("Tiny") && !ff.includes("Mini") && !ff.includes("SFF") && !ff.includes("Mac mini") && !ff.includes("Mac Studio")) return false;
        if (formFactor === "aio" && !ff.includes("一体型") && !ff.includes("iMac")) return false;
      }

      return true;
    })
      .map((desktop) => {
        let matchScore = 0;
        const reasons: string[] = [];
        const gpuTier = getGpuTier(desktop.specs.gpu);
        const cpuTier = getCpuTier(desktop.specs.cpu);
        const memGB = getMemoryGB(desktop.specs.memory);
        const hasDiscreteGpu = gpuTier >= 3;

        // 用途別スコアリング
        selectedPurposes.forEach((purpose) => {
          switch (purpose) {
            case "web":
            case "office":
              matchScore += 10;
              if (memGB >= 16) { matchScore += 5; reasons.push("メモリ16GB以上で事務作業に十分"); }
              break;
            case "programming":
              if (cpuTier >= 5) { matchScore += 15; reasons.push("開発に適したCPU性能"); }
              if (memGB >= 32) { matchScore += 10; reasons.push("32GB以上で開発環境が快適"); }
              else if (memGB >= 16) matchScore += 5;
              break;
            case "design":
              if (gpuTier >= 6) { matchScore += 20; reasons.push("動画編集・3Dに十分なGPU"); }
              else if (hasDiscreteGpu) matchScore += 10;
              if (cpuTier >= 7) { matchScore += 10; reasons.push("マルチスレッド性能が高い"); }
              if (memGB >= 32) { matchScore += 10; reasons.push("クリエイター作業に十分なメモリ"); }
              break;
            case "gaming-fhd":
              if (gpuTier >= 4) { matchScore += 20; reasons.push("フルHDゲーミングに最適なGPU"); }
              else if (hasDiscreteGpu) matchScore += 10;
              if (cpuTier >= 5) matchScore += 5;
              break;
            case "gaming-4k":
              if (gpuTier >= 7) { matchScore += 25; reasons.push("WQHD/4Kゲーミングに対応するGPU"); }
              else if (gpuTier >= 5) matchScore += 10;
              if (cpuTier >= 7) matchScore += 5;
              if (memGB >= 32) matchScore += 5;
              break;
            case "ai":
              if (gpuTier >= 7) { matchScore += 25; reasons.push("AI学習に十分なGPU性能"); }
              else if (gpuTier >= 5) matchScore += 10;
              if (memGB >= 64) { matchScore += 15; reasons.push("大容量メモリでAI開発に最適"); }
              else if (memGB >= 32) matchScore += 8;
              if (cpuTier >= 8) matchScore += 5;
              break;
            case "streaming":
              if (gpuTier >= 5) { matchScore += 15; reasons.push("配信エンコードに対応するGPU"); }
              if (cpuTier >= 7) { matchScore += 15; reasons.push("ゲーム+配信の同時処理に十分なCPU"); }
              if (memGB >= 32) { matchScore += 5; reasons.push("配信ソフト同時使用に十分なメモリ"); }
              break;
          }
        });

        // 優先度スコアリング
        selectedPriorities.forEach((priority) => {
          switch (priority) {
            case "performance":
              if (cpuTier >= 8) matchScore += 10;
              if (gpuTier >= 7) matchScore += 10;
              break;
            case "quiet":
              if (desktop.specs.formFactor.includes("フルタワー") || desktop.specs.formFactor.includes("ミドルタワー")) matchScore += 5;
              if (desktop.specs.gpu.includes("水冷")) { matchScore += 10; reasons.push("水冷で静音性が高い"); }
              break;
            case "expandability":
              if (desktop.specs.formFactor.includes("フルタワー")) { matchScore += 15; reasons.push("フルタワーで拡張性最大"); }
              else if (desktop.specs.formFactor.includes("ミドルタワー")) matchScore += 8;
              if (desktop.specs.motherboard.includes("Z") || desktop.specs.motherboard.includes("X6") || desktop.specs.motherboard.includes("X8")) matchScore += 5;
              break;
            case "cost":
              if (desktop.price < 200000) matchScore += 15;
              else if (desktop.price < 300000) matchScore += 8;
              break;
            case "compact":
              if (desktop.specs.formFactor.includes("小型") || desktop.specs.formFactor.includes("Tiny") || desktop.specs.formFactor.includes("Mini") || desktop.specs.formFactor.includes("SFF")) {
                matchScore += 15;
                reasons.push("省スペース設計");
              } else if (desktop.specs.formFactor.includes("ミニタワー")) matchScore += 8;
              break;
            case "creator":
              if (gpuTier >= 6 && memGB >= 32) { matchScore += 15; reasons.push("クリエイター向け構成"); }
              if (cpuTier >= 8) matchScore += 5;
              break;
          }
        });

        // 重複排除
        const uniqueReasons = [...new Set(reasons)];

        return { ...desktop, matchScore, reasons: uniqueReasons };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6);

    setRecommendations(results);
    setStep("result");
  };

  return (
    <div className="p-4 space-y-5 animate-fade-in">
      <div className="text-center">
        <h2 className="text-xl font-bold gradient-text">🖥️ デスクトップPC提案</h2>
        <p className="text-sm text-slate-400 mt-1">
          あなたにぴったりのデスクトップPCを見つけます
        </p>
      </div>

      {/* ステップインジケーター */}
      <div className="flex justify-center gap-2">
        {(["purpose", "budget", "formFactor", "priority", "result"] as Step[]).map((s) => (
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
            onClick={() => setStep("budget")}
            disabled={selectedPurposes.length === 0}
            className="btn-primary w-full py-3"
          >
            次へ →
          </button>
        </div>
      )}

      {/* Step 2: 予算 */}
      {step === "budget" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-5 space-y-4">
            <h3 className="font-medium text-slate-200">予算を設定</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400">下限</label>
                <input
                  type="range"
                  min={50000}
                  max={800000}
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
                  min={50000}
                  max={800000}
                  step={10000}
                  value={budget.max}
                  onChange={(e) => setBudget((prev) => ({ ...prev, max: Number(e.target.value) }))}
                />
                <p className="text-center text-sm font-medium text-indigo-300">
                  {budget.max.toLocaleString()}円
                </p>
              </div>
            </div>
            {/* 価格帯ガイド */}
            <div className="space-y-1 pt-2 border-t border-slate-700">
              <p className="text-xs text-slate-500 font-medium">価格帯の目安:</p>
              <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-500">
                <span>~10万: 事務・Web閲覧</span>
                <span>10~20万: 軽いゲーム</span>
                <span>20~35万: ゲーミング</span>
                <span>35~50万: ハイエンド</span>
                <span>50万~: フラグシップ</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep("purpose")} className="btn-secondary flex-1 py-3">
              ← 戻る
            </button>
            <button onClick={() => setStep("formFactor")} className="btn-primary flex-1 py-3">
              次へ →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: フォームファクター */}
      {step === "formFactor" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-5 space-y-3">
            <h3 className="font-medium text-slate-200">ケースサイズの好みは？</h3>
            <div className="space-y-2">
              {FORM_FACTORS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormFactor(f.id)}
                  className={`card w-full p-3 text-left transition-all ${
                    formFactor === f.id ? "card-active" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{f.icon}</span>
                    <div>
                      <p className="font-medium text-sm text-slate-200">{f.label}</p>
                      {f.desc && <p className="text-xs text-slate-400">{f.desc}</p>}
                    </div>
                  </div>
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
              disabled={!formFactor}
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
            <button onClick={() => setStep("formFactor")} className="btn-secondary flex-1 py-3">
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
          <h3 className="font-medium text-slate-200">おすすめデスクトップPC</h3>
          {recommendations.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-slate-400">
                条件に合うPCが見つかりませんでした。
                <br />
                予算やフォームファクターを調整してみてください。
              </p>
            </div>
          ) : (
            recommendations.map((desktop, i) => (
              <div key={i} className="card p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-200">{desktop.name}</p>
                    <p className="text-xs text-slate-500">{desktop.brand}</p>
                  </div>
                  <p className="text-indigo-400 font-bold text-lg">
                    ¥{desktop.price.toLocaleString()}
                  </p>
                </div>

                {/* スペック表示 */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { label: "CPU", value: desktop.specs.cpu },
                    { label: "GPU", value: desktop.specs.gpu },
                    { label: "メモリ", value: desktop.specs.memory },
                    { label: "ストレージ", value: desktop.specs.storage },
                    { label: "電源", value: desktop.specs.psu },
                    { label: "ケース", value: desktop.specs.formFactor },
                  ].map((spec) => (
                    <div key={spec.label} className="p-2 rounded-lg bg-slate-800/50">
                      <p className="text-slate-500">{spec.label}</p>
                      <p className="text-slate-300">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* マザーボード */}
                <p className="text-xs text-slate-500">
                  マザーボード: {desktop.specs.motherboard} / 品番: {desktop.modelNumber}
                </p>

                {/* おすすめ理由 */}
                {desktop.reasons.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {desktop.reasons.map((reason, j) => (
                      <span
                        key={j}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                )}

                {/* 性能スコアバー */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 w-10">CPU</span>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                        style={{ width: `${Math.min(getCpuTier(desktop.specs.cpu) * 10, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 w-10">GPU</span>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-400"
                        style={{ width: `${Math.min(getGpuTier(desktop.specs.gpu) * 10, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {desktop.url && (
                  <a
                    href={desktop.url}
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
                type: "desktop",
                desktops: recommendations,
                conditions: {
                  purposes: selectedPurposes.map(
                    (id) => PURPOSES.find((p) => p.id === id)?.label ?? id
                  ),
                  budget: `¥${budget.min.toLocaleString()} 〜 ¥${budget.max.toLocaleString()}`,
                  formFactor:
                    FORM_FACTORS.find((f) => f.id === formFactor)?.label ?? "指定なし",
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
              setBudget({ min: 80000, max: 400000 });
              setFormFactor(null);
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
