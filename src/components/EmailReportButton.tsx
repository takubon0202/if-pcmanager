"use client";

import { useState } from "react";

interface EmailReportButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Record<string, any>;
}

export default function EmailReportButton({ payload }: EmailReportButtonProps) {
  const [state, setState] = useState<"idle" | "input" | "sending" | "sent" | "error">("idle");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const send = async () => {
    if (!email || !email.includes("@")) {
      setErrorMsg("有効なメールアドレスを入力してください");
      return;
    }
    setState("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, email }),
      });

      if (res.ok) {
        setState("sent");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "送信に失敗しました");
        setState("error");
      }
    } catch {
      setErrorMsg("通信エラーが発生しました");
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="card p-4 border-green-500/30 text-center">
        <p className="text-green-400 font-medium">✅ レポートを送信しました</p>
        <p className="text-xs text-slate-500 mt-1">{email} に送信されました</p>
      </div>
    );
  }

  if (state === "idle") {
    return (
      <button
        onClick={() => setState("input")}
        className="btn-secondary w-full py-3 flex items-center justify-center gap-2"
      >
        📧 レポートをメールで送る
      </button>
    );
  }

  return (
    <div className="card p-4 space-y-3">
      <p className="text-sm text-slate-300 font-medium">📧 メールでレポートを受け取る</p>
      <input
        type="email"
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none text-sm"
        disabled={state === "sending"}
        autoFocus
      />
      {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setState("idle");
            setEmail("");
            setErrorMsg("");
          }}
          className="btn-secondary flex-1 py-2 text-sm"
          disabled={state === "sending"}
        >
          キャンセル
        </button>
        <button
          onClick={send}
          className="btn-primary flex-1 py-2 text-sm"
          disabled={state === "sending" || !email}
        >
          {state === "sending" ? "送信中..." : "送信する"}
        </button>
      </div>
    </div>
  );
}
