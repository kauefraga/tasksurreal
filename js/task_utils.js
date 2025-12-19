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

function editTaskContent(event, taskContent, task) {
    if (event.key !== 'Enter') return;

    const textContent = taskContent.textContent;
    if (textContent.trim() == '') {
        removeTask(task.id);
        return;
    }

    updateTask({
        id: task.id,
        content: taskContent.textContent,
    });
}

function appendInTaskList(task) {
    const taskList = document.getElementById('task-list');

    const { taskItem, taskContent } = createTaskItem(task);

    taskContent.addEventListener('keydown', (event) => editTaskContent(event, taskContent, task));
    taskItem.appendChild(taskContent);

    const removeButton = createRemoveButtonElement();
    removeButton.addEventListener('click', () => {
        removeTask(task.id);
        updateRank(1)
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
}

function popTask() {
    const task = tasks.pop();
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskList = document.getElementById('task-list');
    taskList.removeChild(document.getElementById(task.id));
}

function removeTask(id) {
    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskList = document.getElementById('task-list');
    taskList.removeChild(document.getElementById(id));
}

function setDataSetError(taskLength) {
    if (taskLength === 0) {
        taskBarInput.dataset.error;

        return false;
    }

    return true;
}

function updateTask(newTask) {
    const index = tasks.findIndex((task) => task.id === newTask.id);
    tasks[index] = {
        id: newTask.id,
        content: newTask.content,
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export {appendInTaskList, addTask, popTask, removeTask, updateTask, setDataSetError, getTasksFromLocalStorage}