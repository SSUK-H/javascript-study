// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할 일이 추가된다
// 삭제 버튼을 누르면 할 일이 삭제된다
// 완료 버튼을 누르면 할 일이 종료되고 밑줄이 긋기
// 종료 탭을 누르면 언더바 이동
// 종료 탭은 종료된 할 일만, 진행 중인 탭은 진행 중인 할 일만
// 전체 탭은 전체 할 일만

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const checkButton = document.getElementById("#check-button");
let taskList = [];

// 페이지 로드 시 입력창 자동 포커스
taskInput.focus();

// 할일 입력
taskForm.addEventListener("submit", addTask);

// 작업 추가하기
function addTask(e) {
  e.preventDefault();

  // 입력값 없는 경우 알림
  if (taskInput.value === "") {
    alert("할 일을 입력해주세요.");
    return;
  }

  // 입력한 할일 저장
  const task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);

  render(); // 할일 목록에 추가

  taskInput.value = ""; // 저장 후 초기화
}

// 할일 목록에 나타내기
function render() {
  const taskBoard = document.getElementById("task-board");
  let resultHTML = "";

  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `
      <div class="task task-done">
        <div class="task-content">
          <button id="check-button" class="checked" type="button" onclick="toggleComplete('${taskList[i].id}')">
            <i class="fa-solid fa-check"></i>
          </button>
         <p class="task-done">${taskList[i].taskContent}</p>
        </div>
        <button id="delete-button" type="button" onclick="deleteTask('${taskList[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
      </div>
    `;
    } else {
      resultHTML += `
      <div class="task">
        <div class="task-content">
          <button id="check-button" type="button" onclick="toggleComplete('${taskList[i].id}')">
            <i class="fa-solid fa-check"></i>
          </button>
         <p>${taskList[i].taskContent}</p>
        </div>
        <button id="delete-button" type="button" onclick="deleteTask('${taskList[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
      </div>
    `;
    }
  }

  taskBoard.innerHTML = resultHTML;
}

// 작업 완료하기
// 체크한 작업 정보 가져와서 체크 여부 확인
function toggleComplete(id) {
  const task = taskList.find((task) => task.id === id);

  if (task) {
    task.isComplete = !task.isComplete;
  }
  console.log("click: ", id, taskList);

  render(); // UI에 반영
}

// 삭제하기
function deleteTask(id) {
  // 선택한 아이디인 배열 인덱스 찾기
  const taskIndex = taskList.findIndex((task) => task.id === id);
  console.log(taskIndex);

  // 해당 아이디가 포함된 배열 요소를 삭제
  if (taskIndex !== -1) {
    taskList.splice(taskIndex, 1);
  }

  console.log("click: ", id, taskList);

  render(); // UI에 반영
}

// 교유 아이디 만들기
// 어떤 작업인지 확인하기 위해
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
