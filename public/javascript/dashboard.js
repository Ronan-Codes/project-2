async function newEntryHandler(event) {
    event.preventDefault();
    document.location.replace('/dashboard/newjournalentry');
}

document.querySelector('#new-entry-btn').addEventListener('click', newEntryHandler);
