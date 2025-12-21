const repeatWithDelay = (fn, repetitions, delayInMs) => {
    if (repetitions === 0) {
        return;
    }

    setTimeout(fn, delayInMs * repetitions);

    return repeatWithDelay(fn, repetitions - 1, delayInMs);
};

function makeMaximumTasksHintAppear(tasks) {
    if (tasks.length < 10) return false;

    const hint = document.getElementById('hint');
    hint.hidden = false;

    repeatWithDelay(() => {
        hint.textContent += '.';
    }, 3, 1000);

    setTimeout(() => {
        hint.hidden = true;
        hint.textContent = 'Você só pode ter 10 tarefas para fazer';
    }, 5000);

    return true;
}

export {
    makeMaximumTasksHintAppear,
};
