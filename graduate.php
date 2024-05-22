<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 86400"); // 캐시 시간 설정

// OPTIONS 메서드로 오는 사전 요청(프리플라이트 요청) 처리
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit();
}

// 데이터베이스 연결 정보
$serverName = "dissgraduate-2.database.windows.net";
$connectionOptions = array(
    "Database" => "dissgraduate",
    "Uid" => "Disspeople",
    "PWD" => "cwbh0456@92"
);

// SQL Server 데이터베이스에 연결
$conn = sqlsrv_connect($serverName, $connectionOptions);

// 연결 확인
if ($conn === false) {
    echo json_encode(array("error" => "Connection Error"));
    die(print_r(sqlsrv_errors(), true));
}

// 데이터베이스에서 데이터 가져오기 (특정 분야와 지역에 해당하는 데이터만)
$sql = "SELECT * FROM dbo.Graduates";
$stmt = sqlsrv_query($conn, $sql);

// 쿼리 실행 및 에러 처리
if ($stmt === false) {
    echo json_encode(array("error" => "Query Error"));
    die(print_r(sqlsrv_errors(), true));
}

// 데이터를 저장할 배열 초기화
$data = array(); 

// 데이터를 배열에 추가
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $data[] = $row;
}

// 배열을 JSON 형식으로 변환
$json_data = json_encode($data, JSON_UNESCAPED_UNICODE);

// JSON 데이터를 출력
echo $json_data;

// SQL Server 연결 종료
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>
