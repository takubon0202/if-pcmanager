export interface SoftwareRequirement {
  id: string;
  name: string;
  icon: string;
  category: string;
  recommended: {
    cpuScore: number;
    memoryGB: number;
    storageGB: number;
    needsGpu: boolean;
    gpuLevel: "none" | "integrated" | "entry" | "mid" | "high";
  };
}

export const SOFTWARE_REQUIREMENTS: SoftwareRequirement[] = [
  // ビジネス
  {
    id: "zoom",
    name: "Zoom",
    icon: "📹",
    category: "ビジネス",
    recommended: { cpuScore: 30, memoryGB: 4, storageGB: 2, needsGpu: false, gpuLevel: "none" },
  },
  {
    id: "office",
    name: "Microsoft Office",
    icon: "📊",
    category: "ビジネス",
    recommended: { cpuScore: 35, memoryGB: 8, storageGB: 10, needsGpu: false, gpuLevel: "none" },
  },
  {
    id: "slack",
    name: "Slack",
    icon: "💬",
    category: "ビジネス",
    recommended: { cpuScore: 25, memoryGB: 4, storageGB: 2, needsGpu: false, gpuLevel: "none" },
  },
  // クリエイティブ
  {
    id: "photoshop",
    name: "Photoshop",
    icon: "🎨",
    category: "クリエイティブ",
    recommended: { cpuScore: 55, memoryGB: 16, storageGB: 20, needsGpu: true, gpuLevel: "entry" },
  },
  {
    id: "premiere",
    name: "Premiere Pro",
    icon: "🎬",
    category: "クリエイティブ",
    recommended: { cpuScore: 65, memoryGB: 32, storageGB: 50, needsGpu: true, gpuLevel: "mid" },
  },
  {
    id: "blender",
    name: "Blender",
    icon: "🧊",
    category: "クリエイティブ",
    recommended: { cpuScore: 60, memoryGB: 16, storageGB: 10, needsGpu: true, gpuLevel: "mid" },
  },
  // 開発
  {
    id: "vscode",
    name: "VS Code",
    icon: "👨‍💻",
    category: "開発",
    recommended: { cpuScore: 30, memoryGB: 8, storageGB: 5, needsGpu: false, gpuLevel: "none" },
  },
  {
    id: "docker",
    name: "Docker",
    icon: "🐳",
    category: "開発",
    recommended: { cpuScore: 50, memoryGB: 16, storageGB: 30, needsGpu: false, gpuLevel: "none" },
  },
  // ゲーム
  {
    id: "fortnite",
    name: "Fortnite",
    icon: "🔫",
    category: "ゲーム",
    recommended: { cpuScore: 55, memoryGB: 16, storageGB: 50, needsGpu: true, gpuLevel: "mid" },
  },
  {
    id: "apex",
    name: "Apex Legends",
    icon: "🎯",
    category: "ゲーム",
    recommended: { cpuScore: 60, memoryGB: 16, storageGB: 60, needsGpu: true, gpuLevel: "mid" },
  },
  {
    id: "minecraft",
    name: "Minecraft (Java)",
    icon: "⛏️",
    category: "ゲーム",
    recommended: { cpuScore: 40, memoryGB: 8, storageGB: 4, needsGpu: true, gpuLevel: "entry" },
  },
  // AI
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    icon: "🤖",
    category: "AI",
    recommended: { cpuScore: 65, memoryGB: 32, storageGB: 20, needsGpu: true, gpuLevel: "high" },
  },
];
