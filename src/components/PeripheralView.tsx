"use client";

import { useState } from "react";
import type { PeripheralFlowConfig, PeripheralItem } from "@/types/peripheral";
import { PERIPHERAL_CATALOG } from "@/data/peripherals";

function getProductUrl(item: PeripheralItem): string {
  if (item.url) return item.url;
  return `https://www.amazon.co.jp/s?k=${encodeURIComponent(item.name)}`;
}

interface PeripheralViewProps {
  flow: PeripheralFlowConfig;
}

export function PeripheralView({ flow }: PeripheralViewProps) {
  const totalSteps = flow.questions.length; // question steps (0..n-1)
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [results, setResults] = useState<PeripheralItem[]>([]);
  const [showResult, setShowResult] = useState(false);

  // webcam upsell state (monitor flow only)
  const [webcamPrompt, setWebcamPrompt] = useState(false);
  const [webcamResults, setWebcamResults] = useState<PeripheralItem[]>([]);

  const currentQuestion = flow.questions[stepIdx];

  const selectOption = (questionId: string, optionId: string, multi?: boolean) => {
    setAnswers((prev) => {
      if (multi) {
        const existing = prev[questionId] ?? [];
        const next = existing.includes(optionId)
          ? existing.filter((x) => x !== optionId)
          : [...existing, optionId];
        return { ...prev, [questionId]: next };
      }
      return { ...prev, [questionId]: [optionId] };
    });
  };

  const canProceed = (): boolean => {
    if (!currentQuestion) return false;
    return (answers[currentQuestion.id]?.length ?? 0) > 0;
  };

  const handleNext = () => {
    if (stepIdx < totalSteps - 1) {
      setStepIdx((i) => i + 1);
    } else {
      recommend();
    }
  };

  const handleBack = () => {
    if (stepIdx > 0) setStepIdx((i) => i - 1);
  };

  const recommend = () => {
    const items = PERIPHERAL_CATALOG.filter((i) => i.category === flow.category);
    const scored = items
      .map((item) => ({ item, score: flow.scoreFn(item, answers) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((x) => x.item);
    setResults(scored);
    setShowResult(true);
  };

  const showWebcamRecommendations = () => {
    const webcams = PERIPHERAL_CATALOG.filter((i) => i.category === "webcam")
      .sort((a, b) => a.price - b.price);
    setWebcamResults(webcams);
  };

  const handleReset = () => {
    setStepIdx(0);
    setAnswers({});
    setResults([]);
    setShowResult(false);
    setWebcamPrompt(false);
    setWebcamResults([]);
  };

  // ── Result view ─────────────────────────────────────────────────────────
  if (showResult) {
    return (
      <div className="p-4 space-y-5 animate-fade-in">
        <div className="text-center">
          <h2 className="text-xl font-bold gradient-text">{flow.title}</h2>
          <p className="text-sm text-slate-400 mt-1">おすすめ結果</p>
        </div>

        {results.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-slate-400">
              条件に合う商品が見つかりませんでした。
              <br />
              条件を変えてお試しください。
            </p>
          </div>
        ) : (
          results.map((item) => {
            const url = getProductUrl(item);
            return (
              <div key={item.id} className="card p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-200">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.brand}</p>
                  </div>
                  <p className="text-indigo-400 font-bold text-lg">
                    ¥{item.price.toLocaleString()}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(item.specs).map(([label, value]) => (
                    <div key={label} className="p-2 rounded-lg bg-slate-800/50">
                      <p className="text-slate-500">{label}</p>
                      <p className="text-slate-300">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-400/70 hover:text-indigo-300 underline break-all block leading-relaxed"
                  >
                    🔗 {url}
                  </a>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary block text-center py-2 text-sm"
                  >
                    詳細を見る →
                  </a>
                </div>
              </div>
            );
          })
        )}

        {/* Webcam upsell (monitor flow only) */}
        {flow.webcamUpsell && !webcamPrompt && (
          <div className="card p-5 space-y-3 border-indigo-500/20">
            <p className="font-medium text-slate-200">
              📷 Webカメラも追加で見ますか？
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setWebcamPrompt(true);
                  showWebcamRecommendations();
                }}
                className="btn-primary flex-1 py-2 text-sm"
              >
                はい
              </button>
              <button
                onClick={() => setWebcamPrompt(true)}
                className="btn-secondary flex-1 py-2 text-sm"
              >
                いいえ
              </button>
            </div>
          </div>
        )}

        {webcamResults.length > 0 && (
          <div className="space-y-3 animate-fade-in">
            <h3 className="font-medium text-slate-200">📷 おすすめWebカメラ</h3>
            {webcamResults.map((item) => {
              const url = getProductUrl(item);
              return (
                <div key={item.id} className="card p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-200">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.brand}</p>
                    </div>
                    <p className="text-indigo-400 font-bold text-lg">
                      ¥{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(item.specs).map(([label, value]) => (
                      <div key={label} className="p-2 rounded-lg bg-slate-800/50">
                        <p className="text-slate-500">{label}</p>
                        <p className="text-slate-300">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-400/70 hover:text-indigo-300 underline break-all block leading-relaxed"
                    >
                      🔗 {url}
                    </a>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary block text-center py-2 text-sm"
                    >
                      詳細を見る →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button onClick={handleReset} className="btn-secondary w-full py-3">
          最初からやり直す
        </button>
      </div>
    );
  }

  // ── Question flow ───────────────────────────────────────────────────────
  return (
    <div className="p-4 space-y-5 animate-fade-in">
      <div className="text-center">
        <h2 className="text-xl font-bold gradient-text">{flow.title}</h2>
        <p className="text-sm text-slate-400 mt-1">{flow.subtitle}</p>
      </div>

      {/* Step dots */}
      <div className="flex justify-center gap-2">
        {flow.questions.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === stepIdx ? "bg-indigo-500 glow" : i < stepIdx ? "bg-indigo-500/40" : "bg-slate-700"
            }`}
          />
        ))}
        {/* result dot */}
        <div className="w-2.5 h-2.5 rounded-full bg-slate-700 transition-all" />
      </div>

      {/* Current question */}
      {currentQuestion && (
        <div className="space-y-4 animate-fade-in" key={currentQuestion.id}>
          <div className="card p-5 space-y-3">
            <h3 className="font-medium text-slate-200">{currentQuestion.label}</h3>
            <div className="space-y-2">
              {currentQuestion.options.map((opt) => {
                const selected = answers[currentQuestion.id]?.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() =>
                      selectOption(currentQuestion.id, opt.id, currentQuestion.multi)
                    }
                    className={`card w-full p-3 text-left transition-all ${
                      selected ? "card-active" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {opt.icon && <span className="text-2xl">{opt.icon}</span>}
                      <div>
                        <p className="font-medium text-sm text-slate-200">{opt.label}</p>
                        {opt.desc && (
                          <p className="text-xs text-slate-400">{opt.desc}</p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            {stepIdx > 0 && (
              <button onClick={handleBack} className="btn-secondary flex-1 py-3">
                ← 戻る
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-primary flex-1 py-3"
            >
              {stepIdx < totalSteps - 1 ? "次へ →" : "🔍 おすすめを見る"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
