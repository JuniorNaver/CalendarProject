const saveBtn = document.getElementById('saveBtn');
const scheduleForm = document.getElementById('scheduleForm');

saveBtn.addEventListener('click', () => {
    scheduleForm.requestSubmit();
});


scheduleForm.addEventListener('submit', (event) => {
    event.preventDefault(); // 기본 제출 막음

    // 데이터 처리 코드

    location.href = "../calendar.html";
});

