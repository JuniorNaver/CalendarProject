document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const addBtn = document.getElementById('addBtn');

    const calendarBody = document.getElementById('calendar-body');
    const yearMonthSpan = document.getElementById('yearMonth');

    const yearSelect = document.getElementById('yearSelect');
    const monthSelect = document.getElementById('monthSelect');

    let currentDate = new Date();
    const initialYear = currentDate.getFullYear();
    const initialMonth = currentDate.getMonth() + 1;

    function fillNumbersBetween(firstNum, lastNum, defaultNum, dateUnit, target) {
        for (let num = firstNum; num <= lastNum; num++) {
            const option = document.createElement("option");
            option.value = num;
            if (num === defaultNum) {
                option.selected = true;
            }
            option.textContent = num + dateUnit;
            target.appendChild(option);
        }
    }

    // 최초 값 설정
    const yearRange = 100;
    fillNumbersBetween(initialYear - yearRange, initialYear + yearRange, initialYear, '년', yearSelect);
    fillNumbersBetween(1, 12, initialMonth, '월', monthSelect);

    function renderCalendar(date) {
        calendarBody.innerHTML = '';
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const startDayOfWeek = firstDay.getDay();
        const lastDate = lastDay.getDate();

        let row = document.createElement('tr');
        let cellCount = 0;

        for (let i = 0; i < startDayOfWeek; i++) {
            let cell = document.createElement('td');
            cell.classList.add('empty');
            row.appendChild(cell);
            cellCount++;
        }

        for (let day = 1; day <= lastDate; day++) {
            if (cellCount % 7 === 0) {
                calendarBody.appendChild(row);
                row = document.createElement('tr');
            }
            let cell = document.createElement('td');
            cell.textContent = day;
            row.appendChild(cell);
            cellCount++;
        }

        while (cellCount % 7 !== 0) {
            let cell = document.createElement('td');
            cell.classList.add('empty');
            row.appendChild(cell);
            cellCount++;
        }

        calendarBody.appendChild(row);

        // 일정 표시 함수 호출
        renderSchedules(date);
    }

    prevBtn.addEventListener('click', () => {
        let year = Number(yearSelect.value);
        let month = Number(monthSelect.value);

        if (month === 1) {
            year -= 1;
            month = 12;
        } else {
            month -= 1;
        }

        yearSelect.value = year;
        monthSelect.value = month;
        yearSelect.dispatchEvent(new Event('change'));
        monthSelect.dispatchEvent(new Event('change'));
    });

    nextBtn.addEventListener('click', () => {
        let year = Number(yearSelect.value);
        let month = Number(monthSelect.value);

        if (month === 12) {
            year += 1;
            month = 1;
        } else {
            month += 1;
        }

        yearSelect.value = year;
        monthSelect.value = month;
        yearSelect.dispatchEvent(new Event('change'));
        monthSelect.dispatchEvent(new Event('change'));
    });

    yearSelect.addEventListener('change', () => {
        currentDate.setFullYear(Number(yearSelect.value));
        renderCalendar(currentDate);
    });

    monthSelect.addEventListener('change', () => {
        currentDate.setMonth(Number(monthSelect.value) - 1);
        renderCalendar(currentDate);
    });

    addBtn.addEventListener('click', () => {
        location.href = "../schedule.html";
    });

    renderCalendar(currentDate);

    // localStorage에서 일정 데이터 불러오기
    function loadSchedules() {
        const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
        return schedules;
    }

    // 일정 데이터를 캘린더 날짜 셀에 표시
    function renderSchedules(date) {
        const schedules = loadSchedules();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1

        // calendarBody 내부 모든 셀(td) 순회하면서 텍스트 초기화
        const cells = calendarBody.querySelectorAll('td');
        cells.forEach(cell => {
            // 비어있는 셀(empty 클래스)나 숫자가 아닌 셀은 건너뛰기
            if (cell.classList.contains('empty') || isNaN(cell.textContent)) {
                return;
            }
            const dayNumber = cell.textContent;
            cell.innerHTML = `<div class="day-number">${dayNumber}</div><div class="schedule-container"></div>`;
            cell.style.position = 'relative';
        });

        schedules.forEach(schedule => {
            const start = schedule.start;
            const end = schedule.end;

            // 일정이 이번 달에 포함되는지 확인
            // (간단히 시작일이 이번 년/월과 같은 경우만 표시)
            if (start.date.startsWith(`${year}-${String(month).padStart(2, '0')}`)) {
                const startDay = Number(start.date.split('-')[2]);
                const endDay = Number(end.date.split('-')[2]);

                for (let day = startDay; day <= endDay; day++) {
                    // day에 해당하는 셀 찾기
                    const cell = Array.from(cells).find(td => {
                        const dayNumberDiv = td.querySelector('.day-number');
                        return dayNumberDiv && Number(dayNumberDiv.textContent) === day;
                    });
                    if (cell) {
                        const container = cell.querySelector('.schedule-container');
                        if (container) {
                            // 일정 타이틀 표시용 div 생성
                            const scheduleDiv = document.createElement('div');
                            scheduleDiv.textContent = schedule.title;
                            scheduleDiv.style.backgroundColor = schedule.color;
                            scheduleDiv.style.color = '#fff';
                            scheduleDiv.style.fontSize = '0.75rem';
                            scheduleDiv.style.padding = '2px 4px';
                            scheduleDiv.style.borderRadius = '4px';
                            scheduleDiv.style.marginTop = '2px';
                            scheduleDiv.style.overflow = 'hidden';
                            scheduleDiv.style.whiteSpace = 'nowrap';
                            scheduleDiv.style.textOverflow = 'ellipsis';
                            scheduleDiv.style.cursor = 'pointer';

                            // 클릭 시 일정 상세 페이지로 이동 (id를 쿼리 파라미터로 전달)
                            scheduleDiv.addEventListener('click', () => {
                                location.href = `../schedule.html?id=${schedule.id}`;
                            });

                            container.appendChild(scheduleDiv);
                        }
                    }
                }

            }
        });
    }
});