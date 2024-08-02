/**
 * Asynchronously loads and includes HTML content into elements with the `w3-include-html` attribute.
 * This function fetches the HTML content from the URL specified in the `w3-include-html` attribute of each
 * matching element and inserts it into the element's inner HTML. If the fetch operation fails, it displays
 * "Page not found" in the element. After including the HTML, it removes the `w3-include-html` attribute.
 *
 * Additionally, the function performs several setup tasks:
 * 1. Calls `displayCurentUser()` to update the UI with the current user's initials.
 * 2. Calls `attachToggleEvent()` to set up event listeners for toggling the visibility of an overlay.
 * 3. Calls `runAfterSidebarLoad()` to highlight the active link in the sidebar navigation.
 *
 * @async
 * @function
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    let element = includeElements[i];
    let file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
    element.removeAttribute("w3-include-html");
  }
  // Check if additional functions need to be called after including HTML
  // checkTargetSites();
  displayCurentUser();
  attachToggleEvent();
  runAfterSidebarLoad();
}

/**
 * Attaches the event listeners for toggling the overlay visibility.
 * It includes handling clicks on the toggle button to show/hide the overlay
 * and clicks outside the overlay to hide it.
 *
 * @function
 */
function attachToggleEvent() {
  let toggleButton = document.getElementById("toggleDropDown");
  let overlayHeader = document.getElementById("overlayHeader");

  if (toggleButton && overlayHeader) {
    addToggleButtonListener(toggleButton, overlayHeader);
    addDocumentClickListener(toggleButton, overlayHeader);
  }
}

/**
 * Adds a click event listener to the toggle button to show or hide the overlay.
 *
 * @param {HTMLElement} toggleButton - The button used to toggle the overlay visibility.
 * @param {HTMLElement} overlayHeader - The overlay element whose visibility is toggled.
 * @function
 */
function addToggleButtonListener(toggleButton, overlayHeader) {
  toggleButton.addEventListener("click", function (event) {
    toggleOverlayVisibility(overlayHeader);
    event.stopPropagation();
  });
}

/**
 * Adds a click event listener to the document to hide the overlay when clicking outside of it.
 *
 * @param {HTMLElement} toggleButton - The button used to toggle the overlay visibility.
 * @param {HTMLElement} overlayHeader - The overlay element whose visibility is toggled.
 * @function
 */
function addDocumentClickListener(toggleButton, overlayHeader) {
  document.addEventListener("click", function (event) {
    if (
      !overlayHeader.classList.contains("hidden") &&
      !overlayHeader.contains(event.target) &&
      event.target !== toggleButton
    ) {
      overlayHeader.classList.add("hidden");
    }
  });
}

/**
 * Toggles the visibility of the overlay by adding or removing the "hidden" class.
 *
 * @param {HTMLElement} overlayHeader - The overlay element whose visibility is toggled.
 * @function
 */
function toggleOverlayVisibility(overlayHeader) {
  overlayHeader.classList.toggle("hidden");
}

/**
 * Highlights the active link in the sidebar navigation based on the current URL.
 * This function adds an "active" class to the link that matches the current page's URL.
 * It assumes that sidebar links are contained within a `<nav>` element and compares
 * the link's URL with the current page URL to determine which link should be highlighted.
 *
 * The function:
 * 1. Retrieves all anchor (`<a>`) elements within the `<nav>` element.
 * 2. Strips trailing slashes from the current page's URL and each link's URL for comparison.
 * 3. Adds the "active" class to the link that matches the current URL.
 *
 * @function
 */
function runAfterSidebarLoad() {
  let links = document.querySelectorAll("nav a");
  let currentURL = window.location.pathname.replace(/\/$/, "");

  links.forEach((link) => {
    let linkURL = new URL(link.href).pathname.replace(/\/$/, "");

    if (linkURL === currentURL) {
      link.classList.add("active");
    }
  });
}

includeHTML();

/**
 * Retrieves the current user's name from session storage and displays the initials
 * in two different elements on the page: one with the ID `toggleDropDown` and one with
 * the ID `mobileEmblem`.
 *
 * The initials are derived from the user's name by taking the first letter of each part
 * of the name, converting them to uppercase, and then displaying them in the specified elements.
 * If the necessary elements or user data are missing, the function does nothing.
 *
 * @function
 */
function displayCurentUser() {
  let text = document.getElementById("toggleDropDown");
  let mobileText = document.getElementById("mobileEmblem");
  let currentUser = sessionStorage.getItem("currentUser");

  // Ensure user data exists and is in the expected format
  if (text && currentUser && mobileText) {
    // Extract initials from the current user's name
    let name = currentUser.split(" ").map((word) => word[0]).join("");

    // Set the text and HTML content of the specified elements
    text.innerText = name.toUpperCase();
    mobileText.innerHTML = name.toUpperCase();
  }
}


/**
 * Checks the current URL against a list of protected sites.
 * If the current URL matches one of the protected sites, it calls the `checkIfLogged` function
 * to verify if the user is logged in. If the user is not logged in, they will be redirected
 * to the login page.
 *
 * @function
 */
function checkTargetSites() {
  const currentUrl = window.location.pathname;
  const protectedSites = ["/summary.html", "/addTask.html", "/board.html", "/contacts.html", "/addtask.html"];

  if (protectedSites.includes(currentUrl)) {
    checkIfLogged();
  }
}


/**
 * Checks if the user is logged in by looking for a `currentUser` item in session storage.
 * If the user is not logged in (i.e., `currentUser` is not found), redirects the browser to the login page.
 *
 * @function
 */
function checkIfLogged() {
  let user = sessionStorage.getItem("currentUser");

  if (!user) {
    window.location.href = "./login_ani_complete.html";
  }
}