let subtasksAt = [];
let assignedPersons = [];
let foundPersonsByInput = [];
let checkboxStates = {}; // Declare checkboxStates globally

/**
 * Toggles the visibility of the drop-down list and rotates the arrow icon based on click events outside the specified elements.
 * 
 * @listens document#click
 * @param {MouseEvent} event - The click event.
 */
document.addEventListener("click", function (event) {
  let rotate = document.getElementById("rotate");
  let dropDown = document.getElementById("dropdown-list");
  let inputField = document.getElementById("assigned");

  if (!rotate.contains(event.target) && !dropDown.contains(event.target) && !inputField.contains(event.target)) {
    rotate.classList.remove("rotated");
    dropDown.classList.add("hide");
  }
});

/**
 * This function renders the assigned list in the dropdown based on the persons found by input. 
 * If persons are found, it uses `personsFoundPostAt` to populate the dropdown;
 * otherwise, it uses `dropDownListSampleAt`.
 * 
 * After rendering, it re-applies the checkbox states to ensure they reflect the correct assignment status.
 */
function renderAssignedListAt() {
  let dropDownList = document.getElementById("dropdown-list");
  dropDownList.innerHTML =
    foundPersonsByInput.length > 0 ? personsFoundPostAt() : dropDownListSampleAt();

  reapplyCheckboxStates();
}

/**
 * This function reapplies the checkbox state for each person found in the input.
 * For each person, it finds the corresponding container element,
 * updates the checkbox state, and attaches a click event listener
 * to handle checkbox changes.
 */
function reapplyCheckboxStates() {
  foundPersonsByInput.forEach((person) => {
    let container = document.getElementById(`persons-assignemend${person.email}`);
    if (container) {
      updateCheckboxState(container, person);
      container.addEventListener("click", () => handleCheckboxChange(person));
    }
  });
}

/**
 * Updates the checkbox state for a given person.
 * Depending on the person's checkbox state, it either adds or removes the checkbox and assigned name in the container.
 * @param {HTMLElement} container - The container element for the person.
 * @param {Object} person - The person object containing email details.
 */
function updateCheckboxState(container, person) {
  let checkbox = document.getElementById(`checkbox${person.email}`);
  let assignedName = document.getElementById(`assigned-name${person.email}`);
  if (checkboxStates[person.email]) {
    addCheckboxAt(container, checkbox, assignedName);
  } else {
    removeCheckboxAt(container, checkbox, assignedName);
  }
}

/**
 * Sorts the contact data within each task in `firebaseData` based on the contact names.
 * It only includes contacts that have a `color` property.
 * 
 * For each task, it extracts contacts with a `color` property, sorts them by name,
 * and updates the task's extracted data with the sorted contacts.
 */
function sortContactsAt() {
  firebaseData.forEach((task) => {
    let taskDataArray = [];

    Object.keys(task.dataExtracted).forEach((key) => {
      const taskData = task.dataExtracted[key];
      if (taskData.color) {
        taskDataArray.push(taskData);
      }
    });

    taskDataArray.sort((a, b) => a.name.localeCompare(b.name));
    taskDataArray.forEach((taskData, index) => {
      task.dataExtracted[Object.keys(task.dataExtracted)[index]] = taskData;
    });
  });
}

/**
 * generates and returns the initials of a given name.
 * The initials are formed by taking the first letter of each word in the name.
 * @param {string} name 
 * @returns  {string}
 */
function renderEmblemAt(name) {
  const initials = name.split(" ").map((word) => word[0]).join("");
  return initials;
}

/**
 * Adds an assigned person from the existing list by changing the checkbox state and posting the updated list.
 * @param {Object} taskData - The data for the person to be assigned.
 */
function addAssignedPersonAt(taskData) {
  handleCheckboxChange(taskData);
  postPersonsAt();
}

/**
 * Adds a found person from the input by changing the checkbox state and posting the updated list.
 * @param {Object} taskData - The data for the person to be added.
 */
function addFoundPersonAt(taskData) {
  handleCheckboxChange(taskData);
  postPersonsAt();
}

/**
 * Handles the checkbox change by swapping the checkbox state and updating the list of assigned persons.
 * @param {Object} taskData - The data for the person whose checkbox state is being changed.
 */
function handleCheckboxChange(taskData) {
  checkboxSwapAt(taskData);
  updateAssignedPersons(taskData);
}

/**
 * Swaps the checkbox state for a person and updates the checkboxStates object.
 * @param {Object} taskData - The data for the person whose checkbox state is being swapped.
 */
function checkboxSwapAt(taskData) {
  let container = document.getElementById(`persons-assignemend${taskData.email}`);
  let checkbox = document.getElementById(`checkbox${taskData.email}`);
  let assignedName = document.getElementById(`assigned-name${taskData.email}`);

  if (!container.classList.contains("persons-assignemend-checkt")) {
    addCheckboxAt(container, checkbox, assignedName);
  } else {
    removeCheckboxAt(container, checkbox, assignedName);
  }

  checkboxStates[taskData.email] = container.classList.contains("persons-assignemend-checkt");
}

/**
 * Adds a checked state to the checkbox in the specified container.
 * Updates the checkbox image and applies styling to the assigned name.
 * @param {HTMLElement} container - The container element that holds the checkbox.
 * @param {HTMLImageElement} checkbox - The checkbox image element to update.
 * @param {HTMLElement} assignedName - The element displaying the assigned name.
 */
function addCheckboxAt(container, checkbox, assignedName) {
  container.classList.add("persons-assignemend-checkt");
  checkbox.src = "./img/checkbox_checkt.png";
  assignedName.classList.add("assigned-color");
}

/**
 * Removes the checked state from the checkbox in the specified container.
 * Updates the checkbox image and removes styling from the assigned name.
 * @param {HTMLElement} container - The container element that holds the checkbox.
 * @param {HTMLImageElement} checkbox - The checkbox image element to update.
 * @param {HTMLElement} assignedName - The element displaying the assigned name.
 */
function removeCheckboxAt(container, checkbox, assignedName) {
  container.classList.remove("persons-assignemend-checkt");
  checkbox.src = "./img/checkbox_uncheckt.png";
  assignedName.classList.remove("assigned-color");
}

/**
 * Updates the list of assigned persons based on the checkbox state for a given person.
 * If the checkbox is checked, the person is added to the `assignedPersons` list if they are not already present.
 * If the checkbox is unchecked, the person is removed from the `assignedPersons` list if they are present.
 * Finally, posts the updated list of assigned persons.
 * @param {Object} taskData - The data for the person whose assignment status is being updated.
 * @param {string} taskData.email - The email of the person to be updated.
 */
function updateAssignedPersons(taskData) {
  
  
  let index = assignedPersons.findIndex((person) => person.email === taskData.email);
  if (checkboxStates[taskData.email]) {
    if (index === -1) {
      assignedPersons.push(taskData);
    }
  } else {
    if (index > -1) {
      assignedPersons.splice(index, 1);
    }
  }
  postPersonsAt();
}

/**
 * Posts the checked persons in to a new container one by one if there are less than or exactly six persons assigned.
 * Else if there are more than six persons then it renders the first 5 and adds an emblem showing the count of additional persons.
 */
function postPersonsAt() {
  let assignedPersonsResults = document.getElementById("assigned-persons");
  if (assignedPersons.length <= 6) {
    assignedPersonsResults.innerHTML = assignedPersons.map((taskData) => assignedResultsAt(taskData)).join("");
  } else {
    assignedPersonsResults.innerHTML = assignedPersons.slice(0, 5).map((taskData) => assignedResultsAt(taskData)).join("");
    // Add an additional emblem showing the remaining count
    assignedPersonsResults.innerHTML += assignedResultsPlusSixAt(
      assignedPersons.length - 5
    );
  }
}

/**
 * Retrieves and processes the search input from the search field.
 * If the input is non-empty, it filters and renders the list of persons based on the input.
 * If the input is empty, it clears the list of found persons, renders the default assigned list, and closes the dropdown.
 */
function searchPersonAt() {
  let input = document.getElementById("assigned").value.trim().toLowerCase();

  if (input.length > 0) {
    filterAndRenderPersons(input);
  } else {
    foundPersonsByInput = [];
    renderAssignedListAt();
    openListAt(false);
  }
}

/**
 * Filters the list of persons based on the input and updates the UI.
 * Clears the current list of found persons and tracks added names to avoid duplicates.
 * Calls `filterPersons` to populate the list and `toggleListDisplay` to update the UI.
 * @param {string} input - The search input used to filter persons.
 */
function filterAndRenderPersons(input) {
  foundPersonsByInput = [];
  let addedNames = new Set();
  filterPersons(input, addedNames);
  toggleListDisplay();
}

/**
 * Filters persons from `firebaseData` based on the input and updates the list of found persons.
 * Adds persons to the `foundPersonsByInput` array if they have a color and their name matches the input.
 * Ensures no duplicate names are added by tracking added names in a Set.
 * @param {string} input - The search input used to filter persons.
 * @param {Set<string>} addedNames - A Set used to track names that have already been added to avoid duplicates.
 */
function filterPersons(input, addedNames) {
  firebaseData.forEach((task) => {
    Object.keys(task.dataExtracted).forEach((key) => {
      const taskData = task.dataExtracted[key];
      if (taskData.color && taskData.name.toLowerCase().startsWith(input) && !addedNames.has(taskData.name)) {
        foundPersonsByInput.push(taskData);
        addedNames.add(taskData.name);
      }
    });
  });
}

/**
 * Toggles the visibility of the list based on whether there are any found persons.
 * If the list of found persons is empty, it hides the dropdown list.
 * Otherwise, it renders the list of assigned persons and shows the dropdown list.
 */
function toggleListDisplay() {
  if (foundPersonsByInput.length === 0) {
    openListAt(false);
  } else {
    renderAssignedListAt();
    openListAt(true);
  }
}

/**
 * Controls the visibility of the dropdown list and rotation of the toggle button.
 * Adds or removes CSS classes to show or hide the dropdown list and rotate the toggle button based on the `show` parameter.
 * @param {boolean} show - A boolean indicating whether to show (true) or hide (false) the dropdown list.
 */
function openListAt(show) {
  let rotate = document.getElementById("rotate");
  let dropDown = document.getElementById("dropdown-list");

  rotate.classList.toggle("rotated", show);
  dropDown.classList.toggle("hide", !show);
}

/**
 * Sets the minimum date allowed in the date input field to the current date.
 * This prevents users from selecting a date before today.
 */
function minDate() {
  let dateInput = document.getElementById("date");
  let today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
}

/**
 * Toggles the visibility of a dropdown menu.
 * Adds or removes the 'open' class from the parent element of the given select element to show or hide the dropdown.
 *
 * @param {HTMLElement} selectElement - The select element whose dropdown visibility will be toggled.
 */
function toggleDropdown(selectElement) {
  const wrapper = selectElement.parentElement;
  wrapper.classList.toggle("open");
}

/**
 * Closes all open dropdowns when the user clicks outside of them.
 * Iterates through all elements with the class 'select-wrapper' and removes the 'open' class if the click event is outside the dropdown.
 *
 * @listens click - Listens for click events on the entire document.
 */
document.addEventListener("click", function (event) {
  const dropdowns = document.querySelectorAll(".select-wrapper");
  dropdowns.forEach(function (wrapper) {
    if (!wrapper.contains(event.target)) {
      wrapper.classList.remove("open");
    }
  });
});
