function navigateToPage(url) {
  window.location.href = url;
}

function incrementLikes(button) {
  let likes = parseInt(button.innerText.match(/\d+/)[0]);
  likes += 1;
  button.innerHTML = `💜 ${likes}`;
}

/*DB 연결때 수정*/
function showAnswer() {
  document.querySelector(".open-button").style.display = "none";
  document.getElementById("additional-info").innerHTML =
    "make all 명령은 모두 작성되어있습니다.";
  const timestampDiv = document.getElementById("timestamp");
  timestampDiv.innerHTML = "2024년 4월 2일 오전 4:01";
  timestampDiv.style.display = "block";
  timestampDiv.style.color = "#555";
}

/*댓글 작성*/
function sendMessage() {
  const inputElement = document.querySelector(".chat-input");
  const message = inputElement.value.trim();

  if (message) {
    // 새로운 채팅 메시지 요소를 생성
    const messageElement = document.createElement("div");
    messageElement.className = "detail-row";
    messageElement.style.marginLeft = "80px";
    messageElement.innerHTML = `
        <div style="display: flex; align-items: center;">
            <img src="image/icon.png" alt="아이콘" class="detail-icon">
            <div class="icon-info">
                <strong>나</strong>
                <p id="additional-info">${message}</p>
            </div>
        </div>
      `;

    // 새 메시지를 'existing-comments' 컨테이너의 마지막에 추가
    const chatContainer = document.querySelector(".existing-comments");
    chatContainer.appendChild(messageElement);

    inputElement.value = "";
  }
}

/*글 등록*/
function upload() {
  const title = document.querySelector(
    "input[placeholder='제목을 입력하세요']"
  ).value;
  const subject = document.querySelector(
    "input[placeholder='과목명을 입력하세요']"
  ).value;

  // 제목이 비어있는 경우 경고 메시지 출력
  if (!title.trim()) {
    alert("제목을 입력해주세요.");
    return; // 함수 실행 중단
  }

  const now = new Date();
  const period = now.getHours() >= 12 ? "오후" : "오전";
  const hours = (now.getHours() % 12 || 12).toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const time = `${period} ${hours}:${minutes}`;

  const newQuestion = {
    id: "나",
    title,
    subject,
    time,
    likes: 0,
  };

  localStorage.setItem("newQuestion", JSON.stringify(newQuestion));
  window.location.href = "QnA-public_main.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const newQuestion = JSON.parse(localStorage.getItem("newQuestion"));
  if (newQuestion) {
    const questionsContainer = document.querySelector(".questions");
    const questionHTML = `
          <div class="question">
              <img src="image/icon.png" alt="아이콘" class="question-icon">
              <div class="question-content">
                  <div class="question-header">
                      <span class="question-author">${newQuestion.id}</span>
                      <div class="question-time alignright">${newQuestion.time}</div>
                  </div>
                  <div class="question-header">
                      <div class="question-title">${newQuestion.title}</div>
                      <button class="question-likes alignright" onclick="incrementLikes(this); event.stopPropagation();">💜 ${newQuestion.likes}</button>
                  </div>
              </div>
          </div>
      `;
    questionsContainer.insertAdjacentHTML("afterbegin", questionHTML);
    localStorage.removeItem("newQuestion");
  }
});
