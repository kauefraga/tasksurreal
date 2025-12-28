import { makeMaximumTasksHintAppear } from './utils.js';
import { addTask, setDataSetError, getTasksFromLocalStorage } from './task-utils.js';

// FUN IDEA: instead of well-defined placeholders, make a list of verbs, another of nouns and a function to mix two of them
// Hey, you! Send a pull request adding more placeholders, stuff you do daily or occasionally. In Brazilian Portuguese.
const placeholders = [
    'Escovar os dentes, varrer a casa...',
    'Tomar água',
    'Tomar muito água',
    'Terminar aquele anime',
    'Reassistir àquela série',
    'Lavar a louça',
    'Escutar o album novo...',
    'Estudar TypeScript',
    'Estudar C',
    'Preparar a janta',
    'Assar um bolo de chocolate',
    'Ler o livro',
    'Desenhar em perspectiva',
    'Estudar filosofia contemporânea',
    'Tocar a grama',
    'Organizar tarefas da semana...',
    'Aprender a tocar aquela música',
    'Não fazer nada',
    'Dormir a tarde inteira',
    'Começar aquele projeto',
];

function configTaskBarForInputs() {
    const taskBarInput = document.getElementById('task-bar');

    const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];
    taskBarInput.setAttribute('placeholder', randomPlaceholder);

    taskBarInput.addEventListener('keydown', (event) => {
        const newTask = String(event.target.value);

        if (event.key !== 'Enter') return;

        if (setDataSetError(newTask.length)) return;
        if (makeMaximumTasksHintAppear(getTasksFromLocalStorage())) return;

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

export {
    configTaskBarForInputs,
};