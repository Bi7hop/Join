let assignedPersonsList = [];
let foundPersonsList = [];
let subtasks = [];

// Subtasks Listed Item Hover and show Edit/Delete Icon effect
function subTasksHoverEffect() {
  for (let i = 0; i < subtasks.length; i++) {
    const hoverListedItem = document.getElementById(`subtaskNr${i}`)
    const hoverListedItemImage = document.getElementById(`subTaskHoverEffect${i}`);

    hoverListedItem.addEventListener("mouseenter", function () {
      hoverListedItemImage.style.display = "flex"
      
    });
    hoverListedItem.addEventListener("mouseleave", function () {
      hoverListedItemImage.style.display = "none"
      
    })
  };
};

function setPriority(priority) {
  let priorities = {
    urgent: document.getElementById("editUrgent"),
    medium: document.getElementById("editMedium"),
    low: document.getElementById("editLow"),
  };

  for (let key in priorities) {
    priorities[key].style.backgroundColor =
      key === priority ? getColor(priority) : "";
    priorities[key].style.color = key === priority ? "#FFFFFF" : ""; // Setze die Textfarbe auf Weiß
  }
}

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

function setBgImg(priority) {
  let images = {
    urgent: document.getElementById("editActiveUrg"),
    medium: document.getElementById("editActiveMed"),
    low: document.getElementById("editActiveLow"),
  };

  for (let key in images) {
    images[key].src =
      key === priority ? getActiveImg(priority) : getInactiveImg(key);
  }
}

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

function addUrgent() {
  setPriority("urgent");
  setBgImg("urgent");
}

function addMedium() {
  setPriority("medium");
  setBgImg("medium");
}

function addLow() {
  setPriority("low");
  setBgImg("low");
}

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

function renderDropdownList(){
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

function renderEmblem(name) {
  const initials = name.split(' ').map(word => word[0]).join('');
  return initials;
}

function addAssignedPerson(i) {
  checkboxSwap(i);
  checkIfExist(i);
  postPersons();
}

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

function addCheckbox(container, checkbox, assignedName) {
  container.classList.add('persons-assignemend-checkt');
  checkbox.src = './img/checkbox_checkt.png';
  assignedName.classList.add("assigned-color");
}

function removeCheckbox(container, checkbox, assignedName) {
  container.classList.remove('persons-assignemend-checkt');
  checkbox.src = './img/checkbox_uncheckt.png';
  assignedName.classList.remove("assigned-color");
}

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

function postPersons() {
  let assignedPersonsResults = document.getElementById('assigned-persons');
 
  assignedPersonsResults.innerHTML = '';
  assignedPersonsResults.innerHTML += assignedResults();
}

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

function addFoundPerson(i) {
  checkboxSwap(i);
  checkIfFoundExist(i);
  postPersons(); 
}

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

function addSubtask() {
  let plusIcon = document.getElementById("addSubtaskIcon");
  let hidenContainer = document.getElementById("addRemoveContainer");
  plusIcon.classList.add("hide");
  hidenContainer.classList.remove("hide");
}

function closeSubtask() {
  let plusIcon = document.getElementById("addSubtaskIcon");
  let hidenContainer = document.getElementById("addRemoveContainer");
  let subtask = document.getElementById("subtask");

  plusIcon.classList.remove("hide");
  hidenContainer.classList.add("hide");
  subtask.value = "";
}

function aproveSubtaskEdit() {
  let subtask = document.getElementById("subtask");
  if (!subtask.value.trim()) {
    alert("Please fill in your Subtask");
  } else {
    subtasks.push(subtask.value);
    subtask.value = "";
    postSubtask();
  }
  
  
  subTasksHoverEffect();
}

function approveEdit(element) {
  let listItem = element.closest(".listItemSubTasks");
  let inputElement = listItem.querySelector("input");
  let newSubtaskText = inputElement.value.trim();

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

function postSubtask() {
  let subtaskDisplay = document.getElementById("subtaskDisplayEdit");

  subtaskDisplay.innerHTML = "";
  subtaskDisplay.innerHTML += subtaskSample();
}

function editSubtask(element) {
  let listItem = element.closest(".listItemSubTasks");
  let subtaskSpan = listItem.querySelector(".subtask-text");
  let subtaskText = subtaskSpan.textContent.trim();
  subtaskSpan.outerHTML = `<input id="subtask-edit-edit-input" value="${subtaskText}">`;

  swapToEdit(listItem);
}

function cancelEdit(element) {
  let listItem = element.closest(".listItemSubTasks");
  let inputElement = listItem.querySelector("input");
  let subtaskText = inputElement ? inputElement.value.trim() : "";
  if (inputElement) {
    inputElement.outerHTML = `<span class="subtask-text">${subtaskText}</span>`;
  }
  swapToNormal(listItem);
}

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

function swapToEdit(listItem) {
  let edit = listItem.querySelector("[id^=editContainer]");
  let editing = listItem.querySelector("[id^=addRemoveContainerEdit]");
  edit.classList.add("hide");
  editing.classList.remove("hide");
}

function swapToNormal(listItem) {
  let edit = listItem.querySelector("[id^=editContainer]");
  let editing = listItem.querySelector("[id^=addRemoveContainerEdit]");
  edit.classList.remove("hide");
  editing.classList.add("hide");
}