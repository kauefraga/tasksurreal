import { setInitialImage, setInitialRank, setRankText } from './rank.js'
import { appendInTaskList, getTasksFromLocalStorage } from './task_utils.js';
import { configTaskBarForInputs } from './task_input.js';
const tasks = getTasksFromLocalStorage();

document.addEventListener("DOMContentLoaded", () => {
    mountTaskList(tasks);
    configTaskBarForInputs();
    setInitialRank();
    setRankText();
    setInitialImage();
})

function mountTaskList(tasks) {
    const tutorialTaskItem = document.getElementById('tutorial-task-item');
    if (tutorialTaskItem && tasks.length > 0) {
        tutorialTaskItem.remove();
    }

    for (const task of tasks) {
        appendInTaskList(task);
    }
}