

/**
 * Creates the header HTML structure and inserts it into the element with id 'header'.
 * The header includes navigation links, logos, and other elements.
 */
function createHeader() {
    const headerElement = document.getElementById('header');
    
    if (headerElement) {
        const headerHTML = `
        <header>
        <div id="hedlineHeader">
            <p class="headerHeadline">Kanban Project Management Tool</p>
        </div>
        <div id="imgContainerHeader">
            <img class="header-logo" src="../img/logo_dark.png" alt="">
        </div>
        <div class="headerHelpAndLogoContainer" id="topNav">
            <a id="help" href="../help.html">
                <img src="../img/help.png" alt="Help">
            </a>
            <p id="toggleDropDown"></p>
            <div id="overlayHeader" class="overlay-menu show-menu">
                <a id="help-drop-down" class="a-link" href="../help.html">
                    <div class="a-menu">Help</div>
                <a class="a-link" href="legalNotice.html">
                    <div class="a-menu">Legal Notice</div>
                </a>
                <a class="a-link" href="privacyPolicy.html">
                    <div class="a-menu">Privacy Policy</div>
                </a>
                <div class="a-link" onclick="logOut()">
                    <span class="a-menu">Log Out</span>
                </div>
            </div>
        </div>
    </header>
    <section class="sidebar-container">
        <img class="sidebar-logo" src="../img/Join_Logo.png" alt="Join Logo">
        <nav id="sideNav">
            <a href="../summary.html"><img src="../img/Summary.png" alt="Summary"></a>
            <a href="../addTask.html"><img src="../img/Add Task.png" alt="Add Task"></a>
            <a href="../board.html"><img src="../img/Board.png" alt="Board"></a>
            <a href="../contacts.html"><img src="../img/Contacts.png" alt="Contact"></a>
        </nav>
        <div class="nav-bottom" id="nav-bottom">
            <a href="../privacyPolicy.html">Privacy Policy</a>
            <a href="../legalNotice.html">Legal Notice</a>
        </div>
    </section>
    `;

    headerElement.innerHTML = headerHTML;
    }
}

/**
 * Handles window resize events.
 * Adjusts the visibility of the mobile navigation bar and overlay header based on screen width.
 */
function handleResize() {
    let overlayHeader = document.getElementById("overlayHeader");

    if (!overlayHeader) {
        return; 
    }

    if (window.innerWidth <= 1050) {
        createMobileNavbar();
        if (overlayHeader.classList.contains("hidden")) {
            overlayHeader.classList.remove("hidden");
        }
    } else {
        removeMobileNavbar();
        overlayHeader.classList.add("hidden");
    }
}


/**
 * Creates and inserts the mobile navigation bar if it does not already exist.
 * The mobile navigation bar includes links to different sections of the application.
 */
function createMobileNavbar() {
    const existingMobileNav = document.getElementById('mobileNav');
    
    if (!existingMobileNav) {
        const mobileNavbarHTML = `
        <nav id="mobileNav" class="mobile-nav">
            <div class="menu-mobile">
                <a class="nav-mobile-a no-hover" href="summary.html">
                    <img class="icon-mobile" src="../img/mobile/summarymobile.png" alt="">
                    Summary
                </a>
                <a class="nav-mobile-a no-hover" href="board.html">
                    <img class="icon-mobile" src="../img/mobile/boardmobile.png" alt="">
                    Board
                </a>
                <a class="nav-mobile-a no-hover" href="addTask.html">
                    <img class="icon-mobile" src="../img/mobile/addtaskmobile.png" alt="">
                    Add Task
                </a>
                <a class="nav-mobile-a no-hover" href="contacts.html">
                    <img class="icon-mobile" src="../img/mobile/contactmobile.png" alt="">
                    Contacts
                </a>
            </div>
        </nav>
        `;
        document.body.insertAdjacentHTML('beforeend', mobileNavbarHTML);
    }
}

/**
 * Removes the mobile navigation bar if it exists.
 */
function removeMobileNavbar() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.remove();
    }
}

window.addEventListener('resize', handleResize);

/**
 * Initializes event listeners for DOMContentLoaded and window resize.
 * When the DOM is fully loaded, the header is created and resize handling is initialized.
 */
document.addEventListener("DOMContentLoaded", function() {
    createHeader();
    handleResize();
});