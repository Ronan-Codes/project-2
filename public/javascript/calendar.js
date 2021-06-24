$(document).ready(function () {

    // assuming the controls you want to attach the plugin to
    // have the "datepicker" class set
    $('#datepicker').Zebra_DatePicker({
        always_visible: $('.datepickerContainer'),
        onSelect: function (one, two, three) {
            alert(one);

            document.location.replace(`/journal/${one}`);

        }
    })

    // To get a reference to the instance of Zebra DatePicker attached to an element do:
    // var datepicker = $('#datepicker').data('Zebra_DatePicker');
    // datepicker.attr("data-zdp_always_visible", $('.datepickerContainer'))

});
