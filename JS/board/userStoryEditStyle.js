let assignedPersonsList = [];
let foundPersonsList = [];

// Subtasks Listed Item Hover and show Edit/Delete Icon effect
function subTasksHoverEffect() {
  for (let i = 0; i < 2; i++) {
    const hoverListedItem = document.querySelector(`.subtaskListedItem${i}`)
    const hoverListedItemImage = document.querySelector(`.subtaskListedImage${i}`)
    hoverListedItemImage.style.display = "none";
    hoverListedItem.addEventListener("mouseenter", function () {
      hoverListedItem.style.backgroundColor = "#2c2c2c17"; // gray
      hoverListedItemImage.style.display = "block";
    });
    hoverListedItem.addEventListener("mouseleave", function () {
      hoverListedItem.style.backgroundColor = "#FFFFFF"; // Change back to original color
      hoverListedItemImage.style.display = "none";
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

function sortContacts() {
  contacts.sort((a, b) => a.name.localeCompare(b.name));
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

  if (input.length == 0) {
    rotate.classList.remove("rotated");
    dropDown.classList.add("hide");
  } else {
    rotate.classList.add("rotated");
    dropDown.classList.remove("hide");
    renderDropdownList();
  }
}
