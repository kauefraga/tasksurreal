import { setInitialImage, setInitialRank, setRankText } from './rank.js'
import { appendInTaskList, getTasksFromLocalStorage } from './task-utils.js';
import { configTaskBarForInputs } from './task-input.js';

const tasks = getTasksFromLocalStorage();

function mountTaskList(tasks) {
    const tutorialTaskItem = document.getElementById('tutorial-task-item');
    if (tutorialTaskItem && tasks.length > 0) {
        tutorialTaskItem.remove();
    }

    for (const task of tasks) {
        appendInTaskList(task);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mountTaskList(tasks);
    configTaskBarForInputs();
    setInitialRank();
    setRankText();
    setInitialImage();
});
