"use client";

import { MODES, type Mode } from "@/types";

interface ModeSelectorProps {
  currentMode: Mode | null;
  onSelectMode: (mode: Mode) => void;
}

export function ModeSelector({ currentMode, onSelectMode }: ModeSelectorProps) {
  // diagnosis is handled by DiagnosticHero, so filter it out
  const otherModes = MODES.filter((m) => m.id !== "diagnosis");

  return (
    <div className="space-y-3 px-4">
      <h3 className="text-sm font-semibold text-slate-400 pl-1">
        その他のツール
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {otherModes.map((mode, i) => (
          <button
            key={mode.id}
            onClick={() => mode.enabled && onSelectMode(mode.id)}
            disabled={!mode.enabled}
            className={`
              card flex flex-col items-center gap-2 p-4 transition-all animate-fade-in
              ${currentMode === mode.id ? "card-active" : ""}
              ${!mode.enabled ? "opacity-40 cursor-not-allowed grayscale" : "cursor-pointer active:scale-95"}
            `}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="text-3xl">{mode.icon}</span>
            <div className="text-center">
              <span className="block text-xs font-bold text-slate-100 mb-0.5">
                {mode.label}
              </span>
              {mode.enabled ? (
                <span className="text-[10px] text-slate-400 leading-tight block">
                  {mode.description}
                </span>
              ) : (
                <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-400/60">
                  Coming Soon
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
