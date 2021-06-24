$(document).ready(function () {

    // assuming the controls you want to attach the plugin to
    // have the "datepicker" class set
    $('#datepicker').Zebra_DatePicker({
        always_visible: $('.datepickerContainer'),
        onSelect: function (reg_date, date_time, js_date) {

            async function deleteFormHandler() {

                const response = await fetch(`/api/journalentries/${reg_date}`, {
                    method: 'GET'
                });

                if (response.ok) {
                    document.location.replace(`/dashboard/journalentry/${reg_date}`);
                } else {
                    document.location.replace(`/dashboard/newjournalentry`);
                }
            }

            deleteFormHandler()

        }
    })

    // To get a reference to the instance of Zebra DatePicker attached to an element do:
    // var datepicker = $('#datepicker').data('Zebra_DatePicker');
    // datepicker.attr("data-zdp_always_visible", $('.datepickerContainer'))

});
