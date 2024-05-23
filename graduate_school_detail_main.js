// 한줄평 입력란 토글 함수
function toggleReviewInput() {
    var reviewInputSection = document.getElementById("reviewInputSection");

    // 입력란이 숨겨져 있으면 보이도록 하고, 그렇지 않으면 숨깁니다.
    if (reviewInputSection.style.display === "none") {
        reviewInputSection.style.display = "block";
        createReviewInput(); // 한줄평 입력란을 생성합니다.
    } else {
        reviewInputSection.style.display = "none";
    }
}

// 한줄평 입력란을 동적으로 생성하는 함수
function createReviewInput() {
    var reviewInputSection = document.getElementById("reviewInputSection");

    // 이미 생성된 입력란이 있다면 더 이상 생성하지 않습니다.
    if (reviewInputSection.querySelector("#reviewInput") !== null) {
        return;
    }

    // 새로운 입력 요소를 생성하고 입력란에 추가합니다.
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "reviewInput");
    input.setAttribute("placeholder", "한줄평을 입력하세요");

    // 저장 버튼도 함께 생성합니다.
    var saveButton = document.createElement("button");
    saveButton.textContent = "저장";
    saveButton.addEventListener("click", reviewFunc); // 저장 버튼 클릭 시 reviewFunc() 함수 호출

    // 입력란과 버튼을 입력란 섹션에 추가합니다.
    reviewInputSection.appendChild(input);
    reviewInputSection.appendChild(saveButton);

    // 입력란에 포커스를 설정합니다.
    input.focus();
}

// 한줄평 함수
function reviewFunc() {
    var review = document.getElementById("reviewInput").value;
    
    if (review.trim() !== "") {
        console.log("한줄평: " + review);
        document.getElementById("reviewInput").value = "";
        toggleReviewInput(); // 한줄평을 저장한 후에 입력란을 숨깁니다.
    } else {
        alert("한줄평을 입력해주세요!");
    }
}
