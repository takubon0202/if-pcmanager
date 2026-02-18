import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { buildDiagnosticReportHtml, buildLaptopReportHtml } from "@/lib/report-email";
import type { DiagnosticReport } from "@/types/diagnostic";
import type { LaptopRecommendation } from "@/types";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

interface DiagnosticPayload {
  type: "diagnostic";
  email: string;
  report: DiagnosticReport;
}

interface LaptopPayload {
  type: "laptop";
  email: string;
  laptops: LaptopRecommendation[];
  conditions: {
    purposes: string[];
    budget: string;
    size: string;
    priorities: string[];
  };
}

type ReportPayload = DiagnosticPayload | LaptopPayload;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ReportPayload;

    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json({ error: "有効なメールアドレスを入力してください" }, { status: 400 });
    }

    let html: string;
    let subject: string;

    if (body.type === "diagnostic") {
      html = buildDiagnosticReportHtml(body.report);
      subject = `⚡ PC診断レポート - スコア ${body.report.overallScore}/100 | if(塾)`;
    } else if (body.type === "laptop") {
      html = buildLaptopReportHtml(body.laptops, body.conditions);
      subject = `💻 ノートPCおすすめレポート (${body.laptops.length}台) | if(塾)`;
    } else {
      return NextResponse.json({ error: "不明なレポートタイプ" }, { status: 400 });
    }

    const resend = getResend();
    const { error } = await resend.emails.send({
      from: "PC Manager <noreply@if-juku.net>",
      to: body.email,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "メール送信に失敗しました" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send report error:", err);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
