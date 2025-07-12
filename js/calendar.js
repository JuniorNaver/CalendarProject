
const calendarBody = document.getElementById('calendar-body');
const yearMonthSpan = document.getElementById('yearMonth');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

function renderCalendar(date) {
    calendarBody.innerHTML = '';

    const year = date.getFullYear();
    const month = date.getMonth();

    yearMonthSpan.textContent = `${year}년 ${month + 1}월`;

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
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

// 최초 렌더링
renderCalendar(currentDate);
