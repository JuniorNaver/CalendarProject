const saveBtn = document.getElementById('saveBtn');
const scheduleForm = document.getElementById('scheduleForm');

saveBtn.addEventListener('click', () => {
    scheduleForm.requestSubmit();
});


scheduleForm.addEventListener('submit', (event) => {
    event.preventDefault(); // 기본 제출 막음

    // 데이터 처리 코드
    const newData = getScheduleData();
    if (!newData) return;

    // 기존 데이터 가져오기
    const existingDataArr = JSON.parse(localStorage.getItem('schedules') || '[]'); // 저장된 데이터가 없으면 빈 배열 반환


    // 추가
    existingDataArr.push(newData);

    // 저장(키: schedules, 저장되는 값: 스케쥴데이터 객체 배열)
    localStorage.setItem('schedules', JSON.stringify(existingDataArr));

    // 이동
    location.href = "../calendar.html";
});

// ✅ 종일 체크 시 시간 필드 숨기기
const allDayCheck = document.getElementById('allDayCheck');
const startTimeInput = document.getElementById('startTimeInput');
const endTimeInput = document.getElementById('endTimeInput');

allDayCheck.addEventListener('change', () => {
    if (allDayCheck.checked) {
        startTimeInput.disabled = allDayCheck.checked;
        startTimeInput.style.display = 'none';
        endTimeInput.disabled = allDayCheck.checked;
        endTimeInput.style.display = 'none';

    } else {
        startTimeInput.disabled = allDayCheck.checked;
        startTimeInput.style.display = '';
        endTimeInput.disabled = allDayCheck.checked;
        endTimeInput.style.display = '';
    }
});

// ✅ 메모 체크 시 텍스트박스 표시/비표시
const memoCheck = document.getElementById('memoCheck');
const memoTextbox = document.getElementById('memoTextbox');

memoTextbox.disabled = true;
memoTextbox.style.display = 'none';

memoCheck.addEventListener('change', () => {
    if (memoCheck.checked) {
        memoTextbox.disabled = !memoCheck.checked;
        memoTextbox.style.display = '';

    } else {
        memoTextbox.disabled = !memoCheck.checked;
        memoTextbox.style.display = 'none';
    }
});

const titleInput = document.getElementById('title');
const startDateInput = document.getElementById('startDateInput');
const endDateInput = document.getElementById('endDateInput');
// ✅ 입력값 수집 함수
function getScheduleData() {
    // 각 요소들에서 값 추출
    const title = titleInput.value.trim();
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const isAllDay = allDayCheck.checked;
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;

    const colorInput = document.querySelector('input[name="color"]:checked');
    const color = colorInput ? colorInput.value : null;

    const useMemo = memoCheck.checked;
    const memo = useMemo ? memoTextbox.value.trim() : null;

    // 유효성 검사
    if (!title || !startDate || !endDate || !color) {
        alert('제목, 날짜, 색상은 필수 입력 항목입니다.');
        return null;
    }

    const newSchedule = {
        id: Date.now(), // 고유 ID 생성
        title: title,   // 전달받은 제목
        isAllDay: isAllDay, // 종일 여부
        start: {
            date: startDate,               // 시작 날짜
            time: isAllDay ? null : startTime  // 종일이면 시간 null, 아니면 시작 시간
        },
        end: {
            date: endDate,                 // 종료 날짜
            time: isAllDay ? null : endTime    // 종일이면 시간 null, 아니면 종료 시간
        },
        color: color, // 선택한 색상
        memo: memo    // 메모 내용
    };

    return newSchedule;
}


