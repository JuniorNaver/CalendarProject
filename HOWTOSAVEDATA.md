# localStorage 주요 메서드 및 사용법

## localStorage 란?

- **localStorage**는 웹 브라우저가 제공하는 **Web Storage API** 중 하나로,  
  웹 페이지에서 데이터를 **키(key)와 값(value)의 쌍으로 영구 저장**할 수 있는 저장소입니다.

- 저장된 데이터는 **브라우저를 닫아도 유지**되고,  
  같은 도메인 내 모든 페이지에서 공유됩니다.

- 저장 용량은 브라우저마다 다르지만 대략 **5MB 정도**로,  
  쿠키보다 훨씬 더 큰 데이터를 저장할 수 있습니다.

- 저장된 값은 **문자열(String) 형태**로 저장되며,  
  객체나 배열을 저장하려면 `JSON.stringify()`로 변환 후 저장하고,  
  불러올 때는 `JSON.parse()`를 사용해 다시 객체로 변환해야 합니다.

---


```javascript
// 객체 관련 내용은 무시해도 됨

// 1. 데이터 저장하기 - setItem(key, value)
// key 이름으로 값을 저장, value는 문자열이어야 함
localStorage.setItem("username", "junhee");

// 객체나 배열 저장 시 JSON.stringify로 문자열 변환 필요
const user = { name: "준희", age: 25 };
localStorage.setItem("user", JSON.stringify(user));

// ---------------------------------------------------

// 2. 데이터 불러오기 - getItem(key)
// 저장된 key 값 가져오기, 없으면 null 반환
const name = localStorage.getItem("username");
console.log(name); // 출력: junhee

// 객체/배열은 JSON.parse로 원래 타입 변환
const userStr = localStorage.getItem("user");
if (userStr !== null) {
  const userObj = JSON.parse(userStr);
  console.log(userObj.name); // 출력: 준희
}

// ---------------------------------------------------

// 3. 데이터 삭제하기 - removeItem(key)
// 특정 key에 저장된 데이터 삭제
localStorage.removeItem("username");

// 삭제 후 가져오면 null
console.log(localStorage.getItem("username")); // 출력: null

// ---------------------------------------------------

// 4. 전체 데이터 삭제하기 - clear()
// 저장소 내 모든 데이터 삭제
localStorage.clear();

// 삭제 후 데이터는 모두 null
console.log(localStorage.getItem("user")); // 출력: null

// ---------------------------------------------------

// 5. 저장된 key 개수 및 key 이름 확인하기
console.log(localStorage.length);   // 저장된 key 총 개수
console.log(localStorage.key(0));   // 0번째 key 이름 출력
