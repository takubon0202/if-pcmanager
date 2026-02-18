#!/bin/bash
# ノートPCデータベース自動更新スクリプト
# Gemini CLI を使用してデータを最新化する

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$PROJECT_DIR/scripts/update-log-$(date +%Y-%m-%d).md"
PROMPT_FILE="$SCRIPT_DIR/update-prompt.md"
GEMINI_BIN="$HOME/.npm-global/bin/gemini"

echo "=== ノートPCデータベース更新開始: $(date '+%Y-%m-%d %H:%M:%S') ===" | tee "$LOG_FILE"

cd "$PROJECT_DIR"

# Gemini CLI が存在するか確認
if [ ! -f "$GEMINI_BIN" ]; then
  echo "ERROR: Gemini CLI not found at $GEMINI_BIN" | tee -a "$LOG_FILE"
  exit 1
fi

# プロンプト読み込み
PROMPT=$(cat "$PROMPT_FILE")

# Gemini CLI 実行（非対話・YOLO モード）
echo "Gemini CLI でデータ更新中..." | tee -a "$LOG_FILE"
"$GEMINI_BIN" \
  -m gemini-3-flash-preview \
  -p "$PROMPT" \
  -y \
  2>&1 | tee -a "$LOG_FILE"

# ビルドチェック
echo "ビルドチェック中..." | tee -a "$LOG_FILE"
if npx next build 2>&1 | tee -a "$LOG_FILE"; then
  echo "✅ ビルド成功" | tee -a "$LOG_FILE"
else
  echo "❌ ビルド失敗 - 変更を元に戻します" | tee -a "$LOG_FILE"
  git checkout -- src/data/laptops.ts
  exit 1
fi

# 差分があればコミット＆プッシュ
if git diff --quiet src/data/laptops.ts; then
  echo "📝 変更なし - スキップ" | tee -a "$LOG_FILE"
else
  echo "📦 変更をコミット中..." | tee -a "$LOG_FILE"
  git add src/data/laptops.ts
  git commit -m "chore: ノートPCデータベース定期更新 ($(date +%Y-%m-%d))"
  git push
  echo "✅ プッシュ完了 - Vercel自動デプロイ中" | tee -a "$LOG_FILE"
fi

# 古いログを削除（7日以上前）
find "$SCRIPT_DIR" -name "update-log-*.md" -mtime +7 -delete 2>/dev/null || true

echo "=== 更新完了: $(date '+%Y-%m-%d %H:%M:%S') ===" | tee -a "$LOG_FILE"
