let assignedPersonsList = [];
let foundPersonsList = [];
let subtasks = [];

/**
 * Adds hover effect to subtask items, showing and hiding edit/delete icons.
 */
function subTasksHoverEffect() {
  for (let i = 0; i < subtasks.length; i++) {
    const hoverListedItem = document.getElementById(`subtaskNr${i}`);
    const hoverListedItemImage = document.getElementById(`subTaskHoverEffect${i}`);

    hoverListedItem.addEventListener("mouseenter", function () {
      hoverListedItemImage.style.display = "flex";
    });
    hoverListedItem.addEventListener("mouseleave", function () {
      hoverListedItemImage.style.display = "none";
    });
  }
}

/**
 * Sets the priority by changing the background and text color of the priority button.
 * 
 * @param {string} priority - The priority to be set ("urgent", "medium", or "low").
 */
function setPriority(priority) {
  let priorities = {
    urgent: document.getElementById("editUrgent"),
    medium: document.getElementById("editMedium"),
    low: document.getElementById("editLow"),
  };

  for (let key in priorities) {
    priorities[key].style.backgroundColor = key === priority ? getColor(priority) : "";
    priorities[key].style.color = key === priority ? "#FFFFFF" : "";
  }
}

/**
 * Gets the color associated with a priority.
 * 
 * @param {string} priority - The priority level.
 * @returns {string} - The color corresponding to the priority level.
 */
function getColor(priority) {
  switch (priority) {
    case "urgent":
      return "#FF3D00";
    case "medium":
      return "#FFA800";
    case "low":
      return "#7AE229";
    default:
      return "";
  }
}

/**
 * Sets the background image for the priority button based on the priority level.
 * 
 * @param {string} priority - The priority to be set ("urgent", "medium", or "low").
 */
function setBgImg(priority) {
  let images = {
    urgent: document.getElementById("editActiveUrg"),
    medium: document.getElementById("editActiveMed"),
    low: document.getElementById("editActiveLow"),
  };

  for (let key in images) {
    images[key].src = key === priority ? getActiveImg(priority) : getInactiveImg(key);
  }
}

/**
 * Gets the active image for the given priority.
 * 
 * @param {string} priority - The priority level.
 * @returns {string} - The active image URL corresponding to the priority level.
 */
function getActiveImg(priority) {
  switch (priority) {
    case "urgent":
      return "/img/userStoryEdit/urgent-prio-icon-active.svg";
    case "medium":
      return "/img/userStoryEdit/prio_medium_active.svg";
    case "low":
      return "/img/userStoryEdit/low-prio-icon-active.png";
    default:
      return "";
  }
}

/**
 * Gets the inactive image for the given priority.
 * 
 * @param {string} priority - The priority level.
 * @returns {string} - The inactive image URL corresponding to the priority level.
 */
function getInactiveImg(priority) {
  switch (priority) {
    case "urgent":
      return "/img/userStoryEdit/urgent-prio-icon-inactive.svg";
    case "medium":
      return "/img/userStoryEdit/prio_medium_inactive.svg";
    case "low":
      return "/img/userStoryEdit/low-prio-icon-inactive.png";
    default:
      return "";
  }
}

/**
 * Sets the priority to "urgent" and updates the background image accordingly.
 */
function addUrgent() {
  setPriority("urgent");
  setBgImg("urgent");
}

/**
 * Sets the priority to "medium" and updates the background image accordingly.
 */
function addMedium() {
  setPriority("medium");
  setBgImg("medium");
}

/**
 * Sets the priority to "low" and updates the background image accordingly.
 */
function addLow() {
  setPriority("low");
  setBgImg("low");
}

/**
 * Toggles the display of the person edit dropdown list.
 */
function editShowPersons() {
  let rotate = document.getElementById("editRotate");
  let dropDown = document.getElementById("editDropDownList");

  if (dropDown.classList.contains("editHide")) {
    rotate.classList.add("editRotated");
    dropDown.classList.remove("editHide");
  } else {
    rotate.classList.remove("editRotated");
    dropDown.classList.add("editHide");
  }
}

/**
 * Renders the dropdown list for persons.
 */
function renderDropdownList() {
  let dropDown = document.getElementById("editDropDownList");

  if (foundPersonsList && foundPersonsList.length > 0) {
    dropDown.innerHTML = personsFoundPost(foundPersonsList);
  } else {
    dropDown.innerHTML = dropDownListSample();
  }
}

/**
 * Sorts an array of contact objects by their name property.
 * Assumes each contact object has a 'name' property which is a string.
 *
 * @param {Array<Object>} contacts - The array of contact objects to be sorted.
 * @returns {Array<Object>} - The sorted array of contact objects.
 */
function sortContacts(contacts) {
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  return contacts;
}

/**
 * Renders the initials of a person's name.
 * 
 * @param {string} name - The full name of the person.
 * @returns {string} - The initials of the person's name.
 */
function renderEmblem(name) {
  const initials = name.split(' ').map(word => word[0]).join('');
  return initials;
}

/**
 * Adds a person to the assigned persons list.
 * 
 * @param {number} i - The index of the person in the contacts array.
 */
function addAssignedPerson(i) {
  checkboxSwap(i);
  checkIfExist(i);
  postPersons();
}

/**
 * Toggles the checkbox state and appearance for a person.
 * 
 * @param {number} i - The index of the person in the contacts array.
 */
function checkboxSwap(i) {
  let container = document.getElementById(`persons-assignemend${i}`);
  let checkbox = document.getElementById(`checkbox${i}`);
  let assignedName = document.getElementById(`assigned-name${i}`);

  if (!container.classList.contains('persons-assignemend-checkt')) {
    addCheckbox(container, checkbox, assignedName);
  } else {
    removeCheckbox(container, checkbox, assignedName);
  }
}

/**
 * Adds the checked state to the checkbox and updates the appearance.
 * 
 * @param {HTMLElement} container - The container element for the person.
 * @param {HTMLElement} checkbox - The checkbox element.
 * @param {HTMLElement} assignedName - The assigned name element.
 */
function addCheckbox(container, checkbox, assignedName) {
  container.classList.add('persons-assignemend-checkt');
  checkbox.src = './img/checkbox_checkt.png';
  assignedName.classList.add("assigned-color");
}

/**
 * Removes the checked state from the checkbox and updates the appearance.
 * 
 * @param {HTMLElement} container - The container element for the person.
 * @param {HTMLElement} checkbox - The checkbox element.
 * @param {HTMLElement} assignedName - The assigned name element.
 */
function removeCheckbox(container, checkbox, assignedName) {
  container.classList.remove('persons-assignemend-checkt');
  checkbox.src = './img/checkbox_uncheckt.png';
  assignedName.classList.remove("assigned-color");
}

/**
 * Checks if a person exists in the assigned persons list and updates the list accordingly.
 * 
 * @param {number} i - The index of the person in the contacts array.
 */
function checkIfExist(i) {
  let container = document.getElementById(`persons-assignemend${i}`);

  if (container.classList.contains('persons-assignemend-checkt')) {
    if (!assignedPersonsList.includes(contacts[i])) {
      assignedPersonsList.push(contacts[i]);
    }
  } else {
    let index = assignedPersonsList.indexOf(contacts[i]);
    if (index > -1) {
      assignedPersonsList.splice(index, 1);
    }
  }
}

/**
 * Updates the display of assigned persons.
 */
function postPersons() {
  let assignedPersonsResults = document.getElementById('assigned-persons');

  assignedPersonsResults.innerHTML = '';
  assignedPersonsResults.innerHTML += assignedResults();
}

/**
 * Searches for a person based on the input value and updates the dropdown list.
 */
function searchPerson() {
  let input = document.getElementById('assigned-to').value.trim().toLowerCase();

  if (input.length > 2) {
    openList(input);
    personsControl(input);
    personsFoundPost(foundPersonsList);
  } else {
    foundPersonsList = '';
    renderDropdownList();
  }
}

/**
 * Controls the search results for persons based on the input value.
 * 
 * @param {string} input - The input value for the search.
 */
function personsControl(input) {
  foundPersonsList = []; // Reset foundPersonsList array
  let addedNames = new Set(); // Track added names to avoid duplicates

  for (let i = 0; i < contacts.length; i++) {
    let person = contacts[i];
    if (person.name.toLowerCase().includes(input)) {
      if (!addedNames.has(person.name)) {
        foundPersonsList.push(person);
        addedNames.add(person.name); // Add name to the set
      }
    }
  }
}

/**
 * Checks if a found person exists in the assigned persons list and updates the list accordingly.
 * 
 * @param {number} i - The index of the person in the found persons list.
 */
function checkIfFoundExist(i) {
  let container = document.getElementById(`persons-assignemend${i}`);

  if (container.classList.contains('persons-assignemend-checkt')) {
    if (!assignedPersonsList.includes(foundPersonsList[i])) {
      assignedPersonsList.push(foundPersonsList[i]);
    }
  } else {
    let index = assignedPersonsList.indexOf(foundPersonsList[i]);
    if (index > -1) {
      assignedPersonsList.splice(index, 1);
    }
  }
}

/**
 * Adds a found person to the assigned persons list.
 * 
 * @param {number} i - The index of the person in the found persons list.
 */
function addFoundPerson(i) {
  checkboxSwap(i);
  checkIfFoundExist(i);
  postPersons(); 
}

/**
 * Opens the dropdown list for persons based on the input value.
 * 
 * @param {string} input - The input value for the search.
 */
function openList(input) {
  let rotate = document.getElementById("rotate");
  let dropDown = document.getElementById("dropdown-list");

  if (input.length < 1) {
    rotate.classList.remove("editRotated");
    dropDown.classList.add("editHide");
  } else {
    rotate.classList.add("editRotated");
    dropDown.classList.remove("editHide");
    renderDropdownList();
  }
}

/**
 * Displays the input fields for adding a new subtask.
 */
function addSubtask() {
  let plusIcon = document.getElementById("addSubtaskIcon");
  let hidenContainer = document.getElementById("addRemoveContainer");
  plusIcon.classList.add("hide");
  hidenContainer.classList.remove("hide");
}

/**
 * Closes the input fields for adding a new subtask.
 */
function closeSubtask() {
  let plusIcon = document.getElementById("addSubtaskIcon");
  let hidenContainer = document.getElementById("addRemoveContainer");
  let subtask = document.getElementById("subtask");

  plusIcon.classList.remove("hide");
  hidenContainer.classList.add("hide");
  subtask.value = "";
}

/**
 * Approves the addition of a new subtask, validates the input, and updates the subtask list.
 */
function aproveSubtaskEdit() {
  let subtask = document.getElementById("subtask");
  if (!subtask.value.trim()) {
    subtask.placeholder = "Please fill in your Subtask";
  } else {
    subtask.placeholder = "Add new Subtask";
    subtasks.push(subtask.value);
    subtask.value = "";
    postSubtask();
  }

  subTasksHoverEffect();
}

/**
 * Approves the editing of a subtask and updates the subtask list.
 * 
 * @param {HTMLElement} element - The element that triggered the function.
 */
function approveEdit(element) {
  let listItem = element.closest(".listItemSubTasks");
  let inputElement = listItem.querySelector("input");
  let newSubtaskText = inputElement.value.trim();

  if (inputElement.value.trim() === '') {
    inputElement.placeholder = "Please fill in your Subtask";
    return;
  }
  let oldSubtaskText = subtasks.find(
    (subtask) => subtask === inputElement.defaultValue
  );
  let index = subtasks.indexOf(oldSubtaskText);
  if (index !== -1) {
    subtasks[index] = newSubtaskText;
  }
  inputElement.outerHTML = `<span class="subtask-text">${newSubtaskText}</span>`;
  swapToNormal(listItem);
}

/**
 * Updates the display of the subtask list.
 */
function postSubtask() {
  let subtaskDisplay = document.getElementById("subtaskDisplayEdit");

  subtaskDisplay.innerHTML = "";
  subtaskDisplay.innerHTML += subtaskSample();
}

/**
 * Edits an existing subtask, allowing the user to change its content.
 * 
 * @param {HTMLElement} element - The element that triggered the function.
 */
function editSubtask(element) {
  let listItem = element.closest(".listItemSubTasks");
  let subtaskSpan = listItem.querySelector(".subtask-text");
  let subtaskText = subtaskSpan.textContent.trim();
  subtaskSpan.outerHTML = `<input id="subtask-edit-edit-input" value="${subtaskText}">`;

  swapToEdit(listItem);
}

/**
 * Cancels the editing of a subtask and reverts it to its original state.
 * 
 * @param {HTMLElement} element - The element that triggered the function.
 */
function cancelEdit(element) {
  let listItem = element.closest(".listItemSubTasks");
  let inputElement = listItem.querySelector("input");
  let subtaskText = inputElement ? inputElement.value.trim() : "";
  if (inputElement) {
    inputElement.outerHTML = `<span class="subtask-text">${subtaskText}</span>`;
  }
  swapToNormal(listItem);
  postSubtask();
  subTasksHoverEffect();
}

/**
 * Deletes a subtask from the subtask list.
 * 
 * @param {HTMLElement} element - The element that triggered the function.
 */
function deleteSubtask(element) {
  let listItem = element.closest(".listItemSubTasks");
  let subtaskSpan = listItem.querySelector(".subtask-text");
  let subtaskText = subtaskSpan.textContent.trim();
  let index = subtasks.indexOf(subtaskText);
  if (index !== -1) {
    subtasks.splice(index, 1);
  }

  listItem.remove();
}

/**
 * Swaps a subtask item to edit mode.
 * 
 * @param {HTMLElement} listItem - The list item element containing the subtask.
 */
function swapToEdit(listItem) {
  let edit = listItem.querySelector("[id^=editContainer]");
  let editing = listItem.querySelector("[id^=addRemoveContainerEdit]");
  edit.classList.add("hide");
  editing.classList.remove("hide");
}

/**
 * Swaps a subtask item back to normal view mode.
 * 
 * @param {HTMLElement} listItem - The list item element containing the subtask.
 */
function swapToNormal(listItem) {
  let edit = listItem.querySelector("[id^=editContainer]");
  let editing = listItem.querySelector("[id^=addRemoveContainerEdit]");
  edit.classList.remove("hide");
  editing.classList.add("hide");
}
