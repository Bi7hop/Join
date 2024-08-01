function toggleMenu() {
    let overlayHeader = document.getElementById('mobileOverlayHeader');
    overlayHeader.classList.toggle('hidden-responsive');

    if (overlayHeader.classList.contains('hidden-responsive')) {
        setTimeout(() => {
            document.addEventListener('click', closeMenu)
        }, 10);
    } else {
        document.removeEventListener('click', closeMenu)
    }
}


function closeMenu() {
    let overlayHeader = document.getElementById('mobileOverlayHeader');
    overlayHeader.classList.remove('hidden-responsive')
    document.removeEventListener('click', closeMenu)
}