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

function editCheckbox(checkboxId) {
  let checkedBackgroundColor = document.getElementById('editContactContainer0');
  let checkbox = document.getElementById(checkboxId);
  checkbox.checked = !checkbox.checked;
  if (checkbox.checked) {
    checkedBackgroundColor.style.backgroundColor = "#2A3647";
    checkedBackgroundColor.style.color = "#white";
  }else {
    checkedBackgroundColor.style.backgroundColor = "white";
    checkedBackgroundColor.style.color = "#black";
  }
}