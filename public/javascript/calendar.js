// $(document).ready(function () {
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


async function formattedDate(event) {

    const response = await fetch(`/api/journalentries/`, {
        method: 'GET',
    });

    if (response.ok) {
        response.json().then(function (journalEntries) {
            if (journalEntries.length == 0) {
                $('#datepicker').Zebra_DatePicker({
                    show_select_today: "Today's Entry",
                    show_clear_date: false,
                    always_visible: $('.datepickerContainer'),
                    // disabled_dates: ['* * *'],
                    // enabled_dates: startDate,
                    onSelect: function (reg_date, date_time, js_date) {
                        // selectDayEntry(reg_date)
                        document.location.replace(`/dashboard/newjournalentry`);

                    }
                })
            } else {
                // for loop or map each journalEntries
                journalEntries.map(journalDate => {
                    const formattedDate = reformatDate(journalDate.reg_date);
                    formattedDatesArr.push(formattedDate)
                })
                // let formattedAndToday = formattedDatesArr.push(...startDate)
                // console.log(formattedDatesArr)

                $('#datepicker').Zebra_DatePicker({
                    show_select_today: "Today's Entry",
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
            }

        })
    } else {
        alert(response.statusText);
    }
}


formattedDate()


// const arrayContents = (array) => {
//     array.map(eachFormattedDate => {
//         console.log(eachFormattedDate)
//         return eachFormattedDate
//     })
// }
// arrayContents(formattedDatesArr)
// console.log(arrayContents(formattedDatesArr))

// assuming the controls you want to attach the plugin to
// have the "datepicker" class set
// const activateCalendate = () => {


//     $('#datepicker').Zebra_DatePicker({
//         always_visible: $('.datepickerContainer'),
//         // disabled_dates: ['25 6 2021'],
//         custom_classes: {
//             'myclass1':  formattedDatesArr
//         },
//         onSelect: function (reg_date, date_time, js_date) {

//             async function selectDayEntry() {

//                 const response = await fetch(`/api/journalentries/${reg_date}`, {
//                     method: 'GET'
//                 });

//                 if (response.ok) {
//                     document.location.replace(`/dashboard/journalentry/${reg_date}`);
//                 } else {
//                     document.location.replace(`/dashboard/newjournalentry`);
//                 }
//             }

//             selectDayEntry()

//         }
//     })
// }

// $('#datepicker').Zebra_DatePicker({
//     always_visible: $('.datepickerContainer'),
//     // disabled_dates: ['25 6 2021'],
//     custom_classes: {
//         'myclass1':  formattedDatesArr
//     },
//     onSelect: function (reg_date, date_time, js_date) {

//         async function selectDayEntry() {

//             const response = await fetch(`/api/journalentries/${reg_date}`, {
//                 method: 'GET'
//             });

//             if (response.ok) {
//                 document.location.replace(`/dashboard/journalentry/${reg_date}`);
//             } else {
//                 document.location.replace(`/dashboard/newjournalentry`);
//             }
//         }

//         selectDayEntry()

//     }
// })


// To get a reference to the instance of Zebra DatePicker attached to an element do:
// var datepicker = $('#datepicker').data('Zebra_DatePicker');
// datepicker.attr("data-zdp_always_visible", $('.datepickerContainer'))

// });
