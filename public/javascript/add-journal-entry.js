var url_string = (window.location.href).toLowerCase();
var url = new URL(url_string);
var chosenDate = url.searchParams.get("reg_date");

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

    // May be useful in the future if calendar functionality is modified.
    // const reg_date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
    // const reg_date = chosenDate

    const response = await fetch('/api/journalentries', {
        method: 'POST',
        body: JSON.stringify({
            first_grateful_input,
            second_grateful_input,
            third_grateful_input,
            freewrite_input,
            mood_input,
            reg_date
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

document.querySelector('.journal-entry-form').addEventListener('submit', newEntryHandler);
