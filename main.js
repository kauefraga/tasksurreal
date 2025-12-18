import { createRemoveButtonElement, createTaskItem } from "./elements.js";
import { makeHintAppear } from "./utils.js";

const taskBarInput = document.getElementById('task-bar');
const tasks = getTasksFromLocalStorage();

mountTaskList(tasks);

function editTaskContent(event, taskContent, task) {
    if (event.key !== "Enter") return;
    const textContent = taskContent.textContent;

    if (textContent.trim() == "") {
        removeTask(task.id)
        return;
    }

    updateTask({
        id: task.id,
        content: taskContent.textContent,
    });
}

/**
 * After extracting element creation into separate files,
 * this function became more readable and easier to maintain.
 * This approach should be reused elsewhere to improve clarity
 * and better follow clean code practices.
 */
function appendInTaskList(task) {
    const taskList = document.getElementById('task-list');

    const { taskItem, taskContent } = createTaskItem(task);

    taskContent.addEventListener('keydown', (event) => editTaskContent(event, taskContent, task));
    taskItem.appendChild(taskContent);

    const removeButton = createRemoveButtonElement()
    removeButton.addEventListener("click", () => {
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

/**
 * Removes the last inserted task from array, local storage and task list in UI 
 * I'll put popinTaskList into this function, cause the project don't need this separation logic (well, since we're using just JavaScript, we dont need follow practices of very clean architectures. Just some practices of Clean Code, and refactor this function to pop in Task and in LocalStorage it's good for my eyes)
 * 
 */
function popTask() {
    const task = tasks.pop();
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskList = document.getElementById("task-list");
    taskList.removeChild(document.getElementById(task.id));
}

/** Removes a task by its id from array, local storage and task list in UI */
function removeTask(id) {
    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskList = document.getElementById('task-list');
    taskList.removeChild(document.getElementById(id));
}

function setDataSetError(taskLength) {
    if (taskLength === 0) {
        taskBarInput.dataset.error

        return false;
    }

    return true;
}

function updateTask(task) {
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

    if (event.key !== 'Enter') return;

    if (!setDataSetError(newTask.length)) return;
    if (!makeHintAppear(tasks)) return;

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