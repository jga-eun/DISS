
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
    document.querySelector('.open-button').style.display = 'none';
    document.getElementById('additional-info').innerHTML = 'make all 명령은 모두 작성되어있습니다.';
    const timestampDiv = document.getElementById('timestamp');
    timestampDiv.innerHTML = '2024년 4월 2일 오전 4:01';
    timestampDiv.style.display = 'block'; // 변경된 내용 표시
    timestampDiv.style.color = '#555'; // 텍스트 색상 변경
}

