/**
 * Searches and filters tasks based on user input.
 * Displays tasks that match the search query and hides those that don't.
 * If no tasks match the search query, shows a "no tasks" message.
 */
function searchTasks() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    ['toDo', 'inProgress', 'awaitFeedback', 'done'].forEach(columnId => {
        let tasks = Array.from(document.getElementById(columnId).getElementsByClassName('task'));
        let noTasksMessage = document.getElementById(`noTasks${columnId.charAt(0).toUpperCase() + columnId.slice(1)}`);
        let tasksFound = false;

        tasks.forEach(task => {
            let match = task.querySelector('.taskTitle').innerText.toLowerCase().includes(searchInput);
            task.style.display = searchInput === '' || match ? 'flex' : 'none';
            if (match) tasksFound = true;
        });

        noTasksMessage.style.display = tasksFound || searchInput === '' && tasks.length > 0 ? 'none' : 'flex';
    });
}
