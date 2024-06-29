// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 Down!!
// 랜덤번호가 > 유저번호 Up!!
// Reset버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝남 (더이상 추측 불가, 버튼이 disable )
// 유저가 1~100 범위 밖에 숫자를 입력하면 알림, 기회를 깍지 않음
// 유저가 이미 입력한 숫자를 또 입력하면 알림, 기회를 깍지 않음

let computerNum = 0;
const playButton = document.getElementById("play-button"); // id가 play-button인 html 태그 선택
const userInput = document.getElementById("user-input"); // 입력창
const resultArea = document.getElementById("result-area"); // 정답

// 정답 버튼 클릭 시
playButton.addEventListener("click", play);

// 랜덤번호
function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  // Math.random(): 0~ 사이 값을 반환, 1에 가까운 숫자를 반환
  console.log("정답", computerNum);
}

// 게임 진행
function play() {
  const userValue = userInput.value; // 입력값
  console.log("입력한 값: ", userValue);

  if (userValue < computerNum) {
    console.log("Up!!");
    resultArea.textContent = "Up!!";
  } else if (userValue > computerNum) {
    console.log("Down!!");
    resultArea.textContent = "Down!!";
  } else {
    console.log("맞췄습니다!");
    resultArea.textContent = "맞췄습니다!";
  }
}

pickRandomNum();
