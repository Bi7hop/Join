/**
 * Generates an HTML string representation of a list of subtasks.
 * This HTML string includes each subtask as a list item with options for editing and deleting.
 * 
 * @returns {string} The HTML string for the list of subtasks.
 * 
 * @description
 * The function iterates over the `subtasksAt` array, creating a list item for each subtask. 
 * Each list item includes:
 * - The subtask text wrapped in a `<span>` element.
 * - A hidden container with options for editing and deleting the subtask, which appears when hovered.
 * - Separate containers for edit and approve actions, including icons and associated click events.
 * 
 * The resulting HTML structure includes:
 * - An unordered list (`<ul>`) with a class of `subTaskList`.
 * - Each list item (`<li>`) includes:
 *   - A `subtask-text` span displaying the subtask text.
 *   - A `subTaskHoverEffect` container for hover effects, including:
 *     - Edit and delete icons with `onclick` handlers for editing and deleting the subtask.
 *     - An edit container with icons for approving or canceling edits.
 * 
 * This function is used to render the subtasks dynamically in the UI, allowing users to interact with them.
 */
function subtaskSampleAt() {
  let list = '<ul class="subTaskList ulPadding">';
  for (let i = 0; i < subtasksAt.length; i++) {
      const subtask = subtasksAt[i];
      list += `<li class="listItemSubTasks listItem flex-row" id="subtaskNr${i}">
      <span class="subtask-text">${subtask}</span>
      <div style="display: none" id="subTaskHoverEffect${i}">
          <div class="close-approve-container" id="editContainerAt${i}">
              <div class="smallIconDiv" onclick="editSubtaskAt(this)">
              <img class="smaller-icon" src="/img/edit-dark.png">
              </div>
              <span class="small-input-vertical-vector"></span>
              <div class="smallIconDiv" onclick="deleteSubtaskAt(this)">
              <img class="smaller-icon" src="/img/delete.png">
              </div>
          </div>
          <div class="close-approve-container hide" id="addRemoveContainerEditAt${i}">
              <div class="smallIconDiv" onclick="approveEditAt(this)"><img class="smaller-icon" src="/img/check_dark_icon.svg"></div>
              <span class="small-input-vertical-vector"></span>
              <div class="smallIconDiv" ><img onclick="cancelEditAt(this)" class="small-icon" src="/img/Close.png"></div>
          </div>
      </div>
      </li>`;
  }
  list += "</ul>";
  return list;
}

/**
 * Generates an HTML string for a dropdown list of contacts.
 * The dropdown list includes each contact as a selectable item with an assigned emblem and checkbox.
 * 
 * @returns {string} The HTML string for the dropdown list.
 * 
 * @description
 * This function creates a list of contacts by iterating over `firebaseData`. Each contact with a color is represented by a list item that includes:
 * - An emblem with the contact's initials or emblem image, styled with the contact's color.
 * - The contact's name.
 * - A checkbox indicating if the contact is currently assigned.
 * 
 * The function also applies CSS classes based on the state of the checkbox (checked or unchecked).
 * 
 * The list is sorted by contact names before generating the HTML.
 */
function dropDownListSampleAt() {
  let list = '';
  sortContactsAt();
  firebaseData.forEach(task => {
    Object.keys(task.dataExtracted).forEach(key => {
      const taskData = task.dataExtracted[key];
      if (taskData.color) {
        list += `
          <div onclick='addAssignedPersonAt(${JSON.stringify(taskData)})' class="flex-row persons-assignemend ${checkboxStates[taskData.email] ? 'persons-assignemend-checkt' : ''}" id="persons-assignemend${taskData.email}">
            <div class="flex-row name-container">
              <span id="persons${taskData.email}" class="assigned-emblem flex-row small-font" style="background-color: ${taskData.color}">${renderEmblemAt(taskData.name)}</span>
              <h4 id="assigned-name${taskData.email}" class="medium-font ${checkboxStates[taskData.email] ? 'assigned-color' : ''}">${taskData.name}</h4>
            </div>
            <div class="assigned-img-box">
              <img id="checkbox${taskData.email}" src="${checkboxStates[taskData.email] ? './img/checkbox_checkt.png' : './img/checkbox_uncheckt.png'}">
            </div>
          </div>
        `;
      } 
    });
  });
  return list;
}

/**
 * Generates an HTML string for displaying a single assigned person in the list.
 * 
 * @param {Object} taskData - The data of the assigned person.
 * @param {string} taskData.email - The email of the assigned person.
 * @param {string} taskData.color - The background color of the person's emblem.
 * @param {string} taskData.emblem - The emblem to display.
 * 
 * @returns {string} The HTML string for the assigned person's result.
 * 
 * @description
 * This function creates a span element for an assigned person’s emblem, styled with the person's color. It is used in the context of displaying results for assigned persons.
 */
function assignedResultsAt(taskData) {
  return `
    <span id="emblem${taskData.email}" class="assigned-emblem flex-row small-font" style="background-color: ${taskData.color}">${taskData.emblem}</span>
  `;
}

/**
 * Generates an HTML string for displaying the count of extra assigned persons beyond a limit.
 * 
 * @param {number} extraCount - The number of additional assigned persons to display.
 * 
 * @returns {string} The HTML string for displaying the extra count.
 * 
 * @description
 * This function creates a span element that shows a count of extra assigned persons. It is used when the number of assigned persons exceeds a certain limit and provides an indicator of how many more there are.
 */
function assignedResultsPlusSixAt(extraCount){
  return `
    <span class="assigned-emblem flex-row small-font extra-emblem">+${extraCount}</span>
  `;
}

/**
 * Generates an HTML string for the list of persons found based on the search input.
 * 
 * @returns {string} The HTML string for the list of found persons.
 * 
 * @description
 * This function creates a list of found persons based on the `foundPersonsByInput` array. Each person is represented by:
 * - An emblem with the person's initials or emblem image, styled with the person's color.
 * - The person's name.
 * - A checkbox indicating if the person is currently assigned.
 * 
 * The list is rendered dynamically and includes CSS classes based on the checkbox state (checked or unchecked).
 */
function personsFoundPostAt() {
  return foundPersonsByInput.map(person => `
    <div id="persons-assignemend${person.email}" class="flex-row persons-assignemend ${checkboxStates[person.email] ? 'persons-assignemend-checkt' : ''}">
      <div class="flex-row name-container">
        <span id="persons${person.email}" class="assigned-emblem flex-row small-font" style="background-color: ${person.color}">${renderEmblemAt(person.name)}</span>
        <h4 id="assigned-name${person.email}" class="medium-font ${checkboxStates[person.email] ? 'assigned-color' : ''}">${person.name}</h4>
      </div>
      <div class="assigned-img-box">
        <img id="checkbox${person.email}" src="${checkboxStates[person.email] ? './img/checkbox_checkt.png' : './img/checkbox_uncheckt.png'}">
      </div>
    </div>
  `).join('');
}