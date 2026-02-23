import type { CPU, GPU, Memory, Motherboard, Storage, PSU, Case, Cooler, PCPart } from '@/types/custom-pc';

// CPUs - Intel Core Ultra 200S系, AMD Ryzen 9000系
export const CPUS: CPU[] = [
  {
    id: 'cpu-intel-ultra9-285k',
    name: 'Core Ultra 9 285K',
    brand: 'Intel',
    price: 89800,
    url: 'https://www.intel.com/content/www/us/en/products/processors/core/core-ultra/core-ultra-series-2.html',
    imageUrl: '/images/cpu-intel-ultra9-285k.jpg',
    type: 'cpu',
    specs: {
      cores: 24,
      threads: 24,
      baseClock: 3.7,
      boostClock: 5.7,
      tdp: 125,
      socket: 'LGA1851',
      generation: 'Arrow Lake'
    }
  },
  {
    id: 'cpu-intel-ultra7-265k',
    name: 'Core Ultra 7 265K',
    brand: 'Intel',
    price: 64800,
    url: 'https://www.intel.com/content/www/us/en/products/processors/core/core-ultra/core-ultra-series-2.html',
    imageUrl: '/images/cpu-intel-ultra7-265k.jpg',
    type: 'cpu',
    specs: {
      cores: 20,
      threads: 20,
      baseClock: 3.9,
      boostClock: 5.5,
      tdp: 125,
      socket: 'LGA1851',
      generation: 'Arrow Lake'
    }
  },
  {
    id: 'cpu-intel-ultra5-245k',
    name: 'Core Ultra 5 245K',
    brand: 'Intel',
    price: 48800,
    url: 'https://www.intel.com/content/www/us/en/products/processors/core/core-ultra/core-ultra-series-2.html',
    imageUrl: '/images/cpu-intel-ultra5-245k.jpg',
    type: 'cpu',
    specs: {
      cores: 14,
      threads: 14,
      baseClock: 4.2,
      boostClock: 5.2,
      tdp: 125,
      socket: 'LGA1851',
      generation: 'Arrow Lake'
    }
  },
  {
    id: 'cpu-amd-9950x',
    name: 'Ryzen 9 9950X',
    brand: 'AMD',
    price: 89800,
    url: 'https://www.amd.com/ja/products/processors/desktops/ryzen/9000-series.html',
    imageUrl: '/images/cpu-amd-9950x.jpg',
    type: 'cpu',
    specs: {
      cores: 16,
      threads: 32,
      baseClock: 4.3,
      boostClock: 5.7,
      tdp: 170,
      socket: 'AM5',
      generation: 'Zen 5'
    }
  },
  {
    id: 'cpu-amd-9900x',
    name: 'Ryzen 9 9900X',
    brand: 'AMD',
    price: 64800,
    url: 'https://www.amd.com/ja/products/processors/desktops/ryzen/9000-series.html',
    imageUrl: '/images/cpu-amd-9900x.jpg',
    type: 'cpu',
    specs: {
      cores: 12,
      threads: 24,
      baseClock: 4.4,
      boostClock: 5.6,
      tdp: 120,
      socket: 'AM5',
      generation: 'Zen 5'
    }
  },
  {
    id: 'cpu-amd-9700x',
    name: 'Ryzen 7 9700X',
    brand: 'AMD',
    price: 52800,
    url: 'https://www.amd.com/ja/products/processors/desktops/ryzen/9000-series.html',
    imageUrl: '/images/cpu-amd-9700x.jpg',
    type: 'cpu',
    specs: {
      cores: 8,
      threads: 16,
      baseClock: 3.8,
      boostClock: 5.5,
      tdp: 65,
      socket: 'AM5',
      generation: 'Zen 5'
    }
  },
  {
    id: 'cpu-amd-9600x',
    name: 'Ryzen 5 9600X',
    brand: 'AMD',
    price: 38800,
    url: 'https://www.amd.com/ja/products/processors/desktops/ryzen/9000-series.html',
    imageUrl: '/images/cpu-amd-9600x.jpg',
    type: 'cpu',
    specs: {
      cores: 6,
      threads: 12,
      baseClock: 3.9,
      boostClock: 5.4,
      tdp: 65,
      socket: 'AM5',
      generation: 'Zen 5'
    }
  }
];

// GPUs - RTX 5090/5080/5070系, RX 9070系
export const GPUS: GPU[] = [
  {
    id: 'gpu-rtx5090',
    name: 'GeForce RTX 5090',
    brand: 'NVIDIA',
    price: 278000,
    url: 'https://www.nvidia.com/ja-jp/geforce/graphics-cards/50-series/',
    imageUrl: '/images/gpu-rtx5090.jpg',
    type: 'gpu',
    specs: {
      vram: 32,
      tdp: 575,
      length: 336
    }
  },
  {
    id: 'gpu-rtx5080',
    name: 'GeForce RTX 5080',
    brand: 'NVIDIA',
    price: 178000,
    url: 'https://www.nvidia.com/ja-jp/geforce/graphics-cards/50-series/',
    imageUrl: '/images/gpu-rtx5080.jpg',
    type: 'gpu',
    specs: {
      vram: 16,
      tdp: 360,
      length: 304
    }
  },
  {
    id: 'gpu-rtx5070-ti',
    name: 'GeForce RTX 5070 Ti',
    brand: 'NVIDIA',
    price: 118000,
    url: 'https://www.nvidia.com/ja-jp/geforce/graphics-cards/50-series/',
    imageUrl: '/images/gpu-rtx5070ti.jpg',
    type: 'gpu',
    specs: {
      vram: 16,
      tdp: 300,
      length: 267
    }
  },
  {
    id: 'gpu-rtx5070',
    name: 'GeForce RTX 5070',
    brand: 'NVIDIA',
    price: 88000,
    url: 'https://www.nvidia.com/ja-jp/geforce/graphics-cards/50-series/',
    imageUrl: '/images/gpu-rtx5070.jpg',
    type: 'gpu',
    specs: {
      vram: 12,
      tdp: 250,
      length: 242
    }
  },
  {
    id: 'gpu-rx9070xt',
    name: 'Radeon RX 9070 XT',
    brand: 'AMD',
    price: 98000,
    url: 'https://www.amd.com/ja/products/graphics/radeon-rx-9070.html',
    imageUrl: '/images/gpu-rx9070xt.jpg',
    type: 'gpu',
    specs: {
      vram: 16,
      tdp: 315,
      length: 272
    }
  },
  {
    id: 'gpu-rx9070',
    name: 'Radeon RX 9070',
    brand: 'AMD',
    price: 78000,
    url: 'https://www.amd.com/ja/products/graphics/radeon-rx-9070.html',
    imageUrl: '/images/gpu-rx9070.jpg',
    type: 'gpu',
    specs: {
      vram: 12,
      tdp: 260,
      length: 243
    }
  }
];

// Memory - DDR5メイン, DDR4も数点
export const MEMORY: Memory[] = [
  {
    id: 'memory-corsair-ddr5-32gb-6000',
    name: 'Vengeance LPX DDR5-6000 32GB',
    brand: 'Corsair',
    price: 24800,
    url: 'https://www.corsair.com/us/en/p/memory/cmk32gx5m2b6000c30/vengeance-lpx-ddr5-6000-pc5-48000-32gb-2x16gb-ddr5-dram-memory-kit-cmk32gx5m2b6000c30',
    imageUrl: '/images/memory-corsair-ddr5-32gb.jpg',
    type: 'memory',
    specs: {
      type: 'DDR5',
      speed: 6000,
      capacity: 16,
      sticks: 2
    }
  },
  {
    id: 'memory-gskill-ddr5-32gb-6400',
    name: 'Trident Z5 DDR5-6400 32GB',
    brand: 'G.Skill',
    price: 28800,
    url: 'https://www.gskill.com/product/165/374/1562831348/F5-6400J3239G16GX2-TZ5RK',
    imageUrl: '/images/memory-gskill-ddr5-32gb.jpg',
    type: 'memory',
    specs: {
      type: 'DDR5',
      speed: 6400,
      capacity: 16,
      sticks: 2
    }
  },
  {
    id: 'memory-crucial-ddr5-32gb-5600',
    name: 'DDR5-5600 32GB',
    brand: 'Crucial',
    price: 18800,
    url: 'https://www.crucial.com/memory/ddr5',
    imageUrl: '/images/memory-crucial-ddr5-32gb.jpg',
    type: 'memory',
    specs: {
      type: 'DDR5',
      speed: 5600,
      capacity: 16,
      sticks: 2
    }
  },
  {
    id: 'memory-corsair-ddr4-32gb-3600',
    name: 'Vengeance LPX DDR4-3600 32GB',
    brand: 'Corsair',
    price: 14800,
    url: 'https://www.corsair.com/us/en/p/memory/cmk32gx4m2d3600c18/vengeance-lpx-32gb-2x16gb-ddr4-dram-3600mhz-c18-memory-kit-black-cmk32gx4m2d3600c18',
    imageUrl: '/images/memory-corsair-ddr4-32gb.jpg',
    type: 'memory',
    specs: {
      type: 'DDR4',
      speed: 3600,
      capacity: 16,
      sticks: 2
    }
  },
  {
    id: 'memory-gskill-ddr4-16gb-3200',
    name: 'Ripjaws V DDR4-3200 16GB',
    brand: 'G.Skill',
    price: 8800,
    url: 'https://www.gskill.com/product/165/166/1536206663/F4-3200C16D-16GVKB',
    imageUrl: '/images/memory-gskill-ddr4-16gb.jpg',
    type: 'memory',
    specs: {
      type: 'DDR4',
      speed: 3200,
      capacity: 8,
      sticks: 2
    }
  }
];

// Motherboards - LGA1851, AM5, LGA1700
export const MOTHERBOARDS: Motherboard[] = [
  {
    id: 'mb-asus-z890-hero',
    name: 'ROG Maximus Z890 Hero',
    brand: 'ASUS',
    price: 78000,
    url: 'https://rog.asus.com/motherboards/rog-maximus/rog-maximus-z890-hero/',
    imageUrl: '/images/mb-asus-z890-hero.jpg',
    type: 'motherboard',
    specs: {
      socket: 'LGA1851',
      chipset: 'Z890',
      formFactor: 'ATX',
      memoryType: 'DDR5',
      memorySlots: 4,
      m2Slots: 5
    }
  },
  {
    id: 'mb-msi-z890-ace',
    name: 'MEG Z890 ACE',
    brand: 'MSI',
    price: 89000,
    url: 'https://www.msi.com/Motherboard/MEG-Z890-ACE',
    imageUrl: '/images/mb-msi-z890-ace.jpg',
    type: 'motherboard',
    specs: {
      socket: 'LGA1851',
      chipset: 'Z890',
      formFactor: 'ATX',
      memoryType: 'DDR5',
      memorySlots: 4,
      m2Slots: 5
    }
  },
  {
    id: 'mb-asus-x870e-hero',
    name: 'ROG Crosshair X870E Hero',
    brand: 'ASUS',
    price: 68000,
    url: 'https://rog.asus.com/motherboards/rog-crosshair/rog-crosshair-x870e-hero/',
    imageUrl: '/images/mb-asus-x870e-hero.jpg',
    type: 'motherboard',
    specs: {
      socket: 'AM5',
      chipset: 'X870E',
      formFactor: 'ATX',
      memoryType: 'DDR5',
      memorySlots: 4,
      m2Slots: 4
    }
  },
  {
    id: 'mb-msi-x870e-carbon',
    name: 'MAG X870E Tomahawk WiFi',
    brand: 'MSI',
    price: 48000,
    url: 'https://www.msi.com/Motherboard/MAG-X870E-TOMAHAWK-WIFI',
    imageUrl: '/images/mb-msi-x870e-carbon.jpg',
    type: 'motherboard',
    specs: {
      socket: 'AM5',
      chipset: 'X870E',
      formFactor: 'ATX',
      memoryType: 'DDR5',
      memorySlots: 4,
      m2Slots: 4
    }
  },
  {
    id: 'mb-asrock-b650m-hdv',
    name: 'B650M-HDV/M.2',
    brand: 'ASRock',
    price: 18000,
    url: 'https://www.asrock.com/mb/AMD/B650M-HDV-M.2/',
    imageUrl: '/images/mb-asrock-b650m-hdv.jpg',
    type: 'motherboard',
    specs: {
      socket: 'AM5',
      chipset: 'B650',
      formFactor: 'mATX',
      memoryType: 'DDR5',
      memorySlots: 4,
      m2Slots: 2
    }
  }
];

// Storage - PCIe 5.0/4.0 NVMe
export const STORAGES: Storage[] = [
  {
    id: 'ssd-samsung-990-pro-2tb',
    name: '990 PRO 2TB',
    brand: 'Samsung',
    price: 32800,
    url: 'https://www.samsung.com/us/computing/memory-storage/solid-state-drives/990-pro-pcie-4-0-nvme-ssd-2tb-mz-v9p2t0b-am/',
    imageUrl: '/images/ssd-samsung-990-pro-2tb.jpg',
    type: 'storage',
    specs: {
      type: 'SSD',
      interface: 'NVMe',
      capacity: 2000
    }
  },
  {
    id: 'ssd-wd-black-sn850x-1tb',
    name: 'BLACK SN850X 1TB',
    brand: 'Western Digital',
    price: 18800,
    url: 'https://www.westerndigital.com/products/internal-drives/wd-black-sn850x-nvme-ssd',
    imageUrl: '/images/ssd-wd-black-sn850x-1tb.jpg',
    type: 'storage',
    specs: {
      type: 'SSD',
      interface: 'NVMe',
      capacity: 1000
    }
  },
  {
    id: 'ssd-crucial-p5-plus-1tb',
    name: 'P5 Plus 1TB',
    brand: 'Crucial',
    price: 12800,
    url: 'https://www.crucial.com/ssd/p5-plus-series',
    imageUrl: '/images/ssd-crucial-p5-plus-1tb.jpg',
    type: 'storage',
    specs: {
      type: 'SSD',
      interface: 'NVMe',
      capacity: 1000
    }
  },
  {
    id: 'ssd-kingston-nv3-2tb',
    name: 'NV3 2TB',
    brand: 'Kingston',
    price: 19800,
    url: 'https://www.kingston.com/ssd/nv3-nvme-pcie-ssd',
    imageUrl: '/images/ssd-kingston-nv3-2tb.jpg',
    type: 'storage',
    specs: {
      type: 'SSD',
      interface: 'NVMe',
      capacity: 2000
    }
  }
];

// PSU - 750W～1200W
export const PSUS: PSU[] = [
  {
    id: 'psu-corsair-rm1200x',
    name: 'RM1200x',
    brand: 'Corsair',
    price: 34800,
    url: 'https://www.corsair.com/us/en/p/psu/cp-9020244-na/rm1200x-80-plus-gold-fully-modular-low-noise-atx-power-supply-cp-9020244-na',
    imageUrl: '/images/psu-corsair-rm1200x.jpg',
    type: 'psu',
    specs: {
      wattage: 1200,
      certification: '80PLUS Gold',
      modular: 'Full'
    }
  },
  {
    id: 'psu-seasonic-focus-gx1000',
    name: 'FOCUS GX-1000',
    brand: 'Seasonic',
    price: 24800,
    url: 'https://seasonic.com/focus-gx',
    imageUrl: '/images/psu-seasonic-focus-gx1000.jpg',
    type: 'psu',
    specs: {
      wattage: 1000,
      certification: '80PLUS Gold',
      modular: 'Full'
    }
  },
  {
    id: 'psu-evga-supernova-850gt',
    name: 'SuperNOVA 850 GT',
    brand: 'EVGA',
    price: 19800,
    url: 'https://www.evga.com/products/product.aspx?pn=220-GT-0850-X1',
    imageUrl: '/images/psu-evga-supernova-850gt.jpg',
    type: 'psu',
    specs: {
      wattage: 850,
      certification: '80PLUS Gold',
      modular: 'Full'
    }
  },
  {
    id: 'psu-thermaltake-toughpower-750w',
    name: 'Toughpower GX2 750W',
    brand: 'Thermaltake',
    price: 14800,
    url: 'https://www.thermaltake.com/toughpower-gx2-750w.html',
    imageUrl: '/images/psu-thermaltake-toughpower-750w.jpg',
    type: 'psu',
    specs: {
      wattage: 750,
      certification: '80PLUS Gold',
      modular: 'Non'
    }
  }
];

// Cases - ATX/mATX各種
export const CASES: Case[] = [
  {
    id: 'case-lian-li-o11-dynamic',
    name: 'O11 Dynamic',
    brand: 'Lian Li',
    price: 19800,
    url: 'https://lian-li.com/product/pc-o11-dynamic/',
    imageUrl: '/images/case-lian-li-o11-dynamic.jpg',
    type: 'case',
    specs: {
      formFactor: 'ATX',
      maxGPULength: 420,
      maxCoolerHeight: 155
    }
  },
  {
    id: 'case-fractal-torrent',
    name: 'Torrent',
    brand: 'Fractal Design',
    price: 28000,
    url: 'https://www.fractal-design.com/products/cases/torrent/',
    imageUrl: '/images/case-fractal-torrent.jpg',
    type: 'case',
    specs: {
      formFactor: 'ATX',
      maxGPULength: 461,
      maxCoolerHeight: 188
    }
  },
  {
    id: 'case-nzxt-h7-flow',
    name: 'H7 Flow',
    brand: 'NZXT',
    price: 16800,
    url: 'https://nzxt.com/product/h7-flow',
    imageUrl: '/images/case-nzxt-h7-flow.jpg',
    type: 'case',
    specs: {
      formFactor: 'ATX',
      maxGPULength: 435,
      maxCoolerHeight: 185
    }
  },
  {
    id: 'case-corsair-4000d',
    name: '4000D Airflow',
    brand: 'Corsair',
    price: 13800,
    url: 'https://www.corsair.com/us/en/p/pc-cases/cc-9011201-ww/4000d-airflow-tempered-glass-mid-tower-atx-case-black-cc-9011201-ww',
    imageUrl: '/images/case-corsair-4000d.jpg',
    type: 'case',
    specs: {
      formFactor: 'ATX',
      maxGPULength: 360,
      maxCoolerHeight: 170
    }
  },
  {
    id: 'case-coolermaster-nr400',
    name: 'MasterBox NR400',
    brand: 'Cooler Master',
    price: 8800,
    url: 'https://www.coolermaster.com/catalog/cases/mid-tower/masterbox-nr400/',
    imageUrl: '/images/case-coolermaster-nr400.jpg',
    type: 'case',
    specs: {
      formFactor: 'mATX',
      maxGPULength: 411,
      maxCoolerHeight: 158
    }
  }
];

// Coolers - 空冷/簡易水冷
export const COOLERS: Cooler[] = [
  {
    id: 'cooler-noctua-nh-d15',
    name: 'NH-D15',
    brand: 'Noctua',
    price: 12800,
    url: 'https://noctua.at/en/nh-d15',
    imageUrl: '/images/cooler-noctua-nh-d15.jpg',
    type: 'cooler',
    specs: {
      type: 'air',
      socket: ['LGA1851', 'AM5', 'LGA1700'],
      tdpRating: 220,
      height: 165
    }
  },
  {
    id: 'cooler-be-quiet-dark-rock-pro-5',
    name: 'Dark Rock Pro 5',
    brand: 'be quiet!',
    price: 11800,
    url: 'https://www.bequiet.com/en/cpucooler/4637',
    imageUrl: '/images/cooler-be-quiet-dark-rock-pro-5.jpg',
    type: 'cooler',
    specs: {
      type: 'air',
      socket: ['LGA1851', 'AM5', 'LGA1700'],
      tdpRating: 250,
      height: 168
    }
  },
  {
    id: 'cooler-arctic-liquid-freezer-ii-280',
    name: 'Liquid Freezer II 280',
    brand: 'Arctic',
    price: 14800,
    url: 'https://www.arctic.de/en/Liquid-Freezer-II-280/ACFRE00066A',
    imageUrl: '/images/cooler-arctic-liquid-freezer-ii-280.jpg',
    type: 'cooler',
    specs: {
      type: 'aio',
      socket: ['LGA1851', 'AM5', 'LGA1700'],
      tdpRating: 250,
      radiatorSize: 280
    }
  },
  {
    id: 'cooler-corsair-icue-h150i-elite',
    name: 'iCUE H150i Elite Capellix',
    brand: 'Corsair',
    price: 24800,
    url: 'https://www.corsair.com/us/en/p/cpu-cooling/cw-9060048-ww/icue-h150i-elite-capellix-liquid-cpu-cooler-cw-9060048-ww',
    imageUrl: '/images/cooler-corsair-icue-h150i-elite.jpg',
    type: 'cooler',
    specs: {
      type: 'aio',
      socket: ['LGA1851', 'AM5', 'LGA1700'],
      tdpRating: 300,
      radiatorSize: 360
    }
  },
  {
    id: 'cooler-coolermaster-hyper-212',
    name: 'Hyper 212 Black Edition',
    brand: 'Cooler Master',
    price: 4800,
    url: 'https://www.coolermaster.com/catalog/coolers/cpu-air-coolers/hyper-212-black-edition/',
    imageUrl: '/images/cooler-coolermaster-hyper-212.jpg',
    type: 'cooler',
    specs: {
      type: 'air',
      socket: ['LGA1851', 'AM5', 'LGA1700'],
      tdpRating: 150,
      height: 158.5
    }
  }
];

// All parts combined
export const ALL_PARTS: Record<string, PCPart[]> = {
  cpu: CPUS,
  gpu: GPUS,
  memory: MEMORY,
  motherboard: MOTHERBOARDS,
  storage: STORAGES,
  psu: PSUS,
  case: CASES,
  cooler: COOLERS
};