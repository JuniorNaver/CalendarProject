/shareProject
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
    └── sample.json      ← 일정 테스트용 JSON 데이터 (선택)

/shareProject
├── 브랜치: feature/auth      → login.html, signup.html, auth.js
├── 브랜치: feature/calendar  → calendar.html, calendar.js
├── 브랜치: feature/schedule  → 일정 추가 로직, localStorage
├── 브랜치: feature/ui        → style.css, calendar.css
├── 브랜치: feature/utils     → utils.js (날짜 계산 등)
└── 메인 브랜치: main         → 모든 기능이 병합되어 배포되는 기준