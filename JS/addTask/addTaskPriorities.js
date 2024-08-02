/**
 * Sets the background color and text color of priority elements based on the given priority level.
 * Updates the appearance of elements with IDs corresponding to "urgent", "medium", and "low" to reflect
 * the selected priority level by applying a specific color and setting the text color to white for the selected priority.
 * Resets the appearance of other priority levels.
 * @param {string} priority - The priority level to set, which must be one of the following: 'urgent', 'medium', or 'low'.
 */
function setPriorityAt(priority) {
    let priorities = {
      urgent: document.getElementById("urgent"),
      medium: document.getElementById("medium"),
      low: document.getElementById("low"),
    };
  
    for (let key in priorities) {
      priorities[key].style.backgroundColor =
        key === priority ? getColorAt(priority) : "";
      priorities[key].style.color = key === priority ? "#FFFFFF" : "";
    }
  
    currentPriority = priority;
  }
  
  /**
   * Returns the color associated with the given priority level.
   * The color is used to visually represent different priority levels.
   * @param {string} priority - The priority level, which must be one of 'urgent', 'medium', or 'low'.
   * @returns {string} The color code in hexadecimal format for the specified priority level.
   */
  function getColorAt(priority) {
    switch (priority) {
      case "urgent":
        return "#FF3D00";
      case "medium":
        return "#FFA800";
      case "low":
        return "#7AE229";
      default:
        return "";
    }
  }
  
  /**
   * Updates the background image of priority elements based on the given priority level.
   * Sets the source of the image to the active version for the selected priority and to the inactive version for the others.
   * @param {string} priority - The priority level to set, which must be one of 'urgent', 'medium', or 'low'.
   */
  function setBgImgAt(priority) {
    let images = {
      urgent: document.getElementById("activeUrg"),
      medium: document.getElementById("activeMed"),
      low: document.getElementById("activeLow"),
    };
  
    for (let key in images) {
      images[key].src =
        key === priority ? getActiveImgAt(priority) : getInactiveImgAt(key);
    }
  }
  
  /**
   * Returns the URL of the active image associated with the given priority level.
   * The active image visually represents the selected priority level.
   * @param {string} priority - The priority level, which must be one of 'urgent', 'medium', or 'low'.
   * @returns {string} The URL of the active image for the specified priority level.
   */
  function getActiveImgAt(priority) {
    switch (priority) {
      case "urgent":
        return "/img/urgent-prio-icon-active.svg";
      case "medium":
        return "/img/medium-prio-icon-active.png";
      case "low":
        return "/img/low-prio-icon-active.png";
      default:
        return "";
    }
  }
  
  /**
   * Returns the URL of the inactive image associated with the given priority level.
   * The inactive image visually represents a non-selected priority level.
   * @param {string} priority - The priority level, which must be one of 'urgent', 'medium', or 'low'.
   * @returns {string} The URL of the inactive image for the specified priority level.
   */
  function getInactiveImgAt(priority) {
    switch (priority) {
      case "urgent":
        return "/img/urgent-prio-icon-inactive.png";
      case "medium":
        return "/img/medium-prio-icon-inactive.png";
      case "low":
        return "/img/low-prio-icon-inactive.png";
      default:
        return "";
    }
  }
  
  /**
   * Sets the priority to 'urgent' and updates the background image to the active version for 'urgent'.
   * Calls `setPriorityAt` with 'urgent' to update the priority display and `setBgImgAt` with 'urgent' 
   * to set the background image to the active state.
   */
  function addUrgentAt() {
    setPriorityAt("urgent");
    setBgImgAt("urgent");
  }
  
  /**
   * Sets the priority to 'medium' and updates the background image to the active version for 'medium'.
   * Calls `setPriorityAt` with 'medium' to update the priority display and `setBgImgAt` with 'medium' 
   * to set the background image to the active state.
   */
  function addMediumAt() {
    setPriorityAt("medium");
    setBgImgAt("medium");
  }
  
  /**
   * Sets the priority to 'low' and updates the background image to the active version for 'low'.
   * Calls `setPriorityAt` with 'low' to update the priority display and `setBgImgAt` with 'low' 
   * to set the background image to the active state.
   */
  function addLowAt() {
    setPriorityAt("low");
    setBgImgAt("low");
  }