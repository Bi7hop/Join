/**
 * Shows the container for adding a subtask and hides the "add subtask" icon.
 * Updates the visibility of UI elements to allow the user to input a new subtask.
 */
function addSubtaskAt() {
    let plusIcon = document.getElementById("addSubtaskIconAt");
    let hidenContainer = document.getElementById("addRemoveContainerAt");
  
    plusIcon.classList.add("hide");
    hidenContainer.classList.remove("hide");
  }
  
  /**
   * Hides the container for adding a subtask and shows the "add subtask" icon.
   * Clears the subtask input field and updates the visibility of UI elements.
   */
  function closeSubtaskAt() {
    let plusIcon = document.getElementById("addSubtaskIconAt");
    let hidenContainer = document.getElementById("addRemoveContainerAt");
    let subtask = document.getElementById("subtaskAt");
  
    plusIcon.classList.remove("hide");
    hidenContainer.classList.add("hide");
    subtask.value = "";
  }
  
  /**
   * Updates the display area for subtasks with the current subtask content.
   * Clears the existing content and adds new subtask content using `subtaskSampleAt`.
   */
  function postSubtaskAt() {
    let subtaskDisplayAt = document.getElementById("subtaskDisplayAt");
  
    subtaskDisplayAt.innerHTML = "";
    subtaskDisplayAt.innerHTML += subtaskSampleAt();
  }
  
  /**
   * Transforms a subtask item into an editable input field.
   * Replaces the text content of the subtask with an input field pre-filled with the current text.
   * Calls `swapToEditAt` to update the list item's state to reflect the editing mode.
   * @param {HTMLElement} element - The element that triggered the edit action, typically a button or icon within the subtask list item.
   */
  function editSubtaskAt(element) {
    let listItem = element.closest(".listItem");
    let subtaskSpan = listItem.querySelector(".subtask-text");
    let subtaskText = subtaskSpan.textContent.trim();
    subtaskSpan.outerHTML = `<input value="${subtaskText}">`;
  
    swapToEditAt(listItem);
  }
  
  /**
   * Cancels the editing of a subtask and reverts the input field back to a text span.
   * If an input field is present within the list item, it replaces it with a span containing the current text value.
   * Calls `swapToNormalAt` to update the list item's state to reflect that it is no longer in editing mode.
   * @param {HTMLElement} element - The element that triggered the cancel action, typically a cancel button or icon within the subtask list item.
   */
  function cancelEditAt(element) {
    let listItem = element.closest(".listItem");
    let inputElement = listItem.querySelector("input");
    let subtaskText = inputElement ? inputElement.value.trim() : "";
    if (inputElement) {
      inputElement.outerHTML = `<span class="subtask-text">${subtaskText}</span>`;
    }
    swapToNormalAt(listItem);
  }
  
  /**
   * Deletes a subtask item from the list and the internal data structure.
   * Removes the list item element from the DOM and updates the `subtasksAt` array to reflect the deletion.
   * The subtask to be deleted is identified by the text content of the closest `.subtask-text` element.
   * @param {HTMLElement} element - The element that triggered the delete action, typically a delete button or icon within the subtask list item.
   */
  function deleteSubtaskAt(element) {
    let listItem = element.closest(".listItem");
    let subtaskSpan = listItem.querySelector(".subtask-text");
    let subtaskText = subtaskSpan.textContent.trim();
    let index = subtasksAt.indexOf(subtaskText);
    if (index !== -1) {
      subtasksAt.splice(index, 1);
    }
    listItem.remove();
  }
  
  /**
   * Switches a list item into editing mode by toggling the visibility of specific UI elements.
   * Hides the element with an ID starting with 'editContainerAt' and shows the element with an ID starting with 'addRemoveContainerEditAt'.
   * @param {HTMLElement} listItem - The list item element that contains the subtask to be edited.
   */
  function swapToEditAt(listItem) {
    let edit = listItem.querySelector("[id^=editContainerAt]");
    let editing = listItem.querySelector("[id^=addRemoveContainerEditAt]");
    edit.classList.add("hide");
    editing.classList.remove("hide");
  }
  
  /**
   * Switches a list item back to its normal state from editing mode by toggling the visibility of specific UI elements.
   * Shows the element with an ID starting with 'editContainerAt' and hides the element with an ID starting with 'addRemoveContainerEditAt'.
   * @param {HTMLElement} listItem - The list item element that is being switched back to normal mode.
   */
  function swapToNormalAt(listItem) {
    let edit = listItem.querySelector("[id^=editContainerAt]");
    let editing = listItem.querySelector("[id^=addRemoveContainerEditAt]");
    edit.classList.remove("hide");
    editing.classList.add("hide");
  }
  
  /**
   * Approves and applies changes to a subtask's text when editing is confirmed.
   * Updates the text of the subtask in the `subtasksAt` array and in the DOM.
   * Replaces the input field with a span showing the new subtask text and switches the list item back to normal mode.
   * @param {HTMLElement} element - The element that triggered the approval action, typically a confirm button or icon within the subtask list item.
   */
  function approveEditAt(element) {
    let listItem = element.closest(".listItem");
    let inputElement = listItem.querySelector("input");
    let newSubtaskText = inputElement.value.trim();
  
    let oldSubtaskText = subtasksAt.find((subtask) => subtask === inputElement.defaultValue);
    let index = subtasksAt.indexOf(oldSubtaskText);
    if (index !== -1) {
      subtasksAt[index] = newSubtaskText;
    }
  
    inputElement.outerHTML = `<span class="subtask-text">${newSubtaskText}</span>`;
    swapToNormalAt(listItem);
  }

  /**
 * Adds hover effect event listeners to subtask items.
 * Displays a hover effect image when the mouse enters and hides it when the mouse leaves.
 */
function subTasksHoverEffect() {
    for (let i = 0; i < subtasksAt.length; i++) {
      const hoverListedItem = document.getElementById(`subtaskNr${i}`);
      const hoverListedItemImage = document.getElementById(
        `subTaskHoverEffect${i}`
      );
  
      hoverListedItem.addEventListener("mouseenter", function () {
        hoverListedItemImage.style.display = "flex";
      });
      hoverListedItem.addEventListener("mouseleave", function () {
        hoverListedItemImage.style.display = "none";
      });
    }
  }
  