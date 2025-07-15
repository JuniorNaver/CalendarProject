document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons(); // 아이콘 먼저 생성

    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            location.href = '/login.html';
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            location.href = '/signup.html';
        });
    }
});
