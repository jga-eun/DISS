const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'diss',
    password: 'diss2024',
    database: 'diss'
});

// MySQL 데이터베이스에 연결
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/login', (req, res) => {
    connection.query('SELECT * FROM login', (error, results, fields) => {
        if (error) throw error;
        res.json(results); // 클라이언트에게 JSON 형식으로 데이터를 응답
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
