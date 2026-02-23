"use client";

import { useState } from "react";
import type { CustomPCBuild, PartCategory, PCPart } from "@/types/custom-pc";
import { PART_CATEGORIES } from "@/types/custom-pc";
import { ALL_PARTS } from "@/data/custom-pc-parts";
import {
  checkCompatibility,
  getCompatibilityLevel,
  getCompatibilityStyles,
} from "@/lib/compatibility";

/* ─── パーツ選択モーダル ─── */

interface PartSelectionModalProps {
  category: PartCategory;
  currentPart?: PCPart;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (part: PCPart) => void;
}

function PartSelectionModal({
  category,
  currentPart,
  isOpen,
  onClose,
  onSelect,
}: PartSelectionModalProps) {
  const [sortBy, setSortBy] = useState<"name" | "price" | "brand">("price");
  const [filterBrand, setFilterBrand] = useState<string>("all");

  if (!isOpen) return null;

  const parts = ALL_PARTS[category] || [];
  const brands = Array.from(new Set(parts.map((p) => p.brand))).sort();

  const filtered = parts.filter(
    (p) => filterBrand === "all" || p.brand === filterBrand
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return a.brand.localeCompare(b.brand);
  });

  const catInfo = PART_CATEGORIES.find((c) => c.id === category);

  const formatSpecs = (part: PCPart): string => {
    switch (part.type) {
      case "cpu":
        return `${part.specs.cores}C/${part.specs.threads}T • ${part.specs.boostClock}GHz • TDP ${part.specs.tdp}W • ${part.specs.socket}`;
      case "gpu":
        return `VRAM ${part.specs.vram}GB • TDP ${part.specs.tdp}W • ${part.specs.length}mm`;
      case "memory":
        return `${part.specs.type}-${part.specs.speed} • ${part.specs.capacity}GB×${part.specs.sticks}`;
      case "motherboard":
        return `${part.specs.socket} • ${part.specs.chipset} • ${part.specs.formFactor} • ${part.specs.memoryType}`;
      case "storage":
        return `${part.specs.type} ${part.specs.interface} • ${part.specs.capacity >= 1000 ? `${part.specs.capacity / 1000}TB` : `${part.specs.capacity}GB`}`;
      case "psu":
        return `${part.specs.wattage}W • ${part.specs.certification} • ${part.specs.modular === "Full" ? "フルモジュラー" : part.specs.modular === "Semi" ? "セミモジュラー" : "非モジュラー"}`;
      case "case":
        return `${part.specs.formFactor} • GPU ${part.specs.maxGPULength}mm • クーラー ${part.specs.maxCoolerHeight}mm`;
      case "cooler":
        return `${part.specs.type === "air" ? "空冷" : "簡易水冷"} • TDP ${part.specs.tdpRating}W${part.specs.type === "air" && part.specs.height ? ` • ${part.specs.height}mm` : ""}${part.specs.type === "aio" && part.specs.radiatorSize ? ` • ${part.specs.radiatorSize}mmラジ` : ""}`;
      default:
        return "";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* panel */}
      <div
        className="relative w-full max-w-lg max-h-[85vh] bg-slate-900/95 backdrop-blur-xl border border-indigo-500/20 rounded-t-3xl sm:rounded-3xl overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-xl px-5 pt-5 pb-4 border-b border-indigo-500/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold gradient-text">
              {catInfo?.icon} {catInfo?.name}を選択
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors text-sm text-slate-400"
            >
              ✕
            </button>
          </div>

          {/* filters */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            >
              <option value="price">💰 価格順</option>
              <option value="name">🔤 名前順</option>
              <option value="brand">🏷️ ブランド順</option>
            </select>
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
            >
              <option value="all">全ブランド</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* list */}
        <div className="overflow-y-auto max-h-[60vh] p-4 space-y-3">
          {sorted.map((part) => {
            const isSelected = currentPart?.id === part.id;
            return (
              <button
                key={part.id}
                className={`card w-full text-left p-4 transition-all active:scale-[0.98] ${isSelected ? "card-active" : ""}`}
                onClick={() => onSelect(part)}
              >
                <div className="flex items-start gap-3">
                  {/* icon */}
                  <div className="w-11 h-11 shrink-0 bg-slate-800/80 rounded-xl flex items-center justify-center text-lg">
                    {catInfo?.icon}
                  </div>

                  {/* info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm text-white truncate">
                          {part.name}
                        </h3>
                        <span className="text-xs text-slate-500">
                          {part.brand}
                        </span>
                      </div>
                      <span className="shrink-0 font-bold text-sm text-indigo-400">
                        ¥{part.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {formatSpecs(part)}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 text-center">
                    ✓ 選択中
                  </div>
                )}
              </button>
            );
          })}

          {sorted.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              該当するパーツが見つかりませんでした
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── メインビュー ─── */

export function CustomPCView() {
  const [build, setBuild] = useState<CustomPCBuild>({});
  const [selectedCategory, setSelectedCategory] =
    useState<PartCategory | null>(null);

  const totalPrice = Object.values(build).reduce(
    (sum, part) => sum + (part?.price || 0),
    0
  );
  const selectedCount = Object.values(build).filter(Boolean).length;

  const issues = checkCompatibility(build);
  const level = getCompatibilityLevel(issues);
  const styles = getCompatibilityStyles(level);

  const handleSelect = (category: PartCategory, part: PCPart) => {
    setBuild((prev) => ({ ...prev, [category]: part }));
    setSelectedCategory(null);
  };

  const handleRemove = (category: PartCategory) => {
    setBuild((prev) => {
      const next = { ...prev };
      delete next[category];
      return next;
    });
  };

  const handleShare = () => {
    const lines = Object.entries(build)
      .filter(([, part]) => part)
      .map(([cat, part]) => {
        const info = PART_CATEGORIES.find((c) => c.id === cat);
        return `${info?.icon} ${info?.name}: ${part?.name} (¥${part?.price.toLocaleString()})`;
      });

    const msg = [
      "🔧 自作PC構成",
      "",
      ...lines,
      "",
      `💰 合計: ¥${totalPrice.toLocaleString()}`,
      "",
      issues.length === 0
        ? "✅ 互換性OK"
        : `⚠️ 互換性の問題: ${issues.length}件`,
    ].join("\n");

    const win = window as unknown as { liff?: { sendMessages: (msgs: { type: string; text: string }[]) => Promise<void> } };
    if (typeof window !== "undefined" && win.liff) {
      win.liff
        .sendMessages([{ type: "text", text: msg }])
        .catch((err: unknown) => {
          console.error("LINE送信エラー:", err);
          alert("LINEでの共有に失敗しました");
        });
    } else {
      navigator.clipboard
        .writeText(msg)
        .then(() => alert("構成をクリップボードにコピーしました"))
        .catch(() => alert("クリップボードへのコピーに失敗しました"));
    }
  };

  const handleReset = () => {
    if (selectedCount === 0) return;
    if (confirm("構成をリセットしますか？")) setBuild({});
  };

  /* 選択済みパーツの短いスペック */
  const shortSpec = (part: PCPart): string => {
    switch (part.type) {
      case "cpu":
        return `${part.specs.cores}C/${part.specs.threads}T ${part.specs.boostClock}GHz`;
      case "gpu":
        return `${part.specs.vram}GB VRAM`;
      case "memory":
        return `${part.specs.type}-${part.specs.speed} ${part.specs.capacity * part.specs.sticks}GB`;
      case "motherboard":
        return `${part.specs.chipset} ${part.specs.formFactor}`;
      case "storage":
        return `${part.specs.capacity >= 1000 ? `${part.specs.capacity / 1000}TB` : `${part.specs.capacity}GB`} ${part.specs.interface}`;
      case "psu":
        return `${part.specs.wattage}W ${part.specs.certification}`;
      case "case":
        return part.specs.formFactor;
      case "cooler":
        return part.specs.type === "air" ? "空冷" : `${part.specs.radiatorSize}mm AIO`;
      default:
        return "";
    }
  };

  return (
    <div className="px-4 py-6 animate-fade-in">
      {/* ── 合計金額 ── */}
      <div
        className={`card p-6 mb-6 text-center ${selectedCount > 0 ? "glow" : ""}`}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
          構成合計
        </p>
        <div className="text-4xl font-extrabold gradient-text leading-tight">
          ¥{totalPrice.toLocaleString()}
        </div>
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="text-xs text-slate-400">
            {selectedCount} / {PART_CATEGORIES.length} パーツ選択済み
          </span>
          {selectedCount > 0 && (
            <button
              onClick={handleReset}
              className="text-[10px] text-red-400/70 hover:text-red-400 transition-colors underline underline-offset-2"
            >
              リセット
            </button>
          )}
        </div>
      </div>

      {/* ── 互換性ステータス ── */}
      {selectedCount >= 2 && (
        <div className={`${issues.length > 0 ? styles.bgClass : "verdict-great"} p-4 rounded-2xl mb-5`}>
          <div
            className={`flex items-center gap-2 ${issues.length > 0 ? styles.textClass : "text-green-400"}`}
          >
            <span className="text-base">
              {issues.length > 0 ? styles.iconClass : "✅"}
            </span>
            <h3 className="font-semibold text-sm">
              {issues.length === 0
                ? "互換性に問題はありません"
                : `互換性チェック (${issues.length}件)`}
            </h3>
          </div>
          {issues.length > 0 && (
            <div className="mt-3 space-y-2">
              {issues.map((issue, i) => (
                <div
                  key={i}
                  className={`text-xs leading-relaxed ${issue.severity === "error" ? "text-red-400" : "text-yellow-400"}`}
                >
                  {issue.severity === "error" ? "🚨" : "⚠️"} {issue.message}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── パーツリスト ── */}
      <div className="space-y-2.5">
        {PART_CATEGORIES.map((cat, i) => {
          const part = build[cat.id];
          return (
            <div
              key={cat.id}
              className={`card overflow-hidden transition-all animate-fade-in ${part ? "card-active" : ""}`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {/* カテゴリ行 */}
              <div className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 shrink-0 bg-slate-800/80 rounded-xl flex items-center justify-center text-lg">
                  {cat.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white">{cat.name}</h3>

                  {part ? (
                    <div className="mt-0.5">
                      <span className="text-xs text-slate-300 block truncate">
                        {part.brand} {part.name}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {shortSpec(part)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500">
                      {cat.description}
                    </span>
                  )}
                </div>

                {/* 右側: 価格 + アクション */}
                <div className="shrink-0 text-right">
                  {part ? (
                    <>
                      <div className="text-sm font-bold text-indigo-400">
                        ¥{part.price.toLocaleString()}
                      </div>
                      <div className="flex gap-1.5 mt-1.5 justify-end">
                        <button
                          onClick={() => setSelectedCategory(cat.id)}
                          className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-800/60 text-slate-300 hover:bg-slate-700 transition-colors"
                        >
                          変更
                        </button>
                        <button
                          onClick={() => handleRemove(cat.id)}
                          className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-800/60 text-red-400/70 hover:text-red-400 hover:bg-slate-700 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className="btn-primary text-xs px-4 py-2"
                    >
                      選択
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 共有ボタン ── */}
      {selectedCount > 0 && (
        <div className="mt-8 animate-fade-in">
          <button
            onClick={handleShare}
            className="btn-primary w-full py-4 text-base font-bold"
          >
            📱 構成をLINEで共有
          </button>
          <p className="text-center text-[11px] text-slate-500 mt-2">
            パーツ構成と合計金額をLINEトークに送信します
          </p>
        </div>
      )}

      {/* ── モーダル ── */}
      {selectedCategory && (
        <PartSelectionModal
          category={selectedCategory}
          currentPart={build[selectedCategory]}
          isOpen
          onClose={() => setSelectedCategory(null)}
          onSelect={(part) => handleSelect(selectedCategory, part)}
        />
      )}
    </div>
  );
}
