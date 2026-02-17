"use client";

import { MODES, type Mode } from "@/types";

interface ModeSelectorProps {
  currentMode: Mode | null;
  onSelectMode: (mode: Mode) => void;
}

export function ModeSelector({ currentMode, onSelectMode }: ModeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {MODES.map((mode) => (
        <button
          key={mode.id}
          onClick={() => mode.enabled && onSelectMode(mode.id)}
          disabled={!mode.enabled}
          className={`
            flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
            ${
              currentMode === mode.id
                ? "border-blue-500 bg-blue-50 shadow-md"
                : mode.enabled
                  ? "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                  : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
            }
          `}
        >
          <span className="text-2xl">{mode.icon}</span>
          <span
            className={`text-sm font-medium ${
              currentMode === mode.id ? "text-blue-700" : "text-gray-700"
            }`}
          >
            {mode.label}
          </span>
          {!mode.enabled && (
            <span className="text-xs text-gray-400">Coming Soon</span>
          )}
        </button>
      ))}
    </div>
  );
}
