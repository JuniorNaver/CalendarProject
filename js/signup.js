document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup');
  const userId = document.getElementById('userid');
  const pw = document.getElementById('pw');
  const pwConfirm = document.getElementById('pw-confirm');
  const messageDiv = document.getElementById('message');

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userIdtrim = userId.value.trim();
    const pwtrim = pw.value;
    const emailtrim = document.getElementById('email').value.trim();

    if (userId.value.length < 4) {
      alert("아이디는 4자 이상이어야 합니다.");
      userId.focus();
      return;
    }

    if (localStorage.getItem(userIdtrim)) {
      alert("이미 존재하는 아이디입니다.");
      return;
    }

    if (pw.value !== pwConfirm.value) {
      alert("비밀번호가 일치하지 않습니다.");
      pwConfirm.focus();
      return;
    }

    const userData = { userIdtrim, pwtrim, emailtrim };
    localStorage.setItem(userIdtrim, JSON.stringify(userData));

    alert("회원가입 성공!");
    location.href = "login.html";
    signupForm.reset();
  });
});
