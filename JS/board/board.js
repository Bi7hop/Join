// RenderTickets Funktion für die AddTask funktion verändert
// Updated renderTickets function
function renderTickets(columnId, status) {
    const container = document.getElementById(columnId);
    const noTasksMessageEmpty = document.getElementById(`noTasks${columnId.charAt(0).toUpperCase() + columnId.slice(1)}`);
    const noTasksMessageSearch = document.getElementById(`noTasksSearch${columnId.charAt(0).toUpperCase() + columnId.slice(1)}`);

    if (!container) {
        return;
    }

    container.innerHTML = '';
    let tasksFound = false;

    firebaseData.forEach(task => {
        Object.keys(task.dataExtracted).forEach(key => {
            const taskData = task.dataExtracted[key];
            if (taskData.taskStatus === status) {
                tasksFound = true;
                const formattedSubtasksSelected = formatSubtasksSelected(taskData.taskSubtasksSelected);
                const formattedSubtaskBar = formatSubtaskBar(taskData);
                const formattedContacts = formatContacts(taskData.taskContacts);
                const taskHtml = ticketTemplate(taskData, formattedContacts, formattedSubtasksSelected, formattedSubtaskBar);
                const taskContainer = document.createElement('div');
                taskContainer.innerHTML = taskHtml;
                container.appendChild(taskContainer.firstElementChild);
            }
        });
    });

    if (!tasksFound) {
        noTasksMessageEmpty.style.display = 'flex'; 
    } else {
        noTasksMessageEmpty.style.display = 'none';
    }   
}



function formatSubtaskBar(taskData) {
    let subtaskBar = '';
    if (taskData.taskSubtasksSelected && taskData.taskSubtaskAmount > 0) {
        const completedPercentage = (taskData.taskSubtasksSelected.length * 100) / taskData.taskSubtaskAmount;
        subtaskBar = `${completedPercentage}`;
    } else {
        subtaskBar = '0';
    }
    return subtaskBar;
}



function formatSubtasksSelected(taskSubtasksSelected) {
    let subtasksSelected = '';
    if (taskSubtasksSelected) {
        subtasksSelected = taskSubtasksSelected.length;
    }
    return subtasksSelected;
}


// Format contacts for a specific task
function formatContacts(taskContacts) {
    let formattedContacts = '';
    if (Array.isArray(taskContacts)) {
        taskContacts.forEach(contact => {
            if (contact.emblem) {
                formattedContacts += `<div class="taskContact" style="background-color: ${contact.color};">${contact.emblem}</div>`;
            }
        });
    }
    return formattedContacts;
}


// Beispiel: Aufruf der Funktion nach dem Laden der Daten
loadUrl().then(() => {
    loadTickets();
});


function loadTickets() {
    renderTickets('toDo', 'toDo');
    renderTickets('inProgress', 'inProgress');
    renderTickets('awaitFeedback', 'awaitFeedback');
    renderTickets('done', 'done');
}

// DRAG AND DROP
let currentDraggedElement;

function startDragging(id) {
    currentDraggedElement = id;
    document.getElementById(id).classList.add('dragging');
    for (let i = 0; i < 4; i++) {
        document.getElementById(`dragPosition${i}`).classList.add('dragPosition');
        document.getElementById(`dragPosition${i}`).classList.remove('dragAreaHighlight');
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(taskStatus) {
    // Iteriere durch das firebaseData Array
    for (const task of firebaseData) {
        // Überprüfe, ob task.dataExtracted existiert und ein Objekt ist
        if (task.dataExtracted && typeof task.dataExtracted === 'object') {
            // Iteriere über jeden Schlüssel in task.dataExtracted
            for (const key in task.dataExtracted) {
                if (task.dataExtracted.hasOwnProperty(key)) {
                    const taskData = task.dataExtracted[key];

                    // Überprüfe, ob taskData.taskStatus vorhanden ist und nicht null oder undefined ist
                    // UND ob der aktuelle Task der gezogene Task ist
                    if (taskData.taskStatus && taskData.id === currentDraggedElement) {
                        // Aktualisiere den taskStatus auf den neuen Wert
                        taskData.taskStatus = taskStatus;
                        // Schicke den aktualisierten taskStatus an die Serverseite
                        await patchData(`/tasks/${key}`, { taskStatus: taskStatus });
                    }
                }
            }
        }
    }
    loadTickets();
}

async function patchData(path = "", data) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PATCH",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

function endDragging(id) {
    currentDraggedElement = id;
    document.getElementById(id).classList.remove('dragging');
    for (let i = 0; i < 4; i++) {
        document.getElementById(`dragPosition${i}`).classList.remove('dragPosition');
    }
}

function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}

function searchTasks() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    let columns = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
    
    columns.forEach(columnId => {
        let columnContainer = document.getElementById(columnId);
        let tasks = columnContainer.getElementsByClassName('task');
        let noTasksMessageEmpty = document.getElementById(`noTasks${columnId.charAt(0).toUpperCase() + columnId.slice(1)}`);

        if (searchInput === '') {
            Array.from(tasks).forEach(task => {
                task.style.display = 'flex';
            });
            if (noTasksMessageEmpty) {
                noTasksMessageEmpty.style.display = 'none';
            }
        } else {
            Array.from(tasks).forEach(task => {
                let taskTitle = task.querySelector('.taskTitle').innerText.toLowerCase();
                if (taskTitle.includes(searchInput)) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
            });
        }
    });
}



// Delete Task

async function deleteTaskFromFirebase(taskId) {
    try {
        let taskKey = null;
        for (const task of firebaseData) {
            if (task.dataExtracted && typeof task.dataExtracted === 'object') {
                for (const key in task.dataExtracted) {
                    if (task.dataExtracted[key].id === taskId) {
                        taskKey = key;
                        break;
                    }
                }
            }
        }

        if (taskKey) {
            await fetch(`${BASE_URL}/tasks/${taskKey}.json`, {
                method: "DELETE"
            });
            
        } else {
            console.error("Task key not found in Firebase data.");
        }
    } catch (error) {
        console.error("Error deleting task from Firebase:", error);
    }
}

function deleteTask(taskId) {
    let taskElement = document.getElementById(taskId);
    if (taskElement) {
        taskElement.parentNode.removeChild(taskElement);
    }


    deleteTaskFromFirebase(taskId).then(() => {
        closeUserStory(); 
        loadTickets();
        setTimeout(() => {
            window.location.reload();  
        }, 50); 
    });
}
