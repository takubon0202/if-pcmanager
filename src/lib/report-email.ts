import type { DiagnosticReport } from "@/types/diagnostic";
import type { LaptopRecommendation, DesktopRecommendation } from "@/types";

// PC診断レポートのHTML生成
export function buildDiagnosticReportHtml(report: DiagnosticReport): string {
  const verdictColor =
    report.overallVerdict === "まだまだ現役"
      ? "#22c55e"
      : report.overallVerdict === "そろそろ買い替え検討"
        ? "#eab308"
        : "#ef4444";

  const usageRows = report.usageRatings
    .map((r) => {
      const barColor =
        r.score >= 70 ? "#22c55e" : r.score >= 40 ? "#eab308" : "#ef4444";
      return `
      <tr>
        <td style="padding:8px 12px;color:#cbd5e1;">${r.icon} ${r.label}</td>
        <td style="padding:8px 12px;width:200px;">
          <div style="background:#1e293b;border-radius:4px;height:12px;overflow:hidden;">
            <div style="background:${barColor};height:12px;width:${r.score}%;border-radius:4px;"></div>
          </div>
        </td>
        <td style="padding:8px 12px;color:${barColor};font-weight:bold;text-align:center;">${r.verdict}</td>
      </tr>`;
    })
    .join("");

  const adviceItems = report.advice
    .map((a) => `<li style="color:#94a3b8;margin-bottom:6px;">${a}</li>`)
    .join("");

  const upgradeItems = report.upgradeOptions
    .map((u) => `<li style="color:#94a3b8;margin-bottom:6px;">${u}</li>`)
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <!-- Header -->
    <div style="text-align:center;padding:24px 0;">
      <h1 style="color:#e2e8f0;font-size:24px;margin:0;">⚡ PC診断レポート</h1>
      <p style="color:#64748b;font-size:14px;margin:8px 0 0;">if(塾) PC Manager</p>
    </div>

    <!-- Overall Score -->
    <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid #334155;border-radius:12px;padding:24px;text-align:center;margin-bottom:16px;">
      <div style="font-size:48px;font-weight:bold;color:${verdictColor};">${report.overallScore}<span style="font-size:20px;color:#64748b;">/100</span></div>
      <div style="font-size:20px;font-weight:bold;color:${verdictColor};margin-top:8px;">${report.overallVerdict}</div>
    </div>

    <!-- Specs -->
    <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:16px;margin-bottom:16px;">
      <h2 style="color:#e2e8f0;font-size:16px;margin:0 0 12px;">📊 推定スペック</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#64748b;width:100px;">CPU</td><td style="color:#cbd5e1;">${report.estimatedSpecs.cpu}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;">メモリ</td><td style="color:#cbd5e1;">${report.estimatedSpecs.memoryGB}GB</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;">ストレージ</td><td style="color:#cbd5e1;">${report.estimatedSpecs.storageType} ${report.estimatedSpecs.storageGB}GB</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;">GPU</td><td style="color:#cbd5e1;">${report.estimatedSpecs.gpu}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;">経過年数</td><td style="color:#cbd5e1;">約${report.estimatedAge}年</td></tr>
      </table>
    </div>

    <!-- Usage Ratings -->
    <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:16px;margin-bottom:16px;">
      <h2 style="color:#e2e8f0;font-size:16px;margin:0 0 12px;">🎯 用途別評価</h2>
      <table style="width:100%;border-collapse:collapse;">${usageRows}</table>
    </div>

    <!-- Advice -->
    ${
      report.advice.length > 0
        ? `<div style="background:#1e293b;border:1px solid #4f46e5;border-radius:12px;padding:16px;margin-bottom:16px;">
        <h2 style="color:#a5b4fc;font-size:16px;margin:0 0 12px;">💡 アドバイス</h2>
        <ul style="margin:0;padding-left:20px;">${adviceItems}</ul>
      </div>`
        : ""
    }

    <!-- Upgrade Options -->
    ${
      report.upgradeOptions.length > 0
        ? `<div style="background:#1e293b;border:1px solid #06b6d4;border-radius:12px;padding:16px;margin-bottom:16px;">
        <h2 style="color:#67e8f9;font-size:16px;margin:0 0 12px;">🔧 アップグレード候補</h2>
        <ul style="margin:0;padding-left:20px;">${upgradeItems}</ul>
      </div>`
        : ""
    }

    <!-- Footer -->
    <div style="text-align:center;padding:24px 0;border-top:1px solid #334155;margin-top:16px;">
      <p style="color:#64748b;font-size:12px;margin:0;">このレポートは if(塾) PC Manager で自動生成されました</p>
      <a href="https://if-juku.net" style="color:#6366f1;font-size:12px;">if-juku.net</a>
    </div>
  </div>
</body>
</html>`;
}

// ノートPC推薦レポートのHTML生成
export function buildLaptopReportHtml(
  laptops: LaptopRecommendation[],
  conditions: { purposes: string[]; budget: string; size: string; priorities: string[] }
): string {
  const laptopCards = laptops
    .map(
      (laptop, i) => `
    <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:16px;margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
        <div>
          <span style="color:#6366f1;font-weight:bold;font-size:14px;">#${i + 1}</span>
          <h3 style="color:#e2e8f0;font-size:16px;margin:4px 0 0;">${laptop.name}</h3>
          <p style="color:#64748b;font-size:12px;margin:2px 0 0;">${laptop.brand}</p>
        </div>
        <div style="color:#6366f1;font-weight:bold;font-size:20px;">¥${laptop.price.toLocaleString()}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr><td style="padding:4px 0;color:#64748b;width:80px;">CPU</td><td style="color:#cbd5e1;">${laptop.specs.cpu}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">メモリ</td><td style="color:#cbd5e1;">${laptop.specs.memory}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">ストレージ</td><td style="color:#cbd5e1;">${laptop.specs.storage}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">GPU</td><td style="color:#cbd5e1;">${laptop.specs.gpu}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">画面</td><td style="color:#cbd5e1;">${laptop.specs.display}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">重量</td><td style="color:#cbd5e1;">${laptop.specs.weight}</td></tr>
      </table>
      ${laptop.url ? `<a href="${laptop.url}" style="display:block;text-align:center;background:#4f46e5;color:#fff;text-decoration:none;padding:10px;border-radius:8px;margin-top:12px;font-size:14px;">詳細を見る →</a>` : ""}
    </div>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="text-align:center;padding:24px 0;">
      <h1 style="color:#e2e8f0;font-size:24px;margin:0;">💻 ノートPCおすすめレポート</h1>
      <p style="color:#64748b;font-size:14px;margin:8px 0 0;">if(塾) PC Manager</p>
    </div>

    <!-- 検索条件 -->
    <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:16px;margin-bottom:16px;">
      <h2 style="color:#e2e8f0;font-size:14px;margin:0 0 8px;">📋 あなたの条件</h2>
      <table style="width:100%;font-size:13px;border-collapse:collapse;">
        <tr><td style="padding:4px 0;color:#64748b;">用途</td><td style="color:#cbd5e1;">${conditions.purposes.join("、")}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">予算</td><td style="color:#cbd5e1;">${conditions.budget}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">サイズ</td><td style="color:#cbd5e1;">${conditions.size}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">重視点</td><td style="color:#cbd5e1;">${conditions.priorities.join("、")}</td></tr>
      </table>
    </div>

    <!-- Results -->
    <h2 style="color:#e2e8f0;font-size:16px;margin:0 0 12px;">🏆 おすすめ ${laptops.length} 台</h2>
    ${laptopCards}

    <div style="text-align:center;padding:24px 0;border-top:1px solid #334155;margin-top:16px;">
      <p style="color:#64748b;font-size:12px;margin:0;">このレポートは if(塾) PC Manager で自動生成されました</p>
      <a href="https://if-juku.net" style="color:#6366f1;font-size:12px;">if-juku.net</a>
    </div>
  </div>
</body>
</html>`;
}

// デスクトップPC推薦レポートのHTML生成
export function buildDesktopReportHtml(
  desktops: DesktopRecommendation[],
  conditions: { purposes: string[]; budget: string; formFactor: string; priorities: string[] }
): string {
  const desktopCards = desktops
    .map(
      (desktop, i) => `
    <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:16px;margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
        <div>
          <span style="color:#6366f1;font-weight:bold;font-size:14px;">#${i + 1}</span>
          <h3 style="color:#e2e8f0;font-size:16px;margin:4px 0 0;">${desktop.name}</h3>
          <p style="color:#64748b;font-size:12px;margin:2px 0 0;">${desktop.brand}</p>
        </div>
        <div style="color:#6366f1;font-weight:bold;font-size:20px;">¥${desktop.price.toLocaleString()}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr><td style="padding:4px 0;color:#64748b;width:100px;">CPU</td><td style="color:#cbd5e1;">${desktop.specs.cpu}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">GPU</td><td style="color:#cbd5e1;">${desktop.specs.gpu}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">メモリ</td><td style="color:#cbd5e1;">${desktop.specs.memory}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">ストレージ</td><td style="color:#cbd5e1;">${desktop.specs.storage}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">電源</td><td style="color:#cbd5e1;">${desktop.specs.psu}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">ケース</td><td style="color:#cbd5e1;">${desktop.specs.formFactor}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">マザーボード</td><td style="color:#cbd5e1;">${desktop.specs.motherboard}</td></tr>
      </table>
      ${desktop.reasons.length > 0 ? `<p style="color:#a5b4fc;font-size:12px;margin:8px 0 0;">${desktop.reasons.join(" / ")}</p>` : ""}
      ${desktop.url ? `<a href="${desktop.url}" style="display:block;text-align:center;background:#4f46e5;color:#fff;text-decoration:none;padding:10px;border-radius:8px;margin-top:12px;font-size:14px;">詳細を見る →</a>` : ""}
    </div>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="text-align:center;padding:24px 0;">
      <h1 style="color:#e2e8f0;font-size:24px;margin:0;">🖥️ デスクトップPCおすすめレポート</h1>
      <p style="color:#64748b;font-size:14px;margin:8px 0 0;">if(塾) PC Manager</p>
    </div>

    <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:16px;margin-bottom:16px;">
      <h2 style="color:#e2e8f0;font-size:14px;margin:0 0 8px;">📋 あなたの条件</h2>
      <table style="width:100%;font-size:13px;border-collapse:collapse;">
        <tr><td style="padding:4px 0;color:#64748b;">用途</td><td style="color:#cbd5e1;">${conditions.purposes.join("、")}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">予算</td><td style="color:#cbd5e1;">${conditions.budget}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">ケースサイズ</td><td style="color:#cbd5e1;">${conditions.formFactor}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">重視点</td><td style="color:#cbd5e1;">${conditions.priorities.join("、")}</td></tr>
      </table>
    </div>

    <h2 style="color:#e2e8f0;font-size:16px;margin:0 0 12px;">🏆 おすすめ ${desktops.length} 台</h2>
    ${desktopCards}

    <div style="text-align:center;padding:24px 0;border-top:1px solid #334155;margin-top:16px;">
      <p style="color:#64748b;font-size:12px;margin:0;">このレポートは if(塾) PC Manager で自動生成されました</p>
      <a href="https://if-juku.net" style="color:#6366f1;font-size:12px;">if-juku.net</a>
    </div>
  </div>
</body>
</html>`;
}
