let selectedOptions = {};


function openUserStory(id) {
    let overlay = document.getElementById('overlay');
    let boardBodyContainer = document.querySelector('.boardBodyContainer');
    boardBodyContainer.style.overflow = "hidden";
    overlay.classList.add("overlay");
    const container = document.getElementById('userStoryWindow');
    container.innerHTML = ''; // Clear previous content
    if (firebaseTasks && firebaseTasks[0] && firebaseTasks[0].dataExtracted) {
        const tasksData = firebaseTasks[0].dataExtracted;
        Object.keys(tasksData).forEach(key => {
            const taskData = tasksData[key];
            if (id === taskData.id) {
                const formattedSubtasks = formatSubtasks(taskData.taskSubtasks, taskData.taskSubtasksSelected, taskData.id);
                const formattedContactsFullName = formatContactsFullName(taskData.taskContacts);
                const formattedContacts = formatContacts(taskData.taskContacts);
                const taskHtml = userStoryHtmlTemplate(taskData, formattedContacts, formattedContactsFullName, formattedSubtasks);
                const taskContainer = document.createElement('div');
                taskContainer.innerHTML = taskHtml;
                container.appendChild(taskContainer.firstElementChild);

                // Initialize selected options for the task
                selectedOptions[taskData.id] = taskData.taskSubtasksSelected || [];
            }
        });
        setTimeout(() => {
            let outsideContainer = document.querySelector('.userStoryOutsideContainer');
            if (outsideContainer) {
                outsideContainer.addEventListener('click', handleOutsideClick);
            }
        }, 0);
    } else {
        console.error("firebaseTasks or firebaseTasks[0].dataExtracted is undefined or null.");
    }
}

function handleOutsideClick(event) {
    let userStoryContainer = document.querySelector('.userStoryContainerInside');
    if (userStoryContainer && !userStoryContainer.contains(event.target)) {
        closeUserStory();
    }
}


function formatSubtasks(taskSubtasks, taskSubtasksSelected, taskId) {
    if (!Array.isArray(taskSubtasks)) {
        return '';
    }
    return taskSubtasks.map(subtask => {
        if (!subtask) return ''; // Leere Subtasks überspringen
        const subtaskId = `${taskId}_${subtask.replace(/\s+/g, '_')}`;
        const isChecked = taskSubtasksSelected && taskSubtasksSelected.includes(subtaskId);
        const checkboxSrc = isChecked ? './img/checkbox_checkt_dark.png' : './img/checkbox_uncheckt.png';
        return `
        <div class="userStorySubtasksContainer">
            <img id="${subtaskId}" onclick="toggleCheckbox('${subtaskId}');" class="subtask-checkbox" data-checked="${isChecked}" src="${checkboxSrc}" alt="Checkbox">
            <div class="userStorySubtaskTitle">${subtask}</div>
        </div>`;
    }).join('');
}

function initializeSubTaskCheckboxes() {
    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('subtask-checkbox')) {
            console.log(event.target.id);
        }
    });
}

async function toggleCheckbox(subtaskId) {
    const checkbox = document.getElementById(subtaskId);
    if (checkbox) {
        const isChecked = checkbox.dataset.checked === 'true';
        checkbox.dataset.checked = !isChecked;
        const src = isChecked ? './img/checkbox_uncheckt.png' : './img/checkbox_checkt_dark.png';
        checkbox.setAttribute('src', src);
        const taskId = getTaskIdFromSubtaskId(subtaskId);
        const taskKey = getTaskKeyFromSubtaskId(subtaskId);
        if (taskId !== null && taskKey !== null) {
            if (!isChecked) {
                selectedOptions[taskId] = selectedOptions[taskId] || [];
                selectedOptions[taskId].push(subtaskId);
            } else {
                selectedOptions[taskId] = selectedOptions[taskId] || [];
                selectedOptions[taskId] = selectedOptions[taskId].filter(id => id !== subtaskId);
            }
            // Finde den entsprechenden Task in firebaseTasks und aktualisiere ihn
            try {
                await patchSubtaskSelected(taskKey, { taskSubtasksSelected: selectedOptions[taskId] });
                console.log("Daten für Task", taskId, "aktualisiert");
            } catch (error) {
                console.error("Fehler beim Aktualisieren der Daten:", error);
            }
        } else {
            console.error("TaskId oder TaskKey für SubtaskId", subtaskId, "nicht gefunden.");
        }
    }
}

function getTaskIdFromSubtaskId(subtaskId) {
    if (firebaseTasks && firebaseTasks[0] && firebaseTasks[0].dataExtracted) {
        const tasksData = firebaseTasks[0].dataExtracted;
        for (const key in tasksData) {
            const taskData = tasksData[key];
            const taskSubtaskIdPrefix = `${taskData.id}_`;
            if (taskData.taskSubtasks && taskData.taskSubtasks.some(subtask => `${taskSubtaskIdPrefix}${subtask.replace(/\s+/g, '_')}` === subtaskId)) {
                return taskData.id;
            }
        }
    }
    return null;
}

function getTaskKeyFromSubtaskId(subtaskId) {
    if (firebaseTasks && firebaseTasks[0] && firebaseTasks[0].dataExtracted) {
        const tasksData = firebaseTasks[0].dataExtracted;
        for (const key in tasksData) {
            const taskData = tasksData[key];
            const taskSubtaskIdPrefix = `${taskData.id}_`;
            if (taskData.taskSubtasks && taskData.taskSubtasks.some(subtask => `${taskSubtaskIdPrefix}${subtask.replace(/\s+/g, '_')}` === subtaskId)) {
                return key;
            }
        }
    }
    return null;
}


async function patchSubtaskSelected(taskKey, updatedData) {
    const path = `tasks/${taskKey}`;
    try {
        let response = await fetch(`${BASE_URL}/${path}.json`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });
        return await response.json();
    } catch (error) {
        console.error("Fehler beim Aktualisieren der Daten:", error);
    }
}

function findTaskById(taskId) {
    if (firebaseTasks && firebaseTasks[0] && firebaseTasks[0].dataExtracted) {
        const tasksData = firebaseTasks[0].dataExtracted;
        for (const key in tasksData) {
            if (tasksData[key].id === taskId) {
                return tasksData[key];
            }
        }
    }
    return null;
}


// Format contacts for a specific task
function formatContactsFullName(taskContacts) {
    let formattedContactsFullName = '';
    if (Array.isArray(taskContacts)) {
        taskContacts.forEach(contact => {
            if (contact.name) {
                formattedContactsFullName += `<div class="assignedContactsFullName">${contact.name}</div>`;
            }
        });
    }
    return formattedContactsFullName;
}


function closeUserStory() {
    let userStoryContainer = document.getElementById('userStoryWindow');
    let boardBodyContainer = document.querySelector('.boardBodyContainer');
    let overlay = document.getElementById('overlay');

    userStoryContainer.style.animation = 'fly-out 0.1s forwards';
    overlay.style.animation = 'fade-out 0.2s forwards';
    setTimeout(() => {
        userStoryContainer.innerHTML = ``;
        userStoryContainer.style.animation = ``;
        boardBodyContainer.style.overflow = "";
        overlay.style.animation = '';
        overlay.classList.remove("overlay");

        let outsideContainer = document.querySelector('.userStoryOutsideContainer');
        if (outsideContainer) {
            outsideContainer.removeEventListener('click', handleOutsideClick);
        }
    }, 200);
}

// function openUserStoryEdit() {
//     let userStoryContainer = document.getElementById('userStoryWindow');
//     if (firebaseData.length > 0) {
//         userStoryContainer.innerHTML = userStoryEditHtmlTemplate(firebaseData);
//     }
//     renderDropdownList();
//     subTasksHoverEffect();
// }

function closeUserStoryEdit() {
    let userStoryContainer = document.getElementById('userStoryWindow');
    let boardBodyContainer = document.querySelector('.boardBodyContainer');
    let overlay = document.getElementById('overlay');
    userStoryContainer.style.animation = 'fly-out 0.1s forwards';
    overlay.style.animation = 'fade-out 0.2s forwards';
    setTimeout(() => {
        userStoryContainer.innerHTML = ``;
        userStoryContainer.style.animation = ``;
        boardBodyContainer.style.overflow = "";
        overlay.style.animation = '';
        overlay.classList.remove("overlay");
    }, 200);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
    });
}


function checkTaskPrio(taskData) {
    if (taskData.taskPrioImage === "./img/medium-prio-icon-inactive.png") {
        addMedium();
    }

    if (taskData.taskPrioImage === "./img/urgent-prio-icon-inactive.png") {
        addUrgent();
    }

    if (taskData.taskPrioImage === "./img/low-prio-icon-inactive.png") {
        addLow();
    }
}


function addMediumPrio() {
    currentPriorityEdit = "./img/medium-prio-icon-inactive.png"
}

function addUrgentPrio() {
    currentPriorityEdit = "./img/urgent-prio-icon-inactive.png"
}

function addLowPrio() {
    currentPriorityEdit = "./img/low-prio-icon-inactive.png"
}




function renderAssignedListEdit() {
    let dropDownList = document.getElementById("editDropDownList");
    dropDownList.innerHTML =
      foundPersonsByInput.length > 0 ? personsFoundPost() : dropDownListSample();
    console.log("edit test");
  
    // reapplyCheckboxStates();
  }

  function pushTaskContactsToCheckboxStates(taskContacts) {
    taskContacts.forEach(contact => {
      checkboxStates[contact.email] = true; // oder false, je nachdem, was der Standardwert sein soll
    });
  }








  function filterAndFormatContacts(taskData) {
    let selectedContacts = [];

        if (checkboxStates) {
            let contact = taskData;
            if (contact) {
                selectedContacts.push(contact);
                
            }
        }
    
        formatContactsEdit(selectedContacts)
}


function formatContactsEdit(selectedContacts) {
    
    let assignedContactList = document.getElementById("assigned-persons");
    
        for (let i = 0; i < selectedContacts.length; i++) {
            const selectedContact = selectedContacts[i];
            Object.keys(selectedContact).forEach(key => {
            let selectedContactObject = selectedContact[key]
            
            if (selectedContactObject.emblem) {
                assignedContactList.innerHTML += `<div class="taskContact" style="background-color: ${selectedContactObject.color}; color: white">${selectedContactObject.emblem}</div>`;
            }
        })
        }
    

    
}


function openUserStoryEdit(taskId) {
    let userStoryContainer = document.getElementById('userStoryWindow');
    const taskData = findTaskById(taskId);
    if (taskData) {

        pushTaskContactsToCheckboxStates(taskData.taskContacts);

        
        userStoryContainer.innerHTML = userStoryEditHtmlTemplate(taskData);
        filterAndFormatContacts(taskData.taskContacts);

        checkTaskPrio(taskData)

        

        subTasksHoverEffect();
    } else {
        console.error('Task-Daten nicht gefunden für Task-ID:', taskId);
    }
}



function findTaskById(taskId) {
    if (firebaseTasks && firebaseTasks[0] && firebaseTasks[0].dataExtracted) {
        const tasksData = firebaseTasks[0].dataExtracted;
        for (const key in tasksData) {
            if (tasksData[key].id === taskId) {
                return tasksData[key];
            }
        }
    }
    return null;
}

let currentPriorityEdit = ''

async function saveTaskChanges(taskId) {
    const title = document.getElementById('editTitle').value;
    const description = document.getElementById('editDescription').value;
    const dueDate = document.getElementById('editDueDate').value;
    const priority = currentPriorityEdit;
    const updatedTask = {
        taskTitle: title,
        taskDescription: description,
        taskDate: dueDate,
        taskPrioImage: priority,
    };

    const taskKey = findTaskKey(taskId);
    if (taskKey) {
        try {
            await patchData(`/tasks/${taskKey}`, updatedTask);
            closeUserStoryEdit();
            loadTickets();
        } catch (error) {
            console.error("Fehler beim Speichern der Änderungen:", error);
        }
    } else {
        console.error("Task key nicht gefunden.");
    }
    window.location.reload();
}


// function personsFoundPost() {
//     let list = '';
//     sortContacts(contacts);  
//     for (let i = 0; i < foundPersonsList.length; i++) {
//         let person = foundPersonsList[i];
//         list += `
//       <div onclick="addFoundPerson(${i})" class="flex-row persons-assignemend" id="persons-assignemend${i}">
//         <div class="flex-row name-container">
//           <span id="persons${i}" class="assigned-emblem flex-row small-font" style="background-color: ${person.color}">${renderEmblem(person.name)}</span>
//           <h4 id="assigned-name${i}" class="medium-font">${person.name}</h4>
//         </div>
//         <div class="assigned-img-box">
//           <img id="checkbox${i}" src="./img/checkbox_uncheckt.png">
//         </div>
//       </div>
//       `
//     }
//     return list;
// }

// function renderDropdownList(){
//     let dropDown = document.getElementById("editDropDownList");
//     console.log("test");
    
//     if (foundPersonsList && foundPersonsList.length > 0) {
//       dropDown.innerHTML = personsFoundPost(foundPersonsList);
//     } else {
//       dropDown.innerHTML = dropDownListSample();
//     }
//   }

//   function searchPerson() {
//     let input = document.getElementById('assigned-to').value.trim().toLowerCase();
  
//     if (input.length > 2) {
//       openList(input);
//       personsControl(input);
//       personsFoundPost(foundPersonsList);
//     } else {
//       foundPersonsList = '';
//       renderDropdownList();
//     }
//   }

//   function openList(input) {
//     let rotate = document.getElementById("rotate");
//     let dropDown = document.getElementById("dropdown-list");
  
//     if (input.length < 1) {
//       rotate.classList.remove("editRotated");
//       dropDown.classList.add("editHide");
//     } else {
//       rotate.classList.add("editRotated");
//       dropDown.classList.remove("editHide");
//       renderDropdownList();
//     }
//   }

//   function personsControl(input) {
//     foundPersonsList = []; // Reset foundPersonsList array
//     let addedNames = new Set(); // Track added names to avoid duplicates
  
//     for (let i = 0; i < contacts.length; i++) {
//       let person = contacts[i];
//       if (person.name.toLowerCase().includes(input)) {
//         if (!addedNames.has(person.name)) {
//           foundPersonsList.push(person);
//           addedNames.add(person.name); // Add name to the set
//         }
//       }
//     }
//   }