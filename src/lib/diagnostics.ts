export interface DiagnosticResult {
  browser: BrowserInfo;
  display: DisplayInfo;
  hardware: HardwareInfo;
  network: NetworkInfo;
  gpu: GpuInfo | null;
}

export interface BrowserInfo {
  userAgent: string;
  platform: string;
  language: string;
  cookiesEnabled: boolean;
}

export interface DisplayInfo {
  screenWidth: number;
  screenHeight: number;
  colorDepth: number;
  pixelRatio: number;
}

export interface HardwareInfo {
  cores: number;
  memoryGB: number | null;
  touchSupport: boolean;
}

export interface NetworkInfo {
  type: string | null;
  downlink: number | null;
}

export interface GpuInfo {
  vendor: string;
  renderer: string;
}

function getGpuInfo(): GpuInfo | null {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl || !(gl instanceof WebGLRenderingContext)) return null;

    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (!ext) return null;

    return {
      vendor: gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) || "unknown",
      renderer: gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || "unknown",
    };
  } catch {
    return null;
  }
}

function getNetworkInfo(): NetworkInfo {
  const nav = navigator as Navigator & {
    connection?: { effectiveType?: string; downlink?: number };
  };
  const conn = nav.connection;
  return {
    type: conn?.effectiveType ?? null,
    downlink: conn?.downlink ?? null,
  };
}

export function runDiagnostics(): DiagnosticResult {
  const nav = navigator as Navigator & { deviceMemory?: number };

  return {
    browser: {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookiesEnabled: navigator.cookieEnabled,
    },
    display: {
      screenWidth: screen.width,
      screenHeight: screen.height,
      colorDepth: screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
    },
    hardware: {
      cores: navigator.hardwareConcurrency || 0,
      memoryGB: nav.deviceMemory ?? null,
      touchSupport: "ontouchstart" in window || navigator.maxTouchPoints > 0,
    },
    network: getNetworkInfo(),
    gpu: getGpuInfo(),
  };
}

export interface PerformanceScore {
  overall: "low" | "medium" | "high";
  details: string[];
}

export function evaluatePerformance(
  result: DiagnosticResult
): PerformanceScore {
  const details: string[] = [];
  let score = 0;

  // CPU cores
  if (result.hardware.cores >= 8) {
    score += 3;
    details.push(`CPU: ${result.hardware.cores}コア（高性能）`);
  } else if (result.hardware.cores >= 4) {
    score += 2;
    details.push(`CPU: ${result.hardware.cores}コア（標準）`);
  } else {
    score += 1;
    details.push(`CPU: ${result.hardware.cores}コア（低スペック）`);
  }

  // Memory
  if (result.hardware.memoryGB !== null) {
    if (result.hardware.memoryGB >= 16) {
      score += 3;
      details.push(`メモリ: ${result.hardware.memoryGB}GB（十分）`);
    } else if (result.hardware.memoryGB >= 8) {
      score += 2;
      details.push(`メモリ: ${result.hardware.memoryGB}GB（標準）`);
    } else {
      score += 1;
      details.push(`メモリ: ${result.hardware.memoryGB}GB（少なめ）`);
    }
  } else {
    details.push("メモリ: 取得不可");
  }

  // GPU
  if (result.gpu) {
    details.push(`GPU: ${result.gpu.renderer}`);
    const renderer = result.gpu.renderer.toLowerCase();
    if (
      renderer.includes("rtx") ||
      renderer.includes("radeon rx") ||
      renderer.includes("m1") ||
      renderer.includes("m2") ||
      renderer.includes("m3") ||
      renderer.includes("m4")
    ) {
      score += 3;
    } else if (
      renderer.includes("gtx") ||
      renderer.includes("intel iris") ||
      renderer.includes("radeon")
    ) {
      score += 2;
    } else {
      score += 1;
    }
  } else {
    details.push("GPU: 取得不可");
  }

  // Display
  details.push(`ディスプレイ: ${result.display.screenWidth}x${result.display.screenHeight}`);

  const overall: PerformanceScore["overall"] =
    score >= 8 ? "high" : score >= 5 ? "medium" : "low";

  return { overall, details };
}
