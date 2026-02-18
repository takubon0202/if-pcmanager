"use client";

import { useState } from "react";
import {
  MANUFACTURERS,
  STORAGE_TYPES,
  ISSUES,
  type UserPcInput,
} from "@/types/diagnostic";
import type { DiagnosticReport } from "@/types/diagnostic";
import EmailReportButton from "./EmailReportButton";
import { generateReport } from "@/lib/diagnostic-engine";
import { runDiagnostics } from "@/lib/diagnostics";
import { getModelsForManufacturer } from "@/data/model-catalog";

type Step = "basic" | "specs" | "issues" | "result";

const YEARS = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const MEMORY_OPTIONS = [4, 8, 16, 32, 64];
const STORAGE_OPTIONS = [128, 256, 512, 1024, 2048];

const STEPS: { key: Step; label: string }[] = [
  { key: "basic", label: "基本情報" },
  { key: "specs", label: "スペック" },
  { key: "issues", label: "困りごと" },
  { key: "result", label: "結果" },
];

export function DiagnosticView() {
  const [step, setStep] = useState<Step>("basic");
  const [input, setInput] = useState<UserPcInput>({
    manufacturer: "",
    modelNumber: "",
    purchaseYear: null,
    purchaseMonth: null,
    cpu: "",
    memoryGB: null,
    storageType: "",
    storageGB: null,
    gpu: "",
    currentIssues: [],
  });
  const [report, setReport] = useState<DiagnosticReport | null>(null);
  const [modelInputMode, setModelInputMode] = useState<"select" | "manual">("select");

  const updateInput = (updates: Partial<UserPcInput>) => {
    setInput((prev) => ({ ...prev, ...updates }));
  };

  const toggleIssue = (id: string) => {
    if (id === "none") {
      setInput((prev) => ({ ...prev, currentIssues: ["none"] }));
      return;
    }
    setInput((prev) => ({
      ...prev,
      currentIssues: prev.currentIssues.includes(id)
        ? prev.currentIssues.filter((i) => i !== id)
        : [...prev.currentIssues.filter((i) => i !== "none"), id],
    }));
  };

  const handleDiagnose = () => {
    const browserDiag = runDiagnostics();
    const finalInput = { ...input };
    if (!finalInput.memoryGB && browserDiag.hardware.memoryGB) {
      finalInput.memoryGB = browserDiag.hardware.memoryGB;
    }
    if (!finalInput.gpu && browserDiag.gpu) {
      finalInput.gpu = browserDiag.gpu.renderer;
    }
    const result = generateReport(finalInput);
    setReport(result);
    setStep("result");
  };

  const progressFillClass = (score: number) => {
    if (score >= 75) return "progress-fill-green";
    if (score >= 55) return "progress-fill-blue";
    if (score >= 35) return "progress-fill-yellow";
    return "progress-fill-red";
  };

  const verdictClass = (verdict: string) => {
    if (verdict === "まだまだ現役") return "verdict-great";
    if (verdict === "そろそろ買い替え検討") return "verdict-fair";
    return "verdict-poor";
  };

  const verdictTextClass = (verdict: string) => {
    if (verdict === "まだまだ現役") return "text-emerald-400";
    if (verdict === "そろそろ買い替え検討") return "text-amber-400";
    return "text-red-400";
  };

  const usageVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "快適": return "score-great";
      case "問題なし": return "score-good";
      case "やや厳しい": return "score-fair";
      default: return "score-poor";
    }
  };

  return (
    <div className="p-4 space-y-5 animate-fade-in">
      {/* ヘッダー */}
      <div className="text-center">
        <h2 className="text-xl font-bold gradient-text">🔍 PC診断</h2>
        <p className="text-sm text-slate-400 mt-1">
          あなたのPCの状態を診断します
        </p>
      </div>

      {/* ステッパー */}
      <div className="flex items-center justify-center gap-1 px-2">
        {STEPS.map((s, i) => {
          const isActive = step === s.key;
          const stepIndex = STEPS.findIndex((st) => st.key === step);
          const isPast = STEPS.findIndex((st) => st.key === s.key) < stepIndex;
          return (
            <div key={s.key} className="flex items-center gap-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isActive
                      ? "bg-indigo-500 text-white glow"
                      : isPast
                        ? "bg-indigo-500/30 text-indigo-300"
                        : "bg-slate-700 text-slate-500"
                  }`}
                >
                  {isPast ? "✓" : i + 1}
                </div>
                <span
                  className={`text-[10px] mt-1 ${
                    isActive ? "text-indigo-400" : "text-slate-500"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-8 h-0.5 mb-4 rounded ${
                    isPast ? "bg-indigo-500/50" : "bg-slate-700"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1: 基本情報 */}
      {step === "basic" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-5 space-y-4">
            <h3 className="font-medium text-slate-200">基本情報を教えてください</h3>

            <div>
              <label className="block text-sm text-slate-400 mb-2">メーカー</label>
              <select
                value={input.manufacturer}
                onChange={(e) => {
                  updateInput({ manufacturer: e.target.value, modelNumber: "" });
                  setModelInputMode("select");
                }}
              >
                <option value="">選択してください</option>
                {MANUFACTURERS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-400">
                  型番 <span className="text-slate-600">（わかれば）</span>
                </label>
                {input.manufacturer && getModelsForManufacturer(input.manufacturer).length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setModelInputMode(modelInputMode === "select" ? "manual" : "select");
                      updateInput({ modelNumber: "" });
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    {modelInputMode === "select" ? "✏️ 手動で入力" : "📋 一覧から選択"}
                  </button>
                )}
              </div>

              {modelInputMode === "select" &&
               input.manufacturer &&
               getModelsForManufacturer(input.manufacturer).length > 0 ? (
                <select
                  value={input.modelNumber}
                  onChange={(e) => updateInput({ modelNumber: e.target.value })}
                >
                  <option value="">選択してください（任意）</option>
                  {getModelsForManufacturer(input.manufacturer).map((group) => (
                    <optgroup key={group.series} label={group.series}>
                      {group.models.map((m) => (
                        <option key={m.name} value={m.name}>
                          {m.name}{m.year ? ` (${m.year})` : ""}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={input.modelNumber}
                  onChange={(e) => updateInput({ modelNumber: e.target.value })}
                  placeholder="例: MacBook Air M2, ThinkPad X1 Carbon"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-400 mb-2">購入年</label>
                <select
                  value={input.purchaseYear ?? ""}
                  onChange={(e) =>
                    updateInput({ purchaseYear: e.target.value ? Number(e.target.value) : null })
                  }
                >
                  <option value="">わからない</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}年</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">購入月</label>
                <select
                  value={input.purchaseMonth ?? ""}
                  onChange={(e) =>
                    updateInput({ purchaseMonth: e.target.value ? Number(e.target.value) : null })
                  }
                >
                  <option value="">わからない</option>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>{m}月</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep("specs")}
            disabled={!input.manufacturer}
            className="btn-primary w-full py-3"
          >
            次へ →
          </button>
        </div>
      )}

      {/* Step 2: スペック */}
      {step === "specs" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-5 space-y-4">
            <div>
              <h3 className="font-medium text-slate-200">スペックを教えてください</h3>
              <p className="text-xs text-slate-500 mt-1">
                わからない項目はスキップOK（購入時期から推定します）
              </p>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                CPU <span className="text-slate-600">（わかれば）</span>
              </label>
              <input
                type="text"
                value={input.cpu}
                onChange={(e) => updateInput({ cpu: e.target.value })}
                placeholder="例: Apple M2, Core i7-12700H"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">メモリ</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateInput({ memoryGB: null })}
                  className={`chip ${input.memoryGB === null ? "chip-active" : ""}`}
                >
                  わからない
                </button>
                {MEMORY_OPTIONS.map((gb) => (
                  <button
                    key={gb}
                    onClick={() => updateInput({ memoryGB: gb })}
                    className={`chip ${input.memoryGB === gb ? "chip-active" : ""}`}
                  >
                    {gb}GB
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">ストレージ種類</label>
              <div className="flex flex-wrap gap-2">
                {STORAGE_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateInput({ storageType: type })}
                    className={`chip ${input.storageType === type ? "chip-active" : ""}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">ストレージ容量</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateInput({ storageGB: null })}
                  className={`chip ${input.storageGB === null ? "chip-active" : ""}`}
                >
                  わからない
                </button>
                {STORAGE_OPTIONS.map((gb) => (
                  <button
                    key={gb}
                    onClick={() => updateInput({ storageGB: gb })}
                    className={`chip ${input.storageGB === gb ? "chip-active" : ""}`}
                  >
                    {gb >= 1024 ? `${gb / 1024}TB` : `${gb}GB`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                GPU <span className="text-slate-600">（わかれば）</span>
              </label>
              <input
                type="text"
                value={input.gpu}
                onChange={(e) => updateInput({ gpu: e.target.value })}
                placeholder="例: RTX 4060, Radeon RX 7600, 内蔵"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep("basic")} className="btn-secondary flex-1 py-3">
              ← 戻る
            </button>
            <button onClick={() => setStep("issues")} className="btn-primary flex-1 py-3">
              次へ →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: 困りごと */}
      {step === "issues" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-5 space-y-4">
            <h3 className="font-medium text-slate-200">現在困っていることは？</h3>
            <p className="text-xs text-slate-500">複数選択できます</p>
            <div className="grid grid-cols-2 gap-2">
              {ISSUES.map((issue) => (
                <button
                  key={issue.id}
                  onClick={() => toggleIssue(issue.id)}
                  className={`card p-3 text-sm text-center transition-all ${
                    input.currentIssues.includes(issue.id) ? "card-active" : ""
                  }`}
                >
                  {issue.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep("specs")} className="btn-secondary flex-1 py-3">
              ← 戻る
            </button>
            <button
              onClick={handleDiagnose}
              disabled={input.currentIssues.length === 0}
              className="btn-primary flex-1 py-3"
            >
              🔍 診断する
            </button>
          </div>
        </div>
      )}

      {/* Step 4: 結果 */}
      {step === "result" && report && (
        <div className="space-y-4 animate-fade-in">
          {/* 総合評価 */}
          <div className={`p-6 rounded-2xl text-center ${verdictClass(report.overallVerdict)}`}>
            <p className="text-xs text-slate-400 uppercase tracking-wider">総合評価</p>
            <p className={`text-2xl font-bold mt-2 ${verdictTextClass(report.overallVerdict)}`}>
              {report.overallVerdict}
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>0</span>
                <span className="text-slate-300 font-medium">スコア: {report.overallScore}/100</span>
                <span>100</span>
              </div>
              <div className="progress-bar h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-700 ${progressFillClass(report.overallScore)}`}
                  style={{ width: `${report.overallScore}%` }}
                />
              </div>
            </div>
            {report.estimatedSpecs.isEstimated && (
              <p className="text-xs text-slate-500 mt-3">
                ※ 一部スペックは購入時期・メーカーから推定
              </p>
            )}
          </div>

          {/* スペック */}
          <div className="card p-4">
            <h3 className="font-medium text-slate-300 mb-3">
              {report.estimatedSpecs.isEstimated ? "📊 推定スペック" : "📊 スペック"}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                { label: "CPU", value: report.estimatedSpecs.cpu },
                { label: "メモリ", value: `${report.estimatedSpecs.memoryGB}GB` },
                { label: "ストレージ", value: `${report.estimatedSpecs.storageType} ${report.estimatedSpecs.storageGB}GB` },
                { label: "GPU", value: report.estimatedSpecs.gpu },
                { label: "経過年数", value: `約${report.estimatedAge}年` },
              ].map((item) => (
                <div key={item.label} className="p-2 rounded-lg bg-slate-800/50">
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="text-slate-300 font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 用途別評価 */}
          <div className="card p-4 space-y-3">
            <h3 className="font-medium text-slate-300">🎯 用途別評価</h3>
            {report.usageRatings.map((rating) => (
              <div key={rating.category} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">
                    {rating.icon} {rating.label}
                  </span>
                  <span className={`score-badge ${usageVerdictBadge(rating.verdict)}`}>
                    {rating.verdict}
                  </span>
                </div>
                <div className="progress-bar h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ${progressFillClass(rating.score)}`}
                    style={{ width: `${rating.score}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500">{rating.comment}</p>
              </div>
            ))}
          </div>

          {/* アドバイス */}
          {report.advice.length > 0 && (
            <div className="card p-4 border-indigo-500/20">
              <h3 className="font-medium text-indigo-300 mb-2">💡 アドバイス</h3>
              <ul className="space-y-2">
                {report.advice.map((a, i) => (
                  <li key={i} className="text-sm text-slate-400 flex gap-2">
                    <span className="text-indigo-400 shrink-0">•</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* アップグレード */}
          {report.upgradeOptions.length > 0 && (
            <div className="card p-4 border-cyan-500/20">
              <h3 className="font-medium text-cyan-300 mb-2">🔧 アップグレード候補</h3>
              <ul className="space-y-2">
                {report.upgradeOptions.map((opt, i) => (
                  <li key={i} className="text-sm text-slate-400 flex gap-2">
                    <span className="text-cyan-400 shrink-0">•</span>
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <EmailReportButton
            payload={{
              type: "diagnostic",
              report,
            }}
          />

          <button
            onClick={() => {
              setStep("basic");
              setInput({
                manufacturer: "",
                modelNumber: "",
                purchaseYear: null,
                purchaseMonth: null,
                cpu: "",
                memoryGB: null,
                storageType: "",
                storageGB: null,
                gpu: "",
                currentIssues: [],
              });
              setReport(null);
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
