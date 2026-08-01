#!/usr/bin/env bash
# auto-commit-push.sh — 提交并自动推送，Vercel 会自动构建部署
# 用法: ./bin/auto-commit-push.sh "提交信息"
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

BRANCH="$(git branch --show-current)"
# 有未推送的提交数
UNPUSHED=$(git rev-list --count "origin/$BRANCH..HEAD" 2>/dev/null || echo 0)
HAS_CHANGES=$( [ -n "$(git status --porcelain)" ] && echo 1 || echo 0 )

# 无改动且无未推送提交 → 跳过
if [ "$HAS_CHANGES" = "0" ] && [ "$UNPUSHED" = "0" ]; then
  echo "ℹ️  没有待提交改动，也没有未推送提交，跳过。"
  exit 0
fi

# 有改动则提交（中文信息）
if [ "$HAS_CHANGES" = "1" ]; then
  git add -A
  git commit -m "$1"
  echo "✅ 已提交: $(git rev-parse --short HEAD)"
fi

# 推送（绕过失效的代理 + DNS 抖动重试）
for i in 1 2 3; do
  if git -c http.https://github.com.proxy= push origin "$BRANCH" 2>&1; then
    echo "✅ 已推送到 origin/$BRANCH — Vercel 将自动构建部署"
    exit 0
  fi
  echo "⚠️  push 失败（${i}/3），5 秒后重试..."
  sleep 5
done

echo "❌ push 三次仍失败 — 可手动执行: git push"
exit 1
