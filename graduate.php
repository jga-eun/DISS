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

// 데이터베이스에서 데이터 가져오기 (첫 번째 행만)
$sql = "SELECT name, school, major, region FROM diss_graduateschool LIMIT 1";
$result = $conn->query($sql);

// 결과 출력
if ($result->num_rows > 0) {
    // 데이터를 HTML로 출력 (첫 번째 행만)
    $row = $result->fetch_assoc();
    echo "<p><b>" . $row["name"] . "</b></p>";
    echo "<h2><b>" . $row["school"] . " " . $row["major"] . "</b></h2>";
    echo "<p>" . $row["region"] . "</p>";
} else {
    echo "0 results";
}

// MySQL 연결 종료
$conn->close();