"use client";

interface DiagnosticHeroProps {
  onStart: () => void;
  onManual: () => void;
}

export function DiagnosticHero({ onStart, onManual }: DiagnosticHeroProps) {
  return (
    <div className="px-4 pb-2">
      <div className="hero-card p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-3xl glow">
            🔍
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">PC性能チェック</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              あなたのPCの実力を数値で可視化
            </p>
          </div>
        </div>

        <div className="flex gap-2 text-[10px] text-slate-400">
          {["CPU", "メモリ", "GPU", "ストレージ"].map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/50"
            >
              {item}
            </span>
          ))}
        </div>

        <button onClick={onStart} className="hero-btn-accent w-full py-3.5 text-sm">
          ⚡ PC性能をチェックする
        </button>

        <p className="text-[10px] text-slate-500 text-center">
          自動検出で情報を取得し、足りない部分だけ入力します
          <br />
          <button
            onClick={onManual}
            className="text-indigo-400/70 hover:text-indigo-300 underline underline-offset-2 mt-1 inline-block transition-colors"
          >
            スペックを知っている方はこちら（手動入力）
          </button>
        </p>
      </div>
    </div>
  );
}
