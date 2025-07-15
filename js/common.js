document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons(); // main 브랜치의 아이콘 생성 코드

    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoBtn = document.getElementById('logoBtn'); // feature 브랜치의 로고 버튼

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

    if (logoBtn) {
        logoBtn.addEventListener('click', () => {
            location.href = '/index.html';
        });
    }
});
