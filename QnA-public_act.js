
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
    document.getElementById('timestamp').innerHTML = '2024년 4월 2일 오전 4:01';
    document.getElementById('timestamp').style.display = 'inline-block';
}