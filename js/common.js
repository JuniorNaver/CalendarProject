lucide.createIcons(); // 아이콘 먼저 생성

const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

loginBtn.addEventListener('click', () => {
    location.href = '../login.html';
});

signupBtn.addEventListener('click', () => {
    location.href = '../signup.html';
});