/**
 * Generates HTML for a user story based on the provided data.
 * 
 * @param {Object} taskData - Data for the user story.
 * @param {string} taskData.id - Unique identifier for the user story.
 * @param {string} taskData.taskType - Type of the task.
 * @param {string} taskData.taskTitle - Title of the task.
 * @param {string} taskData.taskDescription - Description of the task.
 * @param {string} taskData.taskDate - Due date of the task.
 * @param {string} taskData.taskPrioAlt - Alt text for the priority image.
 * @param {string} taskData.taskPrioImage - URL for the priority image.
 * @param {string} formattedContacts - HTML content representing the contacts associated with the task.
 * @param {string} formattedContactsFullName - HTML content representing the full names of the contacts.
 * @param {string} formattedSubtasks - HTML content representing the subtasks.
 * @returns {string} The HTML string representing the user story.
 */
function userStoryHtmlTemplate(taskData, formattedContacts, formattedContactsFullName, formattedSubtasks) {
    return `
    <div id="${taskData.id}" class="userStoryOutsideContainer flying-element">
        <div class="userStoryContainer">
            <div class="userStoryContainerInside">
                <div class="userStoryHeadlineAndCloseButtonContainer">
                    <div class="userStoryTaskType">
                        ${taskData.taskType}
                    </div>
                    <div onclick="closeUserStory(), setTimeout(function() { loadTickets(); }, 35);" class="userStoryCloseButtonContainer">
                        <img src="./img/userStory/close.png" alt="Close">
                    </div>
                </div>
                <div>
                    <h1 class="userStoryHeadline">
                        ${taskData.taskTitle}
                    </h1>
                </div>
                <div class="openUserStoryTaskDescription">
                    ${taskData.taskDescription}
                </div>
                <div class="dueDateDateContainer">
                    <div class="dueDate">
                        Due date:
                    </div>
                    <div class="userStoryDateContainer">
                        ${taskData.taskDate}
                    </div>
                </div>
                <div class="priorityContainer">
                    <div class="priority">
                        Priority:
                    </div>
                    <div class="priorityImageContainer">${taskData.taskPrioAlt} <img src="${taskData.taskPrioImage}"
                            alt="${taskData.taskPrioAlt}"></div>
                </div>
                <div class="assignedToContainer">
                    Assigned To:
                </div>
                <div class="userStoryContactContainer">
                
                    <div class="userStoryContactEmblemContainer">
                        ${formattedContacts}
                    </div>
                    <div class="userStoryContactFullName"> 
                        ${formattedContactsFullName}
                    </div>
                </div>
                <div class="userStorySubtaskContainer">
                    Subtasks
                </div>
                
                <div class="userStorySubtaskTitelContainer">
                    <p>${formattedSubtasks}</p>
                </div>

                <div class="userStoryDeleteAndEditContainer">
                    <div class="userStoryDeleteContainer userStoryBackgroundImageDelete" onclick="deleteTask(${taskData.id})">
                        <div class="userStoryDeleteTextContainer">Delete</div>
                    </div>
                    <div class="userStoryCutLine"></div>
                    <div class="userStoryEditTextContainer userStoryBackgroundImageEdit">
                        <div onclick="openUserStoryEdit(${taskData.id})" class="userStoryEditTextTextContainer">Edit</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

/**
 * Generates the HTML template for user story editing.
 * 
 * @param {Object} taskData - Data for the user story.
 * @param {string} taskData.id - Unique identifier for the user story.
 * @param {string} taskData.taskType - Type of the task.
 * @param {string} taskData.taskTitle - Title of the task.
 * @param {string} taskData.taskDescription - Description of the task.
 * @param {string} taskData.taskDate - Due date of the task.
 * @param {string} taskData.taskPrioAlt - Alt text for the priority image.
 * @param {string} taskData.taskPrioImage - URL for the priority image.
 * @param {string} formattedContacts - HTML content representing the contacts associated with the task.
 * @returns {string} The HTML string representing the user story edit template.
 */
function userStoryEditHtmlTemplate(taskData, formattedContacts) {
    return `
    <div class="userStoryBodyContainer">
    <div class="userStoryEditContainer">
        <div class="userStoryEditContainerInside">
            <div class="userStoryEditCloseButtonContainer">
                <img onclick="closeUserStoryEdit()" src="./img/userStoryEdit/close.png" alt="Close">
            </div>
            <form id="editTaskForm" action="">
                <div>
                    <div class="mTop16">
                        <label class="editTitleHeadlineContainer" for="title">Title</label>
                    </div>
                    <div class="editTitleInputContainer">
                        <input type="text" id="editTitle" required value="${taskData.taskTitle}">
                    </div>
                </div>
                <div>
                    <div class="mTop16">
                        <label class="editDescriptionContainer" for="description">Description</label>
                    </div>
                    <div class="editDescriptionTextAreaContainer mTop8">
                        <textarea name="description" id="editDescription">${taskData.taskDescription}</textarea>
                    </div>
                </div>
                <div>
                    <div class="mTop16">
                        <label class="editDueDateContainer" for="Due date">Due date</label>
                    </div>
                    <div class="editDueDateInputContainer mTop8">
                        <input type="date" id="editDueDate" required value="${taskData.taskDate}">
                    </div>
                </div>
                <div>
                    <div class="mTop16">
                        <label class="editPriorityHeadline" for="priority">Priority</label>
                    </div>
                    <div class="editPriorityAllButtonsContainer">
                        <div onclick="addUrgent(), addUrgentPrio()" id="editUrgent" class="editPriorityButtonContainer ${taskData.taskPrioAlt}">
                            <div>Urgent</div>
                            <div>
                                <img id="editActiveUrg" src="./img/userStoryEdit/urgent-prio-icon-inactive.svg" alt="High priority">
                            </div>
                        </div>
                        <div onclick="addMedium(), addMediumPrio()" id="editMedium" class="editPriorityButtonContainer ${taskData.taskPrioAlt}">
                            <div>Medium</div>
                            <div>
                                <img id="editActiveMed" src="./img/userStoryEdit/prio_medium_inactive.svg" alt="Medium priority">
                            </div>
                        </div>
                        <div onclick="addLow(), addLowPrio()" id="editLow" class="editPriorityButtonContainer ${taskData.taskPrioAlt}">
                            <div>Low</div>
                            <div>
                                <img id="editActiveLow" src="./img/userStoryEdit/low-prio-icon-inactive.png" alt="Low priority">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mTop24">
                    <label class="userStory_assignedToHeadline" for="assignedTo">Assigned to</label>
                </div>
                <div class="userStoryAssignedToInputAndImageContainer mTop8">
                    <input oninput="searchPersonAt()" onclick="showPersonsAt(), renderAssignedListAt()" autocomplete="off" id="assigned"type="text" placeholder="Select contacts to assign">
                    <div id="rotate" onclick="showPersonsAt(), renderAssignedListAt()" class="userStoryAssignedToDropdownMenuImageContainer">
                        <img src="./img/userStoryEdit/drop-down-arrow.png" alt="dropdownmenu">
                    </div>
                </div>
                <div id="dropdown-list" class="editDropDownList">
                </div>
                <div id="assigned-persons" class="userStoryContactsContainer mTop8">
                </div>
                <div class="userStorySubtaskHeadlineContainer mTop16">
                    <label class="userStorySubtaskHeadline" for="subtasks">Subtasks</label>
                </div>
                <div class="userStorySubtasksContainerEdit mTop8">
                        <div class="userStoryAssignedToInputAndImageContainer">
                        <input id="subtask" type="text" class="subtask-input medium-font subtaskInput" placeholder="Add new subtask">
                        <div class="add-new-subtask small-icon-div" id="addSubtaskIcon" onclick="addSubtask()">
                            <img class="smaller-icon" src="./img/add-plus-icon.png">
                        </div>
                        <div class="close-approve-container hide" id="addRemoveContainer">
                            <div class="small-icon-div" onclick="closeSubtask()"><img class="small-icon" src="./img/Close.png"></div>
                            <span class="small-input-vertical-vector"></span>
                            <div class="small-icon-div" onclick="aproveSubtaskEdit()"><img class="smaller-icon" src="./img/check_dark_icon.svg"></div>
                        </div>
                    </div>
                    <div id="subtaskDisplayEdit" class="subtaskDisplay flex-column"> ${subtaskEditSample(taskData)}</div>
                </div>
                <div class="userStoryEditOkButtonContainer">
                    <button class="userStoryEditOkButton" type="button" onclick="saveTaskChanges(${taskData.id})">Save <img src="./img/userStoryEdit/ok.png" alt="Save"></button>
                </div>
            </form>
        </div>
    </div>
    </div>
    `;
}

/**
 * Generates HTML for a ticket or task based on the provided data.
 * 
 * @param {Object} taskData - Data for the task.
 * @param {string} taskData.id - Unique identifier for the task.
 * @param {string} taskData.taskType - Type of the task (e.g., "bug", "feature").
 * @param {string} taskData.taskTitle - Title of the task.
 * @param {string} taskData.taskDescription - Description of the task.
 * @param {number} taskData.taskSubtaskAmount - Total number of subtasks for the task.
 * @param {string} taskData.taskPrioImage - URL for the priority image.
 * @param {string} taskData.taskPrioAlt - Alt text for the priority image.
 * @param {string} taskData.taskContactsMore - Additional information about contacts.
 * @param {string} formattedContacts - HTML content representing the contacts associated with the task.
 * @param {number} formattedSubtasksSelected - Number of selected subtasks.
 * @param {number} formattedSubtaskBar - Percentage width of the subtask bar representing completion.
 * @returns {string} The HTML string representing the ticket or task.
 */
function ticketTemplate(taskData, formattedContacts, formattedSubtasksSelected, formattedSubtaskBar) {
    return `
        <div id="${taskData.id}" draggable="true" ondragstart="startDragging(${taskData.id})" ondragend="endDragging(${taskData.id})" class="taskColumn task">
            <div class="boardTicketMoveArrowUp"><img id="moveTicketUpImg${taskData.id}" onload="moveTicketHoverEffect(${taskData.id})" onclick="moveTicketUp(${taskData.id})" src="./img/board/up_arrow.svg" alt="MoveUp"></div>
            <div onclick="openUserStory(${taskData.id}), scrollToTop()" class="taskColumnContainer">
                <div id="taskType" class="taskType ${taskData.taskType}">${taskData.taskType}</div>
                <div class="taskTitle">${taskData.taskTitle}</div>
                <div class="taskDescription">${taskData.taskDescription}</div>
                <div id="taskSubtaskBarContainer" class="taskSubtaskBarContainer">
                    <div class="taskSubtaskBar">
                        <div style="width:${formattedSubtaskBar}%" class="taskSubtaskBarFilledBar"></div>
                    </div>
                    <span>${formattedSubtasksSelected || 0}/${taskData.taskSubtaskAmount} Subtasks</span>
                </div>
                <div class="taskContactsPrioContainer">
                    <div class="taskContactsContainer">
                        ${formattedContacts}
                    </div>
                    
                    <div class="taskMoreContactsAndTaskPrioContainer">
                        <div class="taskMoreContacts">${taskData.taskContactsMore}</div>
                        <img src="${taskData.taskPrioImage}" alt="${taskData.taskPrioAlt}">
                    </div>
                </div>
                
            </div>
            <div class="boardTicketMoveArrowDown"><img id="moveTicketDownImg${taskData.id}" onclick="moveTicketDown(${taskData.id})" src="./img/board/down_arrow.svg" alt="MoveUp"></div>
        </div>
    `;
}

/**
 * Generates HTML for a dropdown list of contacts, where each item includes an emblem and name.
 * 
 * This function sorts the contacts and creates an HTML string for each contact, which can be used to display a dropdown list.
 * Each item in the list can be clicked to add the person to an assigned list.
 * 
 * @returns {string} The HTML string representing the dropdown list of contacts.
 */
function dropDownListSample() {
    let list = '';
    sortContacts(contacts);
    for (let i = 0; i < contacts.length; i++) {
        let person = contacts[i];
        list += `
      <div onclick="addAssignedPerson(${i})" class="flex-row persons-assignemend" id="persons-assignemend${i}">
        <div class="flex-row name-container">
          <span id="persons${i}" class="assigned-emblem flex-row small-font" style="background-color: ${person.color}">${renderEmblem(person.name)}</span>
          <h4 id="assigned-name${i}" class="medium-font">${person.name}</h4>
        </div>
        <div class="assigned-img-box">
          <img id="checkbox${i}" src="./img/checkbox_uncheckt.png">
        </div>
      </div>
      `
    }
    return list;
}

/**
 * Generates HTML for a list of assigned persons, each represented by an emblem.
 * 
 * This function iterates over the `assignedPersonsList` array and creates an HTML string for each assigned person.
 * Each person is displayed with an emblem styled according to their assigned color.
 * 
 * @returns {string} The HTML string representing the list of assigned persons with their emblems.
 */
function assignedResults() {
    let list = '';
    for (let i = 0; i < assignedPersonsList.length; i++) {
        let person = assignedPersonsList[i];
        
        list += `
      <span id="emblem${i}" class="assigned-emblem flex-row small-font" style="background-color: ${person.color}">${renderEmblemAt(person.name)}</span>
      `
    }
    return list;
}

/**
 * Generates HTML for a list of found persons, each represented with an emblem and name.
 * 
 * This function sorts the `contacts` array and then generates an HTML string for each person in the `foundPersonsList`.
 * Each person is displayed with an emblem and a name. Clicking on an item will trigger the `addFoundPerson` function.
 * 
 * @returns {string} The HTML string representing the list of found persons, including their emblems and names.
 */
function personsFoundPost() {
    let list = '';
    sortContacts(contacts);  
    for (let i = 0; i < foundPersonsList.length; i++) {
        let person = foundPersonsList[i];
        list += `
      <div onclick="addFoundPerson(${i})" class="flex-row persons-assignemend" id="persons-assignemend${i}">
        <div class="flex-row name-container">
          <span id="persons${i}" class="assigned-emblem flex-row small-font" style="background-color: ${person.color}">${renderEmblem(person.name)}</span>
          <h4 id="assigned-name${i}" class="medium-font">${person.name}</h4>
        </div>
        <div class="assigned-img-box">
          <img id="checkbox${i}" src="./img/checkbox_uncheckt.png">
        </div>
      </div>
      `
    }
    return list;
}

/**
 * Generates HTML for a list of subtasks.
 * 
 * This function creates an HTML string representing a list of subtasks. Each subtask is displayed as a list item with options for editing and deleting.
 * The edit and delete options are initially hidden and can be triggered through interactions.
 * 
 * @returns {string} The HTML string representing the list of subtasks with interactive elements for editing and deleting.
 */
function subtaskSample() {
    let list = '<ul class="subTaskList ulPadding">';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        list += `
            <li class="listItemSubTasks flex-row" id="subtaskEditNr${i}">
                <span class="subtask-text">${subtask}</span>
                <div style="display: flex" id="subTaskHoverEffectEdit${i}">
                    <div class="close-approve-container" id="editContainer">
                        <div class="smallIconDiv" onclick="editSubtask(this)">
                            <img class="smaller-icon" src="/img/edit-dark.png" alt="Edit">
                        </div>
                        <span class="small-input-vertical-vector"></span>
                        <div class="smallIconDiv" onclick="deleteSubtask(this)">
                            <img class="smaller-icon" src="/img/delete.png" alt="Delete">
                        </div>
                    </div>
                    <div class="close-approve-container hide" id="addRemoveContainerEdit${i}">
                        <div class="smallIconDiv" onclick="approveEdit(this)">
                            <img class="smaller-icon" src="/img/check_dark_icon.svg" alt="Approve Edit">
                        </div>
                        <span class="small-input-vertical-vector"></span>
                        <div class="smallIconDiv">
                            <img onclick="cancelEdit(this)" class="small-icon" src="/img/Close.png" alt="Cancel Edit">
                        </div>
                    </div>
                </div>
            </li>`;
        }
        list += "</ul>";
        return list;
}

/**
 * Generates HTML for a list of subtasks from the provided task data.
 * 
 * This function creates an HTML string representing a list of subtasks from the given task data. Each subtask is displayed as a list item with options for editing and deleting.
 * The edit and delete options are initially hidden and can be triggered through interactions.
 * 
 * @param {Object} taskData - Data for the task.
 * @param {string[]} taskData.taskSubtasks - Array of subtasks.
 * @returns {string} The HTML string representing the list of subtasks with interactive elements for editing and deleting.
 */
function subtaskEditSample(taskData) {
    let list = '<ul class="subTaskList ulPadding">';
    let taskArray = taskData.taskSubtasks;
    
    if (taskArray) {
        for (let i = 0; i < taskArray.length; i++) {
            const subtask = taskArray[i];
            list += `
            <li class="listItemSubTasks flex-row" id="subtaskEditNr${i}">
                <span class="subtask-text">${subtask}</span>
                <div style="display: flex" id="subTaskHoverEffectEdit${i}">
                    <div class="close-approve-container" id="editContainer">
                        <div class="smallIconDiv" onclick="editSubtask(this)">
                            <img class="smaller-icon" src="/img/edit-dark.png" alt="Edit">
                        </div>
                        <span class="small-input-vertical-vector"></span>
                        <div class="smallIconDiv" onclick="deleteSubtask(this), toggleCheckbox()">
                            <img class="smaller-icon" src="/img/delete.png" alt="Delete">
                        </div>
                    </div>
                    <div class="close-approve-container hide" id="addRemoveContainerEdit${i}">
                        <div class="smallIconDiv" onclick="approveEdit(this)">
                            <img class="smaller-icon" src="/img/check_dark_icon.svg" alt="Approve Edit">
                        </div>
                        <span class="small-input-vertical-vector"></span>
                        <div class="smallIconDiv">
                            <img onclick="cancelEdit(this)" class="small-icon" src="/img/Close.png" alt="Cancel Edit">
                        </div>
                    </div>
                </div>
            </li>`;
        }
        list += "</ul>";
        return list;
    } else {
        list = '';
        return list;
    }
}
