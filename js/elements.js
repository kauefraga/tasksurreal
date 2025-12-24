/*
 * This file currently contains the creation of Remove Button and Task Item, but may contain any other element.
 * I've created this because it's more readable for someone that will read codebase
 */

function createRemoveButtonElement(task) {
    const removeButton = document.createElement('button');
    removeButton.classList.add('task-remove-button');

    removeButton.type = 'button';
    removeButton.textContent = 'concluí';

    removeButton.setAttribute('aria-label', `Remover tarefa: ${task.content}`);

    return removeButton;
}

function createTaskItem(task) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.id = task.id;

    const taskContent = document.createElement('p');
    taskContent.classList.add('task-content');
    taskContent.textContent = task.content;
    taskContent.setAttribute('tabindex', '0');
    taskContent.setAttribute('aria-label', 'Editar tarefa');

    const taskInput = document.createElement('input');
    taskInput.classList.add('task-content');
    taskInput.type = 'text';
    taskInput.value = task.content;
    taskInput.setAttribute('maxlength', '150');

    return { taskItem, taskContent, taskInput };
}

export {
    createRemoveButtonElement,
    createTaskItem,
};