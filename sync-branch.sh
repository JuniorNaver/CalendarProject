#!/bin/bash

# 사용법 안내
if [ -z "$1" ]; then
  echo "❗ 사용법: ./sync-branch.sh feature/브랜치명"
  exit 1
fi

FEATURE_BRANCH=$1

echo "🔁 메인 브랜치로 이동 후 최신화 중..."
git checkout main || { echo "❌ main 브랜치로 이동 실패"; exit 1; }
git pull origin main || { echo "❌ main 최신화 실패"; exit 1; }

echo "🔀 작업 브랜치로 이동 중: $FEATURE_BRANCH"
git checkout $FEATURE_BRANCH || {
  echo "🆕 브랜치가 없어 새로 생성합니다: $FEATURE_BRANCH"
  git checkout -b $FEATURE_BRANCH || { echo "❌ 브랜치 생성 실패"; exit 1; }
}

echo "🔗 최신 main 브랜치 병합 중..."
git merge origin/main || { echo "⚠️ 병합 중 충돌이 발생할 수 있습니다."; }

echo "🚀 변경사항 푸시 중..."
git push origin $FEATURE_BRANCH

echo "✅ 완료: $FEATURE_BRANCH 최신 main 반영 후 푸시 완료!"