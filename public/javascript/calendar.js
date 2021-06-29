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

const startDate = [reformatDate(formatToday(new Date))]

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
    // const reg_date = `${js_date.getFullYear()}-${js_date.getMonth() + 1}-${js_date.getDate()}`

    const clickedDate = [reformatDate(formatToday(js_date))]
    const today = new Date();
    const todayDate = [reformatDate(formatToday(today))]
    // alert(clickedDate)
    // alert(todayDate)

    arraysMatch(clickedDate, todayDate)
    // alert(date_input)

    if (arraysMatch(clickedDate, todayDate)) {
        // alert(clickedDate)
        // alert(todayDate)
        // const response = await fetch(`/api/users/${id}`, {
        //     method: 'GET'
        // });

        // if (response.ok) {
        //     response.json().then(function (user) {
        //     journal_entries = user.journalentries

        //     document.location.replace(`/dashboard/journalentry/${id}`);
        //     })
        // }
        const response = await fetch(`/api/journalentries/${id}/${yearFirst}`, {
            method: 'GET'
        });

        if (response.ok) {
            document.location.replace(`/dashboard/journalentry/${id}/${yearFirst}`);
        } else {
            document.location.replace(`/dashboard/newjournalentry/${yearFirst}`);
        }

    } else {
        const response = await fetch(`/api/journalentries/${id}/${yearFirst}`, {
            method: 'GET'
        });

        if (!response.ok) {
            document.getElementById('modalDate').innerHTML = `${dateforModal}`
            myModal.toggle()

            yesBtn.addEventListener('click', function () {
                document.location.replace(`/dashboard/newjournalentry/${yearFirst}`);
            })

            return
        } else {
            document.location.replace(`/dashboard/journalentry/${id}/${yearFirst}`);
        }
    }

    // const response = await fetch(`/api/journalentries/${date_input}`, {
    //     method: 'GET'
    // });

    // if (!response.ok) {
    //     document.getElementById('modalDate').innerHTML = `${dateforModal}`
    //     myModal.toggle()

    //     yesBtn.addEventListener('click', function () {
    //         document.location.replace(`/dashboard/newjournalentry/${reg_date}`);
    //     })

    //     return
    // } else {
    //     document.location.replace(`/dashboard/journalentry/${date_input}`);
    // }
}
// Modal Script End

async function formattedDate(event) {
    const response = await fetch(`/api/users/${id}`, {
        method: 'GET'
    });

    if (response.ok) {
        response.json().then(function (user) {
            // Keep comments for now, in case calendar functionality is reverted
            // if (journalEntries.length == 0) {
            //     $('#datepicker').Zebra_DatePicker({
            //         show_select_today: "Today's Entry",
            //         show_clear_date: false,
            //         always_visible: $('.datepickerContainer'),
            //         // disabled_dates: ['* * *'],
            //         // enabled_dates: startDate,
            //         onSelect: function (reg_date, date_time, js_date) {
            //             // selectDayEntry(reg_date)
            //             document.location.replace(`/dashboard/newjournalentry`);

            //         }
            //     })
            // } else {
                // console.log(req.session.user_id)
                // for loop or map each journalEntries


                journal_entries = user.journalentries

                journal_entries.map(journalEntry => {
                    const formattedDate = reformatDate(journalEntry.reg_date);
                    formattedDatesArr.push(formattedDate)
                })
                // console.log(formattedDatesArr[0], "for modal")

                // let formattedAndToday = formattedDatesArr.push(...startDate)

                $('#datepicker').Zebra_DatePicker({
                    show_select_today: todayOrNew(formattedDatesArr),
                    show_clear_date: false,
                    always_visible: $('.datepickerContainer'),
                    // disabled_dates: ['* * *'],
                    // enabled_dates: formattedDatesArr,
                    custom_classes: {
                        'myclass1': formattedDatesArr
                    },
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
