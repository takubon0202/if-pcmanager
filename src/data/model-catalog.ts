// メーカー別 主要モデル型番カタログ
// 毎朝のGemini自動更新対象ファイル
// 更新日: 2026-02-18

export interface ModelEntry {
  name: string; // 表示名
  series: string; // シリーズ名（カテゴリ分け用）
  year?: number; // 発売年（参考）
}

export const MODEL_CATALOG: Record<string, ModelEntry[]> = {
  Apple: [
    // MacBook Air
    { name: "MacBook Air M4 (13インチ)", series: "MacBook Air", year: 2025 },
    { name: "MacBook Air M4 (15インチ)", series: "MacBook Air", year: 2025 },
    { name: "MacBook Air M3 (13インチ)", series: "MacBook Air", year: 2024 },
    { name: "MacBook Air M3 (15インチ)", series: "MacBook Air", year: 2024 },
    { name: "MacBook Air M2 (13インチ)", series: "MacBook Air", year: 2022 },
    { name: "MacBook Air M2 (15インチ)", series: "MacBook Air", year: 2023 },
    { name: "MacBook Air M1 (13インチ)", series: "MacBook Air", year: 2020 },
    // MacBook Pro
    { name: "MacBook Pro M4 Pro (14インチ)", series: "MacBook Pro", year: 2024 },
    { name: "MacBook Pro M4 Pro (16インチ)", series: "MacBook Pro", year: 2024 },
    { name: "MacBook Pro M4 Max (14インチ)", series: "MacBook Pro", year: 2024 },
    { name: "MacBook Pro M4 Max (16インチ)", series: "MacBook Pro", year: 2024 },
    { name: "MacBook Pro M4 (14インチ)", series: "MacBook Pro", year: 2024 },
    { name: "MacBook Pro M3 Pro (14インチ)", series: "MacBook Pro", year: 2023 },
    { name: "MacBook Pro M3 Pro (16インチ)", series: "MacBook Pro", year: 2023 },
    { name: "MacBook Pro M3 (14インチ)", series: "MacBook Pro", year: 2023 },
    { name: "MacBook Pro M2 Pro (14インチ)", series: "MacBook Pro", year: 2023 },
    { name: "MacBook Pro M2 (13インチ)", series: "MacBook Pro", year: 2022 },
    { name: "MacBook Pro M1 Pro (14インチ)", series: "MacBook Pro", year: 2021 },
    { name: "MacBook Pro M1 (13インチ)", series: "MacBook Pro", year: 2020 },
  ],
  Lenovo: [
    // IdeaPad
    { name: "IdeaPad Slim 3 Gen 10 (14型 AMD)", series: "IdeaPad", year: 2025 },
    { name: "IdeaPad Slim 5 Gen 10 (16型 AMD)", series: "IdeaPad", year: 2025 },
    { name: "IdeaPad Slim 5 Light Gen 10 (13.3型)", series: "IdeaPad", year: 2025 },
    { name: "IdeaPad Slim 5i Gen 10 (16型 Intel)", series: "IdeaPad", year: 2025 },
    { name: "IdeaPad Pro 5 Gen 10 (14型 AMD)", series: "IdeaPad", year: 2025 },
    { name: "IdeaPad Slim 3 Gen 8 (15.6型)", series: "IdeaPad", year: 2023 },
    // ThinkPad
    { name: "ThinkPad X1 Carbon Gen 13", series: "ThinkPad", year: 2025 },
    { name: "ThinkPad X13 Gen 6 (Intel)", series: "ThinkPad", year: 2025 },
    { name: "ThinkPad E14 Gen 6 (AMD)", series: "ThinkPad", year: 2024 },
    { name: "ThinkPad E16 Gen 2", series: "ThinkPad", year: 2024 },
    { name: "ThinkPad T14 Gen 5", series: "ThinkPad", year: 2024 },
    { name: "ThinkPad X1 Carbon Gen 12", series: "ThinkPad", year: 2024 },
    { name: "ThinkPad X1 Carbon Gen 11", series: "ThinkPad", year: 2023 },
    // Yoga
    { name: "Yoga Slim 7 Gen 10 (14型 AMD)", series: "Yoga", year: 2025 },
    { name: "Yoga 7 2-in-1 Gen 9 (14型)", series: "Yoga", year: 2024 },
    // LOQ / Legion
    { name: "LOQ 15IRX10", series: "LOQ", year: 2025 },
    { name: "LOQ 15IRX9", series: "LOQ", year: 2024 },
    { name: "Legion 7i Gen 10 (16型)", series: "Legion", year: 2025 },
    { name: "Legion Pro 5i Gen 9 (16型)", series: "Legion", year: 2024 },
  ],
  HP: [
    { name: "OmniBook 7 Aero 13-bg", series: "OmniBook", year: 2025 },
    { name: "OmniBook X Flip 14-fk (AMD)", series: "OmniBook", year: 2025 },
    { name: "OmniBook X Flip 14-fm (Intel)", series: "OmniBook", year: 2025 },
    { name: "HP 15-fc", series: "HP", year: 2024 },
    { name: "HP 14-ep", series: "HP", year: 2024 },
    { name: "Pavilion Aero 13-bg", series: "Pavilion", year: 2024 },
    { name: "Pavilion Plus 14-ew", series: "Pavilion", year: 2024 },
    { name: "Victus 15 (RTX 5060)", series: "Victus", year: 2025 },
    { name: "Victus 16 (RTX 4060)", series: "Victus", year: 2024 },
    { name: "OMEN 16 (2025)", series: "OMEN", year: 2025 },
    { name: "Spectre x360 14-eu", series: "Spectre", year: 2024 },
  ],
  Dell: [
    { name: "Inspiron 14 5435", series: "Inspiron", year: 2024 },
    { name: "Inspiron 14 5440", series: "Inspiron", year: 2024 },
    { name: "Inspiron 15 3535", series: "Inspiron", year: 2024 },
    { name: "Inspiron 16 5640", series: "Inspiron", year: 2024 },
    { name: "XPS 13 9350", series: "XPS", year: 2025 },
    { name: "XPS 14 9440", series: "XPS", year: 2024 },
    { name: "XPS 16 9640", series: "XPS", year: 2024 },
    { name: "Latitude 5450", series: "Latitude", year: 2024 },
    { name: "G15 5530 (ゲーミング)", series: "G Series", year: 2024 },
  ],
  ASUS: [
    { name: "Vivobook Go 14 E1404FA", series: "Vivobook", year: 2024 },
    { name: "Vivobook S 14 S5406SA", series: "Vivobook", year: 2025 },
    { name: "Vivobook 16X M1605YA", series: "Vivobook", year: 2024 },
    { name: "Zenbook S 14 UX3406", series: "Zenbook", year: 2025 },
    { name: "Zenbook 14 OLED UX3405", series: "Zenbook", year: 2024 },
    { name: "TUF Gaming A14 (2026)", series: "TUF Gaming", year: 2026 },
    { name: "TUF Gaming A15 (2025)", series: "TUF Gaming", year: 2025 },
    { name: "ROG Zephyrus G14 (2025)", series: "ROG", year: 2025 },
    { name: "ROG Strix G16 (2025)", series: "ROG", year: 2025 },
    { name: "ProArt P16 H7606", series: "ProArt", year: 2025 },
  ],
  MSI: [
    { name: "Modern 14 F1MG", series: "Modern", year: 2025 },
    { name: "Modern 15 H", series: "Modern", year: 2024 },
    { name: "Prestige 14 Evo", series: "Prestige", year: 2024 },
    { name: "Stealth 18 HX", series: "Stealth", year: 2025 },
    { name: "Titan 18 HX", series: "Titan", year: 2025 },
    { name: "Katana 15 B13V", series: "Katana", year: 2024 },
    { name: "Cyborg 15 A12V", series: "Cyborg", year: 2024 },
  ],
  Acer: [
    { name: "Swift Go 14 (2025)", series: "Swift", year: 2025 },
    { name: "Swift X 14 (2024)", series: "Swift", year: 2024 },
    { name: "Aspire 5 A515", series: "Aspire", year: 2024 },
    { name: "Aspire 3 A315", series: "Aspire", year: 2024 },
    { name: "Nitro V 15 ANV15", series: "Nitro", year: 2024 },
    { name: "Predator Helios 16 (2025)", series: "Predator", year: 2025 },
  ],
  "マウスコンピューター": [
    { name: "mouse X4-I5U01SR-A", series: "mouse X", year: 2024 },
    { name: "mouse X5-R7 (15.6型)", series: "mouse X", year: 2024 },
    { name: "mouse K5-I7G60BK-A", series: "mouse K", year: 2024 },
    { name: "G-Tune P5-I7G60BK-A", series: "G-Tune", year: 2024 },
    { name: "DAIV Z6-I7G60SR-A", series: "DAIV", year: 2024 },
  ],
  "富士通": [
    { name: "LIFEBOOK A7513/RW", series: "LIFEBOOK A", year: 2024 },
    { name: "LIFEBOOK U9414/RW", series: "LIFEBOOK U", year: 2024 },
    { name: "LIFEBOOK UH (2025)", series: "LIFEBOOK UH", year: 2025 },
    { name: "LIFEBOOK AH (2024)", series: "LIFEBOOK AH", year: 2024 },
  ],
  NEC: [
    { name: "LAVIE NEXTREME NEXT", series: "LAVIE", year: 2025 },
    { name: "LAVIE N15 (2024)", series: "LAVIE N", year: 2024 },
    { name: "LAVIE Direct N13 Slim", series: "LAVIE N", year: 2024 },
    { name: "LAVIE Pro Mobile PM (2024)", series: "LAVIE Pro", year: 2024 },
  ],
  "Dynabook (東芝)": [
    { name: "GZ/HY", series: "GZ", year: 2024 },
    { name: "GZ/HW", series: "GZ", year: 2023 },
    { name: "RZ/HV", series: "RZ", year: 2024 },
    { name: "AZ/HV", series: "AZ", year: 2024 },
    { name: "CZ/HV", series: "CZ", year: 2024 },
  ],
  Panasonic: [
    { name: "Let's note FV5", series: "Let's note", year: 2025 },
    { name: "Let's note SR5", series: "Let's note", year: 2025 },
    { name: "Let's note FV4", series: "Let's note", year: 2024 },
    { name: "Let's note SR4", series: "Let's note", year: 2024 },
    { name: "Let's note SV4", series: "Let's note", year: 2024 },
  ],
  Microsoft: [
    { name: "Surface Laptop 7 (13.8型)", series: "Surface Laptop", year: 2024 },
    { name: "Surface Laptop 7 (15型)", series: "Surface Laptop", year: 2024 },
    { name: "Surface Pro 11", series: "Surface Pro", year: 2024 },
    { name: "Surface Laptop Go 3", series: "Surface Laptop Go", year: 2023 },
    { name: "Surface Laptop Studio 2", series: "Surface Laptop Studio", year: 2023 },
  ],
};

// メーカーに対応するモデル一覧を取得（シリーズ別にグループ化）
export function getModelsForManufacturer(manufacturer: string): { series: string; models: ModelEntry[] }[] {
  const models = MODEL_CATALOG[manufacturer];
  if (!models) return [];

  const grouped = new Map<string, ModelEntry[]>();
  for (const m of models) {
    const list = grouped.get(m.series) || [];
    list.push(m);
    grouped.set(m.series, list);
  }

  return Array.from(grouped.entries()).map(([series, models]) => ({ series, models }));
}
