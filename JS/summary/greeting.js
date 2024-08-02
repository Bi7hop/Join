document.addEventListener('DOMContentLoaded', function() {
    let getUserName = () => {
        let user = sessionStorage.getItem("currentUser");
        return user ? { isLoggedIn: true, userName: user } : { isLoggedIn: false, userName: "Guest" };
    };
    let getGreeting = () => {
        let hour = new Date().getHours();
        return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    };
    let greetText = document.getElementById('greetText');
    let greetUserName = document.getElementById('greetUserName');
    let fullscreenGreetText = document.getElementById('fullscreenGreetText');
    let fullscreenGreetUserName = document.getElementById('fullscreenGreetUserName');
    let fullscreenGreeting = document.getElementById('fullscreenGreeting');
    let user = getUserName();
    let greeting = getGreeting();
    let updateGreeting = (greetElem, userElem, greeting, user) => {
        greetElem.textContent = `${greeting}, `;
        userElem.textContent = user.isLoggedIn ? `${user.userName}!` : "Guest!";
    };
    updateGreeting(greetText, greetUserName, greeting, user);
    updateGreeting(fullscreenGreetText, fullscreenGreetUserName, greeting, user);
    let checkWindowSize = () => {
        if (window.innerWidth <= 1050) {
            fullscreenGreeting.classList.add('animationSummaryShine');
            fullscreenGreeting.style.display = 'flex';
            document.querySelector('.greeting-container').style.display = 'none';
            document.body.style.overflow = 'hidden'; 
            setTimeout(() => {
                fullscreenGreeting.classList.replace('animationSummaryShine', 'animationSummary');
                setTimeout(() => {
                    fullscreenGreeting.style.display = 'none';
                    document.body.style.overflow = '';
                }, 1000);
            }, 3000);
        } else {
            document.querySelector('.greeting-container').style.display = 'flex';
            fullscreenGreeting.style.display = 'none';
        }
    };
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
});