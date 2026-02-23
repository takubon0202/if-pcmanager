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
    tags: ["4k", "usb-c", "office", "design"],
  },
  {
    id: "mon-2",
    category: "monitor",
    name: "LG 27GP850-B 27インチ WQHD 165Hz",
    brand: "LG",
    price: 44800,
    url: null,
    specs: { サイズ: "27インチ", 解像度: "WQHD (2560x1440)", パネル: "Nano IPS", リフレッシュレート: "165Hz", 接続: "HDMI / DisplayPort" },
    tags: ["gaming", "high-refresh", "wqhd"],
  },
  {
    id: "mon-3",
    category: "monitor",
    name: "BenQ GW2480 23.8インチ FHD",
    brand: "BenQ",
    price: 16800,
    url: null,
    specs: { サイズ: "23.8インチ", 解像度: "FHD (1920x1080)", パネル: "IPS", リフレッシュレート: "60Hz", 接続: "HDMI / VGA / DisplayPort" },
    tags: ["budget", "office", "fhd"],
  },
  {
    id: "mon-4",
    category: "monitor",
    name: "ASUS ProArt PA278QV 27インチ WQHD",
    brand: "ASUS",
    price: 42800,
    url: null,
    specs: { サイズ: "27インチ", 解像度: "WQHD (2560x1440)", パネル: "IPS", リフレッシュレート: "75Hz", 接続: "HDMI / DisplayPort / USB-C" },
    tags: ["design", "color-accurate", "wqhd"],
  },
  {
    id: "mon-5",
    category: "monitor",
    name: "LG 34WN80C-B 34インチ ウルトラワイド",
    brand: "LG",
    price: 59800,
    url: null,
    specs: { サイズ: "34インチ", 解像度: "UWQHD (3440x1440)", パネル: "IPS", リフレッシュレート: "60Hz", 接続: "USB-C / HDMI" },
    tags: ["ultrawide", "usb-c", "office", "programming"],
  },

  // ── Keyboard ─────────────────────────────────────────────────────────────
  {
    id: "kb-1",
    category: "keyboard",
    name: "Logicool MX Keys S",
    brand: "Logicool",
    price: 16800,
    url: null,
    specs: { 接続: "Bluetooth / USB", キー配列: "JIS", タイプ: "パンタグラフ", バックライト: "あり" },
    tags: ["wireless", "office", "quiet"],
  },
  {
    id: "kb-2",
    category: "keyboard",
    name: "REALFORCE R3 テンキーレス",
    brand: "東プレ",
    price: 33000,
    url: null,
    specs: { 接続: "Bluetooth / USB", キー配列: "JIS", タイプ: "静電容量無接点", 荷重: "45g" },
    tags: ["premium", "programming", "quiet"],
  },
  {
    id: "kb-3",
    category: "keyboard",
    name: "Razer BlackWidow V4 75%",
    brand: "Razer",
    price: 22800,
    url: null,
    specs: { 接続: "USB有線", キー配列: "JIS 75%", タイプ: "メカニカル (Orange)", バックライト: "RGB" },
    tags: ["gaming", "mechanical", "rgb"],
  },
  {
    id: "kb-4",
    category: "keyboard",
    name: "Logicool K380",
    brand: "Logicool",
    price: 3980,
    url: null,
    specs: { 接続: "Bluetooth", キー配列: "JIS", タイプ: "メンブレン", バックライト: "なし" },
    tags: ["budget", "wireless", "compact"],
  },
  {
    id: "kb-5",
    category: "keyboard",
    name: "Keychron K8 Pro JIS",
    brand: "Keychron",
    price: 14800,
    url: null,
    specs: { 接続: "Bluetooth / USB-C", キー配列: "JIS TKL", タイプ: "メカニカル (Gateron)", バックライト: "RGB" },
    tags: ["mechanical", "wireless", "programming"],
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
    tags: ["gaming", "lightweight", "wired"],
  },
  {
    id: "ms-3",
    category: "mouse",
    name: "Logicool G PRO X SUPERLIGHT 2",
    brand: "Logicool",
    price: 18800,
    url: null,
    specs: { 接続: "LIGHTSPEED ワイヤレス", センサー: "32000 DPI", 重量: "60g", バッテリー: "最大95時間" },
    tags: ["gaming", "wireless", "lightweight"],
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
    tags: ["wireless", "meeting", "anc", "office"],
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
      id: "size",
      label: "画面サイズの好みは？",
      options: [
        { id: "24", label: '24インチ前後', desc: "省スペース" },
        { id: "27", label: '27インチ前後', desc: "バランス型" },
        { id: "32+", label: '32インチ以上・ウルトラワイド', desc: "広い作業領域" },
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
    const size = answers["size"]?.[0];
    const budget = answers["budget"]?.[0];

    if (purpose && item.tags.includes(purpose)) score += 30;
    if (purpose === "gaming" && item.tags.includes("high-refresh")) score += 20;
    if (purpose === "design" && item.tags.includes("color-accurate")) score += 20;
    if (purpose === "programming" && item.tags.includes("ultrawide")) score += 15;

    const sizeVal = item.specs["サイズ"] ?? "";
    const sizeNum = parseFloat(sizeVal);
    if (size === "24" && sizeNum >= 23 && sizeNum < 26) score += 15;
    if (size === "27" && sizeNum >= 26 && sizeNum < 30) score += 15;
    if (size === "32+" && sizeNum >= 30) score += 15;

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
      id: "type",
      label: "キータイプの好みは？",
      options: [
        { id: "quiet", label: "静音・薄型", desc: "パンタグラフ等" },
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
    const type = answers["type"]?.[0];
    const conn = answers["connection"]?.[0];
    const budget = answers["budget"]?.[0];

    if (purpose && item.tags.includes(purpose)) score += 25;
    if (type === "quiet" && item.tags.includes("quiet")) score += 20;
    if (type === "mechanical" && item.tags.includes("mechanical")) score += 20;
    if (conn === "wireless" && item.tags.includes("wireless")) score += 15;
    if (conn === "wired" && !item.tags.includes("wireless")) score += 15;

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
    const conn = answers["connection"]?.[0];
    const weight = answers["weight"]?.[0];
    const budget = answers["budget"]?.[0];

    if (purpose && item.tags.includes(purpose)) score += 25;
    if (conn === "wireless" && item.tags.includes("wireless")) score += 15;
    if (conn === "wired" && item.tags.includes("wired")) score += 15;

    const weightVal = parseInt(item.specs["重量"] ?? "100");
    if (weight === "lightweight" && weightVal < 80) score += 20;
    if (weight === "normal" && weightVal >= 80) score += 15;

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
      id: "anc",
      label: "ノイズキャンセリングは必要？",
      options: [
        { id: "yes", label: "必要", desc: "外部ノイズを遮断" },
        { id: "no", label: "不要", desc: "パッシブでOK" },
        { id: "any", label: "どちらでも" },
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
    const anc = answers["anc"]?.[0];
    const conn = answers["connection"]?.[0];
    const budget = answers["budget"]?.[0];

    if (purpose && item.tags.includes(purpose)) score += 25;
    if (anc === "yes" && item.tags.includes("anc")) score += 20;
    if (anc === "no" && !item.tags.includes("anc")) score += 10;
    if (conn === "wireless" && item.tags.includes("wireless")) score += 15;
    if (conn === "wired" && item.tags.includes("wired")) score += 15;

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
