document.addEventListener('DOMContentLoaded', function() {
    /**
     * Retrieves the current user's name from session storage.
     * @returns {{isLoggedIn: boolean, userName: string}} An object with login status and username.
     */
    let getUserName = () => {
        let user = sessionStorage.getItem("currentUser");
        return user ? { isLoggedIn: true, userName: user } : { isLoggedIn: false, userName: "Guest" };
    };

    /**
     * Gets the appropriate greeting based on the current time.
     * @returns {string} The greeting message.
     */
    let getGreeting = () => {
        let hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    /**
     * Updates the greeting elements with the appropriate message.
     * @param {HTMLElement} greetElem - The greeting text element.
     * @param {HTMLElement} userElem - The username text element.
     * @param {string} greeting - The greeting message.
     * @param {{isLoggedIn: boolean, userName: string}} user - The user object.
     */
    let updateGreeting = (greetElem, userElem, greeting, user) => {
        greetElem.textContent = `${greeting}, `;
        userElem.textContent = user.isLoggedIn ? `${user.userName}!` : "Guest!";
    };

    /**
     * Initializes the greeting by updating the greeting elements.
     */
    let initializeGreeting = () => {
        let user = getUserName();
        let greeting = getGreeting();
        updateGreeting(document.getElementById('greetText'), document.getElementById('greetUserName'), greeting, user);
        updateGreeting(document.getElementById('fullscreenGreetText'), document.getElementById('fullscreenGreetUserName'), greeting, user);
    };

    /**
     * Shows the fullscreen greeting with animations.
     */
    let showFullscreenGreeting = () => {
        let fullscreenGreeting = document.getElementById('fullscreenGreeting');
        fullscreenGreeting.classList.add('animationSummaryShine');
        fullscreenGreeting.style.display = 'flex';
        document.querySelector('.greeting-container').style.display = 'none';
        document.body.style.overflow = 'hidden'; 

        setTimeout(() => replaceAnimation(fullscreenGreeting), 3000);
    };

    /**
     * Replaces the initial animation with the summary animation.
     * @param {HTMLElement} fullscreenGreeting - The fullscreen greeting element.
     */
    let replaceAnimation = (fullscreenGreeting) => {
        fullscreenGreeting.classList.replace('animationSummaryShine', 'animationSummary');
        setTimeout(() => hideFullscreenGreeting(fullscreenGreeting), 1000);
    };

    /**
     * Hides the fullscreen greeting and restores the page state.
     * @param {HTMLElement} fullscreenGreeting - The fullscreen greeting element.
     */
    let hideFullscreenGreeting = (fullscreenGreeting) => {
        fullscreenGreeting.style.display = 'none';
        document.body.style.overflow = '';
    };

    /**
     * Toggles the display of the fullscreen greeting based on window size.
     */
    let toggleFullscreenGreeting = () => {
        if (window.innerWidth <= 1050) {
            showFullscreenGreeting();
        } else {
            document.querySelector('.greeting-container').style.display = 'flex';
            document.getElementById('fullscreenGreeting').style.display = 'none';
        }
    };

    /**
     * Handles window resize events to toggle the fullscreen greeting.
     */
    let handleResize = () => {
        toggleFullscreenGreeting();
    };

    initializeGreeting();
    toggleFullscreenGreeting();
    window.addEventListener('resize', handleResize);
});
