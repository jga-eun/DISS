<?php
// MySQL 서버 정보
$host = "localhost";
$user = "root";
$pw = "fzFsCdG3yjA3[MBt";
$dbName = "diss_graduate";

// MySQL 데이터베이스에 연결
$conn = new mysqli($host, $user, $pw, $dbName);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// GET 요청으로부터 분야와 지역 가져오기
$branch = $_GET['branch'];
$region = $_GET['region'];

// 데이터베이스에서 데이터 가져오기 (특정 분야와 지역에 해당하는 데이터만)
$sql = "SELECT name, school, major, region 
        FROM diss_graduateschool 
        WHERE branch = ? AND region = ?
        LIMIT 3";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $branch, $region);
$stmt->execute();
$result = $stmt->get_result();

// 결과 출력
if ($result->num_rows > 0) {
    // 데이터를 HTML로 출력
    echo '<select id="standard" name="standard">';
    echo '<option value="popular">인기순</option>';
    echo '<option value="recommend">추천순</option>';
    echo '<option value="much">후기 많은순</option>';
    echo '</select>';

    while ($row = $result->fetch_assoc()) {
        echo '<a href="DISS_graduate_school_detail.html">';
        echo '<div class="Info">';
        echo '<img src="profile.png" alt="Diss logo" class="profile2">';
        echo '<div class="Info_detail">';
        echo '<p><b>' . $row["name"] . '</b></p>';
        echo '<h2><b>' . $row["school"] . ' ' . $row["major"] . '</b></h2>';
        echo '<p>' . $row["region"] . '</p>';
        echo '</div>';
        echo '</div>';
        echo '</a>';
    }
    echo  '<div class="button-more">' ;
    echo ' <button type="button">더보기</button>';
    echo '</div>';
} else {
    echo "해당 정보를 찾을 수 없습니다.";
}

// MySQL 연결 종료
$conn->close();