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

    if (taskData.taskPrioAlt === "urgent") {
        urgentTasks.push('taskData.taskPrioAlt');
    }

    if (taskData.taskDate) {
        taskDates.push(taskData.taskDate);
    }
}

/**
 * Updates the summary board's HTML content.
 */
function updateSummaryBoard() {
    let summaryBoard = document.getElementById('summaryBoard');
    summaryBoard.innerHTML = summaryBoardHtmlTemplate();
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

/**
 * Formats and displays the nearest task date on the web page.
 * 
 * This function retrieves a list of task dates, determines the date closest to the current date,
 * and updates the inner text of the element with the ID 'nearestDate' to show this closest date.
 */
function formattTaskDate() {
    let nearestDateContainer = document.getElementById('nearestDate');
    const today = new Date();
    taskDates.sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return Math.abs(dateA - today) - Math.abs(dateB - today);
    });
    nearestDateContainer.innerText = taskDates[0];
}