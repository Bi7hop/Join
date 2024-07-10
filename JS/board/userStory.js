function openUserStory() {
    let userStoryContainer = document.getElementById('userStoryWindow');
    let overlay = document.getElementById('overlay');
    let boardBodyContainer = document.querySelector('.boardBodyContainer');
    boardBodyContainer.style.overflow = "hidden";

    userStoryContainer.innerHTML = userStoryHtmlTemplate();
    overlay.classList.add("overlay");
    
}

function closeUserStory() {
    let userStoryContainer = document.getElementById('userStoryWindow');
    let boardBodyContainer = document.querySelector('.boardBodyContainer');
    let overlay = document.getElementById('overlay');

    userStoryContainer.style.animation = 'fly-out 0.1s forwards';
    overlay.style.animation = 'fade-out 0.2s forwards';
    setTimeout(() => {
        userStoryContainer.innerHTML = ``;
        userStoryContainer.style.animation = ``;
        boardBodyContainer.style.overflow = "";
        overlay.style.animation = '';
        overlay.classList.remove("overlay");
    }, 200);
}

function openUserStoryEdit() {
    let userStoryContainer = document.getElementById('userStoryWindow');
    userStoryContainer.innerHTML = userStoryEditHtmlTemplate();
}

function closeUserStoryEdit() {
    let userStoryContainer = document.getElementById('userStoryWindow');
    let boardBodyContainer = document.querySelector('.boardBodyContainer');
    let overlay = document.getElementById('overlay');

    userStoryContainer.style.animation = 'fly-out 0.1s forwards';
    overlay.style.animation = 'fade-out 0.2s forwards';
    setTimeout(() => {
        userStoryContainer.innerHTML = ``;
        userStoryContainer.style.animation = ``;
        boardBodyContainer.style.overflow = "";
        overlay.style.animation = '';
        overlay.classList.remove("overlay");
    }, 200);
}

// function loadUserStoryEditStyleFile() {
//     var script = document.createElement('script');
//     script.src = '/JS/board/userStoryEditStyle.js'; // Pfad zu deiner JavaScript-Datei
//     script.type = 'text/javascript';
//     document.head.appendChild(script);
// }

