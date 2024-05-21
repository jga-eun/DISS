<?php
    header("Content-Type: application/json");

    // 입력값 받기
    $input = json_decode(file_get_contents('php://input'), true);
    $name = $input['name'];
    $id = $input['id'];
    $pw = $input['pw'];

    // MSSQL 연결 정보
    $serverName = "tcp:diss.database.windows.net,1433"; 
    $connectionOptions = array(
        "Database" => "DISS",
        "Uid" => "DissPeople",
        "PWD" => "Diss2024",
        "Encrypt" => true, // 암호화를 사용하여 보안을 강화
        "TrustServerCertificate" => false // 서버 인증서 신뢰 여부
    );

    // MSSQL 연결
    $conn = sqlsrv_connect($serverName, $connectionOptions);

    if ($conn === false) {
        echo json_encode(array("success" => false, "error" => "Connection Error"));
        die(print_r(sqlsrv_errors(), true));
    }

    // 데이터베이스에 데이터 삽입
    $sql = "INSERT INTO DISS.login (name, id, pw) VALUES (?, ?, ?)";
    $params = array($name, $id, $pw);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        echo json_encode(array("success" => false, "error" => "Query Error"));
        die(print_r(sqlsrv_errors(), true));
    } else {
        echo json_encode(array("success" => true));
    }

    // MSSQL 연결 닫기
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);
?>
