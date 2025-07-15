document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            location.href = '/login.html';
        });
    }

});