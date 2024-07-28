// RenderTickets Funktion für die AddTask funktion verändert
// Updated renderTickets function
function renderTickets(columnId, status) {
    // Container im HTML, wo die Titel angezeigt werden sollen
    const container = document.getElementById(columnId);
    // Überprüfen, ob der Container vorhanden ist
    if (!container) {
        console.error(`Element mit id ${columnId} not found.`);
        return;
    }
    // Clear the container before adding new content
    container.innerHTML = '';
    // Iteriere durch das firebaseData Array und generiere HTML für jeden Task-Titel
    firebaseData.forEach(task => {
        // Annahme: firebaseData hat die Struktur wie { id: 'key', dataExtracted: { key1: { title: 'Task Title 1' }, key2: { title: 'Task Title 2' }, ... } }
        Object.keys(task.dataExtracted).forEach(key => {
            const taskData = task.dataExtracted[key];
            if (taskData.taskStatus === status) {
                const formattedSubtasksSelected = formatSubtasksSelected(taskData.taskSubtasksSelected)
                const formattedSubtaskBar = formatSubtaskBar(taskData);
                const formattedContacts = formatContacts(taskData.taskContacts);
                const taskHtml = ticketTemplate(taskData, formattedContacts, formattedSubtasksSelected, formattedSubtaskBar);
                // Create a container for each task
                const taskContainer = document.createElement('div');
                taskContainer.innerHTML = taskHtml;
                // Füge das erstellte <div> Element dem Container hinzu
                container.appendChild(taskContainer.firstElementChild);
            }
        });
    });
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
    console.log("Current Dragged Element ID=:::", currentDraggedElement);
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
                        console.log("Aktuelle taskData.ID :::", taskData.id,);
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