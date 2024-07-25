function openUserStory() {
    let overlay = document.getElementById('overlay');
    let boardBodyContainer = document.querySelector('.boardBodyContainer');
    boardBodyContainer.style.overflow = "hidden";
    overlay.classList.add("overlay");


    const container = document.getElementById('userStoryWindow');


    firebaseData.forEach(task => {
        Object.keys(task.dataExtracted).forEach(key => {
            const taskData = task.dataExtracted[key];
            console.log(taskData.title);
            const formattedContacts = formatContacts(taskData.taskContacts);
            const taskHtml = userStoryHtmlTemplate(taskData, formattedContacts)
            const taskContainer = document.createElement('div');
            taskContainer.innerHTML = taskHtml;
            container.appendChild(taskContainer.firstElementChild);
        })
    })
}

// // RenderTickets Funktion für die AddTask funktion verändert
// // Updated renderTickets function
// function renderTickets(columnId, status) {
//     // Container im HTML, wo die Titel angezeigt werden sollen
//     const container = document.getElementById(columnId);
//     // Überprüfen, ob der Container vorhanden ist
//     if (!container) {
//         console.error(`Element mit id ${columnId} not found.`);
//         return;
//     }
//     // Clear the container before adding new content
//     container.innerHTML = '';
//     // Iteriere durch das firebaseData Array und generiere HTML für jeden Task-Titel
//     firebaseData.forEach(task => {
//         // Annahme: firebaseData hat die Struktur wie { id: 'key', dataExtracted: { key1: { title: 'Task Title 1' }, key2: { title: 'Task Title 2' }, ... } }
//         Object.keys(task.dataExtracted).forEach(key => {
//             const taskData = task.dataExtracted[key];
//             if (taskData.taskStatus === status) {
//                 const formattedContacts = formatContacts(taskData.taskContacts);
//                 const taskHtml = ticketTemplate(taskData, formattedContacts);
//                 // Create a container for each task
//                 const taskContainer = document.createElement('div');
//                 taskContainer.innerHTML = taskHtml;
//                 // Füge das erstellte <div> Element dem Container hinzu
//                 container.appendChild(taskContainer.firstElementChild);
//             }
//         });
//     });
// }



























function closeUserStory() {
    let userStoryContainer = document.getElementById('userStoryWindow');
    let boardBodyContainer = document.querySelector('.boardBodyContainer');
    let overlay = document.getElementById('overlay');

    userStoryContainer.style.animation = 'fly-out 0.1s forwards';
    overlay.style.animation = 'fade-out 0.2s forwards';
    setTimeout(() => {
        userStoryContainer.innerHTML = ``;
        userStoryContainer.style.animation = ``;
        boardBodyContainer.style.overflow = "";
        overlay.style.animation = '';
        overlay.classList.remove("overlay");
    }, 200);
}

function openUserStoryEdit() {
    let userStoryContainer = document.getElementById('userStoryWindow');
    if (firebaseData.length > 0) {
        userStoryContainer.innerHTML = userStoryEditHtmlTemplate(firebaseData);
    }
    renderDropdownList();
    subTasksHoverEffect();
}

function closeUserStoryEdit() {
    let userStoryContainer = document.getElementById('userStoryWindow');
    let boardBodyContainer = document.querySelector('.boardBodyContainer');
    let overlay = document.getElementById('overlay');

    userStoryContainer.style.animation = 'fly-out 0.1s forwards';
    overlay.style.animation = 'fade-out 0.2s forwards';
    setTimeout(() => {
        userStoryContainer.innerHTML = ``;
        userStoryContainer.style.animation = ``;
        boardBodyContainer.style.overflow = "";
        overlay.style.animation = '';
        overlay.classList.remove("overlay");
    }, 200);
}

