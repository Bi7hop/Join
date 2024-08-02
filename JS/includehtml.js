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
  
  // checkTargetSites();
  displayCurentUser();
  attachToggleEvent();
  runAfterSidebarLoad();
}

function attachToggleEvent() {
  let toggleButton = document.getElementById("toggleDropDown");
  let overlayHeader = document.getElementById("overlayHeader");

  if (toggleButton && overlayHeader) {
    toggleButton.addEventListener("click", function (event) {
      overlayHeader.classList.toggle("hidden");
      event.stopPropagation();
    });

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
}

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

function displayCurentUser() {
  let text = document.getElementById("toggleDropDown");
  let mobileText = document.getElementById("mobileEmblem");
  let currentUser = sessionStorage.getItem("currentUser");
  let name = currentUser.split(" ").map((word) => word[0]).join("");

  if (text && currentUser && mobileText) {
    text.innerText = name.toUpperCase();
    mobileText.innerHTML = name.toUpperCase();
  }
}

function checkTargetSites() {
  const currentUrl = window.location.pathname;
  const protectedSites = ["/summary.html", "/addTask.html", "/board.html", "/contacts.html","/addtask.html"];

  if (protectedSites.includes(currentUrl)) {
    checkIfLogged();
  }
}

function checkIfLogged() {
  let user = sessionStorage.getItem("currentUser");

  if (!user) {
    window.location.href = "./login.html";
  }
}
