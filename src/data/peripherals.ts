import type {
  PeripheralItem,
  PeripheralFlowConfig,
} from "@/types/peripheral";

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

export const PERIPHERAL_CATALOG: PeripheralItem[] = [
  // ── Monitor ──────────────────────────────────────────────────────────────
  {
    id: "mon-1",
    category: "monitor",
    name: "Dell S2722QC 27インチ 4K USB-C",
    brand: "Dell",
    price: 39800,
    url: null,
    specs: { サイズ: "27インチ", 解像度: "4K (3840x2160)", パネル: "IPS", リフレッシュレート: "60Hz", 接続: "USB-C / HDMI" },
    tags: ["4k", "usb-c", "office", "design", "ips", "adjustable-stand", "vesa"],
  },
  {
    id: "mon-2",
    category: "monitor",
    name: "LG 27GP850-B 27インチ WQHD 165Hz",
    brand: "LG",
    price: 44800,
    url: null,
    specs: { サイズ: "27インチ", 解像度: "WQHD (2560x1440)", パネル: "Nano IPS", リフレッシュレート: "165Hz", 接続: "HDMI / DisplayPort" },
    tags: ["gaming", "high-refresh", "wqhd", "ips", "adjustable-stand", "vesa"],
  },
  {
    id: "mon-3",
    category: "monitor",
    name: "BenQ GW2480 23.8インチ FHD",
    brand: "BenQ",
    price: 16800,
    url: null,
    specs: { サイズ: "23.8インチ", 解像度: "FHD (1920x1080)", パネル: "IPS", リフレッシュレート: "60Hz", 接続: "HDMI / VGA / DisplayPort" },
    tags: ["budget", "office", "fhd", "ips", "vesa"],
  },
  {
    id: "mon-4",
    category: "monitor",
    name: "ASUS ProArt PA278QV 27インチ WQHD",
    brand: "ASUS",
    price: 42800,
    url: null,
    specs: { サイズ: "27インチ", 解像度: "WQHD (2560x1440)", パネル: "IPS", リフレッシュレート: "75Hz", 接続: "HDMI / DisplayPort / USB-C" },
    tags: ["design", "color-accurate", "wqhd", "ips", "adjustable-stand", "vesa"],
  },
  {
    id: "mon-5",
    category: "monitor",
    name: "LG 34WN80C-B 34インチ ウルトラワイド",
    brand: "LG",
    price: 59800,
    url: null,
    specs: { サイズ: "34インチ", 解像度: "UWQHD (3440x1440)", パネル: "IPS", リフレッシュレート: "60Hz", 接続: "USB-C / HDMI" },
    tags: ["ultrawide", "usb-c", "office", "programming", "ips", "vesa"],
  },

  // ── Keyboard ─────────────────────────────────────────────────────────────
  {
    id: "kb-1",
    category: "keyboard",
    name: "Logicool MX Keys S",
    brand: "Logicool",
    price: 16800,
    url: null,
    specs: { 接続: "Bluetooth / USB", キー配列: "JIS フルサイズ", タイプ: "パンタグラフ", バックライト: "あり" },
    tags: ["wireless", "office", "quiet", "fullsize", "backlight"],
  },
  {
    id: "kb-2",
    category: "keyboard",
    name: "REALFORCE R3 テンキーレス",
    brand: "東プレ",
    price: 33000,
    url: null,
    specs: { 接続: "Bluetooth / USB", キー配列: "JIS テンキーレス", タイプ: "静電容量無接点", 荷重: "45g" },
    tags: ["premium", "programming", "quiet", "wireless", "tkl"],
  },
  {
    id: "kb-3",
    category: "keyboard",
    name: "Razer BlackWidow V4 75%",
    brand: "Razer",
    price: 22800,
    url: null,
    specs: { 接続: "USB有線", キー配列: "JIS 75%", タイプ: "メカニカル (Orange)", バックライト: "RGB" },
    tags: ["gaming", "mechanical", "rgb", "wired", "compact"],
  },
  {
    id: "kb-4",
    category: "keyboard",
    name: "Logicool K380",
    brand: "Logicool",
    price: 3980,
    url: null,
    specs: { 接続: "Bluetooth", キー配列: "JIS コンパクト", タイプ: "メンブレン", バックライト: "なし" },
    tags: ["budget", "wireless", "compact"],
  },
  {
    id: "kb-5",
    category: "keyboard",
    name: "Keychron K8 Pro JIS",
    brand: "Keychron",
    price: 14800,
    url: null,
    specs: { 接続: "Bluetooth / USB-C", キー配列: "JIS テンキーレス", タイプ: "メカニカル (Gateron)", バックライト: "RGB" },
    tags: ["mechanical", "wireless", "programming", "tkl", "rgb"],
  },

  // ── Mouse ────────────────────────────────────────────────────────────────
  {
    id: "ms-1",
    category: "mouse",
    name: "Logicool MX Master 3S",
    brand: "Logicool",
    price: 14800,
    url: null,
    specs: { 接続: "Bluetooth / USB", センサー: "8000 DPI", 重量: "141g", バッテリー: "最大70日" },
    tags: ["wireless", "office", "ergonomic"],
  },
  {
    id: "ms-2",
    category: "mouse",
    name: "Razer DeathAdder V3",
    brand: "Razer",
    price: 11800,
    url: null,
    specs: { 接続: "USB有線", センサー: "30000 DPI", 重量: "59g", ボタン: "5" },
    tags: ["gaming", "lightweight", "wired", "high-dpi"],
  },
  {
    id: "ms-3",
    category: "mouse",
    name: "Logicool G PRO X SUPERLIGHT 2",
    brand: "Logicool",
    price: 18800,
    url: null,
    specs: { 接続: "LIGHTSPEED ワイヤレス", センサー: "32000 DPI", 重量: "60g", バッテリー: "最大95時間" },
    tags: ["gaming", "wireless", "lightweight", "high-dpi"],
  },
  {
    id: "ms-4",
    category: "mouse",
    name: "Logicool M750",
    brand: "Logicool",
    price: 4980,
    url: null,
    specs: { 接続: "Bluetooth / USB", センサー: "4000 DPI", 重量: "101g", バッテリー: "最大24ヶ月" },
    tags: ["budget", "wireless", "office"],
  },
  {
    id: "ms-5",
    category: "mouse",
    name: "Apple Magic Mouse",
    brand: "Apple",
    price: 13800,
    url: null,
    specs: { 接続: "Bluetooth", センサー: "光学", 重量: "99g", 対応: "macOS" },
    tags: ["mac", "wireless", "office"],
  },

  // ── Headset ──────────────────────────────────────────────────────────────
  {
    id: "hs-1",
    category: "headset",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    price: 44000,
    url: null,
    specs: { タイプ: "オーバーイヤー", 接続: "Bluetooth / 3.5mm", ノイズキャンセリング: "あり", マイク: "内蔵", バッテリー: "最大30時間" },
    tags: ["wireless", "anc", "premium", "meeting"],
  },
  {
    id: "hs-2",
    category: "headset",
    name: "Razer BlackShark V2 X",
    brand: "Razer",
    price: 6480,
    url: null,
    specs: { タイプ: "オーバーイヤー", 接続: "USB / 3.5mm", ノイズキャンセリング: "パッシブ", マイク: "着脱式", 重量: "240g" },
    tags: ["gaming", "budget", "wired"],
  },
  {
    id: "hs-3",
    category: "headset",
    name: "Jabra Evolve2 55",
    brand: "Jabra",
    price: 28800,
    url: null,
    specs: { タイプ: "オンイヤー", 接続: "Bluetooth / USB-C", ノイズキャンセリング: "あり", マイク: "ブームマイク", バッテリー: "最大16時間" },
    tags: ["wireless", "meeting", "anc", "office", "boom-mic"],
  },
  {
    id: "hs-4",
    category: "headset",
    name: "HyperX Cloud III Wireless",
    brand: "HyperX",
    price: 16800,
    url: null,
    specs: { タイプ: "オーバーイヤー", 接続: "2.4GHz ワイヤレス", ノイズキャンセリング: "パッシブ", マイク: "着脱式", バッテリー: "最大120時間" },
    tags: ["gaming", "wireless", "long-battery"],
  },
  {
    id: "hs-5",
    category: "headset",
    name: "Apple AirPods Max",
    brand: "Apple",
    price: 84800,
    url: null,
    specs: { タイプ: "オーバーイヤー", 接続: "Bluetooth", ノイズキャンセリング: "あり", マイク: "内蔵", バッテリー: "最大20時間" },
    tags: ["wireless", "anc", "premium", "mac"],
  },

  // ── Webcam (upsell only) ─────────────────────────────────────────────────
  {
    id: "wc-1",
    category: "webcam",
    name: "Logicool C920n HD Pro",
    brand: "Logicool",
    price: 7480,
    url: null,
    specs: { 解像度: "FHD 1080p", フレームレート: "30fps", マイク: "ステレオ内蔵", 接続: "USB" },
    tags: ["fhd", "budget", "meeting"],
  },
  {
    id: "wc-2",
    category: "webcam",
    name: "Logicool Brio 500",
    brand: "Logicool",
    price: 15800,
    url: null,
    specs: { 解像度: "FHD 1080p", フレームレート: "60fps", マイク: "内蔵", 接続: "USB-C", 補正: "自動フレーミング" },
    tags: ["fhd", "usb-c", "meeting", "auto-frame"],
  },
  {
    id: "wc-3",
    category: "webcam",
    name: "Anker PowerConf C200",
    brand: "Anker",
    price: 5990,
    url: null,
    specs: { 解像度: "2K (2560x1440)", フレームレート: "30fps", マイク: "ステレオ内蔵", 接続: "USB" },
    tags: ["2k", "budget", "meeting"],
  },
];

// ---------------------------------------------------------------------------
// Flow configurations per category
// ---------------------------------------------------------------------------

export const MONITOR_FLOW: PeripheralFlowConfig = {
  category: "monitor",
  title: "🖥 モニター提案",
  icon: "🖥",
  subtitle: "あなたにぴったりのモニターを見つけます",
  webcamUpsell: true,
  questions: [
    {
      id: "purpose",
      label: "主な用途は？",
      options: [
        { id: "office", label: "オフィスワーク", icon: "📊" },
        { id: "design", label: "デザイン・映像編集", icon: "🎨" },
        { id: "gaming", label: "ゲーム", icon: "🎮" },
        { id: "programming", label: "プログラミング", icon: "👨‍💻" },
      ],
    },
    {
      id: "resolution",
      label: "希望の解像度は？",
      options: [
        { id: "fhd", label: "FHD (1920x1080)", desc: "コスパ重視" },
        { id: "wqhd", label: "WQHD (2560x1440)", desc: "バランス型" },
        { id: "4k", label: "4K (3840x2160)", desc: "高精細" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "size",
      label: "画面サイズの好みは？",
      options: [
        { id: "24", label: "24インチ前後", desc: "省スペース" },
        { id: "27", label: "27インチ前後", desc: "バランス型" },
        { id: "32+", label: "32インチ以上・ウルトラワイド", desc: "広い作業領域" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "refreshRate",
      label: "リフレッシュレートの希望は？",
      options: [
        { id: "standard", label: "60Hz（標準）", desc: "オフィス・映像編集向き" },
        { id: "high", label: "120Hz以上", desc: "ゲーム・滑らか表示" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "panel",
      label: "パネルの種類は？",
      options: [
        { id: "ips", label: "IPS", desc: "色再現◎・広視野角" },
        { id: "va", label: "VA", desc: "コントラスト◎" },
        { id: "oled", label: "OLED", desc: "有機EL・黒が深い" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "connectivity",
      label: "重視する接続端子は？",
      options: [
        { id: "usb-c", label: "USB-C", desc: "ケーブル1本で映像+給電", icon: "🔌" },
        { id: "hdmi", label: "HDMI", desc: "汎用性が高い" },
        { id: "dp", label: "DisplayPort", desc: "高リフレッシュ対応" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "ergonomics",
      label: "スタンド調整・設置方法の希望は？",
      options: [
        { id: "adjustable", label: "高さ・角度調整あり", desc: "長時間作業に最適" },
        { id: "vesa", label: "VESA対応（モニターアーム）", desc: "デスクを広く使える" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "budget",
      label: "予算は？",
      options: [
        { id: "low", label: "〜2万円", desc: "コスパ重視" },
        { id: "mid", label: "2〜4万円", desc: "バランス型" },
        { id: "high", label: "4万円以上", desc: "高品質" },
      ],
    },
  ],
  scoreFn: (item, answers) => {
    let score = 0;
    const purpose = answers["purpose"]?.[0];
    const resolution = answers["resolution"]?.[0];
    const size = answers["size"]?.[0];
    const refreshRate = answers["refreshRate"]?.[0];
    const panel = answers["panel"]?.[0];
    const connectivity = answers["connectivity"]?.[0];
    const ergonomics = answers["ergonomics"]?.[0];
    const budget = answers["budget"]?.[0];

    // Purpose (+30 base, +20 bonus)
    if (purpose && item.tags.includes(purpose)) score += 30;
    if (purpose === "gaming" && item.tags.includes("high-refresh")) score += 20;
    if (purpose === "design" && item.tags.includes("color-accurate")) score += 20;
    if (purpose === "programming" && item.tags.includes("ultrawide")) score += 15;

    // Resolution (+15)
    if (resolution && resolution !== "any") {
      if (resolution === "4k" && item.tags.includes("4k")) score += 15;
      if (resolution === "wqhd" && (item.tags.includes("wqhd") || item.tags.includes("ultrawide"))) score += 15;
      if (resolution === "fhd" && item.tags.includes("fhd")) score += 15;
    }

    // Size (+15)
    const sizeVal = item.specs["サイズ"] ?? "";
    const sizeNum = parseFloat(sizeVal);
    if (size === "24" && sizeNum >= 23 && sizeNum < 26) score += 15;
    if (size === "27" && sizeNum >= 26 && sizeNum < 30) score += 15;
    if (size === "32+" && sizeNum >= 30) score += 15;

    // Refresh rate (+15)
    if (refreshRate && refreshRate !== "any") {
      const rrSpec = item.specs["リフレッシュレート"] ?? "";
      const rrNum = parseInt(rrSpec);
      if (refreshRate === "high" && rrNum >= 120) score += 15;
      if (refreshRate === "standard" && rrNum <= 75) score += 10;
    }

    // Panel (+10)
    if (panel && panel !== "any") {
      const panelSpec = (item.specs["パネル"] ?? "").toLowerCase();
      if (panel === "ips" && panelSpec.includes("ips")) score += 10;
      if (panel === "va" && panelSpec.includes("va")) score += 10;
      if (panel === "oled" && panelSpec.includes("oled")) score += 10;
    }

    // Connectivity (+10)
    if (connectivity && connectivity !== "any") {
      const connSpec = item.specs["接続"] ?? "";
      if (connectivity === "usb-c" && connSpec.includes("USB-C")) score += 10;
      if (connectivity === "hdmi" && connSpec.includes("HDMI")) score += 10;
      if (connectivity === "dp" && connSpec.includes("DisplayPort")) score += 10;
    }

    // Ergonomics (+10)
    if (ergonomics && ergonomics !== "any") {
      if (ergonomics === "adjustable" && item.tags.includes("adjustable-stand")) score += 10;
      if (ergonomics === "vesa" && item.tags.includes("vesa")) score += 10;
    }

    // Budget (+15)
    if (budget === "low" && item.price <= 20000) score += 15;
    if (budget === "mid" && item.price > 20000 && item.price <= 40000) score += 15;
    if (budget === "high" && item.price > 40000) score += 15;

    return score;
  },
};

export const KEYBOARD_FLOW: PeripheralFlowConfig = {
  category: "keyboard",
  title: "⌨️ キーボード提案",
  icon: "⌨️",
  subtitle: "あなたにぴったりのキーボードを見つけます",
  questions: [
    {
      id: "purpose",
      label: "主な用途は？",
      options: [
        { id: "office", label: "オフィスワーク", icon: "📊" },
        { id: "programming", label: "プログラミング", icon: "👨‍💻" },
        { id: "gaming", label: "ゲーム", icon: "🎮" },
      ],
    },
    {
      id: "layout",
      label: "キー配列・サイズは？",
      options: [
        { id: "full", label: "フルサイズ", desc: "テンキー付き" },
        { id: "tkl", label: "テンキーレス", desc: "省スペース" },
        { id: "compact", label: "コンパクト (60〜75%)", desc: "持ち運び向き" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "type",
      label: "打鍵感・静音性の好みは？",
      options: [
        { id: "quiet", label: "静音・薄型", desc: "パンタグラフ・静電容量等" },
        { id: "mechanical", label: "メカニカル", desc: "しっかりした打鍵感" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "connection",
      label: "接続方式は？",
      options: [
        { id: "wireless", label: "ワイヤレス", icon: "📡" },
        { id: "wired", label: "有線", icon: "🔌" },
        { id: "any", label: "どちらでも" },
      ],
    },
    {
      id: "backlight",
      label: "バックライトは必要？",
      options: [
        { id: "rgb", label: "RGB（光らせたい）", desc: "ゲーミング向き" },
        { id: "yes", label: "あり（白色等）", desc: "暗所作業に便利" },
        { id: "no", label: "不要", desc: "シンプル" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "os",
      label: "使用するOS・環境は？",
      options: [
        { id: "windows", label: "Windows", icon: "🪟" },
        { id: "mac", label: "Mac", icon: "🍎" },
        { id: "multi", label: "複数OS切替", desc: "マルチペアリング対応が便利" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "budget",
      label: "予算は？",
      options: [
        { id: "low", label: "〜5千円", desc: "コスパ重視" },
        { id: "mid", label: "1〜2万円", desc: "バランス型" },
        { id: "high", label: "2万円以上", desc: "高品質" },
      ],
    },
  ],
  scoreFn: (item, answers) => {
    let score = 0;
    const purpose = answers["purpose"]?.[0];
    const layout = answers["layout"]?.[0];
    const type = answers["type"]?.[0];
    const conn = answers["connection"]?.[0];
    const backlight = answers["backlight"]?.[0];
    const os = answers["os"]?.[0];
    const budget = answers["budget"]?.[0];

    // Purpose (+25)
    if (purpose && item.tags.includes(purpose)) score += 25;

    // Layout (+15)
    if (layout && layout !== "any") {
      const keyLayout = item.specs["キー配列"] ?? "";
      if (layout === "full" && (keyLayout.includes("フルサイズ") || item.tags.includes("fullsize"))) score += 15;
      if (layout === "tkl" && (keyLayout.includes("テンキーレス") || keyLayout.includes("TKL") || item.tags.includes("tkl"))) score += 15;
      if (layout === "compact" && (keyLayout.includes("75%") || keyLayout.includes("60%") || keyLayout.includes("コンパクト") || item.tags.includes("compact"))) score += 15;
    }

    // Switch feel / type (+20)
    if (type === "quiet" && item.tags.includes("quiet")) score += 20;
    if (type === "mechanical" && item.tags.includes("mechanical")) score += 20;

    // Connection (+15)
    if (conn === "wireless" && item.tags.includes("wireless")) score += 15;
    if (conn === "wired" && (item.tags.includes("wired") || !item.tags.includes("wireless"))) score += 15;

    // Backlight (+10)
    if (backlight && backlight !== "any") {
      const blSpec = item.specs["バックライト"] ?? "";
      if (backlight === "rgb" && (blSpec === "RGB" || item.tags.includes("rgb"))) score += 10;
      if (backlight === "yes" && (blSpec === "あり" || blSpec === "RGB" || item.tags.includes("backlight") || item.tags.includes("rgb"))) score += 10;
      if (backlight === "no" && (blSpec === "なし" || blSpec === "")) score += 10;
    }

    // OS / multi-device (+10)
    if (os && os !== "any") {
      const connSpec = item.specs["接続"] ?? "";
      const hasBluetooth = connSpec.includes("Bluetooth");
      if (os === "mac" && item.tags.includes("mac")) score += 10;
      if (os === "multi" && hasBluetooth && item.tags.includes("wireless")) score += 10;
      if (os === "windows") score += 5; // most keyboards work with Windows
    }

    // Budget (+15)
    if (budget === "low" && item.price <= 5000) score += 15;
    if (budget === "mid" && item.price > 5000 && item.price <= 20000) score += 15;
    if (budget === "high" && item.price > 20000) score += 15;

    return score;
  },
};

export const MOUSE_FLOW: PeripheralFlowConfig = {
  category: "mouse",
  title: "🖱️ マウス提案",
  icon: "🖱️",
  subtitle: "あなたにぴったりのマウスを見つけます",
  questions: [
    {
      id: "purpose",
      label: "主な用途は？",
      options: [
        { id: "office", label: "仕事・一般用途", icon: "📊" },
        { id: "gaming", label: "ゲーム", icon: "🎮" },
      ],
    },
    {
      id: "grip",
      label: "持ち方・形状の好みは？",
      options: [
        { id: "palm", label: "かぶせ持ち（大型）", desc: "手のひら全体でホールド" },
        { id: "claw", label: "つかみ持ち（中型）", desc: "指先で操作しやすい" },
        { id: "fingertip", label: "つまみ持ち（小型・軽量）", desc: "素早い操作向き" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "connection",
      label: "接続方式は？",
      options: [
        { id: "wireless", label: "ワイヤレス", icon: "📡" },
        { id: "wired", label: "有線", icon: "🔌" },
        { id: "any", label: "どちらでも" },
      ],
    },
    {
      id: "weight",
      label: "重さの好みは？",
      options: [
        { id: "lightweight", label: "軽量 (〜80g)", desc: "FPS向き" },
        { id: "normal", label: "標準 (80g〜)", desc: "安定感重視" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "dpi",
      label: "センサー感度（DPI）の方向性は？",
      options: [
        { id: "high", label: "高DPI（ゲーム・精密操作）", desc: "10000DPI以上" },
        { id: "standard", label: "標準（オフィス用途）", desc: "日常使いに十分" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "features",
      label: "重視する追加機能は？",
      options: [
        { id: "ergonomic", label: "エルゴノミクス設計", desc: "手首の負担を軽減" },
        { id: "sidebuttons", label: "サイドボタン・多ボタン", desc: "作業効率アップ" },
        { id: "long-battery", label: "長時間バッテリー", desc: "充電頻度を減らしたい" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "budget",
      label: "予算は？",
      options: [
        { id: "low", label: "〜5千円" },
        { id: "mid", label: "5千〜1.5万円" },
        { id: "high", label: "1.5万円以上" },
      ],
    },
  ],
  scoreFn: (item, answers) => {
    let score = 0;
    const purpose = answers["purpose"]?.[0];
    const grip = answers["grip"]?.[0];
    const conn = answers["connection"]?.[0];
    const weight = answers["weight"]?.[0];
    const dpi = answers["dpi"]?.[0];
    const features = answers["features"]?.[0];
    const budget = answers["budget"]?.[0];

    // Purpose (+25)
    if (purpose && item.tags.includes(purpose)) score += 25;

    // Grip preference (+10)
    if (grip && grip !== "any") {
      const weightVal = parseInt(item.specs["重量"] ?? "100");
      if (grip === "palm" && item.tags.includes("ergonomic")) score += 10;
      if (grip === "claw" && weightVal >= 60 && weightVal <= 110) score += 10;
      if (grip === "fingertip" && weightVal < 80) score += 10;
    }

    // Connection (+15)
    if (conn === "wireless" && item.tags.includes("wireless")) score += 15;
    if (conn === "wired" && (item.tags.includes("wired") || !item.tags.includes("wireless"))) score += 15;

    // Weight (+15)
    if (weight && weight !== "any") {
      const weightVal = parseInt(item.specs["重量"] ?? "100");
      if (weight === "lightweight" && weightVal < 80) score += 15;
      if (weight === "normal" && weightVal >= 80) score += 10;
    }

    // DPI (+10)
    if (dpi && dpi !== "any") {
      const dpiNum = parseInt(item.specs["センサー"] ?? "0");
      if (dpi === "high" && (dpiNum >= 10000 || item.tags.includes("high-dpi"))) score += 10;
      if (dpi === "standard" && dpiNum > 0 && dpiNum < 10000) score += 10;
    }

    // Features (+10)
    if (features && features !== "any") {
      if (features === "ergonomic" && item.tags.includes("ergonomic")) score += 10;
      if (features === "sidebuttons") {
        const btnNum = parseInt(item.specs["ボタン"] ?? "3");
        if (btnNum >= 5) score += 10;
      }
      if (features === "long-battery") {
        const battSpec = item.specs["バッテリー"] ?? "";
        const battNum = parseInt(battSpec);
        if (battNum >= 70 || battSpec.includes("ヶ月")) score += 10;
      }
    }

    // Budget (+15)
    if (budget === "low" && item.price <= 5000) score += 15;
    if (budget === "mid" && item.price > 5000 && item.price <= 15000) score += 15;
    if (budget === "high" && item.price > 15000) score += 15;

    return score;
  },
};

export const HEADSET_FLOW: PeripheralFlowConfig = {
  category: "headset",
  title: "🎧 ヘッドセット提案",
  icon: "🎧",
  subtitle: "あなたにぴったりのヘッドセットを見つけます",
  questions: [
    {
      id: "purpose",
      label: "主な用途は？",
      options: [
        { id: "meeting", label: "Web会議・通話", icon: "💬" },
        { id: "gaming", label: "ゲーム", icon: "🎮" },
        { id: "music", label: "音楽鑑賞", icon: "🎵" },
      ],
    },
    {
      id: "fit",
      label: "装着タイプの好みは？",
      options: [
        { id: "over-ear", label: "オーバーイヤー", desc: "耳を覆う・遮音性◎" },
        { id: "on-ear", label: "オンイヤー", desc: "軽量・コンパクト" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "anc",
      label: "ノイズキャンセリングは必要？",
      options: [
        { id: "yes", label: "必要", desc: "外部ノイズを遮断" },
        { id: "no", label: "不要", desc: "パッシブでOK" },
        { id: "any", label: "どちらでも" },
      ],
    },
    {
      id: "mic",
      label: "マイク品質の優先度は？",
      options: [
        { id: "high", label: "高品質マイク重視", desc: "会議・配信用" },
        { id: "standard", label: "標準でOK", desc: "通常利用" },
        { id: "any", label: "こだわらない" },
      ],
    },
    {
      id: "connection",
      label: "接続方式は？",
      options: [
        { id: "wireless", label: "ワイヤレス", icon: "📡" },
        { id: "wired", label: "有線", icon: "🔌" },
        { id: "any", label: "どちらでも" },
      ],
    },
    {
      id: "battery",
      label: "バッテリー持ちの重視度は？",
      options: [
        { id: "long", label: "長時間（20時間以上）", desc: "出張・外出先でも安心" },
        { id: "normal", label: "標準で十分", desc: "自宅メイン利用" },
        { id: "any", label: "こだわらない（有線含む）" },
      ],
    },
    {
      id: "budget",
      label: "予算は？",
      options: [
        { id: "low", label: "〜1万円" },
        { id: "mid", label: "1〜3万円" },
        { id: "high", label: "3万円以上" },
      ],
    },
  ],
  scoreFn: (item, answers) => {
    let score = 0;
    const purpose = answers["purpose"]?.[0];
    const fit = answers["fit"]?.[0];
    const anc = answers["anc"]?.[0];
    const mic = answers["mic"]?.[0];
    const conn = answers["connection"]?.[0];
    const battery = answers["battery"]?.[0];
    const budget = answers["budget"]?.[0];

    // Purpose (+25)
    if (purpose && item.tags.includes(purpose)) score += 25;

    // Fit type (+10)
    if (fit && fit !== "any") {
      const typeSpec = item.specs["タイプ"] ?? "";
      if (fit === "over-ear" && typeSpec.includes("オーバーイヤー")) score += 10;
      if (fit === "on-ear" && typeSpec.includes("オンイヤー")) score += 10;
    }

    // ANC (+20)
    if (anc === "yes" && item.tags.includes("anc")) score += 20;
    if (anc === "no" && !item.tags.includes("anc")) score += 10;

    // Mic quality (+10)
    if (mic && mic !== "any") {
      const micSpec = item.specs["マイク"] ?? "";
      if (mic === "high" && (micSpec.includes("ブーム") || micSpec.includes("着脱") || item.tags.includes("boom-mic"))) score += 10;
      if (mic === "standard") score += 5;
    }

    // Connection (+15)
    if (conn === "wireless" && item.tags.includes("wireless")) score += 15;
    if (conn === "wired" && (item.tags.includes("wired") || !item.tags.includes("wireless"))) score += 15;

    // Battery life (+10)
    if (battery && battery !== "any") {
      const battSpec = item.specs["バッテリー"] ?? "";
      const battNum = parseInt(battSpec.replace(/[^0-9]/g, ""));
      if (battery === "long" && battNum >= 20) score += 10;
      if (battery === "long" && item.tags.includes("long-battery")) score += 5;
      if (battery === "normal" && battNum > 0) score += 5;
    }

    // Budget (+15)
    if (budget === "low" && item.price <= 10000) score += 15;
    if (budget === "mid" && item.price > 10000 && item.price <= 30000) score += 15;
    if (budget === "high" && item.price > 30000) score += 15;

    return score;
  },
};

export const PERIPHERAL_FLOWS: Record<string, PeripheralFlowConfig> = {
  monitor: MONITOR_FLOW,
  keyboard: KEYBOARD_FLOW,
  mouse: MOUSE_FLOW,
  headset: HEADSET_FLOW,
};
