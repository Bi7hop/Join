/**
 * Attaches an event listener to the `DOMContentLoaded` event that sets up a click
 * event handler for the button with the ID `toggleDropDown`. When the button is clicked,
 * it toggles the visibility of the element with the ID `overlayHeader` by adding or removing
 * the `hidden` class.
 *
 * This function ensures that the click event listener is only attached once the DOM
 * has fully loaded, preventing potential issues with trying to access elements before
 * they are available in the DOM.
 *
 * @function
 */
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('toggleDropDown').addEventListener('click', function () {
        let overlayHeader = document.getElementById('overlayHeader');
        overlayHeader.classList.toggle('hidden');
    });
});