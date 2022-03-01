// function for Back btn @ journalentry.handlebars
async function backBtnHandler(event) {
    event.preventDefault();
    document.location.replace('/dashboard/home');
}

document.querySelector('#back-btn').addEventListener('click', backBtnHandler);
