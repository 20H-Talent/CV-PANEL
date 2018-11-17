//generalConstructor.construct("calendar");


function Calendar() {
    this.construct = function(container) {
        $.get("../../html/calendar.html", function(htmlSkeleton) {
            container.empty().append(htmlSkeleton);
            var themonth = 1;
            renderCal(themonth);
            $('.minusmonth').click(function() {
                themonth += -1;
                renderCal(themonth);
            });
            $('.addmonth').click(function() {
                themonth += 1;
                renderCal(themonth);
            });

            function renderCal(themonth) {
                // Return today's date and time
                var currentTime = new Date()
                var month = currentTime.getMonth() + 1
                    // returns the day of the month (from 1 to 31)
                var day = currentTime.getDate()
                    // returns the year (four digits)
                var year = currentTime.getFullYear()
                $('.calendar li').remove();
                $('.calendar ul').append('<li>Mo</li><li>Tu</li><li>We</li><li>Th</li><li>Fr</li><li>Sa</li> <li>Su</li>');
                var d = new Date(),
                    currentYear = d.getFullYear(),
                    day = d.getDate(),
                    currentMonth = d.getMonth() + themonth, // get this month
                    days = numDays(currentMonth, d.getFullYear()), // get number of days in the month
                    fDay = firstDay(currentMonth, d.getFullYear()) - 1, // find what day of the week the 1st lands on
                    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // month names
                $('.calendar p.monthname').text(months[currentMonth - 1]); // add month name to calendar
                // $('.calendar p.yearname').text(currentYear); // add month name to calendar
                $('.calendar p.today').text((day + "/" + month + "/" + currentYear)); // add month name to calendar
                for (var i = 0; i < fDay - 1; i++) { // place the first day of the month in the correct position
                    $('<li>&nbsp;</li>').appendTo('.calendar ul');
                }
                for (var i = 1; i <= days; i++) { // write out the days
                    $('<li>' + i + '</li>').appendTo('.calendar ul');
                }

                function firstDay(month, year) {
                    return new Date(year, month, 1).getDay();
                }

                function numDays(month, year) {
                    return new Date(year, month, 0).getDate();
                }
                var clicker = 0;
                var min = 0;
                var max = 0;
                $('.calendar li').click(function() { // toggle selected dates
                    if (clicker == 0) {
                        clicker = 1;
                        $('.calendar li').removeClass('red');
                        $(this).addClass('red');
                        min = $(this).text();
                    } else {
                        clicker = 0;
                        $(this).addClass('red');
                        $('.calendar li.red').each(function() {
                            max = $(this).text();
                        });
                        for (i = parseInt(min); i < parseInt(max); i++) {
                            $('.calendar li:nth-of-type(' + (i + 7 + fDay - 1) + ')').addClass('red');
                        }
                    }
                });
            }
        }).fail(function(err) {
            throw new Error(err);
        });
    }
}
let calendar = new Calendar();