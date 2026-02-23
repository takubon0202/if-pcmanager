import type { CustomPCBuild, CompatibilityIssue } from '@/types/custom-pc';

export function checkCompatibility(build: CustomPCBuild): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];

  // CPUソケットとマザーボードソケットの一致
  if (build.cpu && build.motherboard) {
    if (build.cpu.specs.socket !== build.motherboard.specs.socket) {
      issues.push({
        severity: 'error',
        message: `CPUソケット(${build.cpu.specs.socket})とマザーボードソケット(${build.motherboard.specs.socket})が一致しません`,
        parts: ['cpu', 'motherboard']
      });
    }
  }

  // メモリタイプ(DDR4/DDR5)とマザーボード対応
  if (build.memory && build.motherboard) {
    if (build.memory.specs.type !== build.motherboard.specs.memoryType) {
      issues.push({
        severity: 'error',
        message: `メモリタイプ(${build.memory.specs.type})とマザーボード対応メモリ(${build.motherboard.specs.memoryType})が一致しません`,
        parts: ['memory', 'motherboard']
      });
    }
  }

  // メモリ枚数とスロット数
  if (build.memory && build.motherboard) {
    if (build.memory.specs.sticks > build.motherboard.specs.memorySlots) {
      issues.push({
        severity: 'error',
        message: `メモリ枚数(${build.memory.specs.sticks}枚)がマザーボードのスロット数(${build.motherboard.specs.memorySlots}スロット)を超えています`,
        parts: ['memory', 'motherboard']
      });
    }
  }

  // GPU長とケースの最大GPU長
  if (build.gpu && build.case) {
    if (build.gpu.specs.length > build.case.specs.maxGPULength) {
      issues.push({
        severity: 'error',
        message: `GPU長(${build.gpu.specs.length}mm)がケースの最大GPU長(${build.case.specs.maxGPULength}mm)を超えています`,
        parts: ['gpu', 'case']
      });
    }
  }

  // CPUクーラー高さとケースの最大クーラー高
  if (build.cooler && build.case) {
    if (build.cooler.specs.type === 'air' && build.cooler.specs.height) {
      if (build.cooler.specs.height > build.case.specs.maxCoolerHeight) {
        issues.push({
          severity: 'error',
          message: `CPUクーラー高(${build.cooler.specs.height}mm)がケースの最大クーラー高(${build.case.specs.maxCoolerHeight}mm)を超えています`,
          parts: ['cooler', 'case']
        });
      }
    }
  }

  // クーラーの対応ソケット
  if (build.cooler && build.cpu) {
    const isSocketSupported = build.cooler.specs.socket.includes(build.cpu.specs.socket);
    if (!isSocketSupported) {
      issues.push({
        severity: 'error',
        message: `CPUクーラーがCPUソケット(${build.cpu.specs.socket})に対応していません。対応ソケット: ${build.cooler.specs.socket.join(', ')}`,
        parts: ['cooler', 'cpu']
      });
    }
  }

  // 電源容量チェック（CPU TDP + GPU TDP + 100W < PSU wattage の目安チェック）
  if (build.psu && (build.cpu || build.gpu)) {
    const cpuTdp = build.cpu?.specs.tdp || 0;
    const gpuTdp = build.gpu?.specs.tdp || 0;
    const systemOverhead = 100; // システム全体のオーバーヘッド
    const requiredPower = cpuTdp + gpuTdp + systemOverhead;
    const availablePower = build.psu.specs.wattage;

    if (requiredPower > availablePower) {
      issues.push({
        severity: 'error',
        message: `推定消費電力(${requiredPower}W)が電源容量(${availablePower}W)を超えています`,
        parts: ['psu', 'cpu', 'gpu'].filter(part => build[part as keyof CustomPCBuild])
      });
    } else if (requiredPower > availablePower * 0.8) {
      // 80%を超える場合は警告
      issues.push({
        severity: 'warning',
        message: `推定消費電力(${requiredPower}W)が電源容量の80%(${Math.round(availablePower * 0.8)}W)を超えています`,
        parts: ['psu', 'cpu', 'gpu'].filter(part => build[part as keyof CustomPCBuild])
      });
    }
  }

  // ケースのフォームファクターとマザーボードの互換性
  if (build.case && build.motherboard) {
    const caseFormFactor = build.case.specs.formFactor;
    const motherboardFormFactor = build.motherboard.specs.formFactor;

    // フォームファクター互換性マトリクス
    const compatibility: Record<string, string[]> = {
      'ATX': ['ATX', 'mATX', 'ITX'],
      'mATX': ['mATX', 'ITX'],
      'ITX': ['ITX']
    };

    const supportedFormFactors = compatibility[caseFormFactor] || [];
    if (!supportedFormFactors.includes(motherboardFormFactor)) {
      issues.push({
        severity: 'error',
        message: `ケースのフォームファクター(${caseFormFactor})がマザーボード(${motherboardFormFactor})に対応していません`,
        parts: ['case', 'motherboard']
      });
    }
  }

  // CPUクーラーの冷却性能チェック
  if (build.cooler && build.cpu) {
    const cpuTdp = build.cpu.specs.tdp;
    const coolerRating = build.cooler.specs.tdpRating;

    if (cpuTdp > coolerRating) {
      issues.push({
        severity: 'error',
        message: `CPU TDP(${cpuTdp}W)がCPUクーラーの冷却性能(${coolerRating}W)を超えています`,
        parts: ['cooler', 'cpu']
      });
    } else if (cpuTdp > coolerRating * 0.85) {
      // 85%を超える場合は警告
      issues.push({
        severity: 'warning',
        message: `CPU TDP(${cpuTdp}W)がCPUクーラーの推奨範囲(${Math.round(coolerRating * 0.85)}W以下)を超えています`,
        parts: ['cooler', 'cpu']
      });
    }
  }

  // AIOクーラーのラジエーター設置スペースチェック（簡易的）
  if (build.cooler && build.case && build.cooler.specs.type === 'aio') {
    const radiatorSize = build.cooler.specs.radiatorSize;
    if (radiatorSize && radiatorSize >= 360) {
      // 360mm以上のラジエーターは大型ケースが推奨
      if (build.case.specs.formFactor === 'ITX') {
        issues.push({
          severity: 'warning',
          message: `大型ラジエーター(${radiatorSize}mm)はITXケースでは設置が困難な場合があります`,
          parts: ['cooler', 'case']
        });
      }
    }
  }

  return issues;
}

// 互換性レベルを計算する補助関数
export function getCompatibilityLevel(issues: CompatibilityIssue[]): 'excellent' | 'good' | 'warning' | 'error' {
  const hasErrors = issues.some(issue => issue.severity === 'error');
  const warningCount = issues.filter(issue => issue.severity === 'warning').length;

  if (hasErrors) {
    return 'error';
  } else if (warningCount > 2) {
    return 'warning';
  } else if (warningCount > 0) {
    return 'good';
  } else {
    return 'excellent';
  }
}

// 互換性レベルに応じたスタイルクラスを取得
export function getCompatibilityStyles(level: ReturnType<typeof getCompatibilityLevel>) {
  switch (level) {
    case 'excellent':
      return {
        bgClass: 'verdict-great',
        textClass: 'text-green-400',
        iconClass: '✅'
      };
    case 'good':
      return {
        bgClass: 'verdict-fair',
        textClass: 'text-blue-400',
        iconClass: '🔵'
      };
    case 'warning':
      return {
        bgClass: 'verdict-fair',
        textClass: 'text-yellow-400',
        iconClass: '⚠️'
      };
    case 'error':
      return {
        bgClass: 'verdict-poor',
        textClass: 'text-red-400',
        iconClass: '❌'
      };
  }
}