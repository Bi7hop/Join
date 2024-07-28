let subtasksAt = [];
let assignedPersons = [];
let foundPersons = [];


function showPersonsAt() {
  let rotate = document.getElementById("rotate");
  let dropDown = document.getElementById("dropdown-list");

  if (dropDown.classList.contains("hide")) {
    rotate.classList.add("rotated");
    dropDown.classList.remove("hide");
  } else {
    rotate.classList.remove("rotated");
    dropDown.classList.add("hide");
  }
}

function renderAssignedListAt() {
  let dropDownList = document.getElementById('dropdown-list');
  if (foundPersons && foundPersons.length > 0) {
    dropDownList.innerHTML = personsFoundPostAt();
  }
  else {
    dropDownList.innerHTML = dropDownListSampleAt();
  }

  // Apply state to checkboxes after rendering
  foundPersons.forEach(person => {
    let container = document.getElementById(`persons-assignemend${person.email}`);
    if (container) {
      let checkbox = document.getElementById(`checkbox${person.email}`);
      let assignedName = document.getElementById(`assigned-name${person.email}`);
      // Set checkbox state based on whether the person is in assignedPersons
      if (assignedPersons.some(assignedPerson => assignedPerson.email === person.email)) {
        addCheckboxAt(container, checkbox, assignedName);
      } else {
        removeCheckboxAt(container, checkbox, assignedName);
      }
    }
  });
}

function sortContactsAt() {
  firebaseData.forEach(task => {
    let taskDataArray = [];

    // Collect all taskData objects
    Object.keys(task.dataExtracted).forEach(key => {
      const taskData = task.dataExtracted[key];
      if (taskData.color) {
        taskDataArray.push(taskData);
      }
    });

    // Sort the collected taskData objects by name
    taskDataArray.sort((a, b) => a.name.localeCompare(b.name));

    // Assign sorted taskData back
    taskDataArray.forEach((taskData, index) => {
      task.dataExtracted[Object.keys(task.dataExtracted)[index]] = taskData;
    });
  });
}

function renderEmblemAt(name) {
  const initials = name.split(' ').map(word => word[0]).join('');
  return initials;
}

function addAssignedPersonAt(taskData) {
  checkboxSwapAt(taskData);
  checkIfExistAt(taskData);
  postPersonsAt();
}

function checkboxSwapAt(taskData) {
  let container = document.getElementById(`persons-assignemend${taskData.email}`);
  let checkbox = document.getElementById(`checkbox${taskData.email}`);
  let assignedName = document.getElementById(`assigned-name${taskData.email}`);

  if (!container.classList.contains('persons-assignemend-checkt')) {
    addCheckboxAt(container, checkbox, assignedName);
  } else {
    removeCheckboxAt(container, checkbox, assignedName);
  }
  updateAssignedPersons(taskData);
}

function addCheckboxAt(container, checkbox, assignedName) {
  container.classList.add('persons-assignemend-checkt');
  checkbox.src = './img/checkbox_checkt.png';
  assignedName.classList.add("assigned-color");
}

function removeCheckboxAt(container, checkbox, assignedName) {
  container.classList.remove('persons-assignemend-checkt');
  checkbox.src = './img/checkbox_uncheckt.png';
  assignedName.classList.remove("assigned-color");
}

function checkIfExistAt(taskData) {
  let container = document.getElementById(`persons-assignemend${taskData.email}`);
  let index = assignedPersons.findIndex(person => person.email === taskData.email);

  if (container.classList.contains('persons-assignemend-checkt')) {
    if (index === -1) {
      assignedPersons.push(taskData);
    }
  } else {
    if (index > -1) {
      assignedPersons.splice(index, 1);
    }
  }
}

function postPersonsAt() {
  let assignedPersonsResults = document.getElementById('assigned-persons');
  assignedPersonsResults.innerHTML = '';
  assignedPersons.forEach(taskData => {
    assignedPersonsResults.innerHTML = assignedResultsAt(taskData);
  });
}

function searchPersonAt() {
  let input = document.getElementById('assigned').value.trim().toLowerCase();

  if (input.length > 0) {
    openListAt(input);
    filterAndRenderPersons(input);
  } else {
    foundPersons = [];
    renderAssignedListAt();
  }
}

function filterAndRenderPersons(input) {
  foundPersons = []; // Reset foundPersons array
  let addedNames = new Set(); // Track added names to avoid duplicates

  firebaseData.forEach(task => {
    Object.keys(task.dataExtracted).forEach(key => {
      const taskData = task.dataExtracted[key];
      if (taskData.color && taskData.name.toLowerCase().startsWith(input)) {
        if (!addedNames.has(taskData.name)) {
          foundPersons.push(taskData);
          addedNames.add(taskData.name);
        }
      }
    });
  });

  // Render the list and maintain checkbox states
  renderAssignedListAt();
}

function checkIfFoundExistAt(taskData) {
  let container = document.getElementById(`persons-assignemend${taskData.email}`);
  let index = assignedPersons.findIndex(person => person.email === taskData.email);

  if (container.classList.contains('persons-assignemend-checkt')) {
    if (index === -1) {
      assignedPersons.push(taskData);
    }
  } else {
    if (index > -1) {
      assignedPersons.splice(index, 1);
    }
  }
}

function addFoundPersonAt(taskData) {
  checkboxSwapAt(taskData);
  checkIfFoundExistAt(taskData);
  postPersonsAt();
}

function openListAt(input) {
  let rotate = document.getElementById("rotate");
  let dropDown = document.getElementById("dropdown-list");

  if (input.length === 0) {
    rotate.classList.remove("rotated");
    dropDown.classList.add("hide");
  } else {
    rotate.classList.add("rotated");
    dropDown.classList.remove("hide");
  }
}

function updateAssignedPersons(taskData) {
  let index = assignedPersons.findIndex(person => person.email === taskData.email);
  if (index === -1) {
    assignedPersons.push(taskData);
  } else {
    assignedPersons.splice(index, 1);
  }
}

// Dummy functions for placeholders
function personsFoundPostAt() {
  return foundPersons.map(person => `
    <div id="persons-assignemend${person.email}">
      <img id="checkbox${person.email}" src="./img/checkbox_uncheckt.png" />
      <span id="assigned-name${person.email}">${renderEmblemAt(person.name)}</span>
    </div>
  `).join('');
}

function dropDownListSampleAt() {
  return "<p>No persons found.</p>";
}

function assignedResultsAt(taskData) {
  return `<div>${taskData.name}</div>`;
}













































function setPriorityAt(priority) {
  let priorities = {
    urgent: document.getElementById("urgent"),
    medium: document.getElementById("medium"),
    low: document.getElementById("low"),
  };

  for (let key in priorities) {
    priorities[key].style.backgroundColor =
      key === priority ? getColorAt(priority) : "";
    priorities[key].style.color = key === priority ? "#FFFFFF" : "";
  }

  currentPriority = priority;
}

function getColorAt(priority) {
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

function setBgImgAt(priority) {
  let images = {
    urgent: document.getElementById("activeUrg"),
    medium: document.getElementById("activeMed"),
    low: document.getElementById("activeLow"),
  };

  for (let key in images) {
    images[key].src =
      key === priority ? getActiveImgAt(priority) : getInactiveImgAt(key);
  }
}

function getActiveImgAt(priority) {
  switch (priority) {
    case "urgent":
      return "/img/urgent-prio-icon-active.svg";
    case "medium":
      return "/img/medium-prio-icon-active.png";
    case "low":
      return "/img/low-prio-icon-active.png";
    default:
      return "";
  }
}

function getInactiveImgAt(priority) {
  switch (priority) {
    case "urgent":
      return "/img/urgent-prio-icon-inactive.png";
    case "medium":
      return "/img/medium-prio-icon-inactive.png";
    case "low":
      return "/img/low-prio-icon-inactive.png";
    default:
      return "";
  }
}

function addUrgentAt() {
  setPriorityAt("urgent");
  setBgImgAt("urgent");
}

function addMediumAt() {
  setPriorityAt("medium");
  setBgImgAt("medium");
}

function addLowAt() {
  setPriorityAt("low");
  setBgImgAt("low");
}

function addSubtaskAt() {
  let plusIcon = document.getElementById("addSubtaskIconAt");
  let hidenContainer = document.getElementById("addRemoveContainerAt");

  plusIcon.classList.add("hide");
  hidenContainer.classList.remove("hide");
}

function closeSubtaskAt() {
  let plusIcon = document.getElementById("addSubtaskIconAt");
  let hidenContainer = document.getElementById("addRemoveContainerAt");
  let subtask = document.getElementById("subtaskAt");

  plusIcon.classList.remove("hide");
  hidenContainer.classList.add("hide");
  subtask.value = "";
}

function aproveSubtaskAt() {
  let subtaskAt = document.getElementById("subtaskAt");

  if (!subtaskAt.value.trim()) {
    alert("Please fill in your Subtask");
  } else {
    subtasksAt.push(subtaskAt.value);
    subtaskAt.value = "";
    postSubtaskAt();
  }
}

function postSubtaskAt() {
  let subtaskDisplayAt = document.getElementById("subtaskDisplayAt");

  subtaskDisplayAt.innerHTML = "";
  subtaskDisplayAt.innerHTML += subtaskSampleAt();
}

function editSubtaskAt(element) {
  let listItem = element.closest(".listItem");
  let subtaskSpan = listItem.querySelector(".subtask-text");
  let subtaskText = subtaskSpan.textContent.trim();
  subtaskSpan.outerHTML = `<input value="${subtaskText}">`;

  swapToEditAt(listItem);
}

function cancelEditAt(element) {
  let listItem = element.closest(".listItem");
  let inputElement = listItem.querySelector("input");
  let subtaskText = inputElement ? inputElement.value.trim() : "";
  if (inputElement) {
    inputElement.outerHTML = `<span class="subtask-text">${subtaskText}</span>`;
  }
  swapToNormalAt(listItem);
}

function deleteSubtaskAt(element) {
  let listItem = element.closest(".listItem");
  let subtaskSpan = listItem.querySelector(".subtask-text");
  let subtaskText = subtaskSpan.textContent.trim();
  let index = subtasksAt.indexOf(subtaskText);
  if (index !== -1) {
    subtasksAt.splice(index, 1);
  }

  listItem.remove();
}

function swapToEditAt(listItem) {
  let edit = listItem.querySelector("[id^=editContainerAt]");
  let editing = listItem.querySelector("[id^=addRemoveContainerEditAt]");
  edit.classList.add("hide");
  editing.classList.remove("hide");
}

function swapToNormalAt(listItem) {
  let edit = listItem.querySelector("[id^=editContainerAt]");
  let editing = listItem.querySelector("[id^=addRemoveContainerEditAt]");
  edit.classList.remove("hide");
  editing.classList.add("hide");
}

function approveEditAt(element) {
  let listItem = element.closest(".listItem");
  let inputElement = listItem.querySelector("input");
  let newSubtaskText = inputElement.value.trim();

  let oldSubtaskText = subtasksAt.find(
    (subtask) => subtask === inputElement.defaultValue
  );
  let index = subtasksAt.indexOf(oldSubtaskText);
  if (index !== -1) {
    subtasksAt[index] = newSubtaskText;
  }

  inputElement.outerHTML = `<span class="subtask-text">${newSubtaskText}</span>`;

  swapToNormalAt(listItem);
}

/*the following functions must be used for the board.html and addTasks.html */

function openAddTask() {
  let card = document.querySelector(".add-task-popup");
  let overlay = document.getElementById("overlay");

  swapToPopup();
  hideOverflow();
  card.style.display = "block";
  overlay.classList.add("overlay");
}

function swapToPopup() {
  document.getElementById("add-task-position").className =
    "add-task-popup-position";
  document.getElementById("add-task-card").style.backgroundColor = "white";
  document.getElementById("close-popup").classList.remove("hide");
}

function hideOverflow() {
  let boardBodyContainer = document.querySelector(".boardBodyContainer");
  boardBodyContainer.style.overflow = "hidden";
}

function closeAddTask() {
  let addTask = document.getElementById("add-task-position");
  if (addTask.classList.contains("add-task-popup-position")) {
    closeAddTaskPopup();
  } else {
    location.reload();
  }
}

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

function showOverflow() {
  let boardBodyContainer = document.querySelector(".boardBodyContainer");
  boardBodyContainer.style.overflow = "";
}


function minDate() {
  let dateInput = document.getElementById('date');
  let today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}