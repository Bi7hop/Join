// function openUserStory() {
//     let overlay = document.getElementById('overlay');
//     let boardBodyContainer = document.querySelector('.boardBodyContainer');
//     boardBodyContainer.style.overflow = "hidden";
//     overlay.classList.add("overlay");

//     const container = document.getElementById('userStoryWindow');

//     firebaseData.forEach(task => {
//         Object.keys(task.dataExtracted).forEach(key => {
//             const taskData = task.dataExtracted[key];
//             const formattedContacts = formatContacts(taskData.taskContacts);
//             const taskHtml = userStoryHtmlTemplate(taskData)
//             const taskContainer = document.createElement('div');
//             taskContainer.innerHTML = taskHtml;
//             container.appendChild(taskContainer.firstElementChild);
//             console.log(taskData);
//         })
//     })
// }



function openUserStory(id) {
    let overlay = document.getElementById('overlay');
    let boardBodyContainer = document.querySelector('.boardBodyContainer');
    boardBodyContainer.style.overflow = "hidden";
    overlay.classList.add("overlay");

    const container = document.getElementById('userStoryWindow');

    firebaseTasks.forEach(task => {
        Object.keys(task.dataExtracted).forEach(key => {
            const taskData = task.dataExtracted[key];
            if (id === taskData.id) {
                const formattedSubtasks = formatSubtasks(taskData.taskSubtasks)
                const formattedContactsFullName = formatContactsFullName(taskData.taskContacts);
                const formattedContacts = formatContacts(taskData.taskContacts);
                const taskHtml = userStoryHtmlTemplate(taskData, formattedContacts, formattedContactsFullName, formattedSubtasks);
                const taskContainer = document.createElement('div');
                taskContainer.innerHTML = taskHtml;
                container.appendChild(taskContainer.firstElementChild);
            }
        })
    })
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

// Format Subtasks
// function formatSubtasks(taskSubtasks) {
//     let formattedSubtasks = '';
//     if (Array.isArray(taskSubtasks)) {
//         taskSubtasks.forEach(subtask => {
//             if (subtask) {

//                     formattedSubtasks += `
//                 <div class="userStorySubtasksContainer">
//                     <img onclick="toggleCheckbox()" id="subtask" src="./img/checkbox_uncheckt.png">
//                     <div class="userStorySubtaskTitle">${subtask}</div>
//                 </div>`;
                
//             }
//         });
//     }
//     return formattedSubtasks;
// }


// Funktion zum Formatieren und Zurückgeben des HTML für Subtasks
function formatSubtasks(taskSubtasks) {
    if (!Array.isArray(taskSubtasks)) {
        return '';
    }
    return taskSubtasks.map(subtask => {
        if (!subtask) return ''; // Leere Subtasks überspringen
        return `
        <div class="userStorySubtasksContainer">
            <img id="${subtask.replace(/\s+/g, '_')}" class="subtask-checkbox" src="./img/checkbox_uncheckt.png" alt="Checkbox">
            <div class="userStorySubtaskTitle">${subtask}</div>
        </div>`;
    }).join('');
}

// Funktion zur Initialisierung der Checkbox-Funktionalität
function initializeSubTaskCheckboxes() {
    document.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('subtask-checkbox')) {
            toggleCheckbox(event.target.id);
        }
    });
}

// Funktion zum Umschalten des Checkbox-Zustands
function toggleCheckbox(subtaskId) {
    const checkbox = document.getElementById(subtaskId);
    if (checkbox) {
        // Verwende getAttribute, um konsistent den src-Wert zu erhalten
        const src = checkbox.getAttribute('src');
        if (src.includes('checkbox_uncheckt.png')) {
            checkbox.setAttribute('src', './img/checkbox_checkt_dark.png');
        } else {
            checkbox.setAttribute('src', './img/checkbox_uncheckt.png');
        }
    }
}

initializeSubTaskCheckboxes();




























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
    }, 200);
}

function openUserStoryEdit() {
    let userStoryContainer = document.getElementById('userStoryWindow');
    if (firebaseData.length > 0) {
        userStoryContainer.innerHTML = userStoryEditHtmlTemplate(firebaseData);
    }
    renderDropdownList();
    subTasksHoverEffect();
}

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

