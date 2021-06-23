async function backBtnHandler(event) {
    event.preventDefault();
    document.location.replace('/dashboard/home');
}

document.querySelector('#back-btn').addEventListener('click', backBtnHandler);
