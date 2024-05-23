
<?php
    header("Access-Control-Allow-Origin: *"); 
    header("Content-Type: application/json");

    // MSSQL 연결 정보
    $serverName = "데베 서버 이름";
    $connectionOptions = array(
        "Database" => "데이터베이스 이름",
        "Uid" => "아이디",
        "PWD" => "비밀번호"
        "Encrypt" => true, // 암호화를 사용하여 보안을 강화
        "TrustServerCertificate" => false // 서버 인증서 신뢰 여부
    );

    // MSSQL 연결
    $conn = sqlsrv_connect($serverName, $connectionOptions);

    if ($conn === false) {
        echo json_encode(array("error" => "Connection Error"));
        die(print_r(sqlsrv_errors(), true));
    }

    // 데이터베이스에서 데이터 선택
    $sql = "SELECT * FROM DISS.login";
    $stmt = sqlsrv_query($conn, $sql);

    if ($stmt === false) {
        echo json_encode(array("error" => "Query Error"));
        die(print_r(sqlsrv_errors(), true));
    }

    $data = array(); // 데이터를 저장할 배열 초기화

    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        // 각 행을 $data 배열에 추가
        $data[] = $row;
    }

    // 배열을 JSON 형식으로 변환
    $json_data = json_encode($data, JSON_UNESCAPED_UNICODE);

    // JSON 데이터를 출력
    echo $json_data;

    // MSSQL 연결 닫기
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);
?>
