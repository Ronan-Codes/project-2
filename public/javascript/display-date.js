const reg_date = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];
const year = reg_date.split("-")[0]
const month = reg_date.split("-")[1]
const day = reg_date.split("-")[2]

function displayDate() {
    const displayDate = moment([year, month-1, day]).format('MMMM Do YYYY')
    console.log(displayDate);
    document.getElementById('entryDateContainer').innerHTML = `${displayDate}`
}
displayDate()
