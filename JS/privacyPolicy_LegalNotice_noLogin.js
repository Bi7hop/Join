/**
 * Executes after the DOM has fully loaded and waits 100ms before running the functions.
 */
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        hideNavElements();
        updateNavBottom();
        hideMobileNav();
        hideMobileHeader();
    }, 100);
});

/**
 * Hides the side navigation and top navigation elements if they exist.
 */
function hideNavElements() {
    let navbar = document.getElementById('sideNav');
    let topNav = document.getElementById('topNav');

    if (navbar && topNav) {
        navbar.style.display = "none";
        topNav.style.display = "none";
    }
}

/**
 * Updates the content of the `nav-bottom` element with links to the Privacy Policy and Legal Notice.
 */
function updateNavBottom() {
    let navBottom = document.getElementById('nav-bottom');

    if (navBottom) {
        navBottom.innerHTML = `
        <a href="/privacyPolicy_noLogin.html">Privacy Policy</a>
        <a href="/legalNotice_noLogin.html">Legal Notice</a>
        `;
    }
}

/**
 * Hides the mobile navigation element if it exists.
 */
function hideMobileNav() {
    let mobileNav = document.getElementById('mobileNav');

    if (mobileNav) {
        mobileNav.style.display = "none";
    }
}

/**
 * Hides the mobile header logo if it exists.
 */
function hideMobileHeader() {
    let mobileHeader = document.getElementById('headerLogoMobile');

    if (mobileHeader) {
        mobileHeader.style.display = "none";
    }
}
