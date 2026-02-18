"use client";

import { MODES, type Mode } from "@/types";

interface ModeSelectorProps {
  currentMode: Mode | null;
  onSelectMode: (mode: Mode) => void;
}

export function ModeSelector({ currentMode, onSelectMode }: ModeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {MODES.map((mode, i) => (
        <button
          key={mode.id}
          onClick={() => mode.enabled && onSelectMode(mode.id)}
          disabled={!mode.enabled}
          className={`
            card flex flex-col items-center gap-2 p-5 transition-all
            ${currentMode === mode.id ? "card-active" : ""}
            ${!mode.enabled ? "opacity-35 cursor-not-allowed" : "cursor-pointer"}
          `}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <span className="text-3xl">{mode.icon}</span>
          <span className="text-sm font-medium text-slate-200">
            {mode.label}
          </span>
          {mode.enabled ? (
            <span className="text-xs text-slate-500">{mode.description}</span>
          ) : (
            <span className="text-xs text-indigo-400/50">Coming Soon</span>
          )}
        </button>
      ))}
    </div>
  );
}
