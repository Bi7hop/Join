/**
 * Loads the firebaseData first and then rendering the summary board.
 */
loadUrl().then(() => {
    renderSummaryBoard();
});

let toDoTasks = [];
let inProgressTasks = [];
let awaitFeedbackTasks = [];
let doneTasks = [];
let allTasks = [];
let urgentTasks = [];
let taskDates = [];

/**
 * Categorizes tasks based on their status and priority.
 * 
 * @param {Object} taskData - The task data object.
 */
function categorizeTask(taskData) {
    if (taskData.taskStatus) {
        switch (taskData.taskStatus) {
            case "toDo":
                toDoTasks.push(taskData.taskStatus);
                break;
            case "inProgress":
                inProgressTasks.push(taskData.taskStatus);
                break;
            case "awaitFeedback":
                awaitFeedbackTasks.push(taskData.taskStatus);
                break;
            case "done":
                doneTasks.push(taskData.taskStatus);
                break;
        }
        allTasks.push(taskData.taskStatus);
    }

    if (taskData.taskPrioAlt === "Urgent" && taskData.taskDate) {
        urgentTasks.push(taskData);
    }

    if (taskData.taskDate) {
        taskDates.push(taskData.taskDate);
    }
}

/**
 * Retrieves the nearest urgent deadline from the list of urgent tasks.
 *
 * @returns {string|null} The nearest urgent task date in ISO format, or null if there are no urgent tasks.
 */
function getNearestUrgentDeadline() {
    if (urgentTasks.length === 0) return null;

    const today = new Date();
    urgentTasks.sort((a, b) => {
        const dateA = new Date(a.taskDate);
        const dateB = new Date(b.taskDate);
        return Math.abs(dateA - today) - Math.abs(dateB - today);
    });

    return urgentTasks[0].taskDate;
}

/**
 * Checks if a date is within the specified number of days from now
 * 
 * @param {string} dateStr - The date to check in ISO format
 * @param {number} days - Number of days threshold
 * @returns {boolean} True if the date is within the specified days
 */
function isWithinDays(dateStr, days) {
    const taskDate = new Date(dateStr);
    const now = new Date();
    const diffTime = taskDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= days;
}

/**
 * Updates the urgent task card styling based on deadline proximity
 */
function updateUrgentCardStyle() {
    const nearestUrgentDeadline = getNearestUrgentDeadline();
    if (nearestUrgentDeadline && isWithinDays(nearestUrgentDeadline, 3)) {
        const urgentCard = document.querySelector('.summary-card-middle');
        if (urgentCard) {
            urgentCard.classList.add('urgent-blink');
        }
    }
}

/**
 * Updates the summary board's HTML content and applies urgent styling
 */
function updateSummaryBoard() {
    let summaryBoard = document.getElementById('summaryBoard');
    summaryBoard.innerHTML = summaryBoardHtmlTemplate();
    updateUrgentCardStyle();
}

/**
 * Formats and displays the nearest task date on the web page
 */
function formattTaskDate() {
    let nearestDateContainer = document.getElementById('nearestDate');
    const nearestUrgentDeadline = getNearestUrgentDeadline();

    if (nearestUrgentDeadline) {
        const date = new Date(nearestUrgentDeadline);
        const formattedDate = date.toLocaleDateString('de-DE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        nearestDateContainer.innerText = formattedDate;
        
        if (isWithinDays(nearestUrgentDeadline, 3)) {
            nearestDateContainer.style.color = '#FF3D00';
        }
    } else {
        nearestDateContainer.innerText = "No urgent tasks";
    }
}

/**
 * Renders the summary board by categorizing tasks and updating the board content.
 */
function renderSummaryBoard() {
    let summaryBoard = document.getElementById('summaryBoard');
    firebaseData.forEach(task => {
        Object.keys(task.dataExtracted).forEach(key => {
            const taskData = task.dataExtracted[key];
            if (taskData.taskStatus) {
                categorizeTask(taskData);
            }
        });
    });

    updateSummaryBoard();
    formattTaskDate();
}