import type {
  UserPcInput,
  DiagnosticReport,
  EstimatedSpecs,
  UsageRating,
  UsageCategory,
  ComponentScores,
  SoftwareComparison,
  BenchmarkResult,
  CourseCompatibility,
  CourseCheckItem,
} from "@/types/diagnostic";
import { estimateSpecs, cpuNameToScore } from "@/data/pc-models";
import { SOFTWARE_REQUIREMENTS } from "@/data/software-requirements";

const CURRENT_YEAR = new Date().getFullYear();

function resolveSpecs(input: UserPcInput): EstimatedSpecs {
  const purchaseYear = input.purchaseYear || CURRENT_YEAR - 3;
  const estimated = estimateSpecs(input.manufacturer, purchaseYear);
  const isEstimated =
    !input.cpu && !input.memoryGB && !input.storageGB &&
    (!input.storageType || input.storageType === "わからない") && !input.gpu;

  let cpuScore = estimated.cpuScore;
  let cpu = estimated.cpu;
  if (input.cpu) {
    cpu = input.cpu;
    const score = cpuNameToScore(input.cpu);
    if (score !== null) cpuScore = score;
  }

  return {
    cpu,
    cpuScore,
    memoryGB: input.memoryGB || estimated.memoryGB,
    storageType:
      input.storageType && input.storageType !== "わからない"
        ? input.storageType
        : estimated.storageType,
    storageGB: input.storageGB || estimated.storageGB,
    gpu: input.gpu || estimated.gpu,
    isEstimated,
  };
}

function rateUsage(
  category: UsageCategory,
  label: string,
  icon: string,
  specs: EstimatedSpecs,
  ageYears: number
): UsageRating {
  let score = 0;

  const requirements: Record<
    UsageCategory,
    { minCpu: number; minMemory: number; needsGpu: boolean; weight: number }
  > = {
    web: { minCpu: 20, minMemory: 4, needsGpu: false, weight: 0.6 },
    office: { minCpu: 25, minMemory: 8, needsGpu: false, weight: 0.7 },
    programming: { minCpu: 45, minMemory: 16, needsGpu: false, weight: 0.8 },
    design: { minCpu: 55, minMemory: 16, needsGpu: true, weight: 0.9 },
    video: { minCpu: 60, minMemory: 16, needsGpu: true, weight: 0.95 },
    gaming: { minCpu: 55, minMemory: 16, needsGpu: true, weight: 1.0 },
    ai: { minCpu: 65, minMemory: 32, needsGpu: true, weight: 1.0 },
  };

  const req = requirements[category];

  const cpuRatio = Math.min(specs.cpuScore / req.minCpu, 1.5);
  score += cpuRatio * 35;

  const memRatio = Math.min(specs.memoryGB / req.minMemory, 1.5);
  score += memRatio * 25;

  if (req.needsGpu) {
    const hasGpu =
      specs.gpu !== "" &&
      !specs.gpu.startsWith("内蔵") &&
      !specs.gpu.includes("Intel") &&
      !specs.gpu.includes("Iris");
    score += hasGpu ? 25 : 5;
  } else {
    score += 20;
  }

  const agePenalty = Math.min(ageYears * 3, 20);
  score -= agePenalty;

  if (specs.storageType === "SSD") {
    score += 10;
  } else if (specs.storageType === "HDD") {
    score -= 5;
  } else {
    score += 5;
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  let verdict: UsageRating["verdict"];
  let comment: string;

  if (score >= 75) {
    verdict = "快適";
    comment = "快適に使えます";
  } else if (score >= 55) {
    verdict = "問題なし";
    comment = "基本的に問題なく使えます";
  } else if (score >= 35) {
    verdict = "やや厳しい";
    comment = "動作が重くなる場面があるかもしれません";
  } else {
    verdict = "厳しい";
    comment = "スペック不足の可能性が高いです";
  }

  return { category, label, icon, score, verdict, comment };
}

function generateAdvice(
  specs: EstimatedSpecs,
  ageYears: number,
  issues: string[],
  usageRatings: UsageRating[]
): { advice: string[]; upgradeOptions: string[] } {
  const advice: string[] = [];
  const upgradeOptions: string[] = [];

  if (ageYears >= 7) {
    advice.push(
      `購入から約${ageYears}年経過。ハードウェアの寿命を考えると買い替えを検討してください`
    );
  } else if (ageYears >= 5) {
    advice.push(
      `購入から約${ageYears}年経過。まだ使えますが、不満が出てきたら買い替え時です`
    );
  } else if (ageYears >= 3) {
    advice.push(
      `購入から約${ageYears}年。まだまだ現役で使えます`
    );
  }

  if (specs.memoryGB <= 4) {
    advice.push("メモリ4GB以下は現在の用途では厳しい場合が多いです");
    upgradeOptions.push("メモリ増設（8GB以上推奨）");
  } else if (specs.memoryGB === 8) {
    advice.push("メモリ8GBは一般用途では問題ないですが、重い作業には不足気味");
    upgradeOptions.push("メモリ16GBへの増設を検討");
  }

  if (specs.storageType === "HDD") {
    advice.push("HDDは起動やアプリの読み込みが遅い原因になります");
    upgradeOptions.push("SSDへの換装（体感速度が大幅改善）");
  }
  if (specs.storageGB <= 128) {
    advice.push("ストレージ容量が少ないため、データ管理に注意が必要");
    upgradeOptions.push("大容量ストレージへの換装 or 外付けSSD");
  }

  if (issues.includes("slow")) {
    if (specs.storageType === "HDD") {
      advice.push("動作の遅さはHDDが原因の可能性大。SSD換装で劇的に改善します");
    } else if (specs.memoryGB <= 8) {
      advice.push("動作の遅さはメモリ不足の可能性。不要なアプリを閉じるか増設を検討");
    }
  }
  if (issues.includes("battery")) {
    if (ageYears >= 3) {
      advice.push(
        "バッテリーは消耗品で、3年以上経つと劣化が進みます。交換を検討してください"
      );
      upgradeOptions.push("バッテリー交換");
    }
  }
  if (issues.includes("heat") || issues.includes("noise")) {
    advice.push(
      "発熱やファン騒音は内部のホコリが原因の場合も。クリーニングを試してみてください"
    );
  }
  if (issues.includes("boot") && specs.storageType === "HDD") {
    advice.push("起動の遅さはHDDが主原因。SSDに換装すれば起動時間が劇的に短縮します");
  }

  const toughUsages = usageRatings.filter((r) => r.verdict === "厳しい");
  if (toughUsages.length > 0) {
    const names = toughUsages.map((r) => r.label).join("、");
    advice.push(
      `${names}の用途ではスペック不足です。この用途が必要なら買い替えを推奨します`
    );
  }

  return { advice, upgradeOptions };
}

/* ── コンポーネント別スコア ── */

function gpuScore(gpuName: string): number {
  if (!gpuName || gpuName === "内蔵" || gpuName === "") return 20;
  const g = gpuName.toLowerCase();
  if (g.includes("rtx 50")) return 95;
  if (g.includes("rtx 40")) return 85;
  if (g.includes("rtx 30")) return 72;
  if (g.includes("rtx 20")) return 58;
  if (g.includes("gtx 16")) return 48;
  if (g.includes("gtx 10")) return 38;
  if (g.includes("radeon rx 7")) return 78;
  if (g.includes("radeon rx 6")) return 65;
  if (g.includes("m5")) return 70;
  if (g.includes("m4 max")) return 75;
  if (g.includes("m4 pro")) return 65;
  if (g.includes("m4")) return 55;
  if (g.includes("m3 max")) return 68;
  if (g.includes("m3 pro")) return 58;
  if (g.includes("m3")) return 48;
  if (g.includes("m2")) return 42;
  if (g.includes("m1")) return 38;
  if (g.includes("iris") || g.includes("intel")) return 22;
  if (g.startsWith("内蔵")) return 25;
  return 30;
}

function memoryToScore(memoryGB: number): number {
  if (memoryGB >= 64) return 100;
  if (memoryGB >= 32) return 85;
  if (memoryGB >= 24) return 78;
  if (memoryGB >= 16) return 68;
  if (memoryGB >= 8) return 45;
  if (memoryGB >= 4) return 25;
  return 10;
}

function storageScore(type: string, sizeGB: number): number {
  let base = type === "SSD" ? 60 : type === "HDD" ? 20 : 40;
  if (sizeGB >= 2048) base += 30;
  else if (sizeGB >= 1024) base += 25;
  else if (sizeGB >= 512) base += 18;
  else if (sizeGB >= 256) base += 10;
  else base += 5;
  return Math.min(100, base);
}

export function calculateComponentScores(
  specs: EstimatedSpecs,
  benchmarkResult?: BenchmarkResult
): ComponentScores {
  let cpuS = specs.cpuScore;
  if (benchmarkResult) {
    cpuS = Math.round(cpuS * 0.6 + benchmarkResult.cpuScore * 0.4);
  }

  const memS = memoryToScore(specs.memoryGB);
  const stoS = storageScore(specs.storageType, specs.storageGB);

  let gpuS = gpuScore(specs.gpu);
  if (benchmarkResult) {
    gpuS = Math.round(gpuS * 0.6 + benchmarkResult.renderScore * 0.4);
  }

  const scores = { cpu: cpuS, memory: memS, storage: stoS, gpu: gpuS };
  const min = Math.min(cpuS, memS, stoS, gpuS);
  let bottleneck: ComponentScores["bottleneck"] = null;
  if (min < 50) {
    if (cpuS === min) bottleneck = "cpu";
    else if (memS === min) bottleneck = "memory";
    else if (stoS === min) bottleneck = "storage";
    else bottleneck = "gpu";
  }

  return {
    cpu: { score: scores.cpu, label: "CPU", detail: specs.cpu },
    memory: {
      score: scores.memory,
      label: "メモリ",
      detail: `${specs.memoryGB}GB`,
    },
    storage: {
      score: scores.storage,
      label: "ストレージ",
      detail: `${specs.storageType} ${specs.storageGB >= 1024 ? `${specs.storageGB / 1024}TB` : `${specs.storageGB}GB`}`,
    },
    gpu: { score: scores.gpu, label: "GPU", detail: specs.gpu || "内蔵" },
    bottleneck,
  };
}

/* ── ソフトウェア比較 ── */

function getGpuLevel(gpuName: string): number {
  const g = gpuName.toLowerCase();
  if (g.includes("rtx 40") || g.includes("rtx 50") || g.includes("radeon rx 7")) return 4;
  if (g.includes("rtx 30") || g.includes("rtx 20") || g.includes("radeon rx 6") || g.includes("m4 max") || g.includes("m3 max")) return 3;
  if (g.includes("gtx 16") || g.includes("m4 pro") || g.includes("m3 pro") || g.includes("m4") || g.includes("m3")) return 2;
  if (g.includes("gtx") || g.includes("m2") || g.includes("m1")) return 1.5;
  if (g.includes("iris") || g.includes("intel uhd") || g.startsWith("内蔵")) return 1;
  if (!gpuName || gpuName === "内蔵" || gpuName === "") return 0.5;
  return 1;
}

const GPU_LEVEL_MAP: Record<string, number> = {
  none: 0,
  integrated: 1,
  entry: 2,
  mid: 3,
  high: 4,
};

export function compareSoftwareRequirements(
  specs: EstimatedSpecs
): SoftwareComparison[] {
  const userGpuLevel = getGpuLevel(specs.gpu);

  return SOFTWARE_REQUIREMENTS.map((sw) => {
    const rec = sw.recommended;
    const requiredGpuLevel = GPU_LEVEL_MAP[rec.gpuLevel] ?? 0;

    const cpuRatio = Math.min(specs.cpuScore / Math.max(rec.cpuScore, 1), 1);
    const memRatio = Math.min(specs.memoryGB / Math.max(rec.memoryGB, 1), 1);
    const gpuRatio = rec.needsGpu
      ? Math.min(userGpuLevel / Math.max(requiredGpuLevel, 0.5), 1)
      : 1;

    const matchPercentage = Math.round(
      (cpuRatio * 0.4 + memRatio * 0.3 + gpuRatio * 0.3) * 100
    );

    let verdict: SoftwareComparison["verdict"];
    if (matchPercentage >= 85) verdict = "快適";
    else if (matchPercentage >= 65) verdict = "動作可能";
    else if (matchPercentage >= 45) verdict = "ギリギリ";
    else verdict = "スペック不足";

    // Identify limiting factor
    let limitingFactor: string | null = null;
    const ratios = [
      { name: "CPU", ratio: cpuRatio },
      { name: "メモリ", ratio: memRatio },
      { name: "GPU", ratio: gpuRatio },
    ];
    const weakest = ratios.reduce((a, b) => (a.ratio < b.ratio ? a : b));
    if (weakest.ratio < 0.8) limitingFactor = weakest.name;

    return {
      id: sw.id,
      name: sw.name,
      icon: sw.icon,
      category: sw.category,
      verdict,
      matchPercentage,
      limitingFactor,
    };
  });
}

/* ── 講座対応判定 ── */

function checkCourseCompatibility(
  specs: EstimatedSpecs,
  ageYears: number,
): CourseCompatibility[] {
  const results: CourseCompatibility[] = [];

  // ── 1. 日常PC作業 ──
  {
    const checks: CourseCheckItem[] = [];
    let passed = 0;

    const cpuOk = specs.cpuScore >= 25;
    checks.push({
      name: "CPU性能",
      icon: "🧠",
      passed: cpuOk,
      detail: cpuOk
        ? `${specs.cpu}（十分な処理性能）`
        : `${specs.cpu}（処理性能が不足気味）`,
    });
    if (cpuOk) passed++;

    const memOk = specs.memoryGB >= 8;
    checks.push({
      name: "メモリ",
      icon: "💾",
      passed: memOk,
      detail: memOk
        ? `${specs.memoryGB}GB（8GB以上で問題なし）`
        : `${specs.memoryGB}GB（8GB未満 — 動作が遅くなる場合があります）`,
    });
    if (memOk) passed++;

    const ssdOk = specs.storageType !== "HDD";
    checks.push({
      name: "ストレージ",
      icon: "💿",
      passed: ssdOk,
      detail: ssdOk
        ? `${specs.storageType}（快適な読み書き速度）`
        : "HDD（起動やアプリの動作が遅くなります）",
    });
    if (ssdOk) passed++;

    const ageOk = ageYears <= 7;
    checks.push({
      name: "経年",
      icon: "📅",
      passed: ageOk,
      detail: ageOk
        ? `約${ageYears}年（まだ現役で使えます）`
        : `約${ageYears}年（ハードウェアの寿命に注意）`,
    });
    if (ageOk) passed++;

    const score = Math.round((passed / checks.length) * 100);
    let verdict: CourseCompatibility["verdict"];
    let summary: string;
    if (passed === checks.length) {
      verdict = "対応可能";
      summary = "日常的なPC作業に問題なく対応できるスペックです";
    } else if (passed >= checks.length - 1) {
      verdict = "条件付きで対応";
      summary = "基本的な作業は可能ですが、一部改善するとより快適になります";
    } else {
      verdict = "スペック不足";
      summary = "日常的な作業でも動作が重くなる可能性があります。買い替えを検討してください";
    }

    results.push({
      id: "daily",
      label: "日常PC作業",
      icon: "💻",
      verdict,
      score,
      checks,
      summary,
    });
  }

  // ── 2. if(Business) AI講座 ──
  {
    const checks: CourseCheckItem[] = [];
    let passed = 0;

    // ブラウザ作業（Google Colab, ChatGPT, Claude Web）— 複数タブ前提
    const browserOk = specs.cpuScore >= 30 && specs.memoryGB >= 8;
    checks.push({
      name: "ブラウザ作業（Colab・ChatGPT・Claude）",
      icon: "🌐",
      passed: browserOk,
      detail: browserOk
        ? "複数タブを開いてのブラウザ作業に対応できます"
        : specs.memoryGB < 8
          ? `メモリ${specs.memoryGB}GBでは複数タブで重くなります（8GB以上推奨）`
          : "CPU性能が不足気味で、複数タブの同時作業が重くなる場合があります",
    });
    if (browserOk) passed++;

    // Claude Code — ターミナル + Node.js + ブラウザ同時使用
    const claudeCodeOk = specs.cpuScore >= 35 && specs.memoryGB >= 8;
    checks.push({
      name: "Claude Code（ターミナルAIエージェント）",
      icon: "⚡",
      passed: claudeCodeOk,
      detail: claudeCodeOk
        ? "Claude Codeの実行に十分なスペックです"
        : specs.memoryGB < 8
          ? `メモリ${specs.memoryGB}GBではClaude Code＋ブラウザの同時使用が困難です`
          : "CPU性能が不足しており、Claude Codeの応答が遅くなる場合があります",
    });
    if (claudeCodeOk) passed++;

    // Codex CLI — 同様にターミナル + ブラウザ
    const codexOk = specs.cpuScore >= 35 && specs.memoryGB >= 8;
    checks.push({
      name: "Codex（OpenAI CLIエージェント）",
      icon: "🤖",
      passed: codexOk,
      detail: codexOk
        ? "Codex CLIの実行に十分なスペックです"
        : specs.memoryGB < 8
          ? `メモリ${specs.memoryGB}GBではCodex＋他ツールの同時使用が困難です`
          : "CPU性能が不足しており、Codexの実行が遅くなる場合があります",
    });
    if (codexOk) passed++;

    // SSD推奨 — 開発ツール全般
    const ssdOk = specs.storageType !== "HDD";
    checks.push({
      name: "ストレージ速度（開発ツール全般）",
      icon: "💿",
      passed: ssdOk,
      detail: ssdOk
        ? "SSDで快適にツールを起動・操作できます"
        : "HDDではツールの起動やファイル操作が遅くなります。SSD換装を強く推奨します",
    });
    if (ssdOk) passed++;

    // メモリ16GB推奨チェック（必須ではないが推奨）
    const mem16Ok = specs.memoryGB >= 16;
    checks.push({
      name: "メモリ余裕（ブラウザ＋CLI同時使用）",
      icon: "📊",
      passed: mem16Ok,
      detail: mem16Ok
        ? `${specs.memoryGB}GBあり、ブラウザ＋CLIツールの同時作業も余裕です`
        : `${specs.memoryGB}GB — 動作しますが、16GB以上あると複数ツール同時使用が快適になります`,
    });
    if (mem16Ok) passed++;

    const score = Math.round((passed / checks.length) * 100);
    let verdict: CourseCompatibility["verdict"];
    let summary: string;

    if (passed === checks.length) {
      verdict = "対応可能";
      summary = "if(Business)のAI講座に必要なスペックを全て満たしています。安心して受講できます";
    } else if (passed >= 3) {
      verdict = "条件付きで対応";
      const failedItems = checks.filter((c) => !c.passed).map((c) => c.name);
      summary = `受講可能ですが、${failedItems.join("・")}に注意が必要です`;
    } else {
      verdict = "スペック不足";
      summary = "講座で使用するツールを快適に動かすにはスペックが不足しています。PC買い替えを検討してください";
    }

    results.push({
      id: "if-business-ai",
      label: "if(Business) AI講座",
      icon: "🎓",
      verdict,
      score,
      checks,
      summary,
    });
  }

  return results;
}

/* ── レポート生成 ── */

export function generateReport(
  input: UserPcInput,
  benchmarkResult?: BenchmarkResult
): DiagnosticReport {
  const specs = resolveSpecs(input);
  const purchaseYear = input.purchaseYear || CURRENT_YEAR - 3;
  const ageYears = CURRENT_YEAR - purchaseYear;

  const usageRatings: UsageRating[] = [
    rateUsage("web", "Web閲覧・動画視聴", "🌐", specs, ageYears),
    rateUsage("office", "ビジネス・Office", "📊", specs, ageYears),
    rateUsage("programming", "プログラミング", "👨‍💻", specs, ageYears),
    rateUsage("design", "デザイン", "🎨", specs, ageYears),
    rateUsage("video", "動画編集", "🎬", specs, ageYears),
    rateUsage("gaming", "ゲーミング", "🎮", specs, ageYears),
    rateUsage("ai", "AI・機械学習", "🤖", specs, ageYears),
  ];

  let overallScore = 0;
  overallScore += specs.cpuScore * 0.4;
  overallScore += Math.min((specs.memoryGB / 32) * 100, 100) * 0.25;
  overallScore += specs.storageType === "SSD" ? 15 : 0;
  overallScore += Math.max(0, (10 - ageYears) * 2);
  overallScore = Math.max(0, Math.min(100, Math.round(overallScore)));

  let overallVerdict: DiagnosticReport["overallVerdict"];
  if (overallScore >= 65) {
    overallVerdict = "まだまだ現役";
  } else if (overallScore >= 40) {
    overallVerdict = "そろそろ買い替え検討";
  } else {
    overallVerdict = "買い替え推奨";
  }

  const { advice, upgradeOptions } = generateAdvice(
    specs,
    ageYears,
    input.currentIssues,
    usageRatings
  );

  const componentScores = calculateComponentScores(specs, benchmarkResult);
  const softwareComparisons = compareSoftwareRequirements(specs);
  const courseCompatibility = checkCourseCompatibility(specs, ageYears);

  return {
    overallScore,
    overallVerdict,
    estimatedAge: ageYears,
    estimatedSpecs: specs,
    usageRatings,
    advice,
    upgradeOptions,
    componentScores,
    softwareComparisons,
    benchmarkResult,
    courseCompatibility,
  };
}
