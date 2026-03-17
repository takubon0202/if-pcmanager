export type Mode =
  | "diagnosis"
  | "laptop"
  | "desktop"
  | "custom-pc"
  | "monitor"
  | "keyboard"
  | "mouse"
  | "headset";

export interface ModeConfig {
  id: Mode;
  label: string;
  icon: string;
  description: string;
  enabled: boolean;
}

export const MODES: ModeConfig[] = [
  {
    id: "diagnosis",
    label: "PC診断",
    icon: "🔍",
    description: "今のPCのスペックを診断",
    enabled: true,
  },
  {
    id: "laptop",
    label: "ノートPC",
    icon: "💻",
    description: "最適なノートPCを提案",
    enabled: true,
  },
  {
    id: "desktop",
    label: "デスクトップPC",
    icon: "🖥️",
    description: "最適なデスクトップPCを提案",
    enabled: true,
  },
  {
    id: "custom-pc",
    label: "自作PC",
    icon: "🔧",
    description: "パーツ選定・互換性チェック",
    enabled: true,
  },
  {
    id: "monitor",
    label: "モニター",
    icon: "🖥",
    description: "最適なモニターを提案",
    enabled: true,
  },
  {
    id: "keyboard",
    label: "キーボード",
    icon: "⌨️",
    description: "最適なキーボードを提案",
    enabled: true,
  },
  {
    id: "mouse",
    label: "マウス",
    icon: "🖱️",
    description: "最適なマウスを提案",
    enabled: true,
  },
  {
    id: "headset",
    label: "ヘッドセット",
    icon: "🎧",
    description: "最適なヘッドセットを提案",
    enabled: true,
  },
];

export interface LaptopUsage {
  purpose: string[];
  budget: { min: number; max: number };
  size: string | null;
  priority: string[];
}

export interface LaptopRecommendation {
  name: string;
  brand: string;
  price: number;
  url: string | null;
  modelNumber: string;
  specs: {
    cpu: string;
    memory: string;
    storage: string;
    display: string;
    gpu: string;
    battery: string;
    weight: string;
  };
  matchScore: number;
  reasons: string[];
}

export interface DesktopRecommendation {
  name: string;
  brand: string;
  price: number;
  url: string | null;
  modelNumber: string;
  specs: {
    cpu: string;
    memory: string;
    storage: string;
    gpu: string;
    psu: string;
    formFactor: string;
    motherboard: string;
  };
  matchScore: number;
  reasons: string[];
}
