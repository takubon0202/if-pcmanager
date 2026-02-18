// メーカー × 購入時期からスペックを推定するためのデータ
// 各年代の標準的なスペック（エントリー〜ミドル帯）

export interface YearSpec {
  year: number;
  cpu: string;
  cpuScore: number; // 0-100 相対スコア
  memoryGB: number;
  storageType: string;
  storageGB: number;
  gpu: string;
}

const GENERIC_SPECS: YearSpec[] = [
  { year: 2018, cpu: "第8世代 Core i5相当", cpuScore: 30, memoryGB: 8, storageType: "SSD", storageGB: 256, gpu: "内蔵" },
  { year: 2019, cpu: "第9世代 Core i5相当", cpuScore: 35, memoryGB: 8, storageType: "SSD", storageGB: 256, gpu: "内蔵" },
  { year: 2020, cpu: "第10世代 Core i5相当", cpuScore: 40, memoryGB: 8, storageType: "SSD", storageGB: 256, gpu: "内蔵" },
  { year: 2021, cpu: "第11世代 Core i5相当", cpuScore: 50, memoryGB: 8, storageType: "SSD", storageGB: 512, gpu: "内蔵" },
  { year: 2022, cpu: "第12世代 Core i5相当", cpuScore: 60, memoryGB: 16, storageType: "SSD", storageGB: 512, gpu: "内蔵" },
  { year: 2023, cpu: "第13世代 Core i5相当", cpuScore: 65, memoryGB: 16, storageType: "SSD", storageGB: 512, gpu: "内蔵" },
  { year: 2024, cpu: "Core Ultra 5相当", cpuScore: 72, memoryGB: 16, storageType: "SSD", storageGB: 512, gpu: "内蔵" },
  { year: 2025, cpu: "Core Ultra 7相当", cpuScore: 78, memoryGB: 16, storageType: "SSD", storageGB: 512, gpu: "内蔵" },
  { year: 2026, cpu: "Core Ultra 9相当", cpuScore: 85, memoryGB: 32, storageType: "SSD", storageGB: 1024, gpu: "内蔵" },
];

const APPLE_SPECS: YearSpec[] = [
  { year: 2018, cpu: "Intel Core i5 (8th)", cpuScore: 35, memoryGB: 8, storageType: "SSD", storageGB: 256, gpu: "内蔵" },
  { year: 2019, cpu: "Intel Core i5 (8th)", cpuScore: 35, memoryGB: 8, storageType: "SSD", storageGB: 256, gpu: "内蔵" },
  { year: 2020, cpu: "Apple M1", cpuScore: 60, memoryGB: 8, storageType: "SSD", storageGB: 256, gpu: "内蔵 (7コア)" },
  { year: 2021, cpu: "Apple M1", cpuScore: 60, memoryGB: 8, storageType: "SSD", storageGB: 256, gpu: "内蔵 (8コア)" },
  { year: 2022, cpu: "Apple M2", cpuScore: 68, memoryGB: 8, storageType: "SSD", storageGB: 256, gpu: "内蔵 (10コア)" },
  { year: 2023, cpu: "Apple M3", cpuScore: 75, memoryGB: 16, storageType: "SSD", storageGB: 512, gpu: "内蔵 (10コア)" },
  { year: 2024, cpu: "Apple M4", cpuScore: 82, memoryGB: 16, storageType: "SSD", storageGB: 256, gpu: "内蔵 (10コア)" },
  { year: 2025, cpu: "Apple M4 Pro", cpuScore: 90, memoryGB: 24, storageType: "SSD", storageGB: 512, gpu: "内蔵 (16コア)" },
  { year: 2026, cpu: "Apple M5", cpuScore: 95, memoryGB: 24, storageType: "SSD", storageGB: 512, gpu: "内蔵" },
];

const MANUFACTURER_MAP: Record<string, YearSpec[]> = {
  Apple: APPLE_SPECS,
};

export function estimateSpecs(manufacturer: string, year: number): YearSpec {
  const specs = MANUFACTURER_MAP[manufacturer] || GENERIC_SPECS;
  const match = specs.find((s) => s.year === year);
  if (match) return match;

  // 範囲外の場合は最も近い年を返す
  const sorted = [...specs].sort(
    (a, b) => Math.abs(a.year - year) - Math.abs(b.year - year)
  );
  return sorted[0];
}

// CPU名からスコアを推定
const CPU_SCORES: [RegExp, number][] = [
  [/M5/i, 95],
  [/M4\s*Max/i, 93],
  [/M4\s*Pro/i, 90],
  [/M4/i, 82],
  [/M3\s*Max/i, 88],
  [/M3\s*Pro/i, 80],
  [/M3/i, 75],
  [/M2\s*Max/i, 82],
  [/M2\s*Pro/i, 75],
  [/M2/i, 68],
  [/M1\s*Max/i, 75],
  [/M1\s*Pro/i, 68],
  [/M1/i, 60],
  [/Core\s*Ultra\s*9/i, 85],
  [/Core\s*Ultra\s*7/i, 78],
  [/Core\s*Ultra\s*5/i, 72],
  [/i9.*1[3-5]/i, 78],
  [/i7.*1[3-5]/i, 72],
  [/i5.*1[3-5]/i, 65],
  [/i9.*12/i, 72],
  [/i7.*12/i, 65],
  [/i5.*12/i, 60],
  [/i7.*1[01]/i, 50],
  [/i5.*1[01]/i, 42],
  [/i7.*[89]/i, 40],
  [/i5.*[89]/i, 33],
  [/i3/i, 25],
  [/Celeron/i, 15],
  [/Pentium/i, 18],
  [/Ryzen\s*9.*7/i, 82],
  [/Ryzen\s*7.*7/i, 75],
  [/Ryzen\s*5.*7/i, 65],
  [/Ryzen\s*9/i, 72],
  [/Ryzen\s*7/i, 62],
  [/Ryzen\s*5/i, 52],
  [/Ryzen\s*3/i, 35],
];

export function cpuNameToScore(name: string): number | null {
  for (const [pattern, score] of CPU_SCORES) {
    if (pattern.test(name)) return score;
  }
  return null;
}
