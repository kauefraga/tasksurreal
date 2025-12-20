import { createRemoveButtonElement, createTaskItem } from './elements.js';
import { updateRank } from './rank.js';

const taskBarInput = document.getElementById('task-bar');

function getTasksFromLocalStorage() {
    if (!localStorage.getItem('tasks')) {
        return [];
    }

    return JSON.parse(localStorage.getItem('tasks'));
}
const tasks = getTasksFromLocalStorage();

function updateTask(newTask) {
    const index = tasks.findIndex((task) => task.id === newTask.id);
    tasks[index] = {
        id: newTask.id,
        content: newTask.content,
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(event, taskContent, taskInput, task) {
    if (event.key !== 'Enter') return;

    const content = taskInput.value;
    if (content.trim() == '') {
        removeTask(task.id);
        return;
    }

    updateTask({
        id: task.id,
        content,
    });

    taskContent.textContent = content;
    taskInput.replaceWith(taskContent);
    taskContent.focus();

    const taskFeedback = document.getElementById('task-feedback');
    taskFeedback.textContent = 'Tarefa editada com sucesso.';
}

function appendInTaskList(task) {
    const taskList = document.getElementById('task-list');

    const { taskItem, taskContent, taskInput } = createTaskItem(task);

    taskInput.addEventListener('keydown', (event) => editTask(event, taskContent, taskInput, task));

    taskContent.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === 'Space') {
            taskContent.replaceWith(taskInput);
            taskInput.focus();
        }
    });
    taskContent.addEventListener('dblclick', () => {
        taskContent.replaceWith(taskInput);
        taskInput.focus();
    });

    taskItem.appendChild(taskContent);

    const removeButton = createRemoveButtonElement(task);
    removeButton.addEventListener('click', () => {
        removeTask(task.id);
        updateRank(1);
    });

    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);
}

function addTask(taskContent) {
    const task = {
        id: `task-${Math.floor(Math.random() * 1000)}`,
        content: taskContent,
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    appendInTaskList(task);

    const taskFeedback = document.getElementById('task-feedback');
    taskFeedback.textContent = 'Tarefa adicionada com sucesso.';
}

function removeTask(id) {
    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskList = document.getElementById('task-list');
    taskList.removeChild(document.getElementById(id));

    const taskFeedback = document.getElementById('task-feedback');
    taskFeedback.textContent = 'Tarefa removida com sucesso.';
}

function setDataSetError(taskLength) {
    if (taskLength === 0) {
        taskBarInput.dataset.error = true;

        taskBarInput.setAttribute('aria-invalid', 'true');
        taskBarInput.setAttribute('aria-describedby', 'task-error');
        document.getElementById('task-error').hidden = false;

        return true;
    }

    return false;
}

export {
    appendInTaskList,
    addTask,
    removeTask,
    updateTask,
    setDataSetError,
    getTasksFromLocalStorage,
};