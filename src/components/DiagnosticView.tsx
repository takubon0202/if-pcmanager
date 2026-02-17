"use client";

import { useEffect, useState } from "react";
import {
  runDiagnostics,
  evaluatePerformance,
  type DiagnosticResult,
  type PerformanceScore,
} from "@/lib/diagnostics";

export function DiagnosticView() {
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [score, setScore] = useState<PerformanceScore | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDiagnose = () => {
    setLoading(true);
    // 少し遅延を入れてUX向上
    setTimeout(() => {
      const diag = runDiagnostics();
      const perf = evaluatePerformance(diag);
      setResult(diag);
      setScore(perf);
      setLoading(false);
    }, 500);
  };

  const scoreColor = {
    high: "text-green-600",
    medium: "text-yellow-600",
    low: "text-red-600",
  };

  const scoreLabel = {
    high: "高性能 🚀",
    medium: "標準的 ⚡",
    low: "低スペック ⚠️",
  };

  const scoreBg = {
    high: "bg-green-50 border-green-200",
    medium: "bg-yellow-50 border-yellow-200",
    low: "bg-red-50 border-red-200",
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">PC診断</h2>
        <p className="text-sm text-gray-500 mt-1">
          ブラウザから取得できる情報でPCのスペックを診断します
        </p>
      </div>

      {!result && (
        <button
          onClick={handleDiagnose}
          disabled={loading}
          className="w-full py-3 px-6 bg-blue-500 text-white rounded-xl font-medium
                     hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {loading ? "診断中..." : "診断を開始する"}
        </button>
      )}

      {score && (
        <div
          className={`p-4 rounded-xl border-2 text-center ${scoreBg[score.overall]}`}
        >
          <p className="text-sm text-gray-500">総合評価</p>
          <p className={`text-2xl font-bold ${scoreColor[score.overall]}`}>
            {scoreLabel[score.overall]}
          </p>
        </div>
      )}

      {score && (
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">診断詳細</h3>
          {score.details.map((detail, i) => (
            <div
              key={i}
              className="p-3 bg-white rounded-lg border border-gray-100 text-sm text-gray-700"
            >
              {detail}
            </div>
          ))}
        </div>
      )}

      {result && (
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">ブラウザ情報</h3>
          <div className="p-3 bg-white rounded-lg border border-gray-100 text-xs text-gray-500 break-all">
            <p>
              <span className="font-medium">Platform:</span>{" "}
              {result.browser.platform}
            </p>
            <p>
              <span className="font-medium">Language:</span>{" "}
              {result.browser.language}
            </p>
            <p>
              <span className="font-medium">Screen:</span>{" "}
              {result.display.screenWidth}x{result.display.screenHeight} @
              {result.display.pixelRatio}x
            </p>
            <p>
              <span className="font-medium">Network:</span>{" "}
              {result.network.type || "不明"}{" "}
              {result.network.downlink
                ? `(${result.network.downlink}Mbps)`
                : ""}
            </p>
          </div>
        </div>
      )}

      {result && (
        <button
          onClick={() => {
            setResult(null);
            setScore(null);
          }}
          className="w-full py-2 px-4 bg-gray-100 text-gray-600 rounded-xl text-sm
                     hover:bg-gray-200 transition-colors"
        >
          もう一度診断する
        </button>
      )}
    </div>
  );
}
