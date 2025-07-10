# ShareProject 전체 브랜치 최신화 및 관리 가이드 (관리자용)

---

## 1. 목적  
- 모든 기능 브랜치가 `main` 최신 상태를 기준으로 작업되도록 유지  
- 충돌 최소화 및 깔끔한 커밋 이력 관리  
- PR 시 원활한 병합 환경 조성  

---

## 2. 전체 최신화 전략

### 2-1. main 브랜치 최신화  
```bash
git checkout main
git pull origin main
```

### 2-2. 기능별 브랜치 최신화 및 병합
```bash
branches=(
  "feature/auth"
  "feature/calendar"
  "feature/schedule"
  "feature/ui"
  "feature/utils"
)

for branch in "${branches[@]}"; do
  echo "🔄 최신화 중: $branch"
  git checkout $branch || continue
  git pull origin $branch
  git merge origin/main --no-edit || {
    echo "⚠️ 병합 충돌 발생: $branch - 수동 해결 필요"
    continue
  }
  git push origin $branch
  echo "✅ 완료: $branch"
done

git checkout main
```

## 3. 권장 스케줄 및 역할
| 시점          | 담당자  | 작업 내용                                    |
|---------------|---------|----------------------------------------------|
| 매일 아침/회의 후 | 관리자  | 전체 브랜치 최신화 스크립트 실행              |
| PR 병합 직후   | 관리자  | 해당 브랜치 최신화 여부 확인 및 필요 시 병합   |
| 새 기능 시작 전 | 개발자  | 본인 브랜치에서 main 최신 내용 병합            |
| 충돌 발생 시   | 관리자  | 병합 담당자/개발자에게 충돌 해결 요청           |

## 4. GitHub 브랜치 보호 설정
- **main 브랜치**
  - Pull Request를 통한 병합만 허용
  - 강제 푸시(Force Push) 금지
  - 리뷰어 승인 필수 설정

- **기능 브랜치 (선택적)**
  - 필요 시 Force Push 금지 설정 가능

## 5. PR 승인 시 체크리스트
- main 최신화 및 병합 여부 확인
- 충돌 없는 상태인지 확인
- 커밋 메시지 일관성 확인
- 기능별 코드 분리 적절성 검토

## 6. 참고 및 주의사항
- 충돌 발생 시 반드시 직접 해결하거나 담당자와 협의
- 관리자 권한으로 강제 병합 시 팀원과 사전 협의 필수
- 자동화 스크립트는 충돌 발생 시 멈추므로 수동 개입 필요
