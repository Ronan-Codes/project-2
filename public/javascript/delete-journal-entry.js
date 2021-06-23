async function deleteJournalHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/journalentries/${id}`, {
        method: 'DELETE',
    });

    if(response.ok) {
        document.location.replace('/dashboard/home');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#delete-btn').addEventListener('click', deleteJournalHandler);
