/**
 * Toggles the visibility of the mobile overlay header menu.
 * Adds or removes the 'hidden-responsive' class to show or hide the menu.
 * Adds or removes the 'click' event listener to close the menu when clicking outside.
 * 
 * @function toggleMenu
 * @returns {void}
 */
function toggleMenu() {
    let overlayHeader = document.getElementById('mobileOverlayHeader');
    overlayHeader.classList.toggle('hidden-responsive');

    if (overlayHeader.classList.contains('hidden-responsive')) {
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 10);
    } else {
        document.removeEventListener('click', closeMenu);
    }
}

/**
 * Closes the mobile overlay header menu.
 * Removes the 'hidden-responsive' class to hide the menu.
 * Removes the 'click' event listener to stop closing the menu when clicking outside.
 * 
 * @function closeMenu
 * @returns {void}
 */
function closeMenu() {
    let overlayHeader = document.getElementById('mobileOverlayHeader');
    overlayHeader.classList.remove('hidden-responsive');
    document.removeEventListener('click', closeMenu);
}
