// Christmas module! Happy Xmas for you. 
// Yes, I could make this completely static in HTML and then just remove it when it's no longer Christmas, but that's boring

const today = new Date();

const isDecember = today.getMonth() === 11;
const isNextToChristmasDate = today.getDate() >= 15 && today.getDate() <= 25;

function loadChristmasCss() {
    const documentHead = document.querySelector('head');
    const christmasCss = document.createElement('link');
    christmasCss.setAttribute('rel', 'stylesheet');
    christmasCss.setAttribute('href', 'christmas.css');
    documentHead.appendChild(christmasCss);
}

function createSnowflakes(content, count) {
    const container = document.createElement('div');
    container.setAttribute('aria-hidden', 'true');

    for (let i = 0; i < count; i++) {
        const snowflakeContainer = document.createElement('div');
        snowflakeContainer.classList.add('snowflake');

        const snowflake = document.createElement('div');
        snowflake.classList.add('inner');
        snowflake.textContent = content;

        snowflakeContainer.appendChild(snowflake);
        container.appendChild(snowflakeContainer);
    }

    document.body.appendChild(container);
}

if (isDecember && isNextToChristmasDate) {
    loadChristmasCss();
    createSnowflakes('❅', 40);
}
