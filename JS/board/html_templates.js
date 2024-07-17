let contacts = [
    { name: 'Anton Meyer', email: 'anton@gmail.com', phone: '123456789', color: '#ff5733', emblem: 'AM' },
    { name: 'Bernd Bauer', email: 'bernd@gmail.com', phone: '987654321', color: '#33ff57', emblem: 'BB' },
    { name: 'Clara Schmidt', email: 'clara@gmail.com', phone: '456789123', color: '#3357ff', emblem: 'CS' },
    { name: 'David Müller', email: 'david@gmail.com', phone: '789123456', color: '#ff33a1', emblem: 'DM' },
    { name: 'Eva Braun', email: 'eva@gmail.com', phone: '321456987', color: '#a133ff', emblem: 'EB' },
    { name: 'Fritz Weber', email: 'fritz@gmail.com', phone: '654789321', color: '#33ffa1', emblem: 'FW' },
    { name: 'Gisela Hofmann', email: 'gisela@gmail.com', phone: '987321654', color: '#ff7f33', emblem: 'GH' },
    { name: 'Hanna Schuster', email: 'hanna@gmail.com', phone: '321987654', color: '#33b5ff', emblem: 'HS' },
    { name: 'Ingrid König', email: 'ingrid@gmail.com', phone: '654123789', color: '#ff3357', emblem: 'IK' },
    { name: 'Jakob Fischer', email: 'jakob@gmail.com', phone: '123789456', color: '#57ff33', emblem: 'JF' },
    { name: 'Klaus Schneider', email: 'klaus@gmail.com', phone: '789654123', color: '#33ffb5', emblem: 'KS' },
    { name: 'Lena Wagner', email: 'lena@gmail.com', phone: '456123789', color: '#ff5733', emblem: 'LW' },
    { name: 'Martin Becker', email: 'martin@gmail.com', phone: '321789456', color: '#a1ff33', emblem: 'MB' },
    { name: 'Nina Krause', email: 'nina@gmail.com', phone: '654987321', color: '#ff33d7', emblem: 'NK' },
    { name: 'Olaf Zimmermann', email: 'olaf@gmail.com', phone: '987456123', color: '#337fff', emblem: 'OZ' },
    { name: 'Petra Neumann', email: 'petra@gmail.com', phone: '123654789', color: '#ff5733', emblem: 'PN' },
    { name: 'Quirin Lang', email: 'quirin@gmail.com', phone: '456987321', color: '#33ff57', emblem: 'QL' },
    { name: 'Rita Schulz', email: 'rita@gmail.com', phone: '789321654', color: '#ff33b5', emblem: 'RS' },
    { name: 'Stefan Wolf', email: 'stefan@gmail.com', phone: '321456789', color: '#33a1ff', emblem: 'SW' },
    { name: 'Tina Maier', email: 'tina@gmail.com', phone: '654789123', color: '#ff5733', emblem: 'TM' },
    { name: 'Uwe Krüger', email: 'uwe@gmail.com', phone: '987123456', color: '#a1ff57', emblem: 'UK' },
    { name: 'Vera Frank', email: 'vera@gmail.com', phone: '123456987', color: '#ff7f57', emblem: 'VF' },
];

function userStoryHtmlTemplate() {
    return `
    <div id="userStoryOutsideContainer" class="userStoryOutsideContainer flying-element">
        <div class="userStoryContainer">
            <div class="userStoryContainerInside">
                <div class="userStoryHeadlineAndCloseButtonContainer">
                    <div class="taskType">
                        User Story
                    </div>
                    <div onclick="closeUserStory()" class="userStoryCloseButtonContainer">
                        <img src="./img/userStory/close.png" alt="Close">
                    </div>
                </div>
                <div>
                    <h1 class="userStoryHeadline">
                        Kochwelt Page & Recipe Recommender
                    </h1>
                </div>
                <div class="openUserStoryTaskDescription">
                    Build start page with recipe recommendation.
                </div>
                <div class="dueDateDateContainer">
                    <div class="dueDate">
                        Due date:
                    </div>
                    <div class="userStoryDateContainer">
                        18/06/2024
                    </div>
                </div>
                <div class="priorityContainer">
                    <div class="priority">
                        Priority:
                    </div>
                    <div class="priorityImageContainer">Medium <img src="./img/userStory/prio_medium.png"
                            alt="Medium Priority"></div>
                </div>
                <div class="assignedToContainer">
                    Assigned To:
                </div>
                <div class="userStoryContactContainer">
                    <div class="userStoryContact">
                        <div class="userStoryContactLogo">em</div>
                        <div class="userStoryContactFullName">Emmanuel Mauer</div>
                    </div>
                    <div class="userStoryContact">
                        <div class="userStoryContactLogo">mb</div>
                        <div class="userStoryContactFullName">Marcel Bauer</div>
                    </div>
                    <div class="userStoryContact">
                        <div class="userStoryContactLogo">am</div>
                        <div class="userStoryContactFullName">Anton Mayer</div>
                    </div>
                </div>
                <div class="userStorySubtaskContainer">
                    Subtasks
                </div>
                <div class="subtaskCheckboxHoverEffect">
                    <label class="container">
                        <input type="checkbox" checked="checked">
                        <span class="checkmark"></span>
                    </label>
                    <div class="userStorySubtaskTitelContainer">
                        <p>Implement Recipe Recommendation</p>
                    </div>
                </div>
                <div class="subtaskCheckboxHoverEffect">
                    <label class="container">
                        <input type="checkbox" checked="checked">
                        <span class="checkmark"></span>
                    </label>
                    <div class="userStorySubtaskTitelContainer">
                        <p>Start page layout</p>
                    </div>
                </div>
                <div class="userStoryDeleteAndEditContainer">
                    <div class="userStoryDeleteContainer userStoryBackgroundImageDelete">
                        <div class="userStoryDeleteTextContainer">Delete</div>
                    </div>
                    <div class="userStoryCutLine"></div>
                    <div class="userStoryEditTextContainer userStoryBackgroundImageEdit">
                        <div onclick="openUserStoryEdit()" class="userStoryEditTextTextContainer">Edit</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

/**
 * Generates the HTML template for user story editing.
 * @param {Array} contactDataArray - Array of contact data.
 * @returns {string} - HTML string.
 */
function userStoryEditHtmlTemplate() {
    return `
    <div class="userStoryBodyContainer">
    <div class="userStoryEditContainer">
        <div class="userStoryEditContainerInside">
            <div class="userStoryEditCloseButtonContainer">
                <img onclick="closeUserStoryEdit()" src="./img/userStoryEdit/close.png" alt="Close">
            </div>
            <form action="">
                <div>
                    <div class="mTop16">
                        <label class="editTitleHeadlineContainer" for="title">Title</label>
                    </div>
                    <div class="editTitleInputContainer">
                        <input type="text" required value="Kochwelt Page & Recipe Recommender">
                    </div>
                </div>
                <div>
                    <div class="mTop16">
                        <label class="editDescriptionContainer" for="description">Description</label>
                    </div>
                    <div class="editDescriptionTextAreaContainer mTop8">
                        <textarea name="description"
                            id="description">Build start page with recipe recommendation</textarea>
                    </div>
                </div>
                <div>
                    <div class="mTop16">
                        <label class="editDueDateContainer" for="Due date">Due date</label>
                    </div>
                    <div class="editDueDateInputContainer mTop8">
                        <input type="date" required>
                    </div>
                </div>
                <div>
                    <div class="mTop16">
                        <label class="editPriorityHeadline" for="priority">Priority</label>
                    </div>
                    <div class="editPriorityAllButtonsContainer">
                        <div onclick="addUrgent()" id="editUrgent" class="editPriorityButtonContainer">
                            <div>Urgent</div>
                            <div>
                                <img id="editActiveUrg" src="./img/userStoryEdit/urgent-prio-icon-inactive.svg" alt="High priority">
                            </div>
                        </div>
                        <div onclick="addMedium()" id="editMedium" class="editPriorityButtonContainer">
                            <div>Medium</div>
                            <div>
                                <img id="editActiveMed" src="./img/userStoryEdit/prio_medium_inactive.svg" alt="Medium priority">
                            </div>
                        </div>
                        <div onclick="addLow()" id="editLow" class="editPriorityButtonContainer">
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
                    <input oninput="searchPerson()" onclick="editShowPersons()" autocomplete="off" id="assigned-to"type="text" placeholder="Select contacts to assign">
                    <div id="editRotate" onclick="editShowPersons()" class="userStoryAssignedToDropdownMenuImageContainer">
                        <img src="./img/userStoryEdit/drop-down-arrow.png" alt="dropdownmenu">
                    </div>
                </div>
                <div id="editDropDownList" class="editDropDownList editHide">
                    
                </div>
                <div id="assigned-persons" class="userStoryContactsContainer mTop8">
                    
                </div>
                <div class="userStorySubtaskHeadlineContainer mTop16">
                    <label class="userStorySubtaskHeadline" for="subtasks">Subtasks</label>
                </div>
                
                <div class="userStorySubtasksContainer mTop8">
                    
                        <div class="userStoryAssignedToInputAndImageContainer">
                        <input id="subtask" type="text" class="subtask-input medium-font subtaskInput" id="subtask" placeholder="Add new subtask">
                        <div class="add-new-subtask small-icon-div" id="addSubtaskIcon" onclick="addSubtask()">
                            <img class="smaller-icon" src="./img/add-plus-icon.png">
                        </div>
                        <div class="close-approve-container hide" id="addRemoveContainer">
                            <div class="small-icon-div" onclick="closeSubtask()"><img class="small-icon" src="./img/Close.png"></div>
                            <span class="small-input-vertical-vector"></span>
                            <div class="small-icon-div" onclick="aproveSubtask()"><img class="smaller-icon" src="./img/check_dark_icon.svg"></div>
                        </div>
                    </div>
                    <div id="subtaskDisplay" class="subtaskDisplay flex-column"></div>
                    
                </div>
                <div class="userStoryEditOkButtonContainer">
                    <button class="userStoryEditOkButton" type="button" onclick="closeUserStoryEdit()">Ok <img src="./img/userStoryEdit/ok.png" alt="Add"></button>
                </div>
            </form>
        </div>
    </div>
    </div>
    `;
}


function ticketTemplate(ticket, formattedContacts) {
    return `
        <div id="${ticket.id}" draggable="true" ondragstart="startDragging(${ticket.id})" onclick="openUserStory()" ondragend="endDragging(${ticket.id});" class="taskColumn task">
            <div class="taskColumnContainer">
                <div class="taskType">${ticket.taskType}</div>
                    <div class="taskTitel">${ticket.taskTitel}</div>
                    <div class="taskDescription">${ticket.taskDescription}</div>
                        <div class="taskSubtaskBarContainer">
                            <div class="taskSubtaskBar">
                                <div style="width:${ticket.taskBar}%" class="taskSubtaskBarFilledBar"></div>
                            </div>
                                <span>${ticket.taskSubtaskAmount}/2 Subtask</span>
                            </div>
                            <div class="taskContactsPrioContainer">
                                <div class="taskContactsContainer">
                                ${formattedContacts}
                            </div>
                            <div>
                                <img src="${ticket.taskPrioImage}" alt="${ticket.taskPrioAlt}">
                            </div>
                        </div>
                    </div>
                </div>
    `
}


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
  
  function personsFoundPost(){
    let list = '';
    sortContacts();
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
function subtaskSample() {
    let list = '<ul class="subTaskList ulPadding">';
    for (let i = 0; i < subtasks.length; i++) {
      const subtask = subtasks[i];
      list += `<li class="listItemSubTasks flex-row" id="subtaskNr${i}">
        <span class="subtask-text">${subtask}</span>
        <div style="display: none" id="subTaskHoverEffect${i}">
            <div class="close-approve-container" id="editContainer">
                <div class="smallIconDiv" onclick="editSubtask(this)">
                <img class="smaller-icon" src="/img/edit-dark.png">
                </div>
                <span class="small-input-vertical-vector"></span>
                <div class="smallIconDiv" onclick="deleteSubtask(this)">
                <img class="smaller-icon" src="/img/delete.png">
                </div>
            </div>
            <div class="close-approve-container hide" id="addRemoveContainerEdit${i}">
                <div class="smallIconDiv" onclick="approveEdit(this)"><img class="smaller-icon" src="/img/check_dark_icon.svg"></div>
                <span class="small-input-vertical-vector"></span>
                <div class="smallIconDiv" ><img onclick="cancelEdit(this)" class="small-icon" src="/img/Close.png"></div>
            </div>
        </div>
        </li>`;
    }
    list += "</ul>";
    return list;
  }
