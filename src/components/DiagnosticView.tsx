"use client";

import { useState } from "react";
import {
  MANUFACTURERS,
  STORAGE_TYPES,
  ISSUES,
  type UserPcInput,
} from "@/types/diagnostic";
import type { DiagnosticReport } from "@/types/diagnostic";
import { generateReport } from "@/lib/diagnostic-engine";
import { runDiagnostics } from "@/lib/diagnostics";

type Step = "basic" | "specs" | "issues" | "result";

const YEARS = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

const MEMORY_OPTIONS = [4, 8, 16, 32, 64];
const STORAGE_OPTIONS = [128, 256, 512, 1024, 2048];

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
    // ブラウザ自動取得も追加
    const browserDiag = runDiagnostics();
    const finalInput = { ...input };

    // ブラウザから取得できた情報で補完
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

  const verdictColor = {
    "まだまだ現役": "text-green-600",
    "そろそろ買い替え検討": "text-yellow-600",
    "買い替え推奨": "text-red-600",
  };

  const verdictBg = {
    "まだまだ現役": "bg-green-50 border-green-200",
    "そろそろ買い替え検討": "bg-yellow-50 border-yellow-200",
    "買い替え推奨": "bg-red-50 border-red-200",
  };

  const usageVerdictColor = {
    "快適": "text-green-600 bg-green-50",
    "問題なし": "text-blue-600 bg-blue-50",
    "やや厳しい": "text-yellow-600 bg-yellow-50",
    "厳しい": "text-red-600 bg-red-50",
  };

  const scoreBarColor = (score: number) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 55) return "bg-blue-500";
    if (score >= 35) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">🔍 PC診断</h2>
        <p className="text-sm text-gray-500 mt-1">
          あなたのPCの状態を診断します
        </p>
      </div>

      {/* ステップインジケーター */}
      <div className="flex justify-center gap-2">
        {(["basic", "specs", "issues", "result"] as Step[]).map((s) => (
          <div
            key={s}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              step === s ? "bg-blue-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Step 1: 基本情報 */}
      {step === "basic" && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">基本情報を教えてください</h3>

          <div>
            <label className="block text-sm text-gray-600 mb-1">メーカー</label>
            <select
              value={input.manufacturer}
              onChange={(e) => updateInput({ manufacturer: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-800"
            >
              <option value="">選択してください</option>
              {MANUFACTURERS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              型番 <span className="text-gray-400">（わかれば）</span>
            </label>
            <input
              type="text"
              value={input.modelNumber}
              onChange={(e) => updateInput({ modelNumber: e.target.value })}
              placeholder="例: MacBook Air M2, ThinkPad X1 Carbon"
              className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">購入年</label>
              <select
                value={input.purchaseYear ?? ""}
                onChange={(e) =>
                  updateInput({
                    purchaseYear: e.target.value ? Number(e.target.value) : null,
                  })
                }
                className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-800"
              >
                <option value="">わからない</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}年</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">購入月</label>
              <select
                value={input.purchaseMonth ?? ""}
                onChange={(e) =>
                  updateInput({
                    purchaseMonth: e.target.value ? Number(e.target.value) : null,
                  })
                }
                className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-800"
              >
                <option value="">わからない</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setStep("specs")}
            disabled={!input.manufacturer}
            className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium
                       disabled:opacity-50 hover:bg-blue-600 transition-colors"
          >
            次へ
          </button>
        </div>
      )}

      {/* Step 2: スペック情報 */}
      {step === "specs" && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">
            スペックを教えてください
            <span className="text-xs text-gray-400 block mt-1">
              わからない項目はスキップOK（購入時期から推定します）
            </span>
          </h3>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              CPU <span className="text-gray-400">（わかれば）</span>
            </label>
            <input
              type="text"
              value={input.cpu}
              onChange={(e) => updateInput({ cpu: e.target.value })}
              placeholder="例: Apple M2, Core i7-12700H, Ryzen 7 7840HS"
              className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">メモリ</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateInput({ memoryGB: null })}
                className={`px-4 py-2 rounded-full border text-sm ${
                  input.memoryGB === null
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                わからない
              </button>
              {MEMORY_OPTIONS.map((gb) => (
                <button
                  key={gb}
                  onClick={() => updateInput({ memoryGB: gb })}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    input.memoryGB === gb
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  {gb}GB
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">ストレージ種類</label>
            <div className="flex flex-wrap gap-2">
              {STORAGE_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => updateInput({ storageType: type })}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    input.storageType === type
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">ストレージ容量</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateInput({ storageGB: null })}
                className={`px-4 py-2 rounded-full border text-sm ${
                  input.storageGB === null
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                わからない
              </button>
              {STORAGE_OPTIONS.map((gb) => (
                <button
                  key={gb}
                  onClick={() => updateInput({ storageGB: gb })}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    input.storageGB === gb
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  {gb >= 1024 ? `${gb / 1024}TB` : `${gb}GB`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              GPU <span className="text-gray-400">（わかれば）</span>
            </label>
            <input
              type="text"
              value={input.gpu}
              onChange={(e) => updateInput({ gpu: e.target.value })}
              placeholder="例: RTX 4060, Radeon RX 7600, 内蔵"
              className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-800"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep("basic")}
              className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl"
            >
              戻る
            </button>
            <button
              onClick={() => setStep("issues")}
              className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium"
            >
              次へ
            </button>
          </div>
        </div>
      )}

      {/* Step 3: 困りごと */}
      {step === "issues" && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">
            現在困っていることは？（複数可）
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {ISSUES.map((issue) => (
              <button
                key={issue.id}
                onClick={() => toggleIssue(issue.id)}
                className={`p-3 rounded-xl border-2 text-sm transition-all ${
                  input.currentIssues.includes(issue.id)
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-700"
                }`}
              >
                {issue.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStep("specs")}
              className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl"
            >
              戻る
            </button>
            <button
              onClick={handleDiagnose}
              disabled={input.currentIssues.length === 0}
              className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium disabled:opacity-50"
            >
              診断する
            </button>
          </div>
        </div>
      )}

      {/* Step 4: 診断結果 */}
      {step === "result" && report && (
        <div className="space-y-4">
          {/* 総合評価 */}
          <div className={`p-5 rounded-xl border-2 text-center ${verdictBg[report.overallVerdict]}`}>
            <p className="text-sm text-gray-500">総合評価</p>
            <p className={`text-2xl font-bold mt-1 ${verdictColor[report.overallVerdict]}`}>
              {report.overallVerdict}
            </p>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>0</span>
                <span>スコア: {report.overallScore}/100</span>
                <span>100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${scoreBarColor(report.overallScore)}`}
                  style={{ width: `${report.overallScore}%` }}
                />
              </div>
            </div>
            {report.estimatedSpecs.isEstimated && (
              <p className="text-xs text-gray-400 mt-2">
                ※ 一部スペックは購入時期・メーカーから推定しています
              </p>
            )}
          </div>

          {/* 推定/入力スペック */}
          <div className="p-4 bg-white rounded-xl border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2">
              {report.estimatedSpecs.isEstimated ? "推定スペック" : "スペック"}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <p>CPU: {report.estimatedSpecs.cpu}</p>
              <p>メモリ: {report.estimatedSpecs.memoryGB}GB</p>
              <p>ストレージ: {report.estimatedSpecs.storageType} {report.estimatedSpecs.storageGB}GB</p>
              <p>GPU: {report.estimatedSpecs.gpu}</p>
              <p>経過年数: 約{report.estimatedAge}年</p>
            </div>
          </div>

          {/* 用途別評価 */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">用途別評価</h3>
            {report.usageRatings.map((rating) => (
              <div
                key={rating.category}
                className="p-3 bg-white rounded-xl border border-gray-100"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {rating.icon} {rating.label}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${usageVerdictColor[rating.verdict]}`}
                  >
                    {rating.verdict}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                  <div
                    className={`h-2 rounded-full ${scoreBarColor(rating.score)}`}
                    style={{ width: `${rating.score}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">{rating.comment}</p>
              </div>
            ))}
          </div>

          {/* アドバイス */}
          {report.advice.length > 0 && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">💡 アドバイス</h3>
              <ul className="space-y-1">
                {report.advice.map((a, i) => (
                  <li key={i} className="text-sm text-blue-700">
                    • {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* アップグレード提案 */}
          {report.upgradeOptions.length > 0 && (
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <h3 className="font-medium text-purple-800 mb-2">🔧 アップグレード候補</h3>
              <ul className="space-y-1">
                {report.upgradeOptions.map((opt, i) => (
                  <li key={i} className="text-sm text-purple-700">
                    • {opt}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* やり直し */}
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
            className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl"
          >
            最初からやり直す
          </button>
        </div>
      )}
    </div>
  );
}
