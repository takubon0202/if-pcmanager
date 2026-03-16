#!/usr/bin/env node
/**
 * PC データリサーチスクリプト
 * Gemini 3 Flash Preview + Google Search (grounding) で最新PC情報を収集し、
 * 全データファイルを更新する。
 *
 * 更新対象:
 *   1. ノートPCデータベース         (src/data/laptops.ts)
 *   2. 型番カタログ                 (src/data/model-catalog.ts)
 *   3. CPUスコアデータ              (src/data/pc-models.ts)
 *   4. 周辺機器カタログ             (src/data/peripherals.ts)
 *      - モニター / キーボード / マウス / ヘッドセット / Webカメラ
 *   5. 自作PCパーツ                 (src/data/custom-pc-parts.ts)
 *      - CPU / GPU / メモリ / マザーボード / ストレージ / 電源 / ケース / クーラー
 *
 * 環境変数:
 *   GEMINI_API_KEY — Google AI Studio の API キー
 *
 * 使い方:
 *   node scripts/research-pc-data.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = path.resolve(__dirname, "..");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("ERROR: GEMINI_API_KEY が設定されていません");
  process.exit(1);
}

const MODEL = "gemini-2.5-flash-preview-05-20";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const today = new Date().toISOString().split("T")[0];

// ─── ユーティリティ ───

async function callGemini(prompt, retries = 2) {
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    tools: [{ google_search: {} }],
    generationConfig: { temperature: 0.2, maxOutputTokens: 65536 },
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API error ${res.status}: ${err}`);
      }
      const data = await res.json();
      const parts = data.candidates?.[0]?.content?.parts ?? [];
      return parts.filter((p) => p.text).map((p) => p.text).join("\n");
    } catch (e) {
      console.error(`  Attempt ${attempt + 1} failed:`, e.message);
      if (attempt === retries) throw e;
      await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)));
    }
  }
}

function extractCodeBlock(text) {
  const match = text.match(/```(?:typescript|ts|javascript|js)?\s*\n([\s\S]*?)\n```/);
  return match ? match[1].trim() : null;
}

function readFile(relativePath) {
  return fs.readFileSync(path.join(PROJECT_DIR, relativePath), "utf-8");
}

function writeFile(relativePath, content) {
  fs.writeFileSync(path.join(PROJECT_DIR, relativePath), content, "utf-8");
  console.log(`  ✅ ${relativePath} を更新`);
}

// API の負荷を避けるため各呼び出しの間に待機
async function wait(ms = 2000) {
  await new Promise((r) => setTimeout(r, ms));
}

// ═══════════════════════════════════════════════════════════════
// 1. ノートPC データベース
// ═══════════════════════════════════════════════════════════════

async function updateLaptops() {
  console.log("\n💻 ノートPCデータベースを更新中...");

  const currentData = readFile("src/data/laptops.ts");
  const prompt = `あなたはPC情報リサーチャーです。日本市場で現在購入可能なノートPCの最新情報を調べてください。

## 調査対象（${today}時点）
1. Apple認定整備済製品 (MacBook Air / Pro)
2. 主要メーカー現行モデル: Lenovo, HP, Dell, ASUS, Apple, mouse, Dynabook, Panasonic, 富士通, NEC, MSI, Acer
3. 過去2週間の新製品

## 出力形式
\`\`\`typescript で囲み、配列の中身だけ出力。import文不要。
{
  name: "製品名",
  brand: "ブランド名",
  price: 税込価格,
  url: "製品ページURL" | null,
  modelNumber: "型番",
  specs: { cpu: "", memory: "", storage: "", display: "", gpu: "", battery: "", weight: "" },
  matchScore: 0, reasons: [],
}

## ルール
- 税込日本円、日本市場で購入可能なモデルのみ
- 価格帯バランスを維持（5万〜10万 / 10万〜15万 / 15万〜25万 / 25万以上）
- 認定整備済製品は名前に「[認定整備済製品]」
- 最低30モデル以上
- URLは公式サイト（不明ならnull）

## 現在データ（参考）
${currentData.slice(0, 1500)}`;

  const result = await callGemini(prompt);
  const code = extractCodeBlock(result);
  if (!code) { console.error("  ❌ 抽出失敗"); return false; }

  writeFile("src/data/laptops.ts", `import type { LaptopRecommendation } from "@/types";

// ${today}時点 - Gemini API (Google Search grounding) で取得
export const LAPTOP_DATABASE: LaptopRecommendation[] = [
${code}
];
`);
  return true;
}

// ═══════════════════════════════════════════════════════════════
// 2. 型番カタログ
// ═══════════════════════════════════════════════════════════════

async function updateModelCatalog() {
  console.log("\n📋 型番カタログを更新中...");

  const currentData = readFile("src/data/model-catalog.ts");
  const prompt = `PC診断用の型番カタログを最新化してください（${today}時点）。
各メーカーの現行モデル＋過去3年分を含めます。

## 対象: Apple, Lenovo, HP, Dell, ASUS, Acer, MSI, マウスコンピューター, 富士通, NEC, Dynabook, Panasonic, Microsoft

## 出力形式
\`\`\`typescript で囲み、データ配列の中身だけ出力。
{
  manufacturer: "メーカー名",
  series: [
    { series: "シリーズ名", models: [{ name: "モデル名", year: 2024 }] },
  ],
}

## ルール
- 各メーカー最低2シリーズ、各シリーズ最低2モデル
- 5年以上前は除外
- Apple は MacBook Air/Pro, iMac, Mac mini を含む

## 現在データ（参考）
${currentData.slice(0, 1500)}`;

  const result = await callGemini(prompt);
  const code = extractCodeBlock(result);
  if (!code) { console.error("  ❌ 抽出失敗"); return false; }

  writeFile("src/data/model-catalog.ts", `// ${today}時点 - Gemini API (Google Search grounding) で取得

interface ModelInfo { name: string; year?: number; }
interface SeriesGroup { series: string; models: ModelInfo[]; }
interface ManufacturerCatalog { manufacturer: string; series: SeriesGroup[]; }

const CATALOG: ManufacturerCatalog[] = [
${code}
];

export function getModelsForManufacturer(manufacturer: string): SeriesGroup[] {
  const entry = CATALOG.find((c) => c.manufacturer === manufacturer);
  return entry?.series ?? [];
}
`);
  return true;
}

// ═══════════════════════════════════════════════════════════════
// 3. CPUスコア
// ═══════════════════════════════════════════════════════════════

async function updateCpuScores() {
  console.log("\n🧠 CPUスコアデータを更新中...");

  const currentData = readFile("src/data/pc-models.ts");
  const prompt = `CPUの相対性能スコアデータを最新化してください（${today}時点）。
最新ベンチマーク結果をWeb検索して反映。

## 対象
Intel: Core Ultra 200V/200S, 第14/13/12/11世代以前, Celeron, Pentium
AMD: Ryzen AI 300, Ryzen 9000/7000/5000/3000
Apple: M5 (Ultra/Max/Pro/無印), M4, M3, M2, M1
Qualcomm: Snapdragon X Elite/Plus

## 出力
\`\`\`typescript で [正規表現, スコア] の配列のみ出力。
例: [/M5 Ultra/i, 98],

スコア基準: 100=最高性能, 75=ハイ, 50=ミドル, 25=エントリー
新しい・高性能なCPUを先に配置。

## 現在データ（参考）
${currentData.slice(currentData.indexOf("const CPU_SCORES"), currentData.indexOf("export function cpuNameToScore"))}`;

  const result = await callGemini(prompt);
  const code = extractCodeBlock(result);
  if (!code) { console.error("  ❌ 抽出失敗"); return false; }

  const current = readFile("src/data/pc-models.ts");
  const updated = current.replace(
    /const CPU_SCORES:[\s\S]*?(?=\nexport function cpuNameToScore)/,
    `// ${today}時点 - Gemini API で最新ベンチマークを反映
const CPU_SCORES: [RegExp, number][] = [
${code}
];

`
  );

  if (updated === current) { console.error("  ❌ 置換失敗"); return false; }
  writeFile("src/data/pc-models.ts", updated);
  return true;
}

// ═══════════════════════════════════════════════════════════════
// 4. 周辺機器カタログ（モニター・キーボード・マウス・ヘッドセット・Webカメラ）
// ═══════════════════════════════════════════════════════════════

async function updatePeripherals() {
  console.log("\n🖥 周辺機器カタログを更新中...");

  const currentData = readFile("src/data/peripherals.ts");
  // フロー定義部分（scoreFn等を含む）を保持
  const flowStart = currentData.indexOf("// ----");
  const catalogSection = flowStart > 0 ? currentData.slice(0, flowStart) : "";

  const prompt = `日本市場で購入可能な周辺機器の最新情報を調べてください（${today}時点）。

## 調査カテゴリ

### モニター（10台以上）
Dell, LG, BenQ, ASUS, HP, Acer, Philips, EIZO, iiyama
- 予算帯: 1.5万〜2万 / 2万〜4万 / 4万〜8万 / 8万以上
- 用途: オフィス, ゲーミング, クリエイティブ, プログラミング

### キーボード（8台以上）
Logicool, 東プレ REALFORCE, HHKB, Razer, Keychron, Filco, エレコム
- タイプ: メカニカル, 静電容量, パンタグラフ, メンブレン
- 予算帯: 3千円〜 / 5千〜1万 / 1万〜2万 / 2万以上

### マウス（8台以上）
Logicool, Razer, Pulsar, Lamzu, ZOWIE, エレコム, Microsoft
- 用途: オフィス, ゲーミング, クリエイティブ

### ヘッドセット（6台以上）
Sony, Logicool, Razer, HyperX, SteelSeries, Audio-Technica, JBL

### Webカメラ（4台以上）
Logicool, Anker, Razer, Elgato

## 出力形式
\`\`\`typescript で囲み、PeripheralItem配列の中身だけ出力。
{
  id: "カテゴリ略称-連番",  // 例: "mon-1", "kb-1", "mouse-1", "hs-1", "cam-1"
  category: "monitor" | "keyboard" | "mouse" | "headset" | "webcam",
  name: "製品名",
  brand: "ブランド名",
  price: 税込価格,
  url: "製品ページURL" | null,
  specs: { キー: "値", ... },
  tags: ["タグ1", "タグ2", ...],
}

specs のキーはカテゴリごとに以下を使用:
- monitor: サイズ, 解像度, パネル, リフレッシュレート, 接続
- keyboard: 接続, キー配列, タイプ, バックライト or 荷重
- mouse: 接続, センサー, DPI, 重量, ボタン数
- headset: 接続, タイプ, ドライバー, マイク, ノイキャン
- webcam: 解像度, フレームレート, 画角, マイク, 接続

tags は用途・特徴タグ（filtering/scoring用）。

## ルール
- 税込日本円、日本で購入可能
- 各カテゴリ最低記載数以上
- 安価〜高級まで幅広く

## 現在データ（参考・最初の数件）
${catalogSection.slice(0, 2000)}`;

  const result = await callGemini(prompt);
  const code = extractCodeBlock(result);
  if (!code) { console.error("  ❌ 抽出失敗"); return false; }

  // フロー定義部分を保持して、カタログ部分だけ差し替え
  // フロー定義の開始位置を検出
  const flowDefStart = currentData.indexOf("\n// ----");
  if (flowDefStart < 0) {
    console.error("  ❌ フロー定義の区切りが見つかりません");
    return false;
  }
  const flowDefs = currentData.slice(flowDefStart);

  writeFile("src/data/peripherals.ts", `import type {
  PeripheralItem,
  PeripheralFlowConfig,
} from "@/types/peripheral";

// ${today}時点 - Gemini API (Google Search grounding) で取得
export const PERIPHERAL_CATALOG: PeripheralItem[] = [
${code}
];
${flowDefs}`);
  return true;
}

// ═══════════════════════════════════════════════════════════════
// 5. 自作PCパーツ（CPU/GPU/メモリ/マザボ/ストレージ/電源/ケース/クーラー）
// ═══════════════════════════════════════════════════════════════

async function updateCustomPcParts() {
  console.log("\n🔧 自作PCパーツデータを更新中...");

  const currentData = readFile("src/data/custom-pc-parts.ts");

  const prompt = `日本の自作PC市場で現在購入可能なパーツの最新情報を調べてください（${today}時点）。
価格.com や各メーカーサイトの日本価格を参照。

## 調査カテゴリ

### CPU（8個以上）: Intel Core Ultra 200S, AMD Ryzen 9000/7000 の主要モデル
### GPU（8個以上）: NVIDIA RTX 50/40シリーズ, AMD Radeon RX 7000/9000シリーズ
### メモリ（6個以上）: DDR5/DDR4の主要構成 (16GB×2, 32GB×2 等)
### マザーボード（6個以上）: LGA1851/AM5の主要チップセット ATX/mATX
### ストレージ（6個以上）: NVMe SSD 1TB/2TB, SATA SSD の人気モデル
### 電源（6個以上）: 650W〜1000W 80PLUS Gold以上
### ケース（5個以上）: ATX/mATX の人気モデル
### CPUクーラー（5個以上）: 空冷・簡易水冷

## 出力形式
\`\`\`typescript で囲み、以下の形式で全カテゴリを1つの配列として出力。

CPU:
{ id: "cpu-略称", name: "", brand: "", price: 税込, url: "" | null, imageUrl: "", type: "cpu",
  specs: { cores: 数値, threads: 数値, baseClock: GHz, boostClock: GHz, tdp: W, socket: "", generation: "" } }

GPU:
{ id: "gpu-略称", name: "", brand: "", price: 税込, url: "" | null, imageUrl: "", type: "gpu",
  specs: { vram: GB, tdp: W, length: mm } }

Memory:
{ id: "mem-略称", name: "", brand: "", price: 税込, url: "" | null, imageUrl: "", type: "memory",
  specs: { type: "DDR5"|"DDR4", speed: MHz, capacity: GB_per_stick, sticks: 枚数 } }

Motherboard:
{ id: "mb-略称", name: "", brand: "", price: 税込, url: "" | null, imageUrl: "", type: "motherboard",
  specs: { socket: "", chipset: "", formFactor: "ATX"|"mATX"|"ITX", memoryType: "DDR5"|"DDR4", memorySlots: 数値, m2Slots: 数値 } }

Storage:
{ id: "sto-略称", name: "", brand: "", price: 税込, url: "" | null, imageUrl: "", type: "storage",
  specs: { type: "SSD"|"HDD", interface: "NVMe"|"SATA", capacity: GB } }

PSU:
{ id: "psu-略称", name: "", brand: "", price: 税込, url: "" | null, imageUrl: "", type: "psu",
  specs: { wattage: W, certification: "80PLUS Gold"等, modular: "Full"|"Semi"|"Non" } }

Case:
{ id: "case-略称", name: "", brand: "", price: 税込, url: "" | null, imageUrl: "", type: "case",
  specs: { formFactor: "ATX"|"mATX"|"ITX", maxGPULength: mm, maxCoolerHeight: mm } }

Cooler:
{ id: "cool-略称", name: "", brand: "", price: 税込, url: "" | null, imageUrl: "", type: "cooler",
  specs: { type: "air"|"aio", socket: ["LGA1851","AM5"等], tdpRating: W, height?: mm, radiatorSize?: mm } }

## ルール
- 税込日本円、日本市場で購入可能
- imageUrl は空文字 "" でOK
- url は公式・価格.comのURL（不明ならnull）
- 各カテゴリ最低記載数以上

## 現在データ（参考）
${currentData.slice(0, 2000)}`;

  const result = await callGemini(prompt);
  const code = extractCodeBlock(result);
  if (!code) { console.error("  ❌ 抽出失敗"); return false; }

  // ALL_PARTS の構築部分を読み取る（ファイル末尾のexport部分）
  const allPartsMatch = currentData.match(/\/\/ ALL_PARTS[\s\S]*$/);
  const currentAllParts = readFile("src/data/custom-pc-parts.ts");
  const allPartsStart = currentAllParts.indexOf("// Aggregated");
  const allPartsSuffix = allPartsStart > 0
    ? currentAllParts.slice(allPartsStart)
    : `// Aggregated parts by category
export const ALL_PARTS: Record<string, PCPart[]> = {
  cpu: CPUS,
  gpu: GPUS,
  memory: MEMORIES,
  motherboard: MOTHERBOARDS,
  storage: STORAGES,
  psu: PSUS,
  case: CASES,
  cooler: COOLERS,
};`;

  writeFile("src/data/custom-pc-parts.ts", `import type { CPU, GPU, Memory, Motherboard, Storage, PSU, Case, Cooler, PCPart } from '@/types/custom-pc';

// ${today}時点 - Gemini API (Google Search grounding) で取得
const ALL_PARTS_ARRAY: PCPart[] = [
${code}
];

// カテゴリ別に分離
export const CPUS: CPU[] = ALL_PARTS_ARRAY.filter((p): p is CPU => p.type === 'cpu');
export const GPUS: GPU[] = ALL_PARTS_ARRAY.filter((p): p is GPU => p.type === 'gpu');
export const MEMORIES: Memory[] = ALL_PARTS_ARRAY.filter((p): p is Memory => p.type === 'memory');
export const MOTHERBOARDS: Motherboard[] = ALL_PARTS_ARRAY.filter((p): p is Motherboard => p.type === 'motherboard');
export const STORAGES: Storage[] = ALL_PARTS_ARRAY.filter((p): p is Storage => p.type === 'storage');
export const PSUS: PSU[] = ALL_PARTS_ARRAY.filter((p): p is PSU => p.type === 'psu');
export const CASES: Case[] = ALL_PARTS_ARRAY.filter((p): p is Case => p.type === 'case');
export const COOLERS: Cooler[] = ALL_PARTS_ARRAY.filter((p): p is Cooler => p.type === 'cooler');

export const ALL_PARTS: Record<string, PCPart[]> = {
  cpu: CPUS,
  gpu: GPUS,
  memory: MEMORIES,
  motherboard: MOTHERBOARDS,
  storage: STORAGES,
  psu: PSUS,
  case: CASES,
  cooler: COOLERS,
};
`);
  return true;
}

// ═══════════════════════════════════════════════════════════════
// メイン
// ═══════════════════════════════════════════════════════════════

async function main() {
  console.log(`🚀 PCデータ リサーチ開始 (${today})`);
  console.log(`   Model: ${MODEL}`);
  console.log(`   API Key: ${API_KEY.slice(0, 8)}...`);

  const results = {};
  const tasks = [
    { key: "laptops",      label: "ノートPC",         fn: updateLaptops },
    { key: "catalog",      label: "型番カタログ",      fn: updateModelCatalog },
    { key: "cpuScores",    label: "CPUスコア",         fn: updateCpuScores },
    { key: "peripherals",  label: "周辺機器",          fn: updatePeripherals },
    { key: "customPc",     label: "自作PCパーツ",      fn: updateCustomPcParts },
  ];

  for (const task of tasks) {
    try {
      results[task.key] = await task.fn();
    } catch (e) {
      console.error(`  ❌ ${task.label}更新エラー:`, e.message);
      results[task.key] = false;
    }
    await wait(); // API rate limit 対策
  }

  console.log("\n📊 結果サマリー:");
  for (const task of tasks) {
    console.log(`  ${results[task.key] ? "✅" : "❌"} ${task.label}`);
  }

  const anySuccess = Object.values(results).some(Boolean);
  if (!anySuccess) {
    console.error("\n❌ 全ての更新に失敗しました");
    process.exit(1);
  }

  console.log(`\n✅ リサーチ完了 (${today})`);
}

main();
