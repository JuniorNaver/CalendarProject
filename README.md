# ShareProject 협업 가이드

안녕하세요!  
이 프로젝트는 로그인, 회원가입, 캘린더, 일정 관리 기능을 HTML/CSS/JS로 구현하는 웹 프로젝트입니다.  
효율적인 협업을 위해 아래 가이드를 꼭 따라 주세요!

---
# 초기 가이드
## 1. (초기 1회만 진행)저장소 클론하기

### i) CalendarProject 폴더(소스코드 최상위 폴더)를 생성할 상위 디렉터리 지정하기
    ex) C:\frontenddeveloper
### ii) 우클릭 후 open git bash here 선택
    -> MINGW64:/c/CalendarProject 상단 배너 확인
### iii) 하위 명령어 순서대로 수행
```bash
git clone https://github.com/JuniorNaver/CalendarProject.git
cd CalendarProject
```

## 2. 디렉터리 구조 설명
```
/CalendarProject
├── index.html           ← 메인 진입 페이지 (소개/버튼 등)
├── login.html           ← 로그인 화면
├── signup.html          ← 회원가입 화면
├── calendar.html        ← 월별/일별 일정 확인 및 등록
│
├── js/                  ← 기능별 JS 모듈 폴더
│   ├── auth.js          ← 로그인/회원가입 로직
│   ├── calendar.js      ← 달력 렌더링 및 일정 처리
│   └── utils.js         ← 공통 함수, 날짜 유틸 등
│
├── css/                 ← 스타일 파일 폴더
│   ├── style.css        ← 공통 스타일 (index, login, signup 등)
│   └── calendar.css     ← 달력 전용 스타일
│
└── data/                ← 샘플 데이터나 로컬 저장소 대체용 파일
    └── sample.json      ← 일정 테스트용 JSON 데이터 (선택사항)
```

## 3. 브랜치 설명
```
/CalendarProject
├── 브랜치: feature/auth      → login.html, signup.html, auth.js
├── 브랜치: feature/calendar  → calendar.html, calendar.js
├── 브랜치: feature/schedule  → 일정 추가 로직, localStorage
├── 브랜치: feature/ui        → style.css, calendar.css
├── 브랜치: feature/utils     → utils.js (날짜 계산 등)
└── 메인 브랜치: main         → 모든 기능이 병합되어 배포되는 기준
```

---
# 핵심 가이드[작업 시작 전]

## 1. 브랜치 접속 및 작업하기(가장 중요‼)
- 항상 최신 main 브랜치에서 해당 브랜치로 접속하여 작업하세요.
```bash
# 1. main 최신화
git checkout main
git pull origin main

# 2. 내 브랜치로 전환 + 최신 main 병합
git checkout feature/브랜치명
git merge origin/main  # 또는 git rebase origin/main

# 3. 병합 후 커밋 & 푸시
git push origin feature/브랜치명
```
- 브랜치명은 기능별로 아래처럼 작성합니다:
``` bash
feature/auth       # 로그인/회원가입 기능
feature/calendar   # 달력 렌더링 및 월/일 이동 기능
feature/schedule   # 일정 등록/조회/삭제 기능
feature/ui         # 스타일 및 UI 개선
feature/utils      # 공통 함수 및 유틸리티
```
## 2. 작업 시작 전 주의사항
- 항상 main 브랜치를 최신으로 유지하세요.

- 직접 main 브랜치에 커밋하지 말고 PR을 통해 병합하세요.

- 커밋 메시지는 [기능명] 작업 내용 형식을 권장합니다.

- 충돌 발생 시 적극적으로 해결하고 팀원과 소통하세요.

---
# 핵심 가이드[작업 마친 후]

## 3. 작업 마친 후 커밋과 푸시하기(절대 main 브랜치 직접 push X)
### a) .html .css .js 파일 수정 -> 기능별 브랜치 이용(main 사용 X)
```bash
git checkout feature/기능명   # 수정하고자 하는 기능별 브랜치로 이동
git add .                     # 모든 파일 스테이지에 올리기
git commit -m "커밋문구"       # 문구(수정사항) 작성 후 커밋
git push                      # 깃허브 feature/기능명 브랜치에 푸시
```
### b) .md 파일, image 폴더 수정 -> main 브랜치 이용(드물게 사용)
```bash
git checkout main             # 코드일 경우는 절대 main 이용 X
git add .
git commit -m "커밋문구"
git push
```

## 4. GitHub에서 Pull Request(PR) 생성(main으로 합치는 작업)
### i) GitHub 저장소에서 Pull Requests 탭 클릭
### ii) New Pull Request 클릭
### iii) base branch: main
### iv) compare branch: feature/기능명 선택
### v) 제목과 설명을 명확하게 작성 후 PR 생성
### vi) 팀원 리뷰(겹치는 코드 아니면 바로 병합해도 괜찮아요!) 후 승인되면 main 브랜치에 병합

## 5. 추가 팁
- 프로젝트 내 파일 구조와 코딩 컨벤션을 지켜주세요.

- 기능 완성 후 반드시 테스트를 진행하세요.

- 궁금한 점이나 문제가 있으면 바로 공유해주세요!

