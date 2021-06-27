var yesBtn = document.getElementById('yesBtn');

var formattedDatesArr = []
const reformatDate = (date) => {
    const dateString = date.toString().split('-')

    const day = dateString[2]
    const month = dateString[1]
    const year = dateString[0]

    return `${day} ${month} ${year}`;
}

function formatToday() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const startDate = [reformatDate(formatToday())]

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

async function selectDayEntry(date_input, js_date) {

    const response = await fetch(`/api/journalentries/${date_input}`, {
        method: 'GET'
    });

    if (!response.ok) {
        const month = js_date.toString().split(' ')[1];
        const date = js_date.toString().split(' ')[2];
        const year = js_date.toString().split(' ')[3];
        const dateforModal = `${month} ${date}, ${year}.`
        const reg_date = `${js_date.getFullYear()}-${js_date.getMonth() + 1}-${js_date.getDate()}`

        document.getElementById('modalDate').innerHTML = `${dateforModal}`
        myModal.toggle()

        yesBtn.addEventListener('click', function () {
            document.location.replace(`/dashboard/newjournalentry/${reg_date}`);
        })

        return
    } else {
        document.location.replace(`/dashboard/journalentry/${date_input}`);
    }
}
// Modal Script End

async function formattedDate(event) {

    const response = await fetch(`/api/journalentries/`, {
        method: 'GET',
    });

    if (response.ok) {
        response.json().then(function (journalEntries) {
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
                // for loop or map each journalEntries
                journalEntries.map(journalDate => {
                    const formattedDate = reformatDate(journalDate.reg_date);
                    formattedDatesArr.push(formattedDate)
                })
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
                    onSelect: function (reg_date, date_time, js_date) {
                        selectDayEntry(reg_date, js_date)
                    }
                })
            // }
        })
    } else {
        alert(response.statusText);
    }
}

formattedDate()
