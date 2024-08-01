async function postTaskConfirmation(){
    return new Promise((resolve) => {
        let confirmation = document.getElementById("confirmation-overlay")
        confirmation.classList.remove('hide');
        setTimeout(() => {
          resolve(); // Resolve the promise after the delay
          window.location = "./board.html"
        }, 500);
        
    });
}

function openAddTask() {
    let card = document.querySelector(".add-task-popup");
    let overlay = document.getElementById("overlay");
  
    if (window.innerWidth < 1280) {
      window.location = "./addTask.html"
    }else{
      swapToPopup();
      hideOverflow();
      card.style.display = "block";
      overlay.classList.add("overlay");
    }
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
  
  function requiredCheck() {
    requiredTitle();
    requiredDate();
  }
  
  function inputCheck() {
    let title = document.getElementById('title');
    let date = document.getElementById('date');
  
    if (!title.value || !date.value) {
      return false;
    }
    return true;
  }
  
  function requiredTitle() {
    let title = document.getElementById('title');
    let message = document.getElementById('titleError');
  
    if (!title.value) {
      message.classList.remove('hide');
    }
  }
  
  function requiredDate() {
    let date = document.getElementById('date');
    let message = document.getElementById('dateError');
  
    if (!date.value) {
      message.classList.remove('hide');
    }
  }