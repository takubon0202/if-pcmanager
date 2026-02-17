"use client";

import { useEffect, useState } from "react";
import { initLiff } from "@/lib/liff";
import { ModeSelector } from "@/components/ModeSelector";
import { DiagnosticView } from "@/components/DiagnosticView";
import { LaptopView } from "@/components/LaptopView";
import type { Mode } from "@/types";

export default function Home() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [liffReady, setLiffReady] = useState(false);
  const [liffError, setLiffError] = useState<string | null>(null);

  useEffect(() => {
    initLiff()
      .then(() => setLiffReady(true))
      .catch((err) => {
        setLiffError("LIFF初期化に失敗しました");
        console.error(err);
        // LIFF外でも動作可能にする
        setLiffReady(true);
      });
  }, []);

  if (!liffReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto" />
          <p className="mt-3 text-sm text-gray-500">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMode(null)}
            className="text-lg font-bold text-gray-800"
          >
            ⚡ PC Manager
          </button>
          {mode && (
            <button
              onClick={() => setMode(null)}
              className="text-sm text-blue-500"
            >
              モード選択に戻る
            </button>
          )}
        </div>
        {liffError && (
          <div className="bg-yellow-50 px-4 py-1 text-xs text-yellow-700 text-center">
            {liffError}（ブラウザモードで動作中）
          </div>
        )}
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-lg mx-auto pb-20">
        {!mode && (
          <>
            <div className="text-center pt-6 pb-2">
              <h1 className="text-2xl font-bold text-gray-800">PC Manager</h1>
              <p className="text-sm text-gray-500 mt-1">
                あなたに最適なPC環境を見つけよう
              </p>
            </div>
            <ModeSelector currentMode={mode} onSelectMode={setMode} />
          </>
        )}

        {mode === "diagnosis" && <DiagnosticView />}
        {mode === "laptop" && <LaptopView />}
      </main>
    </div>
  );
}
