const taskBarInput = document.getElementById('task-bar');
const tasks = [];

function appendInTaskList(task) {
    const taskList = document.getElementById('task-list');

    const listItem = document.createElement('li');
    listItem.textContent = task;
    listItem.classList.add('task-item');

    const taskId = tasks.length - 1;
    listItem.id = `task-item-${taskId}`;

    taskList.appendChild(listItem);
}

/** Adds to array, local storage and task list in UI */
function addTask(task) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    appendInTaskList(task);
}

function popInTaskList(task) {
    const taskList = document.getElementById('task-list');

    taskList.childNodes.forEach(child => {
        if (child.textContent === task) {
            taskList.removeChild(child);
        }
    });
}

/** Removes the latest task from array, local storage and task list in UI */
function popTask() {
    const task = tasks.pop();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    popInTaskList(task);
}

taskBarInput.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        popTask();
        return;
    }

    if (event.key !== 'Enter') {
        return;
    }

    const task = String(event.target.value);

    // hint que ele não pode ter mais de 10 tarefas para fazer
    if (tasks.length >= 10) {
        return;
    }

    // highlight que ele precisa escrever, borda do input
    if (task.length === 0) {
        return;
    }

    if (tasks.length === 0) {
        const taskList = document.getElementById('task-list');
        taskList.childNodes.forEach(child => taskList.removeChild(child));
    }

    addTask(task);
    event.target.value = '';
});
