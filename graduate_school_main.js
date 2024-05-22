var selectedBranch = null; // 선택된 분야의 정보를 저장할 변수
var selectedRegion = null; // 선택된 지역의 정보를 저장할 변수
var allData = []; // 전체 데이터를 저장할 배열

function selectBranch(branchId) {
    if (selectedBranch === branchId) {
        selectedBranch = null;
    } else {
        if (selectedBranch !== null) {
            var prevSelectedCell = document.getElementById(selectedBranch);
            prevSelectedCell.classList.remove('selected');
        }
        selectedBranch = branchId;
    }
    updateCellStyle(branchId);
}

function selectRegion(regionId) {
    if (selectedRegion === regionId) {
        selectedRegion = null;
    } else {
        if (selectedRegion !== null) {
            var prevSelectedCell = document.getElementById(selectedRegion);
            prevSelectedCell.classList.remove('selected');
        }
        selectedRegion = regionId;
    }
    updateCellStyle(regionId);
}

function updateCellStyle(cellId) {
    var cell = document.getElementById(cellId);
    if (cell) {
        cell.classList.toggle('selected');
    }
}

function showSelectedInfo() {
    var selectedInfoDiv = document.getElementById('selectedInfo');

    if (selectedBranch === null || selectedRegion === null) {
        selectedInfoDiv.innerHTML = "분야와 지역을 모두 선택해주세요.";
    } else {
        // 필터링된 데이터를 가져오기
        var filteredData = allData.filter(function(item) {
            return item.branch === selectedBranch && item.region === selectedRegion;
        });

        // 필터링된 데이터를 HTML로 변환하여 표시
        var html = '';
        if (filteredData.length > 0) {
            filteredData.forEach(function(item) {
                html += `
                    <div class="Info">
                        <img src="profile.png" alt="Diss logo" class="profile2">
                        <div class="Info_detail">
                            <p><b>${item.name}</b></p>
                            <h2><b>${item.school} ${item.major}</b></h2>
                            <p>${item.region}</p>
                            <p>Keywords: ${item.keyword1}, ${item.keyword2}, ${item.keyword3}</p>
                        </div>
                    </div>
                `;
            });
        } else {
            html = "해당 정보를 찾을 수 없습니다.";
        }
        selectedInfoDiv.innerHTML = html;
        selectedInfoDiv.style.display = "flex";
    }
}

function resetSelection() {
    if (selectedBranch !== null) {
        var prevSelectedBranchCell = document.getElementById(selectedBranch);
        prevSelectedBranchCell.classList.remove('selected');
        selectedBranch = null;
    }

    if (selectedRegion !== null) {
        var prevSelectedRegionCell = document.getElementById(selectedRegion);
        prevSelectedRegionCell.classList.remove('selected');
        selectedRegion = null;
    }

    var selectedInfoDiv = document.getElementById('selectedInfo');
    selectedInfoDiv.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
    var branches = ['건축', '경영', '교육', '기계', '동물', '물리', '생명', '수학', '심리', '예체능', '의료', '전자', '조선', '화학', '환경', 'IT'];
    branches.forEach(function(branch) {
        var element = document.getElementById(branch);
        if (element) {
            element.addEventListener('click', function() {
                selectBranch(branch);
            });
        }
    });

    var regions = ['강원', '경기', '경상', '서울', '인천', '전라', '제주', '충청'];
    regions.forEach(function(region) {
        var element = document.getElementById(region);
        if (element) {
            element.addEventListener('click', function() {
                selectRegion(region);
            });
        }
    });

    document.getElementById('resetButton').addEventListener('click', resetSelection);
    document.getElementById('searchButton').addEventListener('click', showSelectedInfo);

    // 페이지 로드 시 전체 데이터를 가져옵니다.
    fetch('https://diss-graduate.azurewebsites.net/graduate.php')
        .then(response => response.json())
        .then(data => {
            allData = data; // 전체 데이터를 저장
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});