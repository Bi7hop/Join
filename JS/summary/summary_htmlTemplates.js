function summaryBoardHtmlTemplate() {
    return `
            
                <div class="headline-summary">
                    <div class="summary-title-container">
                        <h1 class="title">Join 248</h1>
                        <div class="seperator"><img src="./img/seperator.png" alt=""></div>
                        <p>Key Metrics at a Glance</p>
                        <div class="seperator-mobile"><img src="./img/mobile/separator_mobile.png" alt=""></div>
                    </div>
                </div>
                <div class="card-top-container-summary">
                    <a href="board.html" class="summary-card">
                        <div class="icon-container">
                            <div class="icons-container-summary">
                                <img class="summary-icons" src="./img/edit.png" alt="">
                            </div>
                            <div class="text-container">
                                <span class="number-container">${toDoTasks.length}</span>
                                <span>To-do</span>
                            </div>
                        </div>
                    </a>
                    <a href="board.html" class="summary-card">
                        <div class="icon-container">
                            <div class="icons-container-summary">
                                <img class="summary-icons" src="./img/ok.png" alt="">
                            </div>
                            <div class="text-container">
                                <span class="number-container">${doneTasks.length}</span>
                                <span>Done</span>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="card-middle-container-summary">
                    <a class="summary-card-middle" href="board.html">
                        <div class="icon-container">
                            <div class="card-icons-middle">
                                <img class="summary-icons" src="./img/Prio alta.png" alt="">
                            </div>
                            <div class="text-container">
                                <span class="number-container">${urgentTasks.length}</span>
                                <span>Urgent</span>
                            </div>
                        </div>
                        <div class="seperator-middle-card"><img src="./img/seperator_light.png" alt=""></div>
                        <div class="text-container-middle-card">
                            <span id="nearestDate" class="date-text"></span>
                            <span class="deadline-text">Upcoming Deadline</span>
                        </div>
                    </a>
                </div>
                <div class="card-bottom-container-summary">
                    <a class="summary-card-bottom" href="board.html">
                        <div>
                            <div class="text-container">
                                <span class="number-container">${allTasks.length}</span>
                                <span>Tasks in<br>Board</span>
                            </div>
                        </div>
                    </a>
                    <a class="summary-card-bottom" href="board.html">
                        <div>
                            <div class="text-container">
                                <span class="number-container">${inProgressTasks.length}</span>
                                <span>Tasks In<br>Progress</span>
                            </div>
                        </div>
                    </a>
                    <a class="summary-card-bottom" href="board.html">
                        <div>
                            <div class="text-container">
                                <span class="number-container">${awaitFeedbackTasks.length}</span>
                                <span>Awaiting<br>Feedback</span>
                            </div>
                        </div>
                    </a>
                </div>
            
    `
}