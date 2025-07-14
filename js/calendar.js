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
