document.addEventListener('DOMContentLoaded', () => {

    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoBtn = document.getElementById('logoBtn'); 

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
