async function newEntryHandler(event) {
    event.preventDefault();

    const first_grateful_input = document.querySelector('#first-grateful-input').value;
    const second_grateful_input = document.querySelector('#second-grateful-input').value;
    const third_grateful_input = document.querySelector('#third-grateful-input').value;
    const freewrite_input = document.querySelector('#freewrite-input').value;
    const mood_input = document.querySelector("input[name='mood-input']:checked").value;


    // const reformatNewDate = () => {
    //     // const year = today.
    //     return `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
    // }
    const reg_date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`


    // user_id will be in the post-routes.js in router.post's session

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

    if(response.ok) {
        document.location.replace('/dashboard/home');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.journal-entry-form').addEventListener('submit', newEntryHandler);
