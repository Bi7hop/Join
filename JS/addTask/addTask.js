let subtasksAt = [];
let assignedPersons = [];
let foundPersonsByInput = [];
let checkboxStates = {}; // Declare checkboxStates globally


function showPersonsAt() {
  let rotate = document.getElementById("rotate");
  let dropDown = document.getElementById("dropdown-list");

  rotate.classList.toggle("rotated");
  dropDown.classList.toggle("hide");

  if (!dropDown.classList.contains("hide")) {
    renderAssignedListAt();
  }
}

document.addEventListener("click", function(event) {
  let rotate = document.getElementById("rotate");
  let dropDown = document.getElementById("dropdown-list");
  let inputField = document.getElementById("assigned"); // Reference to the input field

  // Check if the clicked element is not the dropdown, the rotate button, or the input field
  if (!rotate.contains(event.target) && !dropDown.contains(event.target) && !inputField.contains(event.target)) {
    rotate.classList.remove("rotated");
    dropDown.classList.add("hide");
  }
});


function renderAssignedListAt() {
  let dropDownList = document.getElementById('dropdown-list');
  if (foundPersonsByInput.length > 0) {
    dropDownList.innerHTML = personsFoundPostAt();
  } else {
    dropDownList.innerHTML = dropDownListSampleAt();
  }
  // Reapply state to checkboxes after rendering
  foundPersonsByInput.forEach(person => {
    let container = document.getElementById(`persons-assignemend${person.email}`);
    if (container) {
      let checkbox = document.getElementById(`checkbox${person.email}`);
      let assignedName = document.getElementById(`assigned-name${person.email}`);
      if (checkboxStates[person.email]) {
        addCheckboxAt(container, checkbox, assignedName);
      } else {
        removeCheckboxAt(container, checkbox, assignedName);
      }

      // Ensure click event is attached to each person
      container.addEventListener('click', () => handleCheckboxChange(person));
    }
  });
}

function sortContactsAt() {
  firebaseData.forEach(task => {
    let taskDataArray = [];

    Object.keys(task.dataExtracted).forEach(key => {
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

  console.log("Contacts sorted in firebaseData.");
}

function renderEmblemAt(name) {
  const initials = name.split(' ').map(word => word[0]).join('');
  return initials;
}

function addAssignedPersonAt(taskData) {
  handleCheckboxChange(taskData);
  postPersonsAt();
}

function addFoundPersonAt(taskData) {
  handleCheckboxChange(taskData);
  postPersonsAt();
}

function handleCheckboxChange(taskData) {
  checkboxSwapAt(taskData);
  updateAssignedPersons(taskData);
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

  // Update checkboxStates
  checkboxStates[taskData.email] = container.classList.contains('persons-assignemend-checkt');
  console.log("Checkbox swapped. Current checkboxStates:", checkboxStates);
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

function updateAssignedPersons(taskData) {
  let index = assignedPersons.findIndex(person => person.email === taskData.email);
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

function postPersonsAt() {
  let assignedPersonsResults = document.getElementById('assigned-persons');
  if (assignedPersons.length <= 6) {
    assignedPersonsResults.innerHTML = assignedPersons.map(taskData => assignedResultsAt(taskData)).join('');
  } else {
    // Render the first six emblems
    assignedPersonsResults.innerHTML = assignedPersons.slice(0, 5).map(taskData => assignedResultsAt(taskData)).join('');
    // Add an additional emblem showing the remaining count
    assignedPersonsResults.innerHTML += assignedResultsPlusSixAt(assignedPersons.length - 5);
  }
}

function searchPersonAt() {
  let input = document.getElementById('assigned').value.trim().toLowerCase();
  console.log("Search input:", input);

  if (input.length > 0) {
    filterAndRenderPersons(input);
  } else {
    foundPersonsByInput = [];
    renderAssignedListAt();
    openListAt(false); // Close the list if input is empty
  }
}

function filterAndRenderPersons(input) {
  foundPersonsByInput = []; // Reset foundPersonsByInput array
  let addedNames = new Set(); // Track added names to avoid duplicates
  
  firebaseData.forEach(task => {
    Object.keys(task.dataExtracted).forEach(key => {
      const taskData = task.dataExtracted[key];
      if (taskData.color && taskData.name.toLowerCase().startsWith(input)) {
        if (!addedNames.has(taskData.name)) {
          foundPersonsByInput.push(taskData);
          addedNames.add(taskData.name);
        }
      }
    });
  });

  if (foundPersonsByInput.length === 0) {
    openListAt(false); // Close the list if no matches found
  } else {
    renderAssignedListAt();
    openListAt(true); // Open the list if matches are found
  }
}

function openListAt(show) {
  let rotate = document.getElementById("rotate");
  let dropDown = document.getElementById("dropdown-list");

  rotate.classList.toggle("rotated", show);
  dropDown.classList.toggle("hide", !show);
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
  subTasksHoverEffect();
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

function minDate() {
  let dateInput = document.getElementById('date');
  let today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

function subTasksHoverEffect() {
  for (let i = 0; i < subtasksAt.length; i++) {
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

function toggleDropdown(selectElement) {
  const wrapper = selectElement.parentElement;
  wrapper.classList.toggle('open');
}
                                                             // Close the dropdown if the user clicks outside of it
document.addEventListener('click', function(event) {
  const dropdowns = document.querySelectorAll('.select-wrapper');
  dropdowns.forEach(function(wrapper) {
    if (!wrapper.contains(event.target)) {
      wrapper.classList.remove('open');
    }
  });
});