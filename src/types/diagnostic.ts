export interface UserPcInput {
  manufacturer: string;
  modelNumber: string;
  purchaseYear: number | null;
  purchaseMonth: number | null;
  cpu: string;
  memoryGB: number | null;
  storageType: string;
  storageGB: number | null;
  gpu: string;
  currentIssues: string[];
}

export const MANUFACTURERS = [
  "Apple",
  "Lenovo",
  "HP",
  "Dell",
  "ASUS",
  "Acer",
  "MSI",
  "マウスコンピューター",
  "富士通",
  "NEC",
  "Dynabook (東芝)",
  "Panasonic",
  "Microsoft",
  "その他",
] as const;

export const STORAGE_TYPES = ["SSD", "HDD", "SSD + HDD", "わからない"] as const;

export const ISSUES = [
  { id: "slow", label: "動作が遅い" },
  { id: "battery", label: "バッテリーがもたない" },
  { id: "heat", label: "本体が熱くなる" },
  { id: "noise", label: "ファンがうるさい" },
  { id: "storage", label: "容量が足りない" },
  { id: "display", label: "画面が見づらい" },
  { id: "freeze", label: "フリーズする" },
  { id: "boot", label: "起動が遅い" },
  { id: "none", label: "特になし" },
] as const;

export type UsageCategory =
  | "web"
  | "office"
  | "programming"
  | "design"
  | "gaming"
  | "ai"
  | "video";

export interface UsageRating {
  category: UsageCategory;
  label: string;
  icon: string;
  score: number; // 0-100
  verdict: "快適" | "問題なし" | "やや厳しい" | "厳しい";
  comment: string;
}

export interface ComponentScore {
  score: number; // 0-100
  label: string;
  detail: string;
}

export interface ComponentScores {
  cpu: ComponentScore;
  memory: ComponentScore;
  storage: ComponentScore;
  gpu: ComponentScore;
  bottleneck: "cpu" | "memory" | "storage" | "gpu" | null;
}

export interface SoftwareComparison {
  id: string;
  name: string;
  icon: string;
  category: string;
  verdict: "快適" | "動作可能" | "ギリギリ" | "スペック不足";
  matchPercentage: number; // 0-100
  limitingFactor: string | null;
}

export interface BenchmarkResult {
  cpuScore: number;
  renderScore: number;
  memoryScore: number;
  overallScore: number;
  details: {
    mathOpsPerSecond: number;
    canvasFps: number;
    arrayAllocTime: number;
  };
}

export interface CourseCheckItem {
  name: string;
  icon: string;
  passed: boolean;
  detail: string;
}

export interface CourseCompatibility {
  id: string;
  label: string;
  icon: string;
  verdict: "対応可能" | "条件付きで対応" | "スペック不足";
  score: number; // 0-100
  checks: CourseCheckItem[];
  summary: string;
}

export interface DiagnosticReport {
  overallScore: number; // 0-100
  overallVerdict: "まだまだ現役" | "そろそろ買い替え検討" | "買い替え推奨";
  estimatedAge: number; // 年
  estimatedSpecs: EstimatedSpecs;
  usageRatings: UsageRating[];
  advice: string[];
  upgradeOptions: string[];
  componentScores: ComponentScores;
  softwareComparisons: SoftwareComparison[];
  benchmarkResult?: BenchmarkResult;
  courseCompatibility: CourseCompatibility[];
}

export interface EstimatedSpecs {
  cpu: string;
  cpuScore: number;
  memoryGB: number;
  storageType: string;
  storageGB: number;
  gpu: string;
  isEstimated: boolean;
}
