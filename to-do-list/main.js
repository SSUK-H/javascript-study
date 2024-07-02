// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할 일이 추가된다
// 삭제 버튼을 누르면 할 일이 삭제된다
// 완료 버튼을 누르면 할 일이 종료되고 밑줄이 긋기
// 종료 탭을 누르면 언더바 이동
// 종료 탭은 종료된 할 일만, 진행 중인 탭은 진행 중인 할 일만
// 전체 탭은 전체 할 일만

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
let taskList = [];

// 할일 입력
taskForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  // 입력한 할일 저장
  const taskContent = taskInput.value;
  taskList.push(taskContent);
  console.log(taskList);

  render(); // 할일 목록에 추가

  taskInput.value = ""; // 저장 후 초기화
}

// 할일 목록에 나타내기
function render() {
  const taskBoard = document.getElementById("task-board");
  let resultHTML = "";

  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `
      <div class="task">
        <div class="task-content">
         <button type="button">완료</button>
         <p>${taskList[i]}</p>
        </div>
        <button type="button">삭제</button>
      </div>
    `;
  }
  console.log(resultHTML);

  taskBoard.innerHTML = resultHTML;
}
