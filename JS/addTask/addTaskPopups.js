/**
 * Displays a confirmation overlay and then redirects the user to the board page after a short delay.
 * This function returns a promise that resolves after 500 milliseconds.
 * @returns {Promise<void>} A promise that resolves when the confirmation overlay is displayed and the redirection occurs.
 */
async function postTaskConfirmation() {
  return new Promise((resolve) => {
    let confirmation = document.getElementById("confirmation-overlay");
    confirmation.classList.remove("hide");
    setTimeout(() => {
      resolve(); // Resolve the promise after the delay
      window.location = "./board.html";
    }, 500);
  });
}

/**
 * Opens the "add task" popup or redirects to the add task page based on screen width.
 * If the screen width is less than 1280 pixels, the user is redirected to `addTask.html`.
 * Otherwise, the popup is displayed with specific styles applied.
 */
function openAddTask() {
  let card = document.querySelector(".add-task-popup");
  let overlay = document.getElementById("overlay");

  if (window.innerWidth < 1280) {
    window.location = "./addTask.html";
  } else {
    swapToPopup();
    hideOverflow();
    card.style.display = "block";
    overlay.classList.add("overlay");
  }
}

/**
 * Applies styles to switch the "add task" popup to its visible state.
 * Changes the position and background color of the popup and shows the close button.
 */
function swapToPopup() {
  document.getElementById("add-task-position").className =
    "add-task-popup-position";
  document.getElementById("add-task-card").style.backgroundColor = "white";
  document.getElementById("close-popup").classList.remove("hide");
}

/**
 * Hides the overflow of the board body container to prevent scrolling while the popup is displayed.
 */
function hideOverflow() {
  let boardBodyContainer = document.querySelector(".boardBodyContainer");
  boardBodyContainer.style.overflow = "hidden";
}

/**
 * Resets the task form by clearing all input fields and resetting states.
 */
function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("assigned").value = "";
  document.getElementById("date").value = "";
  
  addMediumAt();
  
  checkboxStates = {};
  assignedPersons = [];
  subtasksAt = [];
  
  document.getElementById("assigned-persons").innerHTML = "";
  document.getElementById("subtaskDisplayAt").innerHTML = "";
  
  renderAssignedListAt();
  renderSubtaskListAt();
}

/**
 * Closes the add task interface. If it is in popup mode, it triggers the popup close sequence.
 * Otherwise, it resets the form.
 */
function closeAddTask() {
  let addTask = document.getElementById("add-task-position");
  if (addTask.classList.contains("add-task-popup-position")) {
    closeAddTaskPopup();
  } else {
    resetForm(); 
  }
}

/**
 * Closes the add task popup with an animation and restores the overflow of the document.
 */
function closeAddTaskPopup() {
  let card = document.querySelector(".add-task-popup");
  let overlay = document.getElementById("overlay");

  card.style.animation = "fly-out 0.1s forwards";
  overlay.style.animation = "fade-out 0.2s forwards";
  setTimeout(() => {
    card.style.animation = ``;
    overlay.style.animation = ``;
    overlay.classList.remove("overlay");
    card.style.display = "none";
    showOverflow();
  }, 200);
}

/**
 * Restores the overflow property of the board body container, allowing scrolling.
 */
function showOverflow() {
  let boardBodyContainer = document.querySelector(".boardBodyContainer");
  boardBodyContainer.style.overflow = "";
}

/**
 * Performs validation checks to ensure that required fields (title and date) are filled.
 */
function requiredCheck() {
  requiredTitle();
  requiredDate();
}

/**
 * Checks if all required input fields (title and date) have values.
 * @returns {boolean} `true` if both the title and date inputs have values; `false` otherwise.
 */
function inputCheck() {
  let title = document.getElementById("title");
  let date = document.getElementById("date");

  if (!title.value || !date.value) {
    return false;
  }
  return true;
}

/**
 * Displays an error message if the title input field is empty.
 */
function requiredTitle() {
  let title = document.getElementById("title");
  let message = document.getElementById("titleError");

  if (!title.value) {
    message.classList.remove("hide");
  }
}

/**
 * Displays an error message if the date input field is empty.
 */
function requiredDate() {
  let date = document.getElementById("date");
  let message = document.getElementById("dateError");

  if (!date.value) {
    message.classList.remove("hide");
  }
}

/**
 * Approves and adds a subtask to the list if the input field is not empty.
 * Adds the subtask to the `subtasksAt` array, clears the input field, and updates the displayed subtasks.
 * @throws {Error} Throws an alert if the subtask input field is empty.
 */
function aproveSubtaskAt() {
  let subtaskAt = document.getElementById("subtaskAt");

  if (!subtaskAt.value.trim()) {
    alert("Please fill in your Subtask");
  } else {
    subtasksAt.push(subtaskAt.value);
    subtaskAt.value = "";
    postSubtaskAt();
  }
  subTasksHoverEffect();
}

/**
 * Toggles the visibility of the persons dropdown menu and updates the displayed list if the dropdown is opened.
 */
function showPersonsAt() {
  let rotate = document.getElementById("rotate");
  let dropDown = document.getElementById("dropdown-list");

  rotate.classList.toggle("rotated");
  dropDown.classList.toggle("hide");

  if (!dropDown.classList.contains("hide")) {
    renderAssignedListAt();
  }
}
