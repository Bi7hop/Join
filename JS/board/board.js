let tickets = [
    // 0
    {
        "id": 0,
        "taskType": 'toDo0',
        "taskTitel": 'Kochwelt Page & Recipe Recommender',
        "taskDescription": 'Build start page with recipe recommendation Build start page with recipe recommendation',
        "taskBar": 50,
        "taskSubtaskAmount": 1,
        "taskContacts": ["Emmanuel Mauer", "Marcel Bauer", "Anton Mayer"],
        "taskPrioImage": './img/board/prio_high.png',
        "taskPrioAlt": 'High',
        "taskStatus": 'toDo',
    },
    //1
    {
        "id": 1,
        "taskType": 'InProgress1',
        "taskTitel": 'HTML Base Template Creation',
        "taskDescription": '',
        "taskBar": 100,
        "taskSubtaskAmount": 2,
        "taskContacts": ["Anja Schulz", "David Eisenberg", "Eva Fischer"],
        "taskPrioImage": './img/board/prio_medium.png',
        "taskPrioAlt": 'Medium',
        "taskStatus": 'inProgress'
    },
    //2
    {
        "id": 2,
        "taskType": 'awaitFeedback2',
        "taskTitel": 'HTML Base Template Creation',
        "taskDescription": '',
        "taskBar": 100,
        "taskSubtaskAmount": 2,
        "taskContacts": ["Anja Schulz", "David Eisenberg", "Eva Fischer"],
        "taskPrioImage": './img/board/prio_medium.png',
        "taskPrioAlt": 'Medium',
        "taskStatus": 'awaitFeedback'
    },
    //3
    {
        "id": 3,
        "taskType": 'done3',
        "taskTitel": 'HTML Base Template Creation',
        "taskDescription": '',
        "taskBar": 100,
        "taskSubtaskAmount": 2,
        "taskContacts": ["Anja Schulz", "David Eisenberg", "Eva Fischer"],
        "taskPrioImage": './img/board/prio_medium.png',
        "taskPrioAlt": 'Medium',
        "taskStatus": 'done'
    },
];

let currentDraggedElement;

function formatContacts(contacts) {
    return contacts.map(contact => {
        let [firstName, lastName] = contact.split(' ');
        return `<div class="taskContact">${firstName[0]}${lastName[0]}</div>`;
    }).join('');
}

function renderTicketsToDo() {
    let userTicketColumnToDo = document.getElementById('toDo');
    userTicketColumnToDo.innerHTML = ``;
    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];
        const formattedContacts = formatContacts(ticket.taskContacts);
         if (ticket.taskStatus === 'toDo') {
            userTicketColumnToDo.innerHTML +=
                ticketTemplate(ticket, formattedContacts);
         }
    }
}

function renderTicketsInProgress() {
    let userTicketColumnInProgress = document.getElementById('inProgress');
    userTicketColumnInProgress.innerHTML = ``;
    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];
        const formattedContacts = formatContacts(ticket.taskContacts);
        if (ticket.taskStatus === 'inProgress') {
            userTicketColumnInProgress.innerHTML +=
                ticketTemplate(ticket, formattedContacts);
        }
    }
}

function renderTicketsAwaitFeedback() {
    let userTicketColumnAwaitFeedback = document.getElementById('awaitFeedback');
    userTicketColumnAwaitFeedback.innerHTML = ``;
    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];
        const formattedContacts = formatContacts(ticket.taskContacts);
        if (ticket.taskStatus === 'awaitFeedback') {
            userTicketColumnAwaitFeedback.innerHTML +=
                ticketTemplate(ticket, formattedContacts);
        }
    }
}

function renderTicketsDone() {
    let userTicketColumnDone = document.getElementById('done');
    userTicketColumnDone.innerHTML = ``;
    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];
        const formattedContacts = formatContacts(ticket.taskContacts);
        if (ticket.taskStatus === 'done') {
            userTicketColumnDone.innerHTML +=
                ticketTemplate(ticket, formattedContacts);
        }
    }
}

function loadTickets() {
    renderTicketsToDo();
    renderTicketsInProgress();
    renderTicketsAwaitFeedback();
    renderTicketsDone();
}

// DRAG AND DROP
function startDragging(id) {
    currentDraggedElement = id;
    document.getElementById(id).classList.add('dragging');
    for (let i = 0; i < 4; i++) {
        document.getElementById(`dragPosition${i}`).classList.add('dragPosition');
        document.getElementById(`dragPosition${i}`).classList.remove('dragAreaHighlight');
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(taskStatus) {
    tickets[currentDraggedElement]['taskStatus'] = taskStatus;
    loadTickets();
}

function endDragging(id) {
    currentDraggedElement = id;
    document.getElementById(id).classList.remove('dragging');
    for (let i = 0; i < 4; i++) {
        
    document.getElementById(`dragPosition${i}`).classList.remove('dragPosition');
}
}

function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}