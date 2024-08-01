// Funktion läuft mit einem 50ms Timeout. Kann sein das die Funktion verändert werden muss sobald die Webseite auf dem FTP ist. 


document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        let navbar = document.getElementById('sideNav');
        let topNav = document.getElementById('topNav');
        let navBottom = document.getElementById('nav-bottom');
        let mobileNav = document.getElementById('mobileNav');
        let mobileHeader = document.getElementById('headerLogoMobile');

        if (navbar && topNav) { // Check if the element exists
            navbar.style.display = "none";
            topNav.style.display = "none"
        }

        if (navBottom) {
            navBottom.innerHTML = `
            <a href="/privacyPolicy_noLogin.html">Privacy Policy</a>
            <a href="/legalNotice_noLogin.html">Legal Notice</a>
            `;
        }

        if (mobileNav) {
            mobileNav.style.display = "none";
        }

        if (mobileHeader) {
            mobileHeader.style.display = "none";
        }
        console.log(mobileNav);
    }, 100);
})


