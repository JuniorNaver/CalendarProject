
const form = document.querySelector('form');
const userId = document.getElementById('userid');
const pw = document.getElementById('pw');
const pwConfirm = document.getElementById('pw-confirm');

const signupForm = document.getElementById('signup');
const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

// 회원가입 처리
signup.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const userIdtrim = document.getElementById('userid').value.trim();
  const pwtrim = document.getElementById('pw').value;
  const emailtrim = document.getElementById('email').value.trim();
  
  const userid = document.getElementById('userid');
    
  if (userid.value.length < 4) {
        alert("아이디는 4자 이상이어야 합니다.");
        userid.focus();
        return;
    }

  if (localStorage.getItem(userId)==userId.value) {
    alert("이미 존재하는 아이디입니다.");
    return;
  }

   if (pw.value !== pwConfirm.value) {
        alert("비밀번호가 일치하지 않습니다.");
        pwConfirm.focus();
        return; // 함수 종료
    }
  
    const userData = { userIdtrim, pwtrim, emailtrim };
  
  // 회원 정보 로컬스토리지 저장 (userId 키로)
    localStorage.setItem(userIdtrim, JSON.stringify(userData));

    // 모든 유효성 검사를 통과했을 경우

    alert("회원가입 성공!");
    location.href ="login.html"
  
    console.log(localStorage);
  
    signupForm.reset();
});
