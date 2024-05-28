const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Azure OpenAI 설정
const apiKey = 'fac11093e642402b875cad4fd291f833';  // Azure에서 받은 API 키
const endpoint = 'https://diss-gpt.openai.azure.com/';  // 엔드포인트 URL

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // 정적 파일을 서비스합니다

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'QnA_private_AI.html')); // 기본 HTML 파일을 제공합니다
});

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message; // 사용자 메시지를 받습니다

    try {
        const response = await axios.post(
            endpoint,
            {
                prompt: userMessage,
                max_tokens: 50
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}` // API 키를 헤더에 추가합니다
                }
            }
        );

        const aiResponse = response.data.choices[0].text.trim(); // OpenAI에서 반환된 응답을 처리합니다
        res.json({ response: aiResponse });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).send('Error in processing request');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});