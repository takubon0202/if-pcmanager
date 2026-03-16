"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MANUFACTURERS,
  STORAGE_TYPES,
  ISSUES,
  type UserPcInput,
} from "@/types/diagnostic";
import type { DiagnosticReport, BenchmarkResult } from "@/types/diagnostic";
import EmailReportButton from "./EmailReportButton";
import { CourseCompatibilityCard } from "./CourseCompatibilityCard";
import { ScoreGauge } from "./ScoreGauge";
import { SoftwareComparisonCard } from "./SoftwareComparisonCard";
import { BottleneckAnalysis } from "./BottleneckAnalysis";
import { generateReport } from "@/lib/diagnostic-engine";
import { runDiagnostics } from "@/lib/diagnostics";
import { runBenchmark } from "@/lib/benchmark";
import { getModelsForManufacturer } from "@/data/model-catalog";

type Step = "detecting" | "basic" | "specs" | "issues" | "benchmarking" | "result";

const YEARS = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const MEMORY_OPTIONS = [4, 8, 16, 32, 64];
const STORAGE_OPTIONS = [128, 256, 512, 1024, 2048];

const STEPS_DISPLAY: { key: Step; label: string }[] = [
  { key: "basic", label: "基本情報" },
  { key: "specs", label: "スペック" },
  { key: "issues", label: "困りごと" },
  { key: "result", label: "結果" },
];

interface DiagnosticViewProps {
  mode: "hybrid" | "manual";
}

// 自動検出された項目を追跡する型
interface DetectedFields {
  cpu: boolean;
  memoryGB: boolean;
  gpu: boolean;
  manufacturer: boolean;
}

export function DiagnosticView({ mode }: DiagnosticViewProps) {
  const [step, setStep] = useState<Step>(mode === "hybrid" ? "detecting" : "basic");
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
  const [scanPhase, setScanPhase] = useState("初期化中...");
  const [scanProgress, setScanProgress] = useState(0);
  const [benchmarkResult, setBenchmarkResult] = useState<BenchmarkResult | undefined>();
  const [resultTab, setResultTab] = useState<"overview" | "software">("overview");
  const [detectedFields, setDetectedFields] = useState<DetectedFields>({
    cpu: false,
    memoryGB: false,
    gpu: false,
    manufacturer: false,
  });

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

  /* ── ハイブリッド: 自動検出フェーズ ── */
  const runAutoDetect = useCallback(async () => {
    setScanPhase("ハードウェアを検出中...");
    setScanProgress(20);
    await new Promise((r) => setTimeout(r, 400));

    const diag = runDiagnostics();

    setScanPhase("デバイス情報を分析中...");
    setScanProgress(60);
    await new Promise((r) => setTimeout(r, 300));

    // Detect manufacturer from userAgent
    const ua = diag.browser.userAgent;
    let manufacturer = "";
    const detected: DetectedFields = { cpu: false, memoryGB: false, gpu: false, manufacturer: false };

    if (/Macintosh|Mac OS/i.test(ua)) {
      manufacturer = "Apple";
      detected.manufacturer = true;
    } else if (/Surface/i.test(ua)) {
      manufacturer = "Microsoft";
      detected.manufacturer = true;
    }

    // CPU: コア数からの記述
    let cpuStr = "";
    if (diag.hardware.cores) {
      cpuStr = `${diag.hardware.cores}コア プロセッサ`;
      detected.cpu = true;
    }

    // Memory
    let memoryGB: number | null = null;
    if (diag.hardware.memoryGB) {
      memoryGB = diag.hardware.memoryGB;
      detected.memoryGB = true;
    }

    // GPU
    let gpu = "";
    if (diag.gpu?.renderer && diag.gpu.renderer !== "unknown") {
      gpu = diag.gpu.renderer;
      detected.gpu = true;
    }

    setScanPhase("完了");
    setScanProgress(100);
    await new Promise((r) => setTimeout(r, 200));

    setInput((prev) => ({
      ...prev,
      manufacturer: manufacturer || prev.manufacturer,
      cpu: cpuStr || prev.cpu,
      memoryGB: memoryGB ?? prev.memoryGB,
      gpu: gpu || prev.gpu,
    }));
    setDetectedFields(detected);
    setStep("basic");
  }, []);

  useEffect(() => {
    if (mode === "hybrid" && step === "detecting") {
      runAutoDetect();
    }
  }, [mode, step, runAutoDetect]);

  /* ── ベンチマーク実行 → 結果生成 ── */
  const runBenchmarkAndReport = useCallback(async () => {
    const bench = await runBenchmark((phase, progress) => {
      setScanPhase(phase);
      setScanProgress(progress);
    });
    setBenchmarkResult(bench);

    setScanPhase("レポートを生成中...");
    setScanProgress(98);
    await new Promise((r) => setTimeout(r, 200));

    const browserDiag = runDiagnostics();
    const finalInput = { ...input };
    if (!finalInput.memoryGB && browserDiag.hardware.memoryGB) {
      finalInput.memoryGB = browserDiag.hardware.memoryGB;
    }
    if (!finalInput.gpu && browserDiag.gpu) {
      finalInput.gpu = browserDiag.gpu.renderer;
    }

    const result = generateReport(finalInput, bench);
    setReport(result);
    setScanProgress(100);
    await new Promise((r) => setTimeout(r, 200));
    setStep("result");
  }, [input]);

  useEffect(() => {
    if (step === "benchmarking") {
      runBenchmarkAndReport();
    }
  }, [step, runBenchmarkAndReport]);

  /* ── 手動モード: ベンチマーク無しで即結果 ── */
  const handleDiagnoseManual = () => {
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

  /* ── issues完了後の分岐 ── */
  const handleIssuesDone = () => {
    if (mode === "hybrid") {
      // ハイブリッド: ベンチマークを実行してから結果表示
      setStep("benchmarking");
    } else {
      // 手動: そのまま結果
      handleDiagnoseManual();
    }
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

  // 自動検出バッジ
  const autoDetectedBadge = (fieldDetected: boolean) =>
    fieldDetected ? (
      <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 font-medium">
        自動検出
      </span>
    ) : null;

  return (
    <div className="p-4 space-y-5 animate-fade-in">
      {/* ヘッダー */}
      <div className="text-center">
        <h2 className="text-xl font-bold gradient-text">
          🔍 PC診断
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          {mode === "hybrid"
            ? "自動検出＋ベンチマークで高精度に診断"
            : "手動入力モード"}
        </p>
      </div>

      {/* ステッパー */}
      {step !== "detecting" && step !== "benchmarking" && (
        <div className="flex items-center justify-center gap-1 px-2">
          {STEPS_DISPLAY.map((s, i) => {
            const isActive = step === s.key;
            const stepIndex = STEPS_DISPLAY.findIndex((st) => st.key === step);
            const isPast = STEPS_DISPLAY.findIndex((st) => st.key === s.key) < stepIndex;
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
                {i < STEPS_DISPLAY.length - 1 && (
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
      )}

      {/* ── 自動検出中 ── */}
      {step === "detecting" && (
        <div className="space-y-6 animate-fade-in py-8">
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 animate-spin" style={{ animationDuration: "3s" }} />
              <div className="absolute inset-2 rounded-full border-2 border-cyan-400/40 animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }} />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                🔍
              </div>
            </div>
          </div>
          <div className="text-center space-y-3">
            <p className="text-sm text-slate-300 font-medium">{scanPhase}</p>
            <div className="max-w-xs mx-auto">
              <div className="progress-bar h-2">
                <div
                  className="h-2 rounded-full progress-fill-blue transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 1: 基本情報 ── */}
      {step === "basic" && (
        <div className="space-y-4 animate-fade-in">
          {/* ハイブリッドモード時の検出結果サマリー */}
          {mode === "hybrid" && Object.values(detectedFields).some(Boolean) && (
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <p className="text-xs text-cyan-300 font-medium mb-1">
                ⚡ 自動検出結果
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                検出できた情報は入力済みです。内容を確認して、足りない項目を埋めてください。
              </p>
            </div>
          )}

          <div className="card p-5 space-y-4">
            <h3 className="font-medium text-slate-200">基本情報を教えてください</h3>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm text-slate-400">メーカー</label>
                {autoDetectedBadge(detectedFields.manufacturer)}
              </div>
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

      {/* ── Step 2: スペック ── */}
      {step === "specs" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-5 space-y-4">
            <div>
              <h3 className="font-medium text-slate-200">スペックを教えてください</h3>
              <p className="text-xs text-slate-500 mt-1">
                {mode === "hybrid"
                  ? "自動検出された値は入力済みです。修正や追加ができます"
                  : "わからない項目はスキップOK（購入時期から推定します）"}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm text-slate-400">
                  CPU <span className="text-slate-600">（わかれば）</span>
                </label>
                {autoDetectedBadge(detectedFields.cpu)}
              </div>
              <input
                type="text"
                value={input.cpu}
                onChange={(e) => updateInput({ cpu: e.target.value })}
                placeholder="例: Apple M2, Core i7-12700H"
              />
              {detectedFields.cpu && (
                <p className="text-[10px] text-slate-500 mt-1">
                  ※ ブラウザからはコア数のみ取得。型番を入力するとより正確な診断になります
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm text-slate-400">メモリ</label>
                {autoDetectedBadge(detectedFields.memoryGB)}
              </div>
              {detectedFields.memoryGB && (
                <p className="text-[10px] text-slate-500 mb-1.5">
                  ※ ブラウザの制限で概算値です（最大8GB表示）。正確な値をご存じなら選択してください
                </p>
              )}
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
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm text-slate-400">
                  GPU <span className="text-slate-600">（わかれば）</span>
                </label>
                {autoDetectedBadge(detectedFields.gpu)}
              </div>
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

      {/* ── Step 3: 困りごと ── */}
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
              onClick={handleIssuesDone}
              disabled={input.currentIssues.length === 0}
              className="btn-primary flex-1 py-3"
            >
              {mode === "hybrid" ? "⚡ ベンチマーク＋診断" : "🔍 診断する"}
            </button>
          </div>
        </div>
      )}

      {/* ── ベンチマーク実行中 ── */}
      {step === "benchmarking" && (
        <div className="space-y-6 animate-fade-in py-8">
          <div className="flex justify-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 animate-spin" style={{ animationDuration: "3s" }} />
              <div className="absolute inset-2 rounded-full border-2 border-cyan-400/40 animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }} />
              <div className="absolute inset-4 rounded-full border-2 border-indigo-400/50 animate-spin" style={{ animationDuration: "1.5s" }} />
              <div className="absolute inset-0 flex items-center justify-center text-3xl">
                ⚡
              </div>
            </div>
          </div>
          <div className="text-center space-y-3">
            <p className="text-sm text-slate-300 font-medium">{scanPhase}</p>
            <p className="text-[11px] text-slate-500">
              実際のPC性能を測定しています...
            </p>
            <div className="max-w-xs mx-auto">
              <div className="progress-bar h-2">
                <div
                  className="h-2 rounded-full progress-fill-blue transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-2">
                {Math.round(scanProgress)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 4: 結果 ── */}
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
                <span className="text-slate-300 font-medium">
                  スコア: {report.overallScore}/100
                </span>
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

          {/* 講座対応判定 — 最も重要な判定結果 */}
          <CourseCompatibilityCard courses={report.courseCompatibility} />

          {/* コンポーネント別スコア */}
          <div className="card p-4 space-y-3">
            <h3 className="font-medium text-slate-300">📊 コンポーネント別スコア</h3>
            <div className="grid grid-cols-2 gap-2">
              {(["cpu", "memory", "storage", "gpu"] as const).map((key) => (
                <ScoreGauge
                  key={key}
                  score={report.componentScores[key].score}
                  label={report.componentScores[key].label}
                  detail={report.componentScores[key].detail}
                  isBottleneck={report.componentScores.bottleneck === key}
                />
              ))}
            </div>
          </div>

          {/* ベンチマーク結果 */}
          {report.benchmarkResult && (
            <div className="card p-4 space-y-3">
              <h3 className="font-medium text-slate-300">⚡ ベンチマーク結果</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  {
                    label: "CPU演算",
                    score: report.benchmarkResult.cpuScore,
                    detail: `${(report.benchmarkResult.details.mathOpsPerSecond / 1_000_000).toFixed(1)}M ops/s`,
                  },
                  {
                    label: "描画性能",
                    score: report.benchmarkResult.renderScore,
                    detail: `${report.benchmarkResult.details.canvasFps} FPS`,
                  },
                  {
                    label: "メモリ速度",
                    score: report.benchmarkResult.memoryScore,
                    detail: `${report.benchmarkResult.details.arrayAllocTime}ms`,
                  },
                ].map((b) => (
                  <div key={b.label} className="p-3 rounded-xl bg-slate-800/40">
                    <div
                      className={`text-xl font-bold ${
                        b.score >= 70
                          ? "text-emerald-400"
                          : b.score >= 40
                            ? "text-blue-400"
                            : "text-amber-400"
                      }`}
                    >
                      {b.score}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">{b.label}</p>
                    <p className="text-[9px] text-slate-500">{b.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ボトルネック分析 */}
          <BottleneckAnalysis componentScores={report.componentScores} />

          {/* タブ切替 */}
          <div className="flex gap-2">
            <button
              onClick={() => setResultTab("overview")}
              className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${
                resultTab === "overview"
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  : "text-slate-500 border border-transparent"
              }`}
            >
              🎯 用途別評価
            </button>
            <button
              onClick={() => setResultTab("software")}
              className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${
                resultTab === "software"
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  : "text-slate-500 border border-transparent"
              }`}
            >
              🖥 ソフト互換性
            </button>
          </div>

          {resultTab === "overview" && (
            <>
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
            </>
          )}

          {resultTab === "software" && (
            <SoftwareComparisonCard comparisons={report.softwareComparisons} />
          )}

          <EmailReportButton payload={{ type: "diagnostic", report }} />

          <button
            onClick={() => {
              setStep(mode === "hybrid" ? "detecting" : "basic");
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
              setBenchmarkResult(undefined);
              setResultTab("overview");
              setDetectedFields({ cpu: false, memoryGB: false, gpu: false, manufacturer: false });
              setScanProgress(0);
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
