var selectedBranch = null; // 선택된 분야의 정보를 저장할 변수
var selectedRegion = null; // 선택된 지역의 정보를 저장할 변수

// 클릭한 셀에 해당하는 분야 정보 저장하는 함수
function selectBranch(branchId) {
    selectedBranch = branchId;
    updateCellStyle(branchId);
}

// 클릭한 셀에 해당하는 지역 정보 저장하는 함수
function selectRegion(regionId) {
    selectedRegion = regionId;
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

   /* if (selectedBranch === null || selectedRegion === null) {
        selectedInfoDiv.innerHTML = "분야와 지역을 모두 선택해주세요.";
    } else { */

        selectedInfoDiv.style.display = "flex";
    //}
}

// 분야 테이블의 각 셀에 클릭 이벤트 추가하여 선택 정보 업데이트
document.getElementById('architecture').addEventListener('click', function() {
    selectBranch('architecture');
});

document.getElementById('management').addEventListener('click', function() {
    selectBranch('management');
});
document.getElementById('education').addEventListener('click', function() {
    selectBranch('education');
});

document.getElementById('machine').addEventListener('click', function() {
    selectBranch('machine');
});
document.getElementById('animal').addEventListener('click', function() {
    selectBranch('animal');
});

document.getElementById('physics').addEventListener('click', function() {
    selectBranch('physics');
});
document.getElementById('biology').addEventListener('click', function() {
    selectBranch('biology');
});

document.getElementById('math').addEventListener('click', function() {
    selectBranch('math');
});
document.getElementById('psychology').addEventListener('click', function() {
    selectBranch('psychology');
});

document.getElementById('entertainment').addEventListener('click', function() {
    selectBranch('entertainment');
});
document.getElementById('medical').addEventListener('click', function() {
    selectBranch('medical');
});

document.getElementById('electron').addEventListener('click', function() {
    selectBranch('electron');
});
document.getElementById('shipbuilding').addEventListener('click', function() {
    selectBranch('shipbuilding');
});

document.getElementById('chemistry').addEventListener('click', function() {
    selectBranch('chemistry');
});
document.getElementById('environment').addEventListener('click', function() {
    selectBranch('environment');
});

document.getElementById('it').addEventListener('click', function() {
    selectBranch('it');
});

// 지역 테이블의 각 셀에 클릭 이벤트 추가하여 선택 정보 업데이트
document.getElementById('gangwon').addEventListener('click', function() {
    selectRegion('gangwon');
});

document.getElementById('gyeonggi').addEventListener('click', function() {
    selectRegion('gyeonggi');
});
document.getElementById('busan').addEventListener('click', function() {
    selectRegion('busan');
});

document.getElementById('seoul').addEventListener('click', function() {
    selectRegion('seoul');
});
document.getElementById('incheon').addEventListener('click', function() {
    selectRegion('incheon');
});

document.getElementById('jeolla').addEventListener('click', function() {
    selectRegion('jeolla');
});
document.getElementById('jeju').addEventListener('click', function() {
    selectRegion('jeju');
});

document.getElementById('chungcheong').addEventListener('click', function() {
    selectRegion('chungcheong');
});