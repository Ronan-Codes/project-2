// Used by dashboard.handlebars

// id manually passed as if similar to props
const id = document.getElementById('userIdContainer').getAttribute('data-id')

var yesBtn = document.getElementById('yesBtn');

var formattedDatesArr = []
const reformatDate = (date) => {
    const dateString = date.toString().split('-')

    const day = dateString[2]
    const month = dateString[1]
    const year = dateString[0]

    return `${day} ${month} ${year}`;
}

function formatToday(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

// utilizes the two functions above. Creates a new date for current day that is reformatted by formatToday(), then reformatted again by reformatDate()
    // Only purpose of reformatting of date, is to be able to compare it date formatting of "zebra_datepicker"
const startDate = [reformatDate(formatToday(new Date))]

// Determines if the calendar button says Today's Entry or New Entry
    // todayOrNew utilized in #datepicker function at bottom of page. Basically customizes text of "today button" through "show_select_today: todayOrNew(formattedDatesArr)""
function todayOrNew(array) {
    if (array.includes(...startDate)) {
        return "Today's Entry"
    }

    else if (!formattedDatesArr.includes(...startDate)) {
        return "New Entry"
    }
}

// Modal Script
var myModal = new bootstrap.Modal(document.getElementById('chosenDateModal'), {
    keyboard: false
})

var arraysMatch = function (arr1, arr2) {
    // Check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;

    // Check if all items exist and are in the same order
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }

    return true;

};

async function selectDayEntry(date_input, yearFirst, js_date) {
    const month = js_date.toString().split(' ')[1];
    const date = js_date.toString().split(' ')[2];
    const year = js_date.toString().split(' ')[3];
    const dateforModal = `${month} ${date}, ${year}?`

    const clickedDate = [reformatDate(formatToday(js_date))]
    const today = new Date();
    const todayDate = [reformatDate(formatToday(today))]

    arraysMatch(clickedDate, todayDate)

    // Checks if clicked date is same as user's current day.
    if (arraysMatch(clickedDate, todayDate)) {
        // Checks if there is journal entry for "today"
        const response = await fetch(`/api/journalentries/${id}/${yearFirst}`, {
            method: 'GET'
        });

        // if there is, render journalentry.handlebars through dashboard-routes.js
        if (response.ok) {
            document.location.replace(`/dashboard/journalentry/${id}/${yearFirst}`);
        } else {
            document.location.replace(`/dashboard/newjournalentry/${yearFirst}`);
        }
        // else render newjournalentry.handlebars through dashboard-routes.js

    // Else if clicked date is not "today" (Past only, since future is restricted), check if that day has journal entry again (same as above)
    } else {

        // Checks if there is journal entry for "past date"
        const response = await fetch(`/api/journalentries/${id}/${yearFirst}`, {
            method: 'GET'
        });

        // if there is no journal entry in the selected date (not current day), toggle modal asking if user wants to create a journal entry 
        if (!response.ok) {
            document.getElementById('modalDate').innerHTML = `${dateforModal}`
            myModal.toggle()

            // clicking Yes renders newjournalentry.handlebars with journal entry data specific for the clicked date
            yesBtn.addEventListener('click', function () {
                document.location.replace(`/dashboard/newjournalentry/${yearFirst}`);
            })

            return
        } else {
            // else if there is entry on selected past date (not current day), render journalentry.handlebars with journal entry for selected date
            document.location.replace(`/dashboard/journalentry/${id}/${yearFirst}`);
        }
    }
}
// Modal Script End

async function formattedDate(event) {
    // Get specific user data with id, stated at top of this file
    const response = await fetch(`/api/users/${id}`, {
        method: 'GET'
    });

    if (response.ok) {
        // if there are journal entries, use "".json().then" to utilize fetched data
        response.json().then(function (user) {
            
                journal_entries = user.journalentries

                // for each journal entry, reformat date and push to formattedDatesArr
                journal_entries.map(journalEntry => {
                    const formattedDate = reformatDate(journalEntry.reg_date);
                    formattedDatesArr.push(formattedDate)
                })

                // Zebra Datepicker specific functions: "https://github.com/stefangabos/Zebra_Datepicker"
                $('#datepicker').Zebra_DatePicker({
                    // todayOrNew() customizes today button to render either Today's Entry or New Entry
                    show_select_today: todayOrNew(formattedDatesArr),
                    // disables Clear button
                    show_clear_date: false,
                    // calendar is always visible
                    always_visible: $('.datepickerContainer'),

                    // disabled_dates: ['* * *'],
                    // enabled_dates: formattedDatesArr,

                    custom_classes: {
                        'myclass1': formattedDatesArr
                    },
                    
                    // On selection of a date, run selectDayEntry(). 
                        // Summary: Checks if clicked date is "today" or "past". For each option, fetch user's journal entry. 
                            // If available, render journalentry.handlebars. Else render newjournalentry.handlebars. Routes from dashboard-routes
                    onSelect: function (reg_date, yearFirst, js_date) {
                        selectDayEntry(reg_date, yearFirst, js_date)
                    }
                })
            // }
        })
    } else {
        alert(response.statusText);
    }
}

formattedDate()
