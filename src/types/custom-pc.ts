// PCパーツの基本型
export interface BasePart {
  id: string;
  name: string;
  brand: string;
  price: number;
  url: string;
  imageUrl: string;
}

// CPU
export interface CPUSpecs {
  cores: number;
  threads: number;
  baseClock: number; // GHz
  boostClock: number; // GHz
  tdp: number; // W
  socket: string;
  generation: string;
}

export interface CPU extends BasePart {
  type: 'cpu';
  specs: CPUSpecs;
}

// GPU
export interface GPUSpecs {
  vram: number; // GB
  tdp: number; // W
  length: number; // mm
}

export interface GPU extends BasePart {
  type: 'gpu';
  specs: GPUSpecs;
}

// Memory
export interface MemorySpecs {
  type: 'DDR4' | 'DDR5';
  speed: number; // MHz
  capacity: number; // GB per stick
  sticks: number; // number of sticks
}

export interface Memory extends BasePart {
  type: 'memory';
  specs: MemorySpecs;
}

// Motherboard
export interface MotherboardSpecs {
  socket: string;
  chipset: string;
  formFactor: 'ATX' | 'mATX' | 'ITX';
  memoryType: 'DDR4' | 'DDR5';
  memorySlots: number;
  m2Slots: number;
}

export interface Motherboard extends BasePart {
  type: 'motherboard';
  specs: MotherboardSpecs;
}

// Storage
export interface StorageSpecs {
  type: 'SSD' | 'HDD';
  interface: 'NVMe' | 'SATA';
  capacity: number; // GB
}

export interface Storage extends BasePart {
  type: 'storage';
  specs: StorageSpecs;
}

// PSU
export interface PSUSpecs {
  wattage: number; // W
  certification: string; // 80PLUS Gold, etc.
  modular: 'Full' | 'Semi' | 'Non';
}

export interface PSU extends BasePart {
  type: 'psu';
  specs: PSUSpecs;
}

// Case
export interface CaseSpecs {
  formFactor: 'ATX' | 'mATX' | 'ITX';
  maxGPULength: number; // mm
  maxCoolerHeight: number; // mm
}

export interface Case extends BasePart {
  type: 'case';
  specs: CaseSpecs;
}

// Cooler
export interface CoolerSpecs {
  type: 'air' | 'aio';
  socket: string[];
  tdpRating: number; // W
  height?: number; // mm for air coolers
  radiatorSize?: number; // mm for AIO coolers
}

export interface Cooler extends BasePart {
  type: 'cooler';
  specs: CoolerSpecs;
}

// Union type for all parts
export type PCPart = CPU | GPU | Memory | Motherboard | Storage | PSU | Case | Cooler;

// Build configuration
export interface CustomPCBuild {
  cpu?: CPU;
  gpu?: GPU;
  memory?: Memory;
  motherboard?: Motherboard;
  storage?: Storage;
  psu?: PSU;
  case?: Case;
  cooler?: Cooler;
}

// Compatibility issues
export interface CompatibilityIssue {
  severity: 'error' | 'warning';
  message: string;
  parts: string[]; // Array of part types involved in the issue
}

// Part categories
export type PartCategory = 'cpu' | 'gpu' | 'memory' | 'motherboard' | 'storage' | 'psu' | 'case' | 'cooler';

export interface PartCategoryInfo {
  id: PartCategory;
  name: string;
  icon: string;
  description: string;
}

export const PART_CATEGORIES: PartCategoryInfo[] = [
  {
    id: 'cpu',
    name: 'CPU',
    icon: '🧠',
    description: 'プロセッサー'
  },
  {
    id: 'gpu',
    name: 'GPU',
    icon: '🎮',
    description: 'グラフィックカード'
  },
  {
    id: 'memory',
    name: 'メモリ',
    icon: '🧮',
    description: 'RAM'
  },
  {
    id: 'motherboard',
    name: 'マザーボード',
    icon: '🔌',
    description: 'メインボード'
  },
  {
    id: 'storage',
    name: 'ストレージ',
    icon: '💾',
    description: 'SSD/HDD'
  },
  {
    id: 'psu',
    name: '電源',
    icon: '⚡',
    description: '電源ユニット'
  },
  {
    id: 'case',
    name: 'ケース',
    icon: '📦',
    description: 'PCケース'
  },
  {
    id: 'cooler',
    name: 'CPUクーラー',
    icon: '❄️',
    description: 'CPU冷却装置'
  }
];