function sendMessage() {
    var messageInput = document.getElementById("messageInput");
    var message = messageInput.value;
    if (message.trim() !== "") {
        filterMessage(message);
        messageInput.value = "";
    }
}

function displayMessage(message) {
    var messagesDiv = document.getElementById("messages");
    var messageContainer = document.createElement("div");
    messageContainer.className = "message right-message";

    var messageHeader = document.createElement("div");
    messageHeader.className = "message-header";
    var userIcon = document.createElement("img");
    userIcon.src = "images/profile_sulyong.png";  // 사용자 아이콘 경로에 맞게 조정
    userIcon.className = "user-icon";
    userIcon.alt = "User Icon";
    
    var username = document.createElement("span");
    username.className = "username";
    username.textContent = "sulyong"; // 사용자 또는 다른 이름에 따라 변경

    
    messageHeader.appendChild(username);
    messageHeader.appendChild(userIcon);

    var messageBody = document.createElement("div");
    messageBody.className = "message-body";
    messageBody.textContent = message;

    var messageTimestamp = document.createElement("div");
    messageTimestamp.className = "message-timestamp";
    messageTimestamp.textContent = new Date().toLocaleString("ko-KR"); // 타임스탬프 설정

    messageContainer.appendChild(messageHeader);
    messageContainer.appendChild(messageBody);
    messageContainer.appendChild(messageTimestamp);

    messagesDiv.appendChild(messageContainer);
}


function filterMessage(message) {
    var subscriptionKey = '';
    var endpoint = '';
    var listId = '2494';
    var url = endpoint + '/contentmoderator/moderate/v1.0/ProcessText/Screen';

    var params = {
        'text': message
    };

    var headers = {
        'Content-Type': 'text/plain',
        'Ocp-Apim-Subscription-Key': subscriptionKey
    };

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.Terms && data.Terms.length > 0) {
            displayMessage("비방 또는 욕설이 감지되어 메시지가 거부되었습니다.");
        } else {
            displayMessage(message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}