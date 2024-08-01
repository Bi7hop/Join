// Beispiel: Aufruf der Funktion nach dem Laden der Daten
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

function renderSummaryBoard() {
    let summaryBoard = document.getElementById('summaryBoard');
    firebaseData.forEach(task => {
        Object.keys(task.dataExtracted).forEach(key => {
            const taskData = task.dataExtracted[key];
            if (taskData.taskStatus) {
                if (taskData.taskStatus == "toDo") {
                    toDoTasks.push(taskData.taskStatus)
                    allTasks.push(taskData.taskStatus)
                }
                if (taskData.taskStatus == "inProgress") {
                    inProgressTasks.push(taskData.taskStatus)
                    allTasks.push(taskData.taskStatus)
                }
                if (taskData.taskStatus == "awaitFeedback") {
                    awaitFeedbackTasks.push(taskData.taskStatus)
                    allTasks.push(taskData.taskStatus)
                }
                if (taskData.taskStatus == "done") {
                    doneTasks.push(taskData.taskStatus)
                    allTasks.push(taskData.taskStatus)
                }
                if (taskData.taskPrioAlt == "urgent") {
                    urgentTasks.push('taskData.taskPrioAlt');
                }
                if (taskData.taskDate) {
                    taskDates.push(taskData.taskDate);
                }
                summaryBoard.innerHTML = summaryBoardHtmlTemplate();
            }
        })
    })
    formattTaskDate();
}

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