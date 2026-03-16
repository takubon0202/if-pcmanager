import type { BenchmarkResult } from "@/types/diagnostic";

async function yieldToMain(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

async function runCpuBenchmark(): Promise<{
  mathOpsPerSecond: number;
  score: number;
}> {
  await yieldToMain();
  const duration = 500; // ms
  const start = performance.now();
  let ops = 0;

  while (performance.now() - start < duration) {
    for (let i = 0; i < 1000; i++) {
      Math.sqrt(Math.sin(ops) * Math.cos(ops) + Math.tan(ops * 0.001));
      ops++;
    }
  }

  const elapsed = performance.now() - start;
  const opsPerSecond = Math.round((ops / elapsed) * 1000);

  // Normalize: ~500K = 20, ~2M = 50, ~5M = 80, ~10M+ = 100
  const score = Math.min(100, Math.round((opsPerSecond / 8_000_000) * 100));

  return { mathOpsPerSecond: opsPerSecond, score };
}

async function runRenderBenchmark(): Promise<{
  fps: number;
  score: number;
}> {
  await yieldToMain();

  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    canvas.style.position = "fixed";
    canvas.style.left = "-9999px";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d")!;

    let frames = 0;
    const startTime = performance.now();
    const testDuration = 500;

    function drawFrame() {
      ctx.clearRect(0, 0, 512, 512);
      for (let i = 0; i < 50; i++) {
        const gradient = ctx.createRadialGradient(
          Math.random() * 512,
          Math.random() * 512,
          0,
          Math.random() * 512,
          Math.random() * 512,
          100
        );
        gradient.addColorStop(0, `hsl(${Math.random() * 360}, 80%, 60%)`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);
      }
      frames++;

      if (performance.now() - startTime < testDuration) {
        requestAnimationFrame(drawFrame);
      } else {
        document.body.removeChild(canvas);
        const elapsed = performance.now() - startTime;
        const fps = Math.round((frames / elapsed) * 1000);
        // Normalize: 15fps = 25, 30fps = 50, 60fps = 75, 120fps+ = 100
        const score = Math.min(100, Math.round((fps / 80) * 100));
        resolve({ fps, score });
      }
    }

    requestAnimationFrame(drawFrame);
  });
}

async function runMemoryBenchmark(): Promise<{
  allocTime: number;
  score: number;
}> {
  await yieldToMain();
  const size = 50 * 1024 * 1024; // 50MB
  const start = performance.now();

  const buffer = new Float64Array(size / 8);
  for (let i = 0; i < buffer.length; i += 64) {
    buffer[i] = i * 1.1;
  }
  // Read pass
  let sum = 0;
  for (let i = 0; i < buffer.length; i += 64) {
    sum += buffer[i];
  }
  // Prevent optimization
  if (sum === -1) console.log(sum);

  const elapsed = performance.now() - start;

  // Normalize: 200ms = 25, 100ms = 50, 50ms = 75, 20ms = 100
  const score = Math.min(100, Math.round((100 / Math.max(elapsed, 10)) * 100));

  return { allocTime: Math.round(elapsed), score };
}

export async function runBenchmark(
  onProgress?: (phase: string, progress: number) => void
): Promise<BenchmarkResult> {
  onProgress?.("CPU性能を測定中...", 0);
  const cpu = await runCpuBenchmark();

  onProgress?.("描画性能を測定中...", 33);
  const render = await runRenderBenchmark();

  onProgress?.("メモリ速度を測定中...", 66);
  const memory = await runMemoryBenchmark();

  onProgress?.("完了", 100);

  const overallScore = Math.round(
    cpu.score * 0.4 + render.score * 0.35 + memory.score * 0.25
  );

  return {
    cpuScore: cpu.score,
    renderScore: render.score,
    memoryScore: memory.score,
    overallScore,
    details: {
      mathOpsPerSecond: cpu.mathOpsPerSecond,
      canvasFps: render.fps,
      arrayAllocTime: memory.allocTime,
    },
  };
}
