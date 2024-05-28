async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    messageInput.value = '';

    if (message === '') {
        return;  // 입력된 메시지가 없으면 아무 것도 하지 않음
    }

    // 사용자의 메시지를 화면에 추가
    const chatSection = document.getElementById('chat-section');
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'right-message');

    userMessage.innerHTML = `
        <div class="message-header">
            <span class="username">sulyong</span>
            <img src="images/profile_sulyong.png" class="user-icon" alt="User Icon">
        </div>
        <div class="message-body">
            ${message}
        </div>
        <div class="message-timestamp">${new Date().toLocaleString()}</div>
    `;

    chatSection.appendChild(userMessage);

    // 서버에 메시지 전송 및 응답 받기
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const aiMessage = data.response;

        // AI의 응답을 화면에 추가
        const aiResponse = document.createElement('div');
        aiResponse.classList.add('message', 'left-message');

        aiResponse.innerHTML = `
            <div class="message-header">
                <img src="images/profile_sulyong.png" class="user-icon" alt="User Icon">
                <span class="username">DISS AI</span>
            </div>
            <div class="message-body">
                ${aiMessage}
            </div>
            <div class="message-timestamp">${new Date().toLocaleString()}</div>
        `;

        chatSection.appendChild(aiResponse);
    } catch (error) {
        console.error('Error:', error);
    }
}
