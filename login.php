<?php
// MySQL 데이터베이스 연결 설정
$servername = "localhost";
$username = "diss";
$password = "diss2024";
$dbname = "diss";

// MySQL에 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("MySQL 연결 실패: " . $conn->connect_error);
}

// 로그인 폼에서 입력된 ID와 비밀번호 가져오기
$id = $_POST['id']; // 이 부분도 예외 처리 필요
$password = $_POST['password'];

// Prepared Statement 사용하여 데이터베이스에서 해당 ID의 비밀번호 가져오기
$stmt = $conn->prepare("SELECT pw FROM login WHERE id = ?");
$stmt->bind_param("s", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['pw'])) { // 비밀번호 검증
        header("Location: Home.html"); // 로그인 성공 시 이동할 페이지
        exit();
    } else {
        echo "아이디 또는 비밀번호가 올바르지 않습니다.";
    }
} else {
    echo "해당하는 사용자가 존재하지 않습니다.";
}

// MySQL 연결 종료
$conn->close();
?>
