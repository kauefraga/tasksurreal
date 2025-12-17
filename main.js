const taskBarInput = document.getElementById('task-bar');
const tasks = getTasksFromLocalStorage();

mountTaskList(tasks);

function appendInTaskList(task, index) {
    const taskList = document.getElementById('task-list');

    const listItem = document.createElement('li');
    listItem.textContent = task;
    listItem.classList.add('task-item');

    listItem.id = `task-item-${index}`;

    let clickCounter = 0;

    listItem.addEventListener('click', () => {
        clickCounter += 1;
        setTimeout(() => {
            clickCounter = 0;
        }, 1000);

        if (clickCounter >= 2) {
            listItem.contentEditable = 'plaintext-only';
            listItem.focus();
        }
    });

    listItem.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            listItem.contentEditable = 'false';

            if (listItem.textContent.trim() === '') {
                removeTask(listItem.id);
                return;
            }

            updateTask(listItem.id, listItem.textContent);
        }
    });

    taskList.appendChild(listItem);
}

/** Adds to array, local storage and task list in UI */
function addTask(task) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    appendInTaskList(task, tasks.length - 1);
}

function popInTaskList(task) {
    const taskList = document.getElementById('task-list');

    taskList.childNodes.forEach(child => {
        if (child.textContent === task) {
            taskList.removeChild(child);
        }
    });
}

/** Removes the last inserted task from array, local storage and task list in UI */
function popTask() {
    const task = tasks.pop();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    popInTaskList(task);
}


/** Removes a task by its HTML id from array, local storage and task list in UI */
function removeTask(htmlId) {
    const id = Number(htmlId.split('-')[2]);

    const filteredTasks = tasks.filter((_, index) => index !== id);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));

    const taskList = document.getElementById('task-list');
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    mountTaskList(filteredTasks);
}

function updateTask(id, taskContent) {
    const index = Number(id.split('-')[2]);
    tasks[index] = taskContent;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskBarInput.addEventListener('keydown', (event) => {
    const task = String(event.target.value);

    if (event.key === 'Backspace' && task.length === 0) {
        popTask();
        return;
    }

    if (event.key !== 'Enter') {
        return;
    }

    if (task.length === 0) {
        taskBarInput.dataset.error = true;
        return;
    }

    const repeatWithDelay = (fn, repetitions, delayInMs) => {
        if (repetitions === 0) {
            return;
        }

        setTimeout(fn, delayInMs * repetitions);

        return repeatWithDelay(fn, repetitions - 1, delayInMs);
    };

    // BUSINESS RULE: user should not have more than 10 tasks
    if (tasks.length >= 10) {
        const hint = document.getElementById('hint');
        hint.style.visibility = 'visible';

        // I think that making this function async would improve the usability of it
        // As it is, you need to calculate that 3 times 1000 will result in 3 seconds to correctly set the next timeout to 5 seconds, just so it runs 2 seconds after these repetitions occur
        repeatWithDelay(() => {
            hint.textContent += '.';
        }, 3, 1000);

        setTimeout(() => {
            hint.style.visibility = 'hidden';
            hint.textContent = 'Você só pode ter 10 tarefas para fazer';
        }, 5000);

        // I wrote this first, then I thought I could write it better ^^
        // setTimeout(() => {
        //     hint.textContent += '.';
        //     setTimeout(() => {
        //         hint.textContent += '.';
        //         setTimeout(() => {
        //             hint.textContent += '.';
        //             setTimeout(() => {
        //                 hint.style.visibility = 'hidden';
        //             }, 2000);
        //         }, 1000);
        //     }, 1000);
        // }, 1000);

        return;
    }

    const tutorialTaskItem = document.getElementById('tutorial-task-item');
    if (tutorialTaskItem) {
        tutorialTaskItem.remove();
    }

    addTask(task);
    event.target.value = '';
});

taskBarInput.addEventListener('input', () => {
    if (taskBarInput.dataset.error) {
        taskBarInput.dataset.error = false;
    }
});

function mountTaskList(tasks) {
    const tutorialTaskItem = document.getElementById('tutorial-task-item');
    if (tutorialTaskItem && tasks.length > 0) {
        tutorialTaskItem.remove();
    }

    for (const [index, task] of tasks.entries()) {
        appendInTaskList(task, index);
    }
}

function getTasksFromLocalStorage() {
    if (!localStorage.getItem('tasks')) {
        return [];
    }

    return JSON.parse(localStorage.getItem('tasks'));
}