async function newEntryHandler(event) {
    event.preventDefault();

    const first_grateful_input = document.querySelector('#first-grateful-input').value;
    const second_grateful_input = document.querySelector('#second-grateful-input').value;
    const third_grateful_input = document.querySelector('#third-grateful-input').value;
    const freewrite_input = document.querySelector('#freewrite-input').value;
    const mood_input = document.querySelector("input[name='mood-input']:checked").value;
    const reg_date = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const user_id = document.getElementById('userIdContainer').getAttribute('data-id')
    console.log(user_id)

    const response = await fetch(`/api/journalentries/${user_id}/${reg_date}`, {
        method: 'PUT',
        body: JSON.stringify({
            first_grateful_input,
            second_grateful_input,
            third_grateful_input,
            freewrite_input,
            mood_input,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/home');
    } else {
        alert(response.statusText);
    }
}

async function deleteJournalHandler(event) {
    event.preventDefault();
    const reg_date = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const user_id = document.getElementById('userIdContainer').getAttribute('data-id')
    console.log(user_id)

    const response = await fetch(`/api/journalentries/${user_id}/${reg_date}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard/home');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#delete-btn').addEventListener('click', deleteJournalHandler);

document.querySelector('.update-form').addEventListener('submit', newEntryHandler);
