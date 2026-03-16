"use client";

import { useState } from "react";
import type { CourseCompatibility } from "@/types/diagnostic";

interface CourseCompatibilityCardProps {
  courses: CourseCompatibility[];
}

const verdictStyle = (verdict: CourseCompatibility["verdict"]) => {
  switch (verdict) {
    case "対応可能":
      return {
        bg: "bg-emerald-500/10 border-emerald-500/30",
        text: "text-emerald-400",
        badge: "bg-emerald-500/20 text-emerald-300",
        icon: "✅",
      };
    case "条件付きで対応":
      return {
        bg: "bg-amber-500/10 border-amber-500/30",
        text: "text-amber-400",
        badge: "bg-amber-500/20 text-amber-300",
        icon: "⚠️",
      };
    default:
      return {
        bg: "bg-red-500/10 border-red-500/30",
        text: "text-red-400",
        badge: "bg-red-500/20 text-red-300",
        icon: "❌",
      };
  }
};

export function CourseCompatibilityCard({
  courses,
}: CourseCompatibilityCardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    courses.find((c) => c.id === "if-business-ai")?.id ?? courses[0]?.id ?? null
  );

  return (
    <div className="space-y-3">
      {courses.map((course) => {
        const style = verdictStyle(course.verdict);
        const isExpanded = expandedId === course.id;

        return (
          <div
            key={course.id}
            className={`rounded-2xl border overflow-hidden transition-all ${style.bg}`}
          >
            {/* Header */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : course.id)}
              className="w-full p-4 flex items-center gap-3 text-left"
            >
              <span className="text-2xl">{course.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-bold text-sm text-white truncate">
                    {course.label}
                  </h3>
                  <span
                    className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${style.badge}`}
                  >
                    {style.icon} {course.verdict}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {course.summary}
                </p>
              </div>
              <span
                className={`text-slate-500 text-xs transition-transform ${isExpanded ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>

            {/* Detail checks */}
            {isExpanded && (
              <div className="px-4 pb-4 space-y-2 animate-fade-in">
                {course.checks.map((check) => (
                  <div
                    key={check.name}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/40"
                  >
                    <span className="text-base mt-0.5 shrink-0">
                      {check.passed ? "✅" : "❌"}
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-medium ${check.passed ? "text-slate-200" : "text-red-300"}`}
                      >
                        {check.icon} {check.name}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        {check.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
