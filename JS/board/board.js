/**
 * Renders tasks with a specific status into the specified column.
 * @param {string} columnId - The ID of the column where tasks will be rendered.
 * @param {string} status - The status of the tasks to render.
 */
function renderTickets(columnId, status) {
    const container = document.getElementById(columnId);
    const noTasksMessageEmpty = document.getElementById(`noTasks${columnId.charAt(0).toUpperCase() + columnId.slice(1)}`);
    const noTasksMessageSearch = document.getElementById(`noTasksSearch${columnId.charAt(0).toUpperCase() + columnId.slice(1)}`);
    if (!container) {
        return;
    }
    container.innerHTML = '';
    const tasks = getTasksByStatus(status);
    tasks.forEach(taskData => renderTask(container, taskData));
    updateNoTasksMessage(tasks.length, noTasksMessageEmpty);
}

/**
 * Retrieves tasks from firebaseData that match the specified status.
 * @param {string} status - The status of the tasks to retrieve.
 * @returns {Array} - An array of task objects that match the specified status.
 */
function getTasksByStatus(status) {
    let tasks = [];
    firebaseData.forEach(task => {
        Object.keys(task.dataExtracted).forEach(key => {
            const taskData = task.dataExtracted[key];
            if (taskData.taskStatus === status) {
                tasks.push(taskData);
            }
        });
    });
    return tasks;
}

/**
 * Renders a single task into the specified container.
 * @param {HTMLElement} container - The container where the task will be rendered.
 * @param {Object} taskData - The data of the task to render.
 */
function renderTask(container, taskData) {
    const formattedSubtasksSelected = formatSubtasksSelected(taskData.taskSubtasksSelected);
    const formattedSubtaskBar = formatSubtaskBar(taskData);
    const formattedContacts = formatContacts(taskData.taskContacts);
    const taskHtml = ticketTemplate(taskData, formattedContacts, formattedSubtasksSelected, formattedSubtaskBar);
    const taskContainer = document.createElement('div');
    taskContainer.innerHTML = taskHtml;
    container.appendChild(taskContainer.firstElementChild);
}

/**
 * Updates the display of the "no tasks" message based on the number of tasks.
 * @param {number} taskCount - The number of tasks found.
 * @param {HTMLElement} noTasksMessage - The "no tasks" message element.
 */
function updateNoTasksMessage(taskCount, noTasksMessage) {
    if (taskCount === 0) {
        noTasksMessage.style.display = 'flex';
    } else {
        noTasksMessage.style.display = 'none';
    }
}

/**
 * Formats the subtask completion percentage for a task.
 * @param {Object} taskData - The data of the task containing subtask information.
 * @param {Array} taskData.taskSubtasksSelected - The array of selected subtasks.
 * @param {number} taskData.taskSubtaskAmount - The total number of subtasks.
 * @returns {string} - The completion percentage of the subtasks as a string.
 */
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

/**
 * Formats the selected subtasks for a task.
 * @param {Array} taskSubtasksSelected - The array of selected subtasks.
 * @returns {number|string} - The number of selected subtasks, or an empty string if none.
 */
function formatSubtasksSelected(taskSubtasksSelected) {
    let subtasksSelected = '';
    if (taskSubtasksSelected) {
        subtasksSelected = taskSubtasksSelected.length;
    }
    return subtasksSelected;
}

/**
 * Formats the contacts for a specific task.
 * @param {Array} taskContacts - The array of contacts associated with the task.
 * @returns {string} - A string of HTML representing the formatted contacts.
 */
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

/**
 * Loads and renders tickets for all task statuses after data is loaded.
 */
function loadTickets() {
    renderTickets('toDo', 'toDo');
    renderTickets('inProgress', 'inProgress');
    renderTickets('awaitFeedback', 'awaitFeedback');
    renderTickets('done', 'done');
}

/**
 * Loads the firebaseData first and then the Tickets
 */
loadUrl().then(() => {
    loadTickets();
});

/**
 * ID from the currentDraggedElement
 */
let currentDraggedElement;

/**
 * Starts dragging the element with the specified ID.
 * @param {string} id - The ID of the element to start dragging.
 */
function startDragging(id) {
    currentDraggedElement = id;
    document.getElementById(id).classList.add('dragging');
    for (let i = 0; i < 4; i++) {
        document.getElementById(`dragPosition${i}`).classList.add('dragPosition');
        document.getElementById(`dragPosition${i}`).classList.remove('dragAreaHighlight');
    }
}

/**
 * Allows dropping of an element by preventing the default behavior.
 * @param {Event} ev - The event object.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Moves the dragged element to the specified task status.
 * @param {string} taskStatus - The status to move the task to.
 * @returns {Promise<void>} - A promise that resolves when the task has been moved.
 */
async function moveTo(taskStatus) {
    for (const task of firebaseData) {
        if (task.dataExtracted && typeof task.dataExtracted === 'object') {
            for (const key in task.dataExtracted) {
                if (task.dataExtracted.hasOwnProperty(key)) {
                    const taskData = task.dataExtracted[key];
                    if (taskData.taskStatus && taskData.id === currentDraggedElement) {
                        taskData.taskStatus = taskStatus;
                        await patchData(`/tasks/${key}`, { taskStatus: taskStatus });
                    }
                }
            }
        }
    }
    loadTickets();
}

/**
 * Sends a PATCH request to update data on the server.
 * @param {string} path - The API endpoint path.
 * @param {Object} data - The data to update.
 * @returns {Promise<Object>} - A promise that resolves to the response data.
 */
async function patchData(path = "", data) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

/**
 * Ends dragging the element with the specified ID.
 * @param {string} id - The ID of the element to stop dragging.
 */
function endDragging(id) {
    currentDraggedElement = id;
    document.getElementById(id).classList.remove('dragging');
    for (let i = 0; i < 4; i++) {
        document.getElementById(`dragPosition${i}`).classList.remove('dragPosition');
    }
}

/**
 * Highlights the drag area with the specified ID.
 * @param {string} id - The ID of the drag area to highlight.
 */
function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

/**
 * Removes the highlight from the drag area with the specified ID.
 * @param {string} id - The ID of the drag area to remove the highlight from.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}

/**
 * Retrieves the search input value in lowercase.
 * @returns {string} - The search input value in lowercase.
 */
function getSearchInput() {
    return document.getElementById('searchInput').value.toLowerCase();
}

/**
 * Shows all tasks in a specified column.
 * @param {HTMLElement} columnContainer - The container element of the column.
 * @param {HTMLElement} noTasksMessageEmpty - The "no tasks" message element for the column.
 */
function showAllTasks(columnContainer, noTasksMessageEmpty) {
    const tasks = columnContainer.getElementsByClassName('task');
    Array.from(tasks).forEach(task => {
        task.style.display = 'flex';
    });
    if (noTasksMessageEmpty) {
        noTasksMessageEmpty.style.display = 'none';
    }
}

/**
 * Filters and displays tasks in a specified column based on the search input.
 * @param {HTMLElement} columnContainer - The container element of the column.
 * @param {string} searchInput - The search input value.
 */
function filterTasks(columnContainer, searchInput) {
    const tasks = columnContainer.getElementsByClassName('task');
    Array.from(tasks).forEach(task => {
        const taskTitle = task.querySelector('.taskTitle').innerText.toLowerCase();
        task.style.display = taskTitle.includes(searchInput) ? 'flex' : 'none';
    });
}

/**
 * Searches and filters tasks in all columns based on the search input.
 */
function searchTasks() {
    const searchInput = getSearchInput();
    const columns = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
    columns.forEach(columnId => {
        const columnContainer = document.getElementById(columnId);
        const noTasksMessageEmpty = document.getElementById(`noTasks${columnId.charAt(0).toUpperCase() + columnId.slice(1)}`);
        if (searchInput === '') {
            showAllTasks(columnContainer, noTasksMessageEmpty);
        } else {
            filterTasks(columnContainer, searchInput);
        }
    });
}

/**
 * Finds the task key in firebaseData for a given taskId.
 * @param {string} taskId - The ID of the task to find.
 * @returns {string|null} - The key of the task if found, otherwise null.
 */
function findTaskKey(taskId) {
    for (const task of firebaseData) {
        if (task.dataExtracted && typeof task.dataExtracted === 'object') {
            for (const key in task.dataExtracted) {
                if (task.dataExtracted[key].id === taskId) {
                    return key;
                }
            }
        }
    }
    return null;
}

/**
 * Deletes a task from Firebase given its key.
 * @param {string} taskKey - The key of the task to delete.
 * @returns {Promise<void>} - A promise that resolves when the task is deleted.
 */
async function deleteTaskByKey(taskKey) {
    await fetch(`${BASE_URL}/tasks/${taskKey}.json`, {
        method: "DELETE"
    });
}

/**
 * Deletes a task from Firebase given its ID.
 * @param {string} taskId - The ID of the task to delete.
 * @returns {Promise<void>} - A promise that resolves when the task is deleted or an error occurs.
 */
async function deleteTaskFromFirebase(taskId) {
    try {
        const taskKey = findTaskKey(taskId);
        if (taskKey) {
            await deleteTaskByKey(taskKey);
        } else {
            console.error("Task key not found in Firebase data.");
        }
    } catch (error) {
        console.error("Error deleting task from Firebase:", error);
    }
}

/**
 * Deletes a task from the DOM and Firebase, then refreshes the page.
 * @param {string} taskId - The ID of the task to delete.
 */
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

function moveTicketHoverEffect(taskDataId) {
    let moveUpImage = document.getElementById(`moveTicketUpImg${taskDataId}`);
    let moveDownImage = document.getElementById(`moveTicketDownImg${taskDataId}`)
    moveDownImage.addEventListener("mouseenter", function () {
        moveDownImage.src = "./img/board/down_arrow_hover.svg"
    })
    moveDownImage.addEventListener("mouseleave", function () {
        moveDownImage.src = "./img/board/down_arrow.svg"
    })
    moveUpImage.addEventListener("mouseenter", function () {
        moveUpImage.src = "./img/board/up_arrow_hover.svg"
    })
    moveUpImage.addEventListener("mouseleave", function () {
        moveUpImage.src = "./img/board/up_arrow.svg"
    })
}




async function moveTicketUp(taskDataId) {
    for (const task of firebaseData) {
        if (task.dataExtracted && typeof task.dataExtracted === 'object') {
            for (const key in task.dataExtracted) {
                if (task.dataExtracted.hasOwnProperty(key)) {
                    const taskData = task.dataExtracted[key];
                    if (taskDataId === taskData.id) {
                        if (taskData.taskStatus === "inProgress") {
                            let taskStatus = "toDo"
                            taskData.taskStatus = taskStatus;
                            await patchData(`/tasks/${key}`, { taskStatus: taskStatus });
                        } else {
                            if (taskData.taskStatus === "awaitFeedback") {
                                let taskStatus = "inProgress"
                                taskData.taskStatus = taskStatus;
                                await patchData(`/tasks/${key}`, { taskStatus: taskStatus });
                            } else {
                                if (taskData.taskStatus === "done") {
                                    let taskStatus = "awaitFeedback"
                                    taskData.taskStatus = taskStatus;
                                    await patchData(`/tasks/${key}`, { taskStatus: taskStatus });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    loadTickets();
}

async function moveTicketDown(taskDataId) {
    for (const task of firebaseData) {
        if (task.dataExtracted && typeof task.dataExtracted === 'object') {
            for (const key in task.dataExtracted) {
                if (task.dataExtracted.hasOwnProperty(key)) {
                    const taskData = task.dataExtracted[key];

                    if (taskDataId === taskData.id) {

                        if (taskData.taskStatus === "awaitFeedback") {
                            let taskStatus = "done"
                            taskData.taskStatus = taskStatus;
                            await patchData(`/tasks/${key}`, { taskStatus: taskStatus });
                        } else {
                            if (taskData.taskStatus === "inProgress") {
                                let taskStatus = "awaitFeedback"
                                taskData.taskStatus = taskStatus;
                                await patchData(`/tasks/${key}`, { taskStatus: taskStatus });
                            } else {
                                if (taskData.taskStatus === "toDo") {
                                    let taskStatus = "inProgress"
                                    taskData.taskStatus = taskStatus;
                                    await patchData(`/tasks/${key}`, { taskStatus: taskStatus });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    loadTickets();
}