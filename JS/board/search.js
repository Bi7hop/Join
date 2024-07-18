function searchTasks() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    let columns = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
    
    columns.forEach(columnId => {
        let columnContainer = document.getElementById(columnId);
        let tasks = columnContainer.getElementsByClassName('task');
        
        if (searchInput === '') {
            Array.from(tasks).forEach(task => {
                task.style.display = 'flex';
            });
            document.getElementById(`noTasks${columnId.charAt(0).toUpperCase() + columnId.slice(1)}`).style.display = 'none';
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
            
            let noTasksMessage = document.getElementById(`noTasks${columnId.charAt(0).toUpperCase() + columnId.slice(1)}`);
            if (tasksFound) {
                noTasksMessage.style.display = 'none';
            } else {
                noTasksMessage.style.display = 'flex';
            }
        }
    });
}