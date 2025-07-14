
const calendarBody = document.getElementById('calendar-body');
const yearMonthSpan = document.getElementById('yearMonth');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

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

    // 이번 달 1일
    const firstDay = new Date(year, month, 1);
    // 이번 달 마지막 날
    const lastDay = new Date(year, month + 1, 0);

    const startDayOfWeek = firstDay.getDay(); // 0:일요일, 1:월요일 ...
    const lastDate = lastDay.getDate();

    let row = document.createElement('tr');
    let cellCount = 0;

    // 빈칸 채우기 (이전 달 날짜 대신 빈칸)
    for (let i = 0; i < startDayOfWeek; i++) {
        let cell = document.createElement('td');
        cell.classList.add('empty');
        cell.textContent = '';
        row.appendChild(cell);
        cellCount++;
    }

    // 날짜 채우기
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

    // 마지막 줄 남은 칸 빈칸으로 채우기
    while (cellCount % 7 !== 0) {
        let cell = document.createElement('td');
        cell.classList.add('empty');
        cell.textContent = '';
        row.appendChild(cell);
        cellCount++;
    }
    calendarBody.appendChild(row);
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

    // 실제 이벤트 발생시켜서 달력 갱신하게 하기
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

    // 실제 이벤트 발생시켜서 달력 갱신하게 하기
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

// 최초 렌더링
renderCalendar(currentDate);


