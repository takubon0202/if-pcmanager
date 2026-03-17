// メーカー別 主要モデル型番カタログ（2016〜2026年）
// 毎朝のGemini自動更新対象ファイル
// 更新日: 2026-02-18

export interface ModelEntry {
  name: string;
  series: string;
  year?: number;
}

export const MODEL_CATALOG: Record<string, ModelEntry[]> = {
  // ===== Apple =====
  Apple: [
    // MacBook Air
    { name: "MacBook Air M4 (13インチ)", series: "MacBook Air", year: 2025 },
    { name: "MacBook Air M4 (15インチ)", series: "MacBook Air", year: 2025 },
    { name: "MacBook Air M3 (13インチ)", series: "MacBook Air", year: 2024 },
    { name: "MacBook Air M3 (15インチ)", series: "MacBook Air", year: 2024 },
    { name: "MacBook Air M2 (13インチ)", series: "MacBook Air", year: 2022 },
    { name: "MacBook Air M2 (15インチ)", series: "MacBook Air", year: 2023 },
    { name: "MacBook Air M1 (13インチ)", series: "MacBook Air", year: 2020 },
    { name: "MacBook Air 2020 (Intel)", series: "MacBook Air", year: 2020 },
    { name: "MacBook Air 2019", series: "MacBook Air", year: 2019 },
    { name: "MacBook Air 2018 (Retina)", series: "MacBook Air", year: 2018 },
    { name: "MacBook Air 2017 (13インチ)", series: "MacBook Air", year: 2017 },
    // MacBook Pro
    { name: "MacBook Pro M4 Pro (14インチ)", series: "MacBook Pro", year: 2024 },
    { name: "MacBook Pro M4 Pro (16インチ)", series: "MacBook Pro", year: 2024 },
    { name: "MacBook Pro M4 Max (14インチ)", series: "MacBook Pro", year: 2024 },
    { name: "MacBook Pro M4 Max (16インチ)", series: "MacBook Pro", year: 2024 },
    { name: "MacBook Pro M4 (14インチ)", series: "MacBook Pro", year: 2024 },
    { name: "MacBook Pro M3 Pro (14インチ)", series: "MacBook Pro", year: 2023 },
    { name: "MacBook Pro M3 Pro (16インチ)", series: "MacBook Pro", year: 2023 },
    { name: "MacBook Pro M3 Max (14インチ)", series: "MacBook Pro", year: 2023 },
    { name: "MacBook Pro M3 Max (16インチ)", series: "MacBook Pro", year: 2023 },
    { name: "MacBook Pro M3 (14インチ)", series: "MacBook Pro", year: 2023 },
    { name: "MacBook Pro M2 Pro (14インチ)", series: "MacBook Pro", year: 2023 },
    { name: "MacBook Pro M2 Pro (16インチ)", series: "MacBook Pro", year: 2023 },
    { name: "MacBook Pro M2 Max (14インチ)", series: "MacBook Pro", year: 2023 },
    { name: "MacBook Pro M2 (13インチ)", series: "MacBook Pro", year: 2022 },
    { name: "MacBook Pro M1 Pro (14インチ)", series: "MacBook Pro", year: 2021 },
    { name: "MacBook Pro M1 Pro (16インチ)", series: "MacBook Pro", year: 2021 },
    { name: "MacBook Pro M1 Max (14インチ)", series: "MacBook Pro", year: 2021 },
    { name: "MacBook Pro M1 (13インチ)", series: "MacBook Pro", year: 2020 },
    { name: "MacBook Pro 2020 Intel (13インチ)", series: "MacBook Pro", year: 2020 },
    { name: "MacBook Pro 2019 (13インチ)", series: "MacBook Pro", year: 2019 },
    { name: "MacBook Pro 2019 (15インチ)", series: "MacBook Pro", year: 2019 },
    { name: "MacBook Pro 2018 (13インチ)", series: "MacBook Pro", year: 2018 },
    { name: "MacBook Pro 2018 (15インチ)", series: "MacBook Pro", year: 2018 },
    { name: "MacBook Pro 2017 (13インチ)", series: "MacBook Pro", year: 2017 },
    { name: "MacBook Pro 2017 (15インチ)", series: "MacBook Pro", year: 2017 },
    { name: "MacBook Pro 2016 (13インチ)", series: "MacBook Pro", year: 2016 },
    { name: "MacBook Pro 2016 (15インチ)", series: "MacBook Pro", year: 2016 },
    // MacBook
    { name: "MacBook 12インチ (2017)", series: "MacBook", year: 2017 },
    { name: "MacBook 12インチ (2016)", series: "MacBook", year: 2016 },
    // === 2026年3月発表 新製品 ===
    // MacBook Neo (新カテゴリ)
    { name: "MacBook Neo (13インチ, A18 Pro)", series: "MacBook Neo", year: 2026 },
    // MacBook Air M5
    { name: "MacBook Air M5 (13インチ)", series: "MacBook Air", year: 2026 },
    { name: "MacBook Air M5 (15インチ)", series: "MacBook Air", year: 2026 },
    // MacBook Pro M5 Pro / M5 Max
    { name: "MacBook Pro M5 (14インチ)", series: "MacBook Pro", year: 2025 },
    { name: "MacBook Pro M5 Pro (14インチ)", series: "MacBook Pro", year: 2026 },
    { name: "MacBook Pro M5 Pro (16インチ)", series: "MacBook Pro", year: 2026 },
    { name: "MacBook Pro M5 Max (14インチ)", series: "MacBook Pro", year: 2026 },
    { name: "MacBook Pro M5 Max (16インチ)", series: "MacBook Pro", year: 2026 },
    // === デスクトップPC ===
    // iMac
    { name: "iMac M4 (24インチ, 4ポート)", series: "iMac", year: 2024 },
    { name: "iMac M4 (24インチ, 2ポート)", series: "iMac", year: 2024 },
    { name: "iMac M3 (24インチ, 4ポート)", series: "iMac", year: 2023 },
    { name: "iMac M3 (24インチ, 2ポート)", series: "iMac", year: 2023 },
    { name: "iMac M1 (24インチ, 4ポート)", series: "iMac", year: 2021 },
    { name: "iMac M1 (24インチ, 2ポート)", series: "iMac", year: 2021 },
    { name: "iMac (Retina 5K, 27インチ, 2020)", series: "iMac", year: 2020 },
    { name: "iMac (Retina 5K, 27インチ, 2019)", series: "iMac", year: 2019 },
    { name: "iMac (Retina 4K, 21.5インチ, 2019)", series: "iMac", year: 2019 },
    { name: "iMac (Retina 5K, 27インチ, 2017)", series: "iMac", year: 2017 },
    { name: "iMac (Retina 4K, 21.5インチ, 2017)", series: "iMac", year: 2017 },
    { name: "iMac (21.5インチ, 2017)", series: "iMac", year: 2017 },
    // iMac Pro
    { name: "iMac Pro 2017 (27インチ 5K, Xeon W)", series: "iMac Pro", year: 2017 },
    // Mac mini
    { name: "Mac mini M4 Pro (2024)", series: "Mac mini", year: 2024 },
    { name: "Mac mini M4 (2024)", series: "Mac mini", year: 2024 },
    { name: "Mac mini M2 Pro (2023)", series: "Mac mini", year: 2023 },
    { name: "Mac mini M2 (2023)", series: "Mac mini", year: 2023 },
    { name: "Mac mini M1 (2020)", series: "Mac mini", year: 2020 },
    { name: "Mac mini 2018 (Intel)", series: "Mac mini", year: 2018 },
    // Mac Studio
    { name: "Mac Studio M4 Max (2025)", series: "Mac Studio", year: 2025 },
    { name: "Mac Studio M3 Ultra (2025)", series: "Mac Studio", year: 2025 },
    { name: "Mac Studio M2 Max (2023)", series: "Mac Studio", year: 2023 },
    { name: "Mac Studio M2 Ultra (2023)", series: "Mac Studio", year: 2023 },
    { name: "Mac Studio M1 Max (2022)", series: "Mac Studio", year: 2022 },
    { name: "Mac Studio M1 Ultra (2022)", series: "Mac Studio", year: 2022 },
    // Mac Pro
    { name: "Mac Pro M2 Ultra (2023) タワー", series: "Mac Pro", year: 2023 },
    { name: "Mac Pro M2 Ultra (2023) ラック", series: "Mac Pro", year: 2023 },
    { name: "Mac Pro 2019 (Intel Xeon W) タワー", series: "Mac Pro", year: 2019 },
    { name: "Mac Pro 2019 (Intel Xeon W) ラック", series: "Mac Pro", year: 2019 },
  ],

  // ===== Lenovo =====
  Lenovo: [
    // ThinkPad X1 Carbon
    { name: "ThinkPad X1 Carbon Gen 13 Aura Edition", series: "ThinkPad X1", year: 2025 },
    { name: "ThinkPad X1 Carbon Gen 12", series: "ThinkPad X1", year: 2024 },
    { name: "ThinkPad X1 Carbon Gen 11", series: "ThinkPad X1", year: 2023 },
    { name: "ThinkPad X1 Carbon Gen 10", series: "ThinkPad X1", year: 2022 },
    { name: "ThinkPad X1 Carbon Gen 9", series: "ThinkPad X1", year: 2021 },
    { name: "ThinkPad X1 Carbon Gen 8", series: "ThinkPad X1", year: 2020 },
    { name: "ThinkPad X1 Carbon Gen 7", series: "ThinkPad X1", year: 2019 },
    { name: "ThinkPad X1 Carbon Gen 6", series: "ThinkPad X1", year: 2018 },
    { name: "ThinkPad X1 Carbon Gen 5", series: "ThinkPad X1", year: 2017 },
    { name: "ThinkPad X1 Yoga Gen 9", series: "ThinkPad X1", year: 2024 },
    { name: "ThinkPad X1 Nano Gen 3", series: "ThinkPad X1", year: 2023 },
    // ThinkPad X/T/E/L
    { name: "ThinkPad X13 Gen 6 (Intel)", series: "ThinkPad X/T", year: 2025 },
    { name: "ThinkPad X13 Gen 5", series: "ThinkPad X/T", year: 2024 },
    { name: "ThinkPad X13 Gen 4", series: "ThinkPad X/T", year: 2023 },
    { name: "ThinkPad X13 Gen 3", series: "ThinkPad X/T", year: 2022 },
    { name: "ThinkPad T14s Gen 6", series: "ThinkPad X/T", year: 2025 },
    { name: "ThinkPad T14s Gen 5", series: "ThinkPad X/T", year: 2024 },
    { name: "ThinkPad T14 Gen 5", series: "ThinkPad X/T", year: 2024 },
    { name: "ThinkPad T14 Gen 4", series: "ThinkPad X/T", year: 2023 },
    { name: "ThinkPad T14 Gen 3", series: "ThinkPad X/T", year: 2022 },
    { name: "ThinkPad T480", series: "ThinkPad X/T", year: 2018 },
    { name: "ThinkPad T480s", series: "ThinkPad X/T", year: 2018 },
    { name: "ThinkPad T470", series: "ThinkPad X/T", year: 2017 },
    { name: "ThinkPad E14 Gen 6 (AMD)", series: "ThinkPad E", year: 2024 },
    { name: "ThinkPad E14 Gen 5", series: "ThinkPad E", year: 2023 },
    { name: "ThinkPad E14 Gen 4", series: "ThinkPad E", year: 2022 },
    { name: "ThinkPad E16 Gen 2", series: "ThinkPad E", year: 2024 },
    { name: "ThinkPad E15 Gen 4", series: "ThinkPad E", year: 2022 },
    { name: "ThinkPad L14 Gen 5", series: "ThinkPad L", year: 2024 },
    { name: "ThinkPad L16 Gen 1", series: "ThinkPad L", year: 2024 },
    { name: "ThinkPad L13 Gen 4", series: "ThinkPad L", year: 2023 },
    // IdeaPad
    { name: "IdeaPad Slim 3 Gen 10 (14型 AMD)", series: "IdeaPad", year: 2025 },
    { name: "IdeaPad Slim 5 Gen 10 (16型 AMD)", series: "IdeaPad", year: 2025 },
    { name: "IdeaPad Slim 5 Light Gen 10 (13.3型)", series: "IdeaPad", year: 2025 },
    { name: "IdeaPad Slim 5i Gen 10 (16型 Intel)", series: "IdeaPad", year: 2025 },
    { name: "IdeaPad Pro 5 Gen 10 (14型 AMD)", series: "IdeaPad", year: 2025 },
    { name: "IdeaPad Slim 5 Gen 9 (14型)", series: "IdeaPad", year: 2024 },
    { name: "IdeaPad Slim 5i Gen 9 (16型)", series: "IdeaPad", year: 2024 },
    { name: "IdeaPad Slim 3 Gen 8 (15.6型)", series: "IdeaPad", year: 2023 },
    { name: "IdeaPad Slim 5 Gen 8 (14型)", series: "IdeaPad", year: 2023 },
    { name: "IdeaPad Slim 570 (14型)", series: "IdeaPad", year: 2022 },
    { name: "IdeaPad Slim 550 (14型)", series: "IdeaPad", year: 2021 },
    { name: "IdeaPad S540 (14型)", series: "IdeaPad", year: 2020 },
    { name: "IdeaPad S340 (14型)", series: "IdeaPad", year: 2019 },
    { name: "IdeaPad 330 (15.6型)", series: "IdeaPad", year: 2018 },
    { name: "IdeaPad 320 (15.6型)", series: "IdeaPad", year: 2017 },
    // Yoga
    { name: "Yoga Slim 7 Gen 10 (14型 AMD)", series: "Yoga", year: 2025 },
    { name: "Yoga 7 2-in-1 Gen 9 (14型)", series: "Yoga", year: 2024 },
    { name: "Yoga Slim 7i Gen 8 (14型)", series: "Yoga", year: 2023 },
    { name: "Yoga Slim 770i (14型)", series: "Yoga", year: 2022 },
    { name: "Yoga Slim 750i (14型)", series: "Yoga", year: 2021 },
    { name: "Yoga Slim 7 (14型)", series: "Yoga", year: 2020 },
    { name: "Yoga C740 (14型)", series: "Yoga", year: 2019 },
    { name: "Yoga C930", series: "Yoga", year: 2018 },
    // === デスクトップPC ===
    // ThinkCentre
    { name: "ThinkCentre M75q Tiny Gen 5", series: "ThinkCentre", year: 2024 },
    { name: "ThinkCentre M75s Small Gen 5", series: "ThinkCentre", year: 2024 },
    { name: "ThinkCentre M70q Tiny Gen 5", series: "ThinkCentre", year: 2024 },
    { name: "ThinkCentre neo 50q Gen 5", series: "ThinkCentre", year: 2024 },
    { name: "ThinkCentre M70q Tiny Gen 4", series: "ThinkCentre", year: 2023 },
    { name: "ThinkCentre M75q Tiny Gen 4", series: "ThinkCentre", year: 2023 },
    { name: "ThinkCentre M70q Tiny Gen 3", series: "ThinkCentre", year: 2022 },
    { name: "ThinkCentre M75s Gen 2", series: "ThinkCentre", year: 2021 },
    { name: "ThinkCentre M75q Tiny Gen 2", series: "ThinkCentre", year: 2021 },
    { name: "ThinkCentre M70q Tiny", series: "ThinkCentre", year: 2020 },
    // IdeaCentre
    { name: "IdeaCentre Tower (17L, 10)", series: "IdeaCentre", year: 2025 },
    { name: "IdeaCentre Mini (1L, 10)", series: "IdeaCentre", year: 2025 },
    { name: "IdeaCentre Tower (17L, 9)", series: "IdeaCentre", year: 2024 },
    { name: "IdeaCentre Mini (1L, 9)", series: "IdeaCentre", year: 2024 },
    { name: "IdeaCentre 5i Gen 8 (タワー)", series: "IdeaCentre", year: 2023 },
    { name: "IdeaCentre Mini (1L, 8)", series: "IdeaCentre", year: 2023 },
    { name: "IdeaCentre 5i Gen 7 (タワー)", series: "IdeaCentre", year: 2022 },
    // Legion Tower
    { name: "Legion Tower 7i (34L, 10)", series: "Legion Tower", year: 2025 },
    { name: "Legion Tower 5i (28L, 10)", series: "Legion Tower", year: 2025 },
    { name: "Legion Tower 5i Gen 9 (28L)", series: "Legion Tower", year: 2024 },
    { name: "Legion Tower 5 Gen 8 (AMD)", series: "Legion Tower", year: 2023 },
    { name: "Legion Tower 5i Gen 8 (Intel)", series: "Legion Tower", year: 2023 },
    { name: "Legion Tower 5i Gen 7 (Intel)", series: "Legion Tower", year: 2022 },
    // LOQ / Legion (ノートPC)
    { name: "LOQ 15IRX10", series: "LOQ / Legion", year: 2025 },
    { name: "LOQ 15IRX9", series: "LOQ / Legion", year: 2024 },
    { name: "LOQ 15AHP9", series: "LOQ / Legion", year: 2024 },
    { name: "Legion 7i Gen 10 (16型)", series: "LOQ / Legion", year: 2025 },
    { name: "Legion Pro 5i Gen 9 (16型)", series: "LOQ / Legion", year: 2024 },
    { name: "Legion 5i Gen 8 (16型)", series: "LOQ / Legion", year: 2023 },
    { name: "Legion 5 Gen 7 (16型)", series: "LOQ / Legion", year: 2022 },
    { name: "Legion 5 Gen 6 (15型)", series: "LOQ / Legion", year: 2021 },
    { name: "Legion Y540 (15.6型)", series: "LOQ / Legion", year: 2019 },
  ],

  // ===== HP =====
  HP: [
    // OmniBook (2025~)
    { name: "OmniBook 7 Aero 13-bg", series: "OmniBook", year: 2025 },
    { name: "OmniBook X Flip 14-fk (AMD)", series: "OmniBook", year: 2025 },
    { name: "OmniBook X Flip 14-fm (Intel)", series: "OmniBook", year: 2025 },
    // Pavilion
    { name: "Pavilion Aero 13-bg (2024)", series: "Pavilion", year: 2024 },
    { name: "Pavilion Plus 14-ew", series: "Pavilion", year: 2024 },
    { name: "Pavilion Aero 13-be (2023)", series: "Pavilion", year: 2023 },
    { name: "Pavilion Aero 13-be (2022)", series: "Pavilion", year: 2022 },
    { name: "Pavilion 15-eg (2022)", series: "Pavilion", year: 2022 },
    { name: "Pavilion 15-eg (2021)", series: "Pavilion", year: 2021 },
    { name: "Pavilion 15-cs (2019)", series: "Pavilion", year: 2019 },
    { name: "Pavilion 15-cc (2017)", series: "Pavilion", year: 2017 },
    // HP (エントリー)
    { name: "HP 15-fc", series: "HP", year: 2024 },
    { name: "HP 14-ep", series: "HP", year: 2024 },
    { name: "HP 15-fd (2023)", series: "HP", year: 2023 },
    { name: "HP 15s-fq (2022)", series: "HP", year: 2022 },
    { name: "HP 15s-eq (2021)", series: "HP", year: 2021 },
    { name: "HP 15-db (2019)", series: "HP", year: 2019 },
    { name: "HP 15-bs (2017)", series: "HP", year: 2017 },
    // Spectre
    { name: "Spectre x360 14-eu (2024)", series: "Spectre", year: 2024 },
    { name: "Spectre x360 14-ef (2023)", series: "Spectre", year: 2023 },
    { name: "Spectre x360 14-ea (2022)", series: "Spectre", year: 2022 },
    { name: "Spectre x360 14 (2021)", series: "Spectre", year: 2021 },
    { name: "Spectre x360 13 (2020)", series: "Spectre", year: 2020 },
    { name: "Spectre x360 13 (2019)", series: "Spectre", year: 2019 },
    { name: "Spectre 13 (2017)", series: "Spectre", year: 2017 },
    // ENVY
    { name: "ENVY x360 14-fc (2024)", series: "ENVY", year: 2024 },
    { name: "ENVY x360 13-bf (2023)", series: "ENVY", year: 2023 },
    { name: "ENVY x360 13-ay (2022)", series: "ENVY", year: 2022 },
    { name: "ENVY x360 15 (2021)", series: "ENVY", year: 2021 },
    { name: "ENVY 13 (2020)", series: "ENVY", year: 2020 },
    { name: "ENVY 13 (2019)", series: "ENVY", year: 2019 },
    // EliteBook
    { name: "EliteBook 860 G11", series: "EliteBook", year: 2024 },
    { name: "EliteBook 840 G10", series: "EliteBook", year: 2023 },
    { name: "EliteBook 840 G9", series: "EliteBook", year: 2022 },
    { name: "EliteBook 840 G8", series: "EliteBook", year: 2021 },
    { name: "EliteBook 840 G7", series: "EliteBook", year: 2020 },
    { name: "EliteBook 840 G6", series: "EliteBook", year: 2019 },
    { name: "EliteBook 840 G5", series: "EliteBook", year: 2018 },
    // === デスクトップPC ===
    // EliteDesk / ProDesk
    { name: "EliteDesk 8 Mini G1a", series: "EliteDesk / ProDesk", year: 2024 },
    { name: "Elite SFF 805 G9", series: "EliteDesk / ProDesk", year: 2024 },
    { name: "ProDesk 405 SFF G9", series: "EliteDesk / ProDesk", year: 2023 },
    { name: "EliteDesk 805 G8 Desktop Mini", series: "EliteDesk / ProDesk", year: 2022 },
    { name: "EliteDesk 800 G8 SFF", series: "EliteDesk / ProDesk", year: 2021 },
    { name: "EliteDesk 800 G6 SFF", series: "EliteDesk / ProDesk", year: 2020 },
    { name: "ProDesk 400 G7 SFF", series: "EliteDesk / ProDesk", year: 2020 },
    // Pavilion Desktop
    { name: "Pavilion Desktop TP01 (2024)", series: "Pavilion Desktop", year: 2024 },
    { name: "Pavilion Desktop TP01 (2023)", series: "Pavilion Desktop", year: 2023 },
    { name: "Pavilion Desktop TP01 (2022)", series: "Pavilion Desktop", year: 2022 },
    { name: "Pavilion Desktop TP01 (2021)", series: "Pavilion Desktop", year: 2021 },
    // HP OmniDesk
    { name: "OmniDesk AI (2025)", series: "HP OmniDesk", year: 2025 },
    // OMEN Desktop
    { name: "OMEN 35L Desktop (2025)", series: "OMEN Desktop", year: 2025 },
    { name: "OMEN 45L Desktop (2024)", series: "OMEN Desktop", year: 2024 },
    { name: "OMEN 40L Desktop (2023)", series: "OMEN Desktop", year: 2023 },
    { name: "OMEN 25L Desktop (2022)", series: "OMEN Desktop", year: 2022 },
    { name: "OMEN 25L Desktop (2021)", series: "OMEN Desktop", year: 2021 },
    // Victus / OMEN (ノートPC)
    { name: "Victus 15 (RTX 5060)", series: "Victus / OMEN", year: 2025 },
    { name: "Victus 16 (RTX 4060)", series: "Victus / OMEN", year: 2024 },
    { name: "Victus 16 (RTX 4050)", series: "Victus / OMEN", year: 2023 },
    { name: "Victus 16 (2022)", series: "Victus / OMEN", year: 2022 },
    { name: "OMEN 16 (2025)", series: "Victus / OMEN", year: 2025 },
    { name: "OMEN 16 (2024)", series: "Victus / OMEN", year: 2024 },
    { name: "OMEN 16 (2023)", series: "Victus / OMEN", year: 2023 },
    { name: "OMEN 15 (2021)", series: "Victus / OMEN", year: 2021 },
    { name: "OMEN 15 (2020)", series: "Victus / OMEN", year: 2020 },
  ],

  // ===== Dell =====
  Dell: [
    // XPS
    { name: "XPS 13 9350 (2025)", series: "XPS", year: 2025 },
    { name: "XPS 13 Plus 9340 (2024)", series: "XPS", year: 2024 },
    { name: "XPS 14 9440 (2024)", series: "XPS", year: 2024 },
    { name: "XPS 16 9640 (2024)", series: "XPS", year: 2024 },
    { name: "XPS 13 9315 (2022)", series: "XPS", year: 2022 },
    { name: "XPS 13 9310 (2021)", series: "XPS", year: 2021 },
    { name: "XPS 13 9300 (2020)", series: "XPS", year: 2020 },
    { name: "XPS 13 9380 (2019)", series: "XPS", year: 2019 },
    { name: "XPS 13 9370 (2018)", series: "XPS", year: 2018 },
    { name: "XPS 13 9360 (2017)", series: "XPS", year: 2017 },
    { name: "XPS 15 9530 (2023)", series: "XPS", year: 2023 },
    { name: "XPS 15 9520 (2022)", series: "XPS", year: 2022 },
    { name: "XPS 15 9510 (2021)", series: "XPS", year: 2021 },
    // Inspiron
    { name: "Inspiron 14 5435", series: "Inspiron", year: 2024 },
    { name: "Inspiron 14 5440", series: "Inspiron", year: 2024 },
    { name: "Inspiron 15 3535", series: "Inspiron", year: 2024 },
    { name: "Inspiron 16 5640", series: "Inspiron", year: 2024 },
    { name: "Inspiron 14 5430", series: "Inspiron", year: 2023 },
    { name: "Inspiron 16 5630", series: "Inspiron", year: 2023 },
    { name: "Inspiron 14 5420", series: "Inspiron", year: 2022 },
    { name: "Inspiron 15 3520", series: "Inspiron", year: 2022 },
    { name: "Inspiron 14 5410 (2021)", series: "Inspiron", year: 2021 },
    { name: "Inspiron 15 5510 (2021)", series: "Inspiron", year: 2021 },
    { name: "Inspiron 14 5490 (2020)", series: "Inspiron", year: 2020 },
    { name: "Inspiron 15 5580 (2019)", series: "Inspiron", year: 2019 },
    { name: "Inspiron 15 5570 (2018)", series: "Inspiron", year: 2018 },
    { name: "Inspiron 15 5567 (2017)", series: "Inspiron", year: 2017 },
    // Latitude
    { name: "Latitude 5450 (2024)", series: "Latitude", year: 2024 },
    { name: "Latitude 7440 (2023)", series: "Latitude", year: 2023 },
    { name: "Latitude 5430 (2022)", series: "Latitude", year: 2022 },
    { name: "Latitude 5420 (2021)", series: "Latitude", year: 2021 },
    { name: "Latitude 5410 (2020)", series: "Latitude", year: 2020 },
    { name: "Latitude 5300 (2019)", series: "Latitude", year: 2019 },
    // === デスクトップPC ===
    // OptiPlex
    { name: "OptiPlex 7020 SFF (2024)", series: "OptiPlex", year: 2024 },
    { name: "OptiPlex 7020 Tower (2024)", series: "OptiPlex", year: 2024 },
    { name: "OptiPlex 7020 Micro (2024)", series: "OptiPlex", year: 2024 },
    { name: "OptiPlex 7010 SFF (2023)", series: "OptiPlex", year: 2023 },
    { name: "OptiPlex 7010 Tower (2023)", series: "OptiPlex", year: 2023 },
    { name: "OptiPlex 7010 Micro (2023)", series: "OptiPlex", year: 2023 },
    { name: "OptiPlex 7000 SFF (2022)", series: "OptiPlex", year: 2022 },
    { name: "OptiPlex 7000 Tower (2022)", series: "OptiPlex", year: 2022 },
    { name: "OptiPlex 7090 SFF (2021)", series: "OptiPlex", year: 2021 },
    { name: "OptiPlex 7080 SFF (2020)", series: "OptiPlex", year: 2020 },
    { name: "OptiPlex 7070 SFF (2019)", series: "OptiPlex", year: 2019 },
    { name: "OptiPlex 7060 SFF (2018)", series: "OptiPlex", year: 2018 },
    // Inspiron Desktop
    { name: "Inspiron Small Desktop (2024)", series: "Inspiron Desktop", year: 2024 },
    { name: "Inspiron Desktop (2024)", series: "Inspiron Desktop", year: 2024 },
    { name: "Inspiron Desktop (2023)", series: "Inspiron Desktop", year: 2023 },
    { name: "Inspiron Desktop (2022)", series: "Inspiron Desktop", year: 2022 },
    // XPS Desktop
    { name: "XPS Desktop 8960 (2024)", series: "XPS Desktop", year: 2024 },
    { name: "XPS Desktop 8950 (2023)", series: "XPS Desktop", year: 2023 },
    { name: "XPS Desktop 8940 (2021)", series: "XPS Desktop", year: 2021 },
    // Alienware Desktop
    { name: "Alienware Aurora R16 (2024)", series: "Alienware Desktop", year: 2024 },
    { name: "Alienware Aurora R15 (2023)", series: "Alienware Desktop", year: 2023 },
    { name: "Alienware Aurora R14 (2022)", series: "Alienware Desktop", year: 2022 },
    { name: "Alienware Aurora R13 (2021)", series: "Alienware Desktop", year: 2021 },
    // G / Alienware (ノートPC)
    { name: "G16 7630 (2024)", series: "Dell G / Alienware", year: 2024 },
    { name: "G15 5530 (2023)", series: "Dell G / Alienware", year: 2023 },
    { name: "G15 5520 (2022)", series: "Dell G / Alienware", year: 2022 },
    { name: "G15 5510 (2021)", series: "Dell G / Alienware", year: 2021 },
    { name: "Alienware m16 R2 (2024)", series: "Dell G / Alienware", year: 2024 },
    { name: "Alienware x14 R2 (2023)", series: "Dell G / Alienware", year: 2023 },
    { name: "Alienware m15 R7 (2022)", series: "Dell G / Alienware", year: 2022 },
  ],

  // ===== ASUS =====
  ASUS: [
    // Zenbook
    { name: "Zenbook S 14 UX3406 (2025)", series: "Zenbook", year: 2025 },
    { name: "Zenbook 14 OLED UX3405 (2024)", series: "Zenbook", year: 2024 },
    { name: "Zenbook S 13 OLED (2023)", series: "Zenbook", year: 2023 },
    { name: "Zenbook 14 OLED UX3402 (2022)", series: "Zenbook", year: 2022 },
    { name: "Zenbook 14 UX425 (2021)", series: "Zenbook", year: 2021 },
    { name: "Zenbook 14 UX434 (2020)", series: "Zenbook", year: 2020 },
    { name: "Zenbook 14 UX433 (2019)", series: "Zenbook", year: 2019 },
    { name: "Zenbook UX430 (2018)", series: "Zenbook", year: 2018 },
    { name: "Zenbook UX330 (2017)", series: "Zenbook", year: 2017 },
    // Vivobook
    { name: "Vivobook S 14 S5406SA (2025)", series: "Vivobook", year: 2025 },
    { name: "Vivobook Go 14 E1404FA (2024)", series: "Vivobook", year: 2024 },
    { name: "Vivobook 16X M1605YA (2024)", series: "Vivobook", year: 2024 },
    { name: "Vivobook S 15 OLED (2023)", series: "Vivobook", year: 2023 },
    { name: "Vivobook 15 M1502 (2022)", series: "Vivobook", year: 2022 },
    { name: "Vivobook 15 K513 (2021)", series: "Vivobook", year: 2021 },
    { name: "Vivobook 15 X512 (2020)", series: "Vivobook", year: 2020 },
    { name: "Vivobook S14 S430 (2019)", series: "Vivobook", year: 2019 },
    { name: "Vivobook S15 S510 (2018)", series: "Vivobook", year: 2018 },
    // ROG
    { name: "ROG Zephyrus G14 (2025)", series: "ROG", year: 2025 },
    { name: "ROG Strix G16 (2025)", series: "ROG", year: 2025 },
    { name: "ROG Zephyrus G14 (2024)", series: "ROG", year: 2024 },
    { name: "ROG Strix G16 (2024)", series: "ROG", year: 2024 },
    { name: "ROG Zephyrus G14 (2023)", series: "ROG", year: 2023 },
    { name: "ROG Zephyrus G14 (2022)", series: "ROG", year: 2022 },
    { name: "ROG Zephyrus G14 (2021)", series: "ROG", year: 2021 },
    { name: "ROG Zephyrus G14 (2020)", series: "ROG", year: 2020 },
    { name: "ROG Strix SCAR 16 (2024)", series: "ROG", year: 2024 },
    { name: "ROG Flow X13 (2023)", series: "ROG", year: 2023 },
    // TUF Gaming
    { name: "TUF Gaming A14 (2026)", series: "TUF Gaming", year: 2026 },
    { name: "TUF Gaming A15 (2025)", series: "TUF Gaming", year: 2025 },
    { name: "TUF Gaming A16 (2024)", series: "TUF Gaming", year: 2024 },
    { name: "TUF Gaming A15 (2023)", series: "TUF Gaming", year: 2023 },
    { name: "TUF Gaming F15 (2022)", series: "TUF Gaming", year: 2022 },
    { name: "TUF Gaming F15 (2021)", series: "TUF Gaming", year: 2021 },
    { name: "TUF Gaming FX505 (2019)", series: "TUF Gaming", year: 2019 },
    // ProArt (ノートPC)
    { name: "ProArt P16 H7606 (2025)", series: "ProArt", year: 2025 },
    { name: "ProArt Studiobook 16 OLED (2023)", series: "ProArt", year: 2023 },
    // === デスクトップPC ===
    // ROG デスクトップ
    { name: "ROG Strix GT35 (2025)", series: "ROG デスクトップ", year: 2025 },
    { name: "ROG Strix GA35 (2024)", series: "ROG デスクトップ", year: 2024 },
    { name: "ROG Strix G16CH (2024)", series: "ROG デスクトップ", year: 2024 },
    { name: "ROG Strix GT15 (2023)", series: "ROG デスクトップ", year: 2023 },
    { name: "ROG Strix G10CE (2022)", series: "ROG デスクトップ", year: 2022 },
    { name: "ROG Strix G15CK (2021)", series: "ROG デスクトップ", year: 2021 },
    // TUF Gaming デスクトップ
    { name: "TUF Gaming GT502 Desktop (2025)", series: "TUF Gaming デスクトップ", year: 2025 },
    { name: "TUF Gaming GT501 Desktop (2024)", series: "TUF Gaming デスクトップ", year: 2024 },
    { name: "TUF Gaming GT301 Desktop (2023)", series: "TUF Gaming デスクトップ", year: 2023 },
    // ExpertCenter
    { name: "ExpertCenter D9 SFF (2024)", series: "ExpertCenter", year: 2024 },
    { name: "ExpertCenter D5 SFF (2024)", series: "ExpertCenter", year: 2024 },
    { name: "ExpertCenter D7 Mini Tower (2023)", series: "ExpertCenter", year: 2023 },
    { name: "ExpertCenter D5 Mini Tower (2022)", series: "ExpertCenter", year: 2022 },
    // ASUS Mini PC
    { name: "Mini PC PN65 (2024)", series: "ASUS Mini PC", year: 2024 },
    { name: "Mini PC PN53 (2023)", series: "ASUS Mini PC", year: 2023 },
    { name: "Mini PC PN52 (2022)", series: "ASUS Mini PC", year: 2022 },
  ],

  // ===== MSI =====
  MSI: [
    { name: "Modern 14 F1MG (2025)", series: "Modern / Prestige", year: 2025 },
    { name: "Modern 15 H (2024)", series: "Modern / Prestige", year: 2024 },
    { name: "Modern 14 C12M (2022)", series: "Modern / Prestige", year: 2022 },
    { name: "Prestige 14 Evo (2024)", series: "Modern / Prestige", year: 2024 },
    { name: "Prestige 14 (2023)", series: "Modern / Prestige", year: 2023 },
    { name: "Prestige 14 (2021)", series: "Modern / Prestige", year: 2021 },
    { name: "Stealth 18 HX (2025)", series: "ゲーミング", year: 2025 },
    { name: "Stealth 16 AI Studio (2024)", series: "ゲーミング", year: 2024 },
    { name: "Stealth 15M (2022)", series: "ゲーミング", year: 2022 },
    { name: "Titan 18 HX (2025)", series: "ゲーミング", year: 2025 },
    { name: "Katana 15 B13V (2024)", series: "ゲーミング", year: 2024 },
    { name: "Katana GF66 (2022)", series: "ゲーミング", year: 2022 },
    { name: "Cyborg 15 A12V (2024)", series: "ゲーミング", year: 2024 },
    { name: "GF75 Thin (2021)", series: "ゲーミング", year: 2021 },
    { name: "GF65 Thin (2020)", series: "ゲーミング", year: 2020 },
    { name: "GF63 (2019)", series: "ゲーミング", year: 2019 },
    { name: "CreatorPro Z17 HX Studio (2024)", series: "クリエイター", year: 2024 },
    { name: "Creator Z16 (2022)", series: "クリエイター", year: 2022 },
  ],

  // ===== Acer =====
  Acer: [
    { name: "Swift Go 14 (2025)", series: "Swift", year: 2025 },
    { name: "Swift X 14 (2024)", series: "Swift", year: 2024 },
    { name: "Swift Go 14 (2024)", series: "Swift", year: 2024 },
    { name: "Swift 5 SF514 (2022)", series: "Swift", year: 2022 },
    { name: "Swift 3 SF314 (2021)", series: "Swift", year: 2021 },
    { name: "Swift 3 SF314 (2020)", series: "Swift", year: 2020 },
    { name: "Swift 3 SF315 (2019)", series: "Swift", year: 2019 },
    { name: "Swift 3 SF314 (2018)", series: "Swift", year: 2018 },
    { name: "Aspire 5 A515 (2024)", series: "Aspire", year: 2024 },
    { name: "Aspire 3 A315 (2024)", series: "Aspire", year: 2024 },
    { name: "Aspire 5 A515 (2023)", series: "Aspire", year: 2023 },
    { name: "Aspire 5 A515 (2022)", series: "Aspire", year: 2022 },
    { name: "Aspire 5 A515 (2021)", series: "Aspire", year: 2021 },
    { name: "Aspire 5 A515 (2020)", series: "Aspire", year: 2020 },
    { name: "Aspire 5 A515 (2019)", series: "Aspire", year: 2019 },
    { name: "Aspire E15 E5-576 (2018)", series: "Aspire", year: 2018 },
    { name: "Aspire E15 E5-575 (2017)", series: "Aspire", year: 2017 },
    { name: "Nitro V 15 ANV15 (2024)", series: "Nitro / Predator", year: 2024 },
    { name: "Nitro 5 AN515 (2023)", series: "Nitro / Predator", year: 2023 },
    { name: "Nitro 5 AN515 (2022)", series: "Nitro / Predator", year: 2022 },
    { name: "Nitro 5 AN515 (2021)", series: "Nitro / Predator", year: 2021 },
    { name: "Nitro 5 AN515 (2020)", series: "Nitro / Predator", year: 2020 },
    { name: "Predator Helios 16 (2025)", series: "Nitro / Predator", year: 2025 },
    { name: "Predator Helios 16 (2024)", series: "Nitro / Predator", year: 2024 },
    { name: "Predator Helios 300 (2022)", series: "Nitro / Predator", year: 2022 },
  ],

  // ===== マウスコンピューター =====
  "マウスコンピューター": [
    { name: "mouse X4-I5U01SR-A (14型)", series: "mouse X", year: 2024 },
    { name: "mouse X5-R7 (15.6型)", series: "mouse X", year: 2024 },
    { name: "mouse X4-R5 (14型)", series: "mouse X", year: 2023 },
    { name: "mouse B5-I5 (15.6型)", series: "mouse B", year: 2023 },
    { name: "mouse K5-I7G60BK-A (15.3型)", series: "mouse K", year: 2024 },
    { name: "mouse K5-I7G50BK-B (15.6型)", series: "mouse K", year: 2023 },
    { name: "G-Tune P5-I7G60BK-A (15.3型)", series: "G-Tune", year: 2024 },
    { name: "G-Tune E5-I7G60BK-A (15.3型)", series: "G-Tune", year: 2024 },
    { name: "G-Tune P5 (15.6型) 2023", series: "G-Tune", year: 2023 },
    { name: "G-Tune P5 (15.6型) 2022", series: "G-Tune", year: 2022 },
    { name: "G-Tune E5-165 (15.6型)", series: "G-Tune", year: 2021 },
    { name: "G-Tune H5 (2020)", series: "G-Tune", year: 2020 },
    { name: "DAIV Z6-I7G60SR-A (16型)", series: "DAIV", year: 2024 },
    { name: "DAIV Z6 (16型) 2023", series: "DAIV", year: 2023 },
    { name: "DAIV 5P (15.6型) 2021", series: "DAIV", year: 2021 },
    { name: "DAIV 4P (14型) 2020", series: "DAIV", year: 2020 },
    // === デスクトップPC ===
    // G-Tune デスクトップ
    { name: "G-Tune DG-I5G60 (2026)", series: "G-Tune デスクトップ", year: 2026 },
    { name: "G-Tune DG-A7G70 (2026)", series: "G-Tune デスクトップ", year: 2026 },
    { name: "G-Tune DG-I7G70 (2026)", series: "G-Tune デスクトップ", year: 2026 },
    { name: "G-Tune FZ-I7G80 (2026)", series: "G-Tune デスクトップ", year: 2026 },
    { name: "G-Tune FZ-I7G70 (2026)", series: "G-Tune デスクトップ", year: 2026 },
    { name: "G-Tune DG-I5G60 (2025)", series: "G-Tune デスクトップ", year: 2025 },
    { name: "G-Tune DG-I7G60 (2025)", series: "G-Tune デスクトップ", year: 2025 },
    { name: "G-Tune FZ-I7G70 (2024)", series: "G-Tune デスクトップ", year: 2024 },
    { name: "G-Tune FZ-A9G90 (2024)", series: "G-Tune デスクトップ", year: 2024 },
    { name: "G-Tune EN-Z (2023)", series: "G-Tune デスクトップ", year: 2023 },
    { name: "G-Tune HM-B (2022)", series: "G-Tune デスクトップ", year: 2022 },
    // DAIV デスクトップ
    { name: "DAIV FW-A9G70 (2026)", series: "DAIV デスクトップ", year: 2026 },
    { name: "DAIV Z7-I9G70 (2025)", series: "DAIV デスクトップ", year: 2025 },
    { name: "DAIV Z7 (2024)", series: "DAIV デスクトップ", year: 2024 },
    { name: "DAIV Z7 (2023)", series: "DAIV デスクトップ", year: 2023 },
    // mouse デスクトップ
    { name: "mouse DT5-G (2025)", series: "mouse デスクトップ", year: 2025 },
    { name: "mouse DT5 (2024)", series: "mouse デスクトップ", year: 2024 },
    { name: "mouse SL5 (2024)", series: "mouse デスクトップ", year: 2024 },
  ],

  // ===== 富士通 =====
  "富士通": [
    { name: "LIFEBOOK UH (2025 春モデル)", series: "LIFEBOOK UH", year: 2025 },
    { name: "LIFEBOOK U9414/RW (2024)", series: "LIFEBOOK UH", year: 2024 },
    { name: "LIFEBOOK UH-X/H1 (2023)", series: "LIFEBOOK UH", year: 2023 },
    { name: "LIFEBOOK UH90/G2 (2022)", series: "LIFEBOOK UH", year: 2022 },
    { name: "LIFEBOOK UH90/F3 (2021)", series: "LIFEBOOK UH", year: 2021 },
    { name: "LIFEBOOK UH90/E3 (2020)", series: "LIFEBOOK UH", year: 2020 },
    { name: "LIFEBOOK UH-X (2019)", series: "LIFEBOOK UH", year: 2019 },
    { name: "LIFEBOOK UH90/C3 (2018)", series: "LIFEBOOK UH", year: 2018 },
    { name: "LIFEBOOK A7513/RW (2024)", series: "LIFEBOOK AH", year: 2024 },
    { name: "LIFEBOOK AH (2023 春モデル)", series: "LIFEBOOK AH", year: 2023 },
    { name: "LIFEBOOK AH53/G2 (2022)", series: "LIFEBOOK AH", year: 2022 },
    { name: "LIFEBOOK AH53/F3 (2021)", series: "LIFEBOOK AH", year: 2021 },
    { name: "LIFEBOOK AH53/E3 (2020)", series: "LIFEBOOK AH", year: 2020 },
    { name: "LIFEBOOK AH77/D3 (2019)", series: "LIFEBOOK AH", year: 2019 },
    { name: "LIFEBOOK AH77/C2 (2018)", series: "LIFEBOOK AH", year: 2018 },
    { name: "LIFEBOOK AH77/B1 (2017)", series: "LIFEBOOK AH", year: 2017 },
    { name: "LIFEBOOK CH90/H3 (2023)", series: "LIFEBOOK CH", year: 2023 },
    { name: "LIFEBOOK CH75/G2 (2022)", series: "LIFEBOOK CH", year: 2022 },
  ],

  // ===== NEC =====
  NEC: [
    { name: "LAVIE NEXTREME NEXT (2025)", series: "LAVIE NEXTREME", year: 2025 },
    { name: "LAVIE NEXTREME Carbon (2024)", series: "LAVIE NEXTREME", year: 2024 },
    { name: "LAVIE N15 (2024 春モデル)", series: "LAVIE N", year: 2024 },
    { name: "LAVIE N15 (2023 春モデル)", series: "LAVIE N", year: 2023 },
    { name: "LAVIE N15 (2022 春モデル)", series: "LAVIE N", year: 2022 },
    { name: "LAVIE N1585 (2021)", series: "LAVIE N", year: 2021 },
    { name: "LAVIE N1575 (2020)", series: "LAVIE N", year: 2020 },
    { name: "LAVIE Note Standard NS700 (2019)", series: "LAVIE N", year: 2019 },
    { name: "LAVIE Note Standard NS700 (2018)", series: "LAVIE N", year: 2018 },
    { name: "LAVIE Note Standard NS700 (2017)", series: "LAVIE N", year: 2017 },
    { name: "LAVIE Direct N13 Slim (2024)", series: "LAVIE N13", year: 2024 },
    { name: "LAVIE N13 (2023)", series: "LAVIE N13", year: 2023 },
    { name: "LAVIE Pro Mobile PM (2024)", series: "LAVIE Pro Mobile", year: 2024 },
    { name: "LAVIE Pro Mobile PM (2023)", series: "LAVIE Pro Mobile", year: 2023 },
    { name: "LAVIE Pro Mobile PM750 (2022)", series: "LAVIE Pro Mobile", year: 2022 },
    { name: "LAVIE Pro Mobile PM750 (2021)", series: "LAVIE Pro Mobile", year: 2021 },
    { name: "LAVIE Pro Mobile PM750 (2020)", series: "LAVIE Pro Mobile", year: 2020 },
    { name: "LAVIE Note Mobile NM750 (2019)", series: "LAVIE Pro Mobile", year: 2019 },
  ],

  // ===== Dynabook (東芝) =====
  "Dynabook (東芝)": [
    { name: "GZ/HY (2024)", series: "GZ (軽量モバイル)", year: 2024 },
    { name: "GZ/HW (2023)", series: "GZ (軽量モバイル)", year: 2023 },
    { name: "GZ/HV (2022)", series: "GZ (軽量モバイル)", year: 2022 },
    { name: "GZ/HU (2021)", series: "GZ (軽量モバイル)", year: 2021 },
    { name: "GZ/HP (2020)", series: "GZ (軽量モバイル)", year: 2020 },
    { name: "G83/M (2019)", series: "GZ (軽量モバイル)", year: 2019 },
    { name: "RZ/HV (2024)", series: "RZ (プレミアム)", year: 2024 },
    { name: "RZ/MV (2023)", series: "RZ (プレミアム)", year: 2023 },
    { name: "AZ/HV (2024)", series: "AZ (スタンダード)", year: 2024 },
    { name: "AZ/MV (2023)", series: "AZ (スタンダード)", year: 2023 },
    { name: "AZ/HU (2022)", series: "AZ (スタンダード)", year: 2022 },
    { name: "CZ/HV (2024)", series: "CZ (スタンダード)", year: 2024 },
    { name: "CZ/MV (2023)", series: "CZ (スタンダード)", year: 2023 },
    { name: "T75/G (2019)", series: "旧モデル (東芝)", year: 2019 },
    { name: "T65/F (2018)", series: "旧モデル (東芝)", year: 2018 },
    { name: "T75/D (2017)", series: "旧モデル (東芝)", year: 2017 },
    { name: "T55/C (2016)", series: "旧モデル (東芝)", year: 2016 },
  ],

  // ===== Panasonic =====
  Panasonic: [
    // Let's note FV
    { name: "Let's note FV5 (2025 春)", series: "Let's note FV", year: 2025 },
    { name: "Let's note FV4 (2024 春)", series: "Let's note FV", year: 2024 },
    { name: "Let's note FV3 (2023 春)", series: "Let's note FV", year: 2023 },
    { name: "Let's note FV (2022 春)", series: "Let's note FV", year: 2022 },
    // Let's note SR
    { name: "Let's note SR5 (2025 春)", series: "Let's note SR", year: 2025 },
    { name: "Let's note SR4 (2024 春)", series: "Let's note SR", year: 2024 },
    { name: "Let's note SR3 (2023 春)", series: "Let's note SR", year: 2023 },
    // Let's note SV
    { name: "Let's note SV4 (2024)", series: "Let's note SV", year: 2024 },
    { name: "Let's note SV3 (2023)", series: "Let's note SV", year: 2023 },
    { name: "Let's note SV2 (2022)", series: "Let's note SV", year: 2022 },
    { name: "Let's note SV1 (2021)", series: "Let's note SV", year: 2021 },
    { name: "Let's note SV9 (2020)", series: "Let's note SV", year: 2020 },
    { name: "Let's note SV8 (2019)", series: "Let's note SV", year: 2019 },
    { name: "Let's note SV7 (2018)", series: "Let's note SV", year: 2018 },
    // Let's note QV/RZ
    { name: "Let's note QV1 (2021)", series: "Let's note その他", year: 2021 },
    { name: "Let's note RZ8 (2019)", series: "Let's note その他", year: 2019 },
    { name: "Let's note RZ6 (2017)", series: "Let's note その他", year: 2017 },
    // Let's note LV/CF
    { name: "Let's note LV9 (2020)", series: "Let's note その他", year: 2020 },
    { name: "Let's note LV8 (2019)", series: "Let's note その他", year: 2019 },
    { name: "Let's note LV7 (2018)", series: "Let's note その他", year: 2018 },
    { name: "Let's note CF-XZ6 (2017)", series: "Let's note その他", year: 2017 },
  ],

  // ===== Microsoft =====
  Microsoft: [
    { name: "Surface Laptop 7 (13.8型)", series: "Surface Laptop", year: 2024 },
    { name: "Surface Laptop 7 (15型)", series: "Surface Laptop", year: 2024 },
    { name: "Surface Laptop 6 (13.5型)", series: "Surface Laptop", year: 2024 },
    { name: "Surface Laptop 5 (13.5型)", series: "Surface Laptop", year: 2022 },
    { name: "Surface Laptop 5 (15型)", series: "Surface Laptop", year: 2022 },
    { name: "Surface Laptop 4 (13.5型)", series: "Surface Laptop", year: 2021 },
    { name: "Surface Laptop 4 (15型)", series: "Surface Laptop", year: 2021 },
    { name: "Surface Laptop 3 (13.5型)", series: "Surface Laptop", year: 2019 },
    { name: "Surface Laptop 3 (15型)", series: "Surface Laptop", year: 2019 },
    { name: "Surface Laptop 2 (13.5型)", series: "Surface Laptop", year: 2018 },
    { name: "Surface Laptop (初代)", series: "Surface Laptop", year: 2017 },
    { name: "Surface Laptop Go 3", series: "Surface Laptop Go", year: 2023 },
    { name: "Surface Laptop Go 2", series: "Surface Laptop Go", year: 2022 },
    { name: "Surface Laptop Go (初代)", series: "Surface Laptop Go", year: 2020 },
    { name: "Surface Laptop Studio 2", series: "Surface Laptop Studio", year: 2023 },
    { name: "Surface Laptop Studio (初代)", series: "Surface Laptop Studio", year: 2021 },
    { name: "Surface Pro 11", series: "Surface Pro", year: 2024 },
    { name: "Surface Pro 10", series: "Surface Pro", year: 2024 },
    { name: "Surface Pro 9", series: "Surface Pro", year: 2022 },
    { name: "Surface Pro 8", series: "Surface Pro", year: 2021 },
    { name: "Surface Pro 7+", series: "Surface Pro", year: 2021 },
    { name: "Surface Pro 7", series: "Surface Pro", year: 2019 },
    { name: "Surface Pro 6", series: "Surface Pro", year: 2018 },
    { name: "Surface Pro (2017)", series: "Surface Pro", year: 2017 },
    { name: "Surface Pro 4", series: "Surface Pro", year: 2016 },
    { name: "Surface Book 3 (13.5型)", series: "Surface Book", year: 2020 },
    { name: "Surface Book 2 (13.5型)", series: "Surface Book", year: 2017 },
  ],

  // ===== ドスパラ (GALLERIA) =====
  "ドスパラ (GALLERIA)": [
    // GALLERIA ゲーミングデスクトップ
    { name: "GALLERIA XA7C-R50 (RTX 5090)", series: "GALLERIA デスクトップ", year: 2025 },
    { name: "GALLERIA XA7C-R58 (RTX 5080)", series: "GALLERIA デスクトップ", year: 2025 },
    { name: "GALLERIA XA7C-R57T (RTX 5070 Ti)", series: "GALLERIA デスクトップ", year: 2025 },
    { name: "GALLERIA XA7C-R57 (RTX 5070)", series: "GALLERIA デスクトップ", year: 2025 },
    { name: "GALLERIA XA5C-R56 (RTX 5060)", series: "GALLERIA デスクトップ", year: 2025 },
    { name: "GALLERIA XA7C-R49 (RTX 4090)", series: "GALLERIA デスクトップ", year: 2024 },
    { name: "GALLERIA XA7C-R48S (RTX 4080 SUPER)", series: "GALLERIA デスクトップ", year: 2024 },
    { name: "GALLERIA XA7C-R47TS (RTX 4070 Ti SUPER)", series: "GALLERIA デスクトップ", year: 2024 },
    { name: "GALLERIA XA7C-R47T (RTX 4070 Ti)", series: "GALLERIA デスクトップ", year: 2023 },
    { name: "GALLERIA XA7C-R47 (RTX 4070)", series: "GALLERIA デスクトップ", year: 2023 },
    { name: "GALLERIA XA7C-R46T (RTX 4060 Ti)", series: "GALLERIA デスクトップ", year: 2023 },
    { name: "GALLERIA RM5C-R46 (RTX 4060)", series: "GALLERIA デスクトップ", year: 2023 },
    { name: "GALLERIA XA7C-R37 (RTX 3070)", series: "GALLERIA デスクトップ", year: 2022 },
    { name: "GALLERIA XA7C-R36 (RTX 3060)", series: "GALLERIA デスクトップ", year: 2021 },
    { name: "GALLERIA XA7C-R36T (RTX 3060 Ti)", series: "GALLERIA デスクトップ", year: 2021 },
    // Magnate 一般向け
    { name: "Magnate IM (第14世代)", series: "Magnate", year: 2024 },
    { name: "Magnate MH (第14世代)", series: "Magnate", year: 2024 },
    { name: "Magnate MV (第13世代)", series: "Magnate", year: 2023 },
    { name: "Magnate IM (第12世代)", series: "Magnate", year: 2022 },
    // raytrek クリエイター
    { name: "raytrek 4CXFi (RTX 4070)", series: "raytrek", year: 2024 },
    { name: "raytrek 4CXVi (RTX 4060 Ti)", series: "raytrek", year: 2023 },
    // GALLERIA ノートPC
    { name: "GALLERIA XL7C-R46H (15.6型)", series: "GALLERIA ノートPC", year: 2024 },
    { name: "GALLERIA XL7C-R36H (15.6型)", series: "GALLERIA ノートPC", year: 2023 },
    { name: "GALLERIA XL7C-R36 (15.6型)", series: "GALLERIA ノートPC", year: 2022 },
  ],

  // ===== パソコン工房 (LEVEL∞) =====
  "パソコン工房 (LEVEL∞)": [
    // LEVEL∞ ゲーミングデスクトップ
    { name: "LEVEL∞ R-Class (RTX 5090)", series: "LEVEL∞ デスクトップ", year: 2025 },
    { name: "LEVEL∞ R-Class (RTX 5080)", series: "LEVEL∞ デスクトップ", year: 2025 },
    { name: "LEVEL∞ R-Class (RTX 5070)", series: "LEVEL∞ デスクトップ", year: 2025 },
    { name: "LEVEL∞ R-Class (RTX 5060)", series: "LEVEL∞ デスクトップ", year: 2025 },
    { name: "LEVEL∞ R-Class (RTX 4090)", series: "LEVEL∞ デスクトップ", year: 2024 },
    { name: "LEVEL∞ R-Class (RTX 4080 SUPER)", series: "LEVEL∞ デスクトップ", year: 2024 },
    { name: "LEVEL∞ R-Class (RTX 4070 Ti SUPER)", series: "LEVEL∞ デスクトップ", year: 2024 },
    { name: "LEVEL∞ R-Class (RTX 4070)", series: "LEVEL∞ デスクトップ", year: 2023 },
    { name: "LEVEL∞ R-Class (RTX 4060 Ti)", series: "LEVEL∞ デスクトップ", year: 2023 },
    { name: "LEVEL∞ R-Class (RTX 4060)", series: "LEVEL∞ デスクトップ", year: 2023 },
    { name: "LEVEL∞ M-Class ミニタワー (RTX 4060)", series: "LEVEL∞ デスクトップ", year: 2023 },
    { name: "LEVEL∞ R-Class (RTX 3060)", series: "LEVEL∞ デスクトップ", year: 2022 },
    // SENSE∞ クリエイター
    { name: "SENSE∞ F-Class ミドルタワー (RTX 4070 Ti SUPER)", series: "SENSE∞", year: 2025 },
    { name: "SENSE∞ R-Class (RTX 4070)", series: "SENSE∞", year: 2024 },
    // STYLE ビジネス
    { name: "STYLE∞ M-Class ミニタワー", series: "STYLE∞", year: 2024 },
    // ノートPC
    { name: "LEVEL∞ 15FX (RTX 4060)", series: "LEVEL∞ ノートPC", year: 2024 },
    { name: "LEVEL∞ 16HP (RTX 4060)", series: "LEVEL∞ ノートPC", year: 2023 },
  ],

  // ===== FRONTIER =====
  FRONTIER: [
    // ゲーミングデスクトップ
    { name: "FRGAG-B860/WSA (RTX 5070 Ti)", series: "FRONTIER デスクトップ", year: 2025 },
    { name: "FRGAG-B860/WS (RTX 5070)", series: "FRONTIER デスクトップ", year: 2025 },
    { name: "FRGKB650/B (RTX 5060 Ti)", series: "FRONTIER デスクトップ", year: 2025 },
    { name: "FRGAG-B760/WS (RTX 4070 Ti SUPER)", series: "FRONTIER デスクトップ", year: 2024 },
    { name: "FRGAG-B760/WSA (RTX 4070 SUPER)", series: "FRONTIER デスクトップ", year: 2024 },
    { name: "FRGXB760/WS (RTX 4060 Ti)", series: "FRONTIER デスクトップ", year: 2023 },
    { name: "FRGXB660/WS (RTX 3060)", series: "FRONTIER デスクトップ", year: 2022 },
  ],

  // ===== サイコム =====
  "サイコム": [
    // G-Master ゲーミング
    { name: "G-Master Velox II Intel Edition (2025)", series: "G-Master", year: 2025 },
    { name: "G-Master Velox II AMD Edition (2025)", series: "G-Master", year: 2025 },
    { name: "G-Master Spear X870E (2025)", series: "G-Master", year: 2025 },
    { name: "G-Master Spear Z890 (2025)", series: "G-Master", year: 2025 },
    { name: "G-Master Luminous Z790 (2024)", series: "G-Master", year: 2024 },
    { name: "G-Master Spear Z790 (2024)", series: "G-Master", year: 2024 },
    { name: "G-Master Spear X670E (2023)", series: "G-Master", year: 2023 },
    // Aqua-Master 水冷
    { name: "Aqua-Master X870E (2025)", series: "Aqua-Master", year: 2025 },
    { name: "Aqua-Master Z890 (2025)", series: "Aqua-Master", year: 2025 },
    { name: "Aqua-Master X670E (2024)", series: "Aqua-Master", year: 2024 },
    { name: "Aqua-Master Z790 (2024)", series: "Aqua-Master", year: 2024 },
  ],

  // ===== その他 (手動入力推奨) =====
  "その他": [],
};

export function getModelsForManufacturer(manufacturer: string): { series: string; models: ModelEntry[] }[] {
  const models = MODEL_CATALOG[manufacturer];
  if (!models || models.length === 0) return [];

  const grouped = new Map<string, ModelEntry[]>();
  for (const m of models) {
    const list = grouped.get(m.series) || [];
    list.push(m);
    grouped.set(m.series, list);
  }

  return Array.from(grouped.entries()).map(([series, models]) => ({ series, models }));
}
