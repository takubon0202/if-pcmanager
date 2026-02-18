"use client";

import { MODES, type Mode } from "@/types";

interface ModeSelectorProps {
  currentMode: Mode | null;
  onSelectMode: (mode: Mode) => void;
}

export function ModeSelector({ currentMode, onSelectMode }: ModeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {MODES.map((mode, i) => (
        <button
          key={mode.id}
          onClick={() => mode.enabled && onSelectMode(mode.id)}
          disabled={!mode.enabled}
          className={`
            card flex flex-col items-center gap-3 p-6 transition-all animate-fade-in
            ${currentMode === mode.id ? "card-active" : ""}
            ${!mode.enabled ? "opacity-40 cursor-not-allowed grayscale" : "cursor-pointer active:scale-95"}
          `}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <span className="text-4xl mb-1">{mode.icon}</span>
          <div className="text-center">
            <span className="block text-sm font-bold text-slate-100 mb-1">
              {mode.label}
            </span>
            {mode.enabled ? (
              <span className="text-[11px] text-slate-400 leading-tight block">
                {mode.description}
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/60">
                Coming Soon
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
