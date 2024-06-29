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
// id가 play-button인 html 태그 선택
const playButton = document.getElementById("play-button"); // 정답 버튼
const userInput = document.getElementById("user-input"); // 입력창
const resultArea = document.getElementById("result-area"); // 정답
const resetButton = document.getElementById("reset-button"); // 다시하기 버튼
const chancesArea = document.getElementById("chances-area"); // 기회
let chances = 5; // 기회 총 3번
let gameOver = false; // 게임 종료 여부

// 정답 버튼 클릭 시 게임 진행
playButton.addEventListener("click", play);

// 다시하기 버튼 클릭 시 게임 초기화
resetButton.addEventListener("click", reset);

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

  chances--; // 기회가 1씩 줄어듬
  chancesArea.textContent = `남은 기회: ${chances}번`;
  console.log("남은 기회: ", chances);

  // 입력 값에 따라 결과 출력
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

  // 기회가 끝났을 때 게임 종료
  if (chances < 1) {
    gameOver = true;
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }
}

// 초기화
function reset() {
  // user input창, 결과 초기화
  userInput.value = "";
  resultArea.textContent = "정답을 입력해주세요.";

  // 새로운 번호가 생성
  pickRandomNum();
}

pickRandomNum();
