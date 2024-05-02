// 페이지 기본 함수 동작 
const ENTER_KEY_CODE = 13; //엔터키 코드
var searchInput = document.getElementById("searchInput"); //입력 부분 구현
searchInput.addEventListener("keydown", function(event) { //눌린 키가 엔터키일 때 search 함수 호출
    if (event.keyCode === ENTER_KEY_CODE) {
        search();
    }
});

// 검색 함수 - 실제로는 서버에 있는 데이터 사용해야 하기 때문에 console.log 부분 지우고 서버 데이터 관련 사항 넣어야 함
function search() {
    var searchTerm = searchInput.value; //검색어 가져와서
    console.log("검색어:", searchTerm); //여기서부터 결과 표시 부분인데 백 할 때 수정할 것
    var searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = "<p>검색 결과: " + searchTerm + "</p>";
}

function goToPage(pageUrl) { //page 이동 함수
    window.location.href = pageUrl;
  }

