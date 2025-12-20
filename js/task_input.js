import { makeHintAppear } from './utils.js';
import { addTask, setDataSetError, getTasksFromLocalStorage } from './task_utils.js';

const taskBarInput = document.getElementById('task-bar');

// refactored by shirorsrs (discord)
export function configTaskBarForInputs() {
    taskBarInput.addEventListener('keydown', (event) => {
        const newTask = String(event.target.value);

        if (event.key !== 'Enter') return;

        if (setDataSetError(newTask.length)) return;
        if (makeHintAppear(getTasksFromLocalStorage())) return;

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

            taskBarInput.setAttribute('aria-invalid', 'false');
            document.getElementById('task-error').hidden = true;
        }
    });
}