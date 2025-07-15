const loginForm = document.querySelector('form');
const messageDiv = document.getElementById('message');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    
    const userId = document.getElementById('userid').value.trim();
    const password = document.getElementById('pw').value;

    // 아이디나 비밀번호가 비어있으면 함수를 종료합니다.
    if (!userId || !password) {
        showMessage('아이디와 비밀번호를 모두 입력해주세요.', 'error');
        return;
    }

    // localStorage에서 userId를 key로 하는 데이터를 가져옵니다.
    const userDataStr = localStorage.getItem(userId);
    
    //아이디 존재 여부 확인
    if (!userDataStr) { 
        showMessage('존재하지 않는 아이디입니다.', 'error');
        return; 
    }
  
    const userData = JSON.parse(userDataStr);
    
    // 비밀번호 일치 여부 확인
    if (userData.pwtrim === password) {
        // 로그인 성공
        showMessage(`로그인 성공! 환영합니다, ${userData.username || userId}님.`, 'success'); // 저장된 이름이 있다면 보여줍니다.
        loginForm.reset(); // 성공 시에만 폼을 초기화합니다.
        
        // 1초 후 메인 페이지로 이동
        setTimeout(() => {
            location.href = "../calendar.html";
        }, 1000);

    } else {
        // 로그인 실패
        showMessage('비밀번호가 틀렸습니다.', 'error');
    }
});

function showMessage(message, classType) {
    messageDiv.textContent = message;

    // 이전 클래스 제거
    messageDiv.classList.remove('success', 'error');

    // 새 클래스 추가(파라미터로 전달)
    messageDiv.classList.add(classType); // 'success' 또는 'error'
}
