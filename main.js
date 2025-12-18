const taskBarInput = document.getElementById('task-bar');
const tasks = getTasksFromLocalStorage();

mountTaskList(tasks);

function appendInTaskList(task) {
    const taskList = document.getElementById('task-list');

    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.id = task.id;

    const taskContent = document.createElement('p');
    taskContent.classList.add('task-content');
    taskContent.textContent = task.content;
    let clickCounter = 0;
    taskContent.addEventListener('click', () => {
        clickCounter += 1;
        setTimeout(() => {
            clickCounter = 0;
        }, 1000);

        if (clickCounter >= 2) {
            taskContent.contentEditable = 'plaintext-only';
            taskContent.focus();
        }
    });
    taskContent.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            taskContent.contentEditable = 'false';

            if (taskContent.textContent.trim() === '') {
                removeTask(task.id);
                return;
            }

            updateTask({
                id: task.id,
                content: taskContent.textContent,
            });
        }
    });
    taskItem.appendChild(taskContent);

    const removeButton = document.createElement('button');
    removeButton.classList.add('task-remove-button');
    removeButton.type = 'button';
    removeButton.textContent = 'remover';
    removeButton.addEventListener('click', () => {
        removeTask(task.id);
    });
    taskItem.appendChild(removeButton);

    taskList.appendChild(taskItem);
}

/** Adds to array, local storage and task list in UI */
function addTask(taskContent) {
    const task = {
        id: `task-${Math.floor(Math.random() * 1000)}`,
        content: taskContent,
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    appendInTaskList(task);
}

function popInTaskList(id) {
    const taskList = document.getElementById('task-list');
    taskList.removeChild(document.getElementById(id));
}

/** Removes the last inserted task from array, local storage and task list in UI */
function popTask() {
    const task = tasks.pop();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    popInTaskList(task.id);
}


/** Removes a task by its id from array, local storage and task list in UI */
function removeTask(id) {
    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskList = document.getElementById('task-list');
    taskList.removeChild(document.getElementById(id));
}

function updateTask(newTask) {
    const index = tasks.findIndex((task) => task.id === newTask.id);
    tasks[index] = {
        id: newTask.id,
        content: newTask.content,
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskBarInput.addEventListener('keydown', (event) => {
    const newTask = String(event.target.value);

    if (event.key === 'Backspace' && newTask.length === 0) {
        popTask();
        return;
    }

    if (event.key !== 'Enter') {
        return;
    }

    if (newTask.length === 0) {
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

    addTask(newTask);
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

    for (const task of tasks) {
        appendInTaskList(task);
    }
}

function getTasksFromLocalStorage() {
    if (!localStorage.getItem('tasks')) {
        return [];
    }

    return JSON.parse(localStorage.getItem('tasks'));
}