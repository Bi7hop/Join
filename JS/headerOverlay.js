document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('toggleDropDown').addEventListener('click', function () {
        let overlayHeader = document.getElementById('overlayHeader');
        overlayHeader.classList.toggle('hidden');
    });
});


