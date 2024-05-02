const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5500;

const config = {
    user: 'DissPeople',
    password: 'Diss2024',
    server: 'diss.database.windows.net',
    database: 'DISS',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // CSS와 HTML 파일을 위한 정적 폴더

app.post('/login', async (req, res) => {
    try {
        await sql.connect(config);
        const { id, password } = req.body;
        const result = await sql.query(`SELECT * FROM student WHERE id = '${id}' AND pw = '${password}'`);
        
        if (result.recordset.length > 0) {
            res.sendFile(__dirname + '/public/Home.html'); // 로그인 성공 시 홈 페이지로 리디렉션
        } else {
            res.send('Invalid ID or Password'); // 로그인 실패
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
