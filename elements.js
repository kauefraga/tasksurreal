/**
 * This file currently contains the creation of Remove Button and Task Item, but may contain any other element.
 * I've created this because it's more readable for someone that will read codebase
 */

function turnTaskContentEditable() {
    this.contentEditable = 'plaintext-only';
    this.focus();
}

function onTaskContentFocusOut() {
    this.removeAttribute('contenteditable');
}

export function createRemoveButtonElement() {
    const removeButton = document.createElement('button');
    removeButton.classList.add('task-remove-button');

    removeButton.type = 'button';
    removeButton.textContent = 'remover';

    return removeButton;
}

export function createTaskItem(task) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.id = task.id;

    const taskContent = document.createElement('p');
    taskContent.classList.add('task-content');
    taskContent.textContent = task.content;

    taskContent.addEventListener('dblclick', turnTaskContentEditable);
    taskContent.addEventListener('focusout', onTaskContentFocusOut);

    return { taskItem, taskContent };
}