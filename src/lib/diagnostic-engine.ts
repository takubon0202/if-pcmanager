import type {
  UserPcInput,
  DiagnosticReport,
  EstimatedSpecs,
  UsageRating,
  UsageCategory,
} from "@/types/diagnostic";
import { estimateSpecs, cpuNameToScore } from "@/data/pc-models";

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

  // CPUスコア
  const cpuRatio = Math.min(specs.cpuScore / req.minCpu, 1.5);
  score += cpuRatio * 35;

  // メモリ
  const memRatio = Math.min(specs.memoryGB / req.minMemory, 1.5);
  score += memRatio * 25;

  // GPU
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

  // 経年劣化
  const agePenalty = Math.min(ageYears * 3, 20);
  score -= agePenalty;

  // ストレージ
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

  // 経年
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

  // メモリ
  if (specs.memoryGB <= 4) {
    advice.push("メモリ4GB以下は現在の用途では厳しい場合が多いです");
    upgradeOptions.push("メモリ増設（8GB以上推奨）");
  } else if (specs.memoryGB === 8) {
    advice.push("メモリ8GBは一般用途では問題ないですが、重い作業には不足気味");
    upgradeOptions.push("メモリ16GBへの増設を検討");
  }

  // ストレージ
  if (specs.storageType === "HDD") {
    advice.push("HDDは起動やアプリの読み込みが遅い原因になります");
    upgradeOptions.push("SSDへの換装（体感速度が大幅改善）");
  }
  if (specs.storageGB <= 128) {
    advice.push("ストレージ容量が少ないため、データ管理に注意が必要");
    upgradeOptions.push("大容量ストレージへの換装 or 外付けSSD");
  }

  // Issues
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

  // 用途別の厳しい判定があれば
  const toughUsages = usageRatings.filter((r) => r.verdict === "厳しい");
  if (toughUsages.length > 0) {
    const names = toughUsages.map((r) => r.label).join("、");
    advice.push(
      `${names}の用途ではスペック不足です。この用途が必要なら買い替えを推奨します`
    );
  }

  return { advice, upgradeOptions };
}

export function generateReport(input: UserPcInput): DiagnosticReport {
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

  // 総合スコアはCPU、メモリ、経年を加味
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

  return {
    overallScore,
    overallVerdict,
    estimatedAge: ageYears,
    estimatedSpecs: specs,
    usageRatings,
    advice,
    upgradeOptions,
  };
}
