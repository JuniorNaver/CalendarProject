document.addEventListener('DOMContentLoaded', () => {
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


        if (scheduleId) {
            // 수정 모드 → 같은 ID 가진 데이터 찾아서 교체
            const idx = existingDataArr.findIndex(item => item.id == scheduleId);
            if (idx !== -1) {
                newData.id = Number(scheduleId); // 기존 id 유지
                existingDataArr[idx] = newData;  // 해당 위치에 덮어쓰기
            } else {
                // ID는 있지만 배열에 없으면 → 새로 추가
                existingDataArr.push(newData);
            }
        } else {
            // 추가 모드
            existingDataArr.push(newData);
        }

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

    // id 값을 전달 받았을 때
    // 1. URL 파라미터에서 id 추출
    const urlParams = new URLSearchParams(window.location.search);
    const scheduleId = urlParams.get('id'); // 문자열

    // 2. 해당 id가 존재하면 일정 데이터 불러오기
    if (scheduleId) {
        const scheduleList = JSON.parse(localStorage.getItem('schedules') || '[]');
        const scheduleData = scheduleList.find(item => item.id == scheduleId); // 숫자 비교 위해 == 사용

        if (scheduleData) {
            // 각 입력 필드에 값 넣기
            titleInput.value = scheduleData.title;
            startDateInput.value = scheduleData.start.date;
            endDateInput.value = scheduleData.end.date;
            allDayCheck.checked = scheduleData.isAllDay;

            if (!scheduleData.isAllDay) {
                startTimeInput.value = scheduleData.start.time || '';
                endTimeInput.value = scheduleData.end.time || '';
            }

            if (scheduleData.memo) {
                memoCheck.checked = true;
                memoTextbox.disabled = false;
                memoTextbox.style.display = '';
                memoTextbox.value = scheduleData.memo;
            }

            // 색상 선택 (value 값으로 매칭)
            const colorRadio = document.querySelector(`input[name="color"][value="${scheduleData.color}"]`);
            if (colorRadio) {
                colorRadio.checked = true;
            }

            // 시간 필드 show/hide 처리
            allDayCheck.dispatchEvent(new Event('change'));
        }
    }


});