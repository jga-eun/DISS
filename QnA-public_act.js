function incrementLikes(button) {
    let likes = parseInt(button.innerText.match(/\d+/)[0]);
    likes += 1;
    button.innerHTML = `💜 ${likes}`;
}

function navigateToPage(url) {
    window.location.href = url;
}
