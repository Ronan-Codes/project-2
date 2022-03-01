// Displays the journal entry DATE at tope of journalentry.handlebar by taking date from url. 

// reg_date = 2022-02-28 (example from url). 
const reg_date = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];

// Takes year, month, & day from reg_date to reformat and display in #entryDateContainer. 
const year = reg_date.split("-")[0]
const month = reg_date.split("-")[1]
const day = reg_date.split("-")[2]

function displayDate() {
    const displayDate = moment([year, month-1, day]).format('MMMM Do YYYY')
    document.getElementById('entryDateContainer').innerHTML = `${displayDate}`
}
displayDate()
