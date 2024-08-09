let selectedOptions = {};
let uploadSubtasks = [];
let currentPriorityEdit = '';
let currentPriorityEditAlt = '';

/**
 * Open a user story by ID.
 * 
 * @param {string} id - The ID of the user story to open.
 */
function openUserStory(id) {
    setupOverlayAndContainer();
    clearContainerContent();
    if (isValidFirebaseTasks(firebaseTasks)) {
        const tasksData = firebaseTasks[0].dataExtracted;
        processTasksData(id, tasksData);
        addOutsideClickListener();
    } else {
        console.error("firebaseTasks or firebaseTasks[0].dataExtracted is undefined or null.");
    }
}

/**
 * Setup the overlay and container for the user story.
 */
function setupOverlayAndContainer() {
    let overlay = document.getElementById('overlay');
    let boardBodyContainer = document.querySelector('.boardBodyContainer');
    boardBodyContainer.style.overflow = "hidden";
    overlay.classList.add("overlay");
}

/**
 * Clear the content of the user story container.
 */
function clearContainerContent() {
    const container = document.getElementById('userStoryWindow');
    container.innerHTML = ''; // Clear previous content
}

/**
 * Check if firebaseTasks is valid.
 * 
 * @param {Object} firebaseTasks - The firebase tasks object.
 * @returns {boolean} True if firebaseTasks is valid, false otherwise.
 */
function isValidFirebaseTasks(firebaseTasks) {
    return firebaseTasks && firebaseTasks[0] && firebaseTasks[0].dataExtracted;
}

/**
 * Process the tasks data and append the relevant task HTML.
 * 
 * @param {string} id - The ID of the user story to open.
 * @param {Object} tasksData - The tasks data object.
 */
function processTasksData(id, tasksData) {
    const container = document.getElementById('userStoryWindow');
    Object.keys(tasksData).forEach(key => {
        const taskData = tasksData[key];
        if (id === taskData.id) {
            const taskHtml = createTaskHtml(taskData);
            appendTaskHtml(container, taskHtml);
            initializeSelectedOptions(taskData);
        }
    });
}

/**
 * Create the task HTML from the task data.
 * 
 * @param {Object} taskData - The task data object.
 * @returns {string} The formatted task HTML.
 */
function createTaskHtml(taskData) {
    const formattedSubtasks = formatSubtasks(taskData.taskSubtasks, taskData.taskSubtasksSelected, taskData.id);
    const formattedContactsFullName = formatContactsFullName(taskData.taskContacts);
    const formattedContacts = formatContacts(taskData.taskContacts);
    return userStoryHtmlTemplate(taskData, formattedContacts, formattedContactsFullName, formattedSubtasks);
}

/**
 * Append the task HTML to the container.
 * 
 * @param {HTMLElement} container - The container element.
 * @param {string} taskHtml - The task HTML.
 */
function appendTaskHtml(container, taskHtml) {
    const taskContainer = document.createElement('div');
    taskContainer.innerHTML = taskHtml;
    container.appendChild(taskContainer.firstElementChild);
}

/**
 * Initialize the selected options for the task.
 * 
 * @param {Object} taskData - The task data object.
 */
function initializeSelectedOptions(taskData) {
    selectedOptions[taskData.id] = taskData.taskSubtasksSelected || [];
}

/**
 * Add an outside click listener to close the user story.
 */
function addOutsideClickListener() {
    setTimeout(() => {
        let outsideContainer = document.querySelector('.userStoryOutsideContainer');
        if (outsideContainer) {
            outsideContainer.addEventListener('click', handleOutsideClick);
        }
    }, 0);
}

/**
 * Handles click events outside the user story container to close it.
 * @param {Event} event - The click event.
 */
function handleOutsideClick(event) {
    let userStoryContainer = document.querySelector('.userStoryContainerInside');
    if (userStoryContainer && !userStoryContainer.contains(event.target)) {
        closeUserStory();
        loadTickets();
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
 * Toggles the checkbox state for the given subtaskId.
 * 
 * @param {string} subtaskId - The ID of the subtask to toggle.
 */
async function toggleCheckbox(subtaskId) {
    const checkbox = document.getElementById(subtaskId);
    if (checkbox) {
        const isChecked = getCheckboxState(checkbox);
        toggleCheckboxState(checkbox, isChecked);
        const taskId = getTaskIdFromSubtaskId(subtaskId);
        const taskKey = getTaskKeyFromSubtaskId(subtaskId);
        if (taskId !== null && taskKey !== null) {
            updateSelectedOptions(taskId, subtaskId, !isChecked);
            try {
                await patchSubtaskData(taskKey, selectedOptions[taskId]);
            } catch (error) {
                console.error("Error updating data:", error);
            }
        } else {
            console.error("TaskId or TaskKey for SubtaskId", subtaskId, "not found.");
        }
    }
}

/**
 * Gets the current state of the checkbox.
 * 
 * @param {HTMLElement} checkbox - The checkbox element.
 * @returns {boolean} - True if the checkbox is checked, false otherwise.
 */
function getCheckboxState(checkbox) {
    return checkbox.dataset.checked === 'true';
}

/**
 * Toggles the checkbox state and updates the image source.
 * 
 * @param {HTMLElement} checkbox - The checkbox element.
 * @param {boolean} isChecked - The current state of the checkbox.
 */
function toggleCheckboxState(checkbox, isChecked) {
    checkbox.dataset.checked = !isChecked;
    const src = isChecked ? './img/checkbox_uncheckt.png' : './img/checkbox_checkt_dark.png';
    checkbox.setAttribute('src', src);
}

/**
 * Updates the selected options for a given task.
 * 
 * @param {string} taskId - The ID of the task.
 * @param {string} subtaskId - The ID of the subtask.
 * @param {boolean} isChecked - The new state of the checkbox.
 */
function updateSelectedOptions(taskId, subtaskId, isChecked) {
    selectedOptions[taskId] = selectedOptions[taskId] || [];
    if (isChecked) {
        selectedOptions[taskId].push(subtaskId);
    } else {
        const index = selectedOptions[taskId].indexOf(subtaskId);
        if (index > -1) {
            selectedOptions[taskId].splice(index, 1);
        }
    }
}

/**
 * Makes an async call to update the subtask data on the server.
 * 
 * @param {string} taskKey - The key of the task.
 * @param {Array<string>} taskSubtasksSelected - The list of selected subtasks.
 */
async function patchSubtaskData(taskKey, taskSubtasksSelected) {
    await patchSubtaskSelected(taskKey, { taskSubtasksSelected });
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
    const userStoryContainer = document.getElementById('userStoryWindow');
    const boardBodyContainer = document.querySelector('.boardBodyContainer');
    const overlay = document.getElementById('overlay');

    applyAnimation(userStoryContainer, 'fly-out 0.1s forwards');
    applyAnimation(overlay, 'fade-out 0.2s forwards');

    setTimeout(resetStylesAndContent, 200, userStoryContainer, boardBodyContainer, overlay);
}

/**
 * Applies the specified animation to the given element.
 *
 * @param {HTMLElement} element - The element to which the animation will be applied.
 * @param {string} animation - The animation to apply to the element.
 */
function applyAnimation(element, animation) {
    element.style.animation = animation;
}

/**
 * Resets the styles and content of the specified elements.
 *
 * @param {HTMLElement} userStoryContainer - The user story container element.
 * @param {HTMLElement} boardBodyContainer - The board body container element.
 * @param {HTMLElement} overlay - The overlay element.
 */
function resetStylesAndContent(userStoryContainer, boardBodyContainer, overlay) {
    userStoryContainer.innerHTML = ``;
    userStoryContainer.style.animation = ``;
    boardBodyContainer.style.overflow = "";
    overlay.style.animation = '';
    overlay.classList.remove("overlay");
    removeOutsideClickListener();
}

/**
 * Removes the click event listener from the outside container, if it exists.
 */
function removeOutsideClickListener() {
    const outsideContainer = document.querySelector('.userStoryOutsideContainer');
    if (outsideContainer) {
        outsideContainer.removeEventListener('click', handleOutsideClick);
    }
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
    currentPriorityEditAlt = "Medium"
}

/**
 * Sets the current priority to urgent.
 */
function addUrgentPrio() {
    currentPriorityEdit = "./img/urgent-prio-icon-inactive.png"
    currentPriorityEditAlt = "Urgent"
}

/**
 * Sets the current priority to low.
 */
function addLowPrio() {
    currentPriorityEdit = "./img/low-prio-icon-inactive.png"
    currentPriorityEditAlt = "Low"
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

/**
 * Save changes made to a task.
 * 
 * This function gathers the updated task details, finds the corresponding task key,
 * updates the task on the server, and then reloads the page to reflect the changes.
 * 
 * @param {string} taskId - The ID of the task to be updated.
 */
async function saveTaskChanges(taskId) {
    const updatedTask = getUpdatedTask();
    const taskKey = findTaskKey(taskId);

    if (taskKey) {
        await updateTask(taskKey, updatedTask);
    } else {
        console.error("Task key not found.");
    }
    window.location.reload();
    loadTickets();
}

/**
 * Gather the updated task details from the input fields and constructs the task object.
 * 
 * @returns {Object} The updated task object.
 */
function getUpdatedTask() {
    const title = document.getElementById('editTitle').value;
    const description = document.getElementById('editDescription').value;
    const dueDate = document.getElementById('editDueDate').value;
    const priority = currentPriorityEdit;
    let taskMoreContacts = `+${assignedPersons.length - 6}`;
    if (assignedPersons.length < 7) {
        taskMoreContacts = '';
    }
    return {
        taskTitle: title,
        taskDescription: description,
        taskDate: dueDate,
        taskPrioAlt: currentPriorityEditAlt,
        taskPrioImage: priority,
        taskContacts: assignedPersons,
        taskContactsMore: `${taskMoreContacts}`,
        taskSubtasks: subtasks,
        taskSubtaskAmount: `${subtasks.length}`,
    };
}

/**
 * Update the task on the server.
 * 
 * @param {string} taskKey - The key of the task to be updated.
 * @param {Object} updatedTask - The updated task object.
 */
async function updateTask(taskKey, updatedTask) {
    try {
        await patchData(`/tasks/${taskKey}`, updatedTask);
        closeUserStoryEdit();
        loadTickets();
    } catch (error) {
        console.error("Error saving changes:", error);
    }
}