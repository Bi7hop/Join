function userStoryHtmlTemplate() {
    return `
    <div class="userStoryOutsideContainer flying-element">
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
                        <div onclick="addUrgent()" id="urgent" class="editPriorityButtonContainer">
                            <div>Urgent</div>
                            <div>
                                <img id="activeUrg" src="./img/userStoryEdit/urgent-prio-icon-inactive.svg" alt="High priority">
                            </div>
                        </div>
                        <div onclick="addMedium()" id="medium" class="editPriorityButtonContainer">
                            <div>Medium</div>
                            <div>
                                <img id="activeMed" src="./img/userStoryEdit/prio_medium_inactive.svg" alt="Medium priority">
                            </div>
                        </div>
                        <div onclick="addLow()" id="low" class="editPriorityButtonContainer">
                            <div>Low</div>
                            <div>
                                <img id="activeLow" src="./img/userStoryEdit/low-prio-icon-inactive.png" alt="Low priority">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mTop24">
                    <label class="userStory_assignedToHeadline" for="assignedTo">Assigned to</label>
                </div>
                <div class="userStoryAssignedToInputAndImageContainer mTop8">
                    <input type="text" placeholder="Select contacts to assign">
                    <div class="userStoryAssignedToDropdownMenuImageContainer">
                        <img src="./img/userStoryEdit/drop-down-arrow.png" alt="dropdownmenu">
                    </div>
                </div>
                <div class="userStoryContactsContainer mTop8">
                    <div class="userStoryContacts">as</div>
                    <div class="userStoryContacts">de</div>
                    <div class="userStoryContacts">ef</div>
                </div>
                <div class="userStorySubtaskHeadlineContainer mTop16">
                    <label class="userStorySubtaskHeadline" for="subtasks">Subtasks</label>
                </div>
                <div class="userStorySubtasksInputContainer mTop8">
                    <input type="text" placeholder="Add new subtask">
                    <div class="userStorySubtasksDropdownImageContainer">
                        <img src="./img/userStoryEdit/add-plus-icon.png" alt="dropdownmenu">
                    </div>
                </div>
                <div class="userStorySubtasksContainer mTop8">
                    <table>
                        <div class="userStorySubtaskListedItemContainer subtaskListedItem0">
                            <li>Implement Recipe Recommendation</li>
                            <div class="userStorySubtaskListedItemImageContainer subtaskListedImage0">
                                <img class="mRight8" src="./img/userStoryEdit/edit-dark.png" alt="edit">
                                <img class="mRight16" src="./img/userStoryEdit/delete.png" alt="delete">
                            </div>
                        </div>
                        <div class="userStorySubtaskListedItemContainer subtaskListedItem1">
                            <li class="userStorySubtaskListedItem">Start Page Layout</li>
                            <div class="userStorySubtaskListedItemImageContainer subtaskListedImage1">
                                <img class="mRight8" src="./img/userStoryEdit/edit-dark.png" alt="edit">
                                <img class="mRight16" src="./img/userStoryEdit/delete.png" alt="delete">
                            </div>
                        </div>
                    </table>
                </div>
            </form>
        </div>
    </div>
    </div>
    `
}