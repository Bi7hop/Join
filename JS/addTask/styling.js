let subtasks = [];

function showPersons() {
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

function setPriority(priority) {
  let priorities = {
    urgent: document.getElementById("urgent"),
    medium: document.getElementById("medium"),
    low: document.getElementById("low"),
  };

  for (let key in priorities) {
    priorities[key].style.backgroundColor =
      key === priority ? getColor(priority) : "";
    priorities[key].style.color = key === priority ? "#FFFFFF" : "";
  }

  currentPriority = priority;
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
    urgent: document.getElementById("activeUrg"),
    medium: document.getElementById("activeMed"),
    low: document.getElementById("activeLow"),
  };

  for (let key in images) {
    images[key].src =
      key === priority ? getActiveImg(priority) : getInactiveImg(key);
  }
}

function getActiveImg(priority) {
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

function getInactiveImg(priority) {
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

function aproveSubtask() {
  let subtask = document.getElementById("subtask");

  if (!subtask.value.trim()) {
    alert("Please fill in your Subtask");
  } else {
    subtasks.push(subtask.value);
    subtask.value = "";
    postSubtask();
  }
}

function postSubtask() {
  let subtaskDisplay = document.getElementById("subtaskDisplay");

  subtaskDisplay.innerHTML = "";
  subtaskDisplay.innerHTML += subtaskSample();
}

function subtaskSample() {
  let list = '<ul class="add-task-list">';
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    list += `<li class="listItem flex-row">
      <span class="subtask-text">${subtask}</span>
      <div class="close-approve-container" id="editContainer${i}">
        <div class="small-icon-div" onclick="editSubtask(this)">
          <img class="smaller-icon" src="/img/edit-dark.png">
        </div>
        <span class="small-input-vertical-vector"></span>
        <div class="small-icon-div" onclick="deleteSubtask(this)">
          <img class="smaller-icon" src="/img/delete.png">
        </div>
      </div>
      <div class="close-approve-container hide" id="addRemoveContainerEdit${i}">
        <div class="small-icon-div" onclick="approveEdit(this)"><img class="smaller-icon" src="/img/check_dark_icon.svg"></div>
        <span class="small-input-vertical-vector"></span>
        <div class="small-icon-div" onclick="cancelEdit(this)"><img class="small-icon" src="/img/Close.png"></div>
      </div>
    </li>`;
  }
  list += "</ul>";
  return list;
}

function editSubtask(element) {
  let listItem = element.closest(".listItem");
  let subtaskSpan = listItem.querySelector(".subtask-text");
  let subtaskText = subtaskSpan.textContent.trim();
  subtaskSpan.outerHTML = `<input value="${subtaskText}">`;

  swapToEdit(listItem);
}

function cancelEdit(element) {
  let listItem = element.closest(".listItem");
  let inputElement = listItem.querySelector("input");
  let subtaskText = inputElement ? inputElement.value.trim() : "";
  if (inputElement) {
    inputElement.outerHTML = `<span class="subtask-text">${subtaskText}</span>`;
  }
  swapToNormal(listItem);
}

function deleteSubtask(element) {
  let listItem = element.closest(".listItem");
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

function approveEdit(element) {
  let listItem = element.closest(".listItem");
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

/*the following two functions must be used for the contacs.html and addContacts.html */

function addContact() {
  let card = document.querySelector(".add-contact-popup");
  let overlay = document.getElementById("overlay");

  document.getElementById("contactsBody").style.overflow = "hidden";
  card.style.display = "block";
  overlay.classList.add("overlay");
}

function closeAddContact() {
  let card = document.querySelector(".add-contact-popup");
  let overlay = document.getElementById("overlay");

  card.style.animation = "fly-out 0.1s forwards";
  overlay.style.animation = "fade-out 0.2s forwards";
  setTimeout(() => {
    card.style.animation = ``;
    overlay.style.animation = ``;
    overlay.classList.remove("overlay");
    card.style.display = "none";
    document.getElementById("contactsBody").style.overflow = ``;
  }, 200);
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

/*Firebase functions*/
let currentPriority = "";

const BASE_URL =
  "https://join-248-default-rtdb.europe-west1.firebasedatabase.app/";

let firebaseData = [];
/*This function fetches the url with the apropriate path given
    and pushes them in to the array with the name 'firebaseData' 
    then everyone can make a function that takes the data from the data array*/
async function loadUrl(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();
  let dataKeyArray = Object.keys(responseToJson);
  for (let i = 0; i < dataKeyArray.length; i++) {
    firebaseData.push({
      id: dataKeyArray[i],
      dataExtracted: responseToJson[dataKeyArray[i]],
    });
  }
}

async function postData(path = "", data) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

async function postTask() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let assigned = document.getElementById("assigned").value;
  let date = document.getElementById("date").value;
  let category = document.getElementById("category").value;
  let subtask = document.getElementById("subtask").value;
  let prio = currentPriority;

  let extractedData = {
    title: title,
    description: description,
    assigned: assigned,
    date: date,
    category: category,
    subtask: subtask,
    prio: prio,
  };

  await postData("/tasks", extractedData);
}

async function addNewContact() {
  let name = document.getElementById("contactNewName").value;
  let email = document.getElementById("contactNewMail").value;
  let phone = document.getElementById("contactNewPhone").value;

  let extractedData = {
    name: name,
    email: email,
    phone: phone,
  };

  await postData("/contacts", extractedData);
}

async function addNewUser() {
  let username = document.getElementById("signUpName").value;
  let email = document.getElementById("signUpEmail").value;
  let password = document.getElementById("signUpPassword").value;
  let passwordCheck = document.getElementById("signUpPasswordCheck").value;

  let extractedData = {
    username: username,
    email: email,
    password: password,
    passwordCheck: passwordCheck,
  };

  await postData("/users", extractedData);
}
