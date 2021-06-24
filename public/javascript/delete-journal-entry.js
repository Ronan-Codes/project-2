async function deleteJournalHandler(event) {
    event.preventDefault();

    const reg_date = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/journalentries/${reg_date}`, {
        method: 'DELETE',
    });

    if(response.ok) {
        document.location.replace('/dashboard/home');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#delete-btn').addEventListener('click', deleteJournalHandler);
