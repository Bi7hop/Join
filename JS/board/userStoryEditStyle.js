let assignedPersonsList = [];

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

function sortContacts() {
  contacts.sort((a, b) => a.name.localeCompare(b.name));
}

function renderEmblem(name) {
  const initials = name.split(' ').map(word => word[0]).join('');
  return initials;
}

function renderDropdownList(foundPersons){
  let dropDown = document.getElementById("editDropDownList");
  if (foundPersons && foundPersons.length > 0) {
    dropDown.innerHTML = personsFoundPost(foundPersons);
  } else {
    dropDown.innerHTML = dropDownListSample();
  }
}

function addAssignedPerson(i){
  personAdded(i);
  checkIfCheckd(i);
  postPersons();
}

function personAdded(i){
  let container = document.getElementById(`persons-assignemend${i}`);
  let checkbox = document.getElementById(`checkbox${i}`);
  let assignedName = document.getElementById(`assigned-name${i}`);

  if (!container.classList.contains('persons-assignemend-checkt')) {
    container.classList.add('persons-assignemend-checkt');
    checkbox.src = './img/checkbox_checkt.png';
    assignedName.classList.add("assigned-color");
  }else{
    container.classList.remove('persons-assignemend-checkt');
    checkbox.src = './img/checkbox_uncheckt.png';
    assignedName.classList.remove("assigned-color");
  }
}

function checkIfCheckd(i) {
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

function postPersons(){
  let assignedPersonsResults = document.getElementById('assigned-persons');
 
  assignedPersonsResults.innerHTML = '';
  assignedPersonsResults.innerHTML += assignedResults();
}

function searchPerson(){
  let input = document.getElementById('assigned-to').value.trim().toLowerCase();
  let foundPersons = [];

  if (input.length < 2) {
    openList(input);
  } else {
    personsControl(input, foundPersons);
    renderDropdownList(foundPersons); 
  }
}

function personsControl(input, foundPersons){
  for (let i = 0; i < contacts.length; i++) {
    const person = contacts[i];
    if (person.name.toLowerCase().includes(input)) {
      foundPersons.push(person);
    }
  }
}

function openList(input) {
  let rotate = document.getElementById("editRotate");
  let dropDown = document.getElementById("editDropDownList");

  if (input.length == 0) {
    rotate.classList.remove("editRotated");
    dropDown.classList.add("editHide");
  } else {
    rotate.classList.add("editRotated");
    dropDown.classList.remove("editHide");
  }
}