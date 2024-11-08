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

  followUp();
}

  // Check if additional functions need to be called after including HTML
function followUp(){
  checkTargetSites();
  displayCurentUser();
  guardCheck();
  guardCheckMobile();
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
  if (window.innerWidth <= 1050) {
  overlayHeader.classList.toggle("hidden-responsive");
  overlayHeader.classList.remove("hidden");
  } else {
    overlayHeader.classList.toggle("hidden");
    overlayHeader.classList.remove("hidden-responsive");
  }
  
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

/**
 * Checks if the user is authenticated by verifying the presence of "currentUser" in sessionStorage.
 * If the user is not authenticated, it hides the side navigation and top navigation elements on the desktop version.
 */
function guardCheck() {
  let user = sessionStorage.getItem("currentUser");
  let sideNav = document.getElementById("sideNav");
  let topNav = document.getElementById("topNav");

  if (!user) {
    if (sideNav && topNav) {
      sideNav.classList.add('hidden');
      topNav.classList.add('hidden');
    }
  }
}

/**
 * Checks if the user is authenticated by verifying the presence of "currentUser" in sessionStorage.
 * If the user is not authenticated, it hides the side navigation and top navigation elements on the mobile version.
 * Additionally, it adds a 'transparent' class to the side navigation element.
 */
function guardCheckMobile(){
  let user = sessionStorage.getItem("currentUser");
  let sideNav = document.getElementById("mobNav");
  let topNav = document.getElementById("headerLogoMobile");

  if (!user) {
    if (sideNav && topNav) {
      sideNav.classList.add('hidden');
      sideNav.classList.add('transparent')
      topNav.classList.add('hidden');
    }
  }
}

/**
 * Extracts the initials from the current user's username and displays them in the toggleDropDown element.
 * 
 * @description
 * This function retrieves the username from session storage, generates the initials from the username, 
 * and displays the initials in the p element with the ID 'toggleDropDown'.
 */
function displayUserInitials() {
  // Retrieve the current user's username from session storage
  let username = sessionStorage.getItem("currentUser");

  // Check if username exists
  if (username) {
    // Generate initials by taking the first character of each word
    let initials = username.split(' ').map(name => name.charAt(0).toUpperCase()).join('');

    // Find the p element by ID and set its text content to the initials
    document.getElementById("toggleDropDown").textContent = initials;
  }
}

// Ensure the DOM is fully loaded before running the function
document.addEventListener('DOMContentLoaded', function() {
    displayUserInitials();
});
