let selectedOptions = {};
let uploadSubtasks = [];

/**
 * Opens a user story by ID and populates the container with the corresponding data.
 * @param {string} id - The ID of the user story to open.
 */
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

/**
 * Handles click events outside the user story container to close it.
 * @param {Event} event - The click event.
 */
function handleOutsideClick(event) {
    let userStoryContainer = document.querySelector('.userStoryContainerInside');
    if (userStoryContainer && !userStoryContainer.contains(event.target)) {
        closeUserStory();
    }
}

/**
 * Formats the subtasks for a user story.
 * @param {Array} taskSubtasks - The subtasks of the task.
 * @param {Array} taskSubtasksSelected - The selected subtasks of the task.
 * @param {string} taskId - The ID of the task.
 * @returns {string} - The formatted subtasks as HTML.
 */
function formatSubtasks(taskSubtasks, taskSubtasksSelected, taskId) {
    if (!Array.isArray(taskSubtasks)) {
        return '';
    }
    return taskSubtasks.map(subtask => {
        if (!subtask) return ''; // Skip empty subtasks
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

/**
 * Initializes the event listeners for subtask checkboxes.
 */
function initializeSubTaskCheckboxes() {
    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('subtask-checkbox')) {
            // Placeholder for future functionality
        }
    });
}

/**
 * Toggles the checkbox state for a subtask.
 * @param {string} subtaskId - The ID of the subtask.
 */
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
            // Find the corresponding task in firebaseTasks and update it
            try {
                await patchSubtaskSelected(taskKey, { taskSubtasksSelected: selectedOptions[taskId] });
            } catch (error) {
                console.error("Error updating data:", error);
            }
        } else {
            console.error("TaskId or TaskKey for SubtaskId", subtaskId, "not found.");
        }
    }
}

/**
 * Gets the task ID from a subtask ID.
 * @param {string} subtaskId - The ID of the subtask.
 * @returns {string|null} - The ID of the task or null if not found.
 */
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

/**
 * Gets the task key from a subtask ID.
 * @param {string} subtaskId - The ID of the subtask.
 * @returns {string|null} - The key of the task or null if not found.
 */
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

/**
 * Updates the selected subtasks for a task.
 * @param {string} taskKey - The key of the task.
 * @param {Object} updatedData - The updated data to be patched.
 * @returns {Promise<Object>} - The updated task data.
 */
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
        console.error("Error updating data:", error);
    }
}

/**
 * Finds a task by its ID.
 * @param {string} taskId - The ID of the task.
 * @returns {Object|null} - The task data or null if not found.
 */
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

/**
 * Formats the full names of the contacts for a task.
 * @param {Array} taskContacts - The contacts of the task.
 * @returns {string} - The formatted contacts as HTML.
 */
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

/**
 * Closes the user story container.
 */
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

/**
 * Closes the user story container and reloads the page.
 */
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
        window.location.reload();
    }, 200);
}

/**
 * Scrolls the window to the top.
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
    });
}

/**
 * Checks the priority of a task and updates the current priority.
 * @param {Object} taskData - The data of the task.
 */
function checkTaskPrio(taskData) {
    if (taskData.taskPrioImage === "./img/medium-prio-icon-inactive.png") {
        addMedium();
        addMediumPrio();
    }
    if (taskData.taskPrioImage === "./img/urgent-prio-icon-inactive.png") {
        addUrgent();
        addUrgentPrio();
    }
    if (taskData.taskPrioImage === "./img/low-prio-icon-inactive.png") {
        addLow();
        addLowPrio();
    }
}

/**
 * Sets the current priority to medium.
 */
function addMediumPrio() {
    currentPriorityEdit = "./img/medium-prio-icon-inactive.png"
}

/**
 * Sets the current priority to urgent.
 */
function addUrgentPrio() {
    currentPriorityEdit = "./img/urgent-prio-icon-inactive.png"
}

/**
 * Sets the current priority to low.
 */
function addLowPrio() {
    currentPriorityEdit = "./img/low-prio-icon-inactive.png"
}

/**
 * Renders the assigned list in edit mode.
 */
function renderAssignedListEdit() {
    let dropDownList = document.getElementById("editDropDownList");
    dropDownList.innerHTML =
        foundPersonsByInput.length > 0 ? personsFoundPost() : dropDownListSample();
}

/**
 * Pushes the task contacts to the checkbox states.
 * @param {Array} taskContacts - The contacts of the task.
 */
function pushTaskContactsToCheckboxStates(taskContacts) {
    if (taskContacts) {
        taskContacts.forEach(contact => {
            checkboxStates[contact.email] = true;
        });
    }
}

/**
 * Opens the user story edit view for a specific task.
 * @param {string} taskId - The ID of the task.
 */
function openUserStoryEdit(taskId) {
    let userStoryContainer = document.getElementById('userStoryWindow');
    const taskData = findTaskById(taskId);

    if (taskData) {

        pushTaskContactsToCheckboxStates(taskData.taskContacts);
        userStoryContainer.innerHTML = userStoryEditHtmlTemplate(taskData);
        checkTaskPrio(taskData);
        updateAssignedPersonsEdit(taskData.taskContacts);
        postPersonsAt();

        if (Array.isArray(taskData.taskSubtasks)) {
            subtasks.push(...taskData.taskSubtasks);
        }

    } else {
        console.error('Task data not found for task ID:', taskId);
    }
}

/**
 * Updates the assigned persons for a task in edit mode.
 * @param {Array} taskData - The contacts of the task.
 */
function updateAssignedPersonsEdit(taskData) {
    if (taskData) {
        assignedPersons = taskData.filter(contact => checkboxStates[contact.email]);
    }
}

let currentPriorityEdit = ''

/**
 * Saves the changes made to a task.
 * @param {string} taskId - The ID of the task.
 */
async function saveTaskChanges(taskId) {
    const title = document.getElementById('editTitle').value;
    const description = document.getElementById('editDescription').value;
    const dueDate = document.getElementById('editDueDate').value;
    const priority = currentPriorityEdit;

    let taskMoreContacts = `+${assignedPersons.length - 6}`;
    if (assignedPersons.length < 7) {
        taskMoreContacts = '';
    }

    const updatedTask = {
        taskTitle: title,
        taskDescription: description,
        taskDate: dueDate,
        taskPrioImage: priority,
        taskContacts: assignedPersons,
        taskContactsMore: `${taskMoreContacts}`,
        taskSubtasks: subtasks,
        taskSubtaskAmount: `${subtasks.length}`,
    };

    const taskKey = findTaskKey(taskId);
    if (taskKey) {
        try {
            await patchData(`/tasks/${taskKey}`, updatedTask);
            closeUserStoryEdit();
            loadTickets();
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    } else {
        console.error("Task key not found.");
    }
    window.location.reload();
    loadTickets();
}
