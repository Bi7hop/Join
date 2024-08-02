function searchTasks() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    let columns = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
    
    columns.forEach(columnId => {
        let columnContainer = document.getElementById(columnId);
        let tasks = columnContainer.getElementsByClassName('task');
        let noTasksMessage = document.getElementById(`noTasks${columnId.charAt(0).toUpperCase() + columnId.slice(1)}`);

        if (searchInput === '') {
            let anyTaskVisible = false;

            Array.from(tasks).forEach(task => {
                task.style.display = 'flex';
                anyTaskVisible = true;
            });

            if (anyTaskVisible) {
                noTasksMessage.style.display = 'none';
            } else {
                noTasksMessage.style.display = 'flex';
            }
        } else {
            let tasksFound = false;

            Array.from(tasks).forEach(task => {
                let taskTitle = task.querySelector('.taskTitle').innerText.toLowerCase();
                if (taskTitle.includes(searchInput)) {
                    task.style.display = 'flex';
                    tasksFound = true;
                } else {
                    task.style.display = 'none';
                }
            });

            if (tasksFound) {
                noTasksMessage.style.display = 'none';
            } else {
                noTasksMessage.style.display = 'flex';
            }
        }
    });
}
