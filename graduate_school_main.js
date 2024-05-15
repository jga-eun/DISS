var selectedBranch = null; // 선택된 분야의 정보를 저장할 변수
var selectedRegion = null; // 선택된 지역의 정보를 저장할 변수

// 클릭한 셀에 해당하는 분야 정보 저장하는 함수
function selectBranch(branchId) {
    // 이미 선택된 분야가 있다면 선택 해제
    if (selectedBranch === branchId) {
        selectedBranch = null;
    } else {
        // 이전에 선택된 분야가 있다면 선택 해제
        if (selectedBranch !== null) {
            var prevSelectedCell = document.getElementById(selectedBranch);
            prevSelectedCell.classList.remove('selected');
        }
        selectedBranch = branchId;
    }
    updateCellStyle(branchId);
}

// 클릭한 셀에 해당하는 지역 정보 저장하는 함수
function selectRegion(regionId) {
    // 이미 선택된 지역이 있다면 선택 해제
    if (selectedRegion === regionId) {
        selectedRegion = null;
    } else {
        // 이전에 선택된 지역이 있다면 선택 해제
        if (selectedRegion !== null) {
            var prevSelectedCell = document.getElementById(selectedRegion);
            prevSelectedCell.classList.remove('selected');
        }
        selectedRegion = regionId;
    }
    updateCellStyle(regionId);
}

// 셀의 스타일을 변경하는 함수
function updateCellStyle(cellId) {
    var cell = document.getElementById(cellId);
    cell.classList.toggle('selected');
}

// 선택한 분야와 지역 정보를 표시하는 함수
function showSelectedInfo() {
    var selectedInfoDiv = document.getElementById('selectedInfo');

    if (selectedBranch === null && selectedRegion === null) {
        selectedInfoDiv.innerHTML = "분야와 지역을 모두 선택해주세요.";
    } else {
        // 선택된 branch와 region 값을 가져와서 fetch 요청을 보냄
        fetch(`graduate.php?branch=${selectedBranch}&region=${selectedRegion}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // 응답을 텍스트로 파싱
            })
            .then(data => {
                // 받은 데이터를 selectedInfoDiv에 표시
                selectedInfoDiv.innerHTML = data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                selectedInfoDiv.innerHTML = "데이터를 불러오는 도중 오류가 발생했습니다.";
            });
        selectedInfoDiv.style.display = "flex";
    }
}

// 초기화 함수
function resetSelection() {
    // 선택된 분야 초기화
    if (selectedBranch !== null) {
        var prevSelectedBranchCell = document.getElementById(selectedBranch);
        prevSelectedBranchCell.classList.remove('selected');
        selectedBranch = null;
    }

    // 선택된 지역 초기화
    if (selectedRegion !== null) {
        var prevSelectedRegionCell = document.getElementById(selectedRegion);
        prevSelectedRegionCell.classList.remove('selected');
        selectedRegion = null;
    }

    // 선택된 정보 표시 초기화
    var selectedInfoDiv = document.getElementById('selectedInfo');
    selectedInfoDiv.style.display = "none";
}


// 분야 테이블의 각 셀에 클릭 이벤트 추가하여 선택 정보 업데이트
document.getElementById('건축').addEventListener('click', function() {
    selectBranch('건축');
});

document.getElementById('경영').addEventListener('click', function() {
    selectBranch('경영');
});
document.getElementById('교육').addEventListener('click', function() {
    selectBranch('교육');
});

document.getElementById('기계').addEventListener('click', function() {
    selectBranch('기계');
});
document.getElementById('동물').addEventListener('click', function() {
    selectBranch('동물');
});

document.getElementById('물리').addEventListener('click', function() {
    selectBranch('물리');
});
document.getElementById('생명').addEventListener('click', function() {
    selectBranch('생명');
});

document.getElementById('수학').addEventListener('click', function() {
    selectBranch('수학');
});
document.getElementById('심리').addEventListener('click', function() {
    selectBranch('심리');
});

document.getElementById('예체능').addEventListener('click', function() {
    selectBranch('예체능');
});
document.getElementById('의료').addEventListener('click', function() {
    selectBranch('의료');
});

document.getElementById('전자').addEventListener('click', function() {
    selectBranch('전자');
});
document.getElementById('조선').addEventListener('click', function() {
    selectBranch('조선');
});

document.getElementById('화학').addEventListener('click', function() {
    selectBranch('화학');
});
document.getElementById('환경').addEventListener('click', function() {
    selectBranch('환경');
});

document.getElementById('IT').addEventListener('click', function() {
    selectBranch('IT');
});

// 지역 테이블의 각 셀에 클릭 이벤트 추가하여 선택 정보 업데이트
document.getElementById('강원').addEventListener('click', function() {
    selectRegion('강원');
});

document.getElementById('경기').addEventListener('click', function() {
    selectRegion('경기');
});
document.getElementById('경상').addEventListener('click', function() {
    selectRegion('경상');
});

document.getElementById('서울').addEventListener('click', function() {
    selectRegion('서울');
});
document.getElementById('인천').addEventListener('click', function() {
    selectRegion('인천');
});

document.getElementById('전라').addEventListener('click', function() {
    selectRegion('전라');
});
document.getElementById('제주').addEventListener('click', function() {
    selectRegion('제주');
});

document.getElementById('충청').addEventListener('click', function() {
    selectRegion('충청');
});

// 초기화 버튼 클릭 이벤트 추가
document.getElementById('resetButton').addEventListener('click', function() {
    resetSelection();
});