"use client";

import { useEffect, useState } from "react";
import { initLiff } from "@/lib/liff";
import { ModeSelector } from "@/components/ModeSelector";
import { DiagnosticView } from "@/components/DiagnosticView";
import { LaptopView } from "@/components/LaptopView";
import { CustomPCView } from "@/components/CustomPCView";
import { PeripheralView } from "@/components/PeripheralView";
import { PERIPHERAL_FLOWS } from "@/data/peripherals";
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
        setLiffReady(true);
      });
  }, []);

  if (!liffReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-12 h-12 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin mx-auto" />
          <p className="mt-4 text-sm text-slate-400">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-slate-900/70 border-b border-indigo-500/10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMode(null)}
            className="text-lg font-bold gradient-text"
          >
            ⚡ PC Manager
          </button>
          {mode && (
            <button
              onClick={() => setMode(null)}
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              ← モード選択
            </button>
          )}
        </div>
        {liffError && (
          <div className="bg-amber-500/10 px-4 py-1 text-xs text-amber-400 text-center border-t border-amber-500/10">
            {liffError}（ブラウザモードで動作中）
          </div>
        )}
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-lg mx-auto pb-20 animate-fade-in">
        {!mode && (
          <>
            <div className="text-center pt-8 pb-4 px-4">
              <h1 className="text-3xl font-bold gradient-text">PC Manager</h1>
              <p className="text-sm text-slate-400 mt-2">
                あなたに最適なPC環境を見つけよう
              </p>
            </div>
            <ModeSelector currentMode={mode} onSelectMode={setMode} />
          </>
        )}

        {mode === "diagnosis" && <DiagnosticView />}
        {mode === "laptop" && <LaptopView />}
        {mode === "custom-pc" && <CustomPCView />}
        {mode && mode in PERIPHERAL_FLOWS && (
          <PeripheralView key={mode} flow={PERIPHERAL_FLOWS[mode]} />
        )}
      </main>
    </div>
  );
}
