var ical = require('ical'),
    dateFormat = 'YYYY-MM-DD',
    timeFormat = 'HH:mm';

var sendeplan = {
    getSendeplan: function () {
        var icalURL = 'http://theradio.cc/?feed=eo-events',
            $sendeplanContainer = $('#sendeplan-container'),
            $sendeplan = $('#sendeplan'),
            newHeight = $sendeplan.innerHeight() - $sendeplanContainer.position().top - 10;

        $sendeplanContainer.css({
            'height': newHeight,
            'max-height': newHeight
        });

        ical.fromURL(icalURL, {}, function (err, data) {
            $sendeplanContainer.html(sendeplan.prepareSendeplan(data));
        });
    },

    prepareSendeplan: function (items) {
        var preparedSendeplan = '',
            events = [];

        _.each(items, function (item) {
            var today = moment(),
                startTime = moment(item.start),
                endTime = moment(item.end);

            if (moment(today).isBefore(startTime)) {
                events.push({
                    title: item.summary,
                    startDate: startTime.format(dateFormat),
                    endDate: endTime.format(dateFormat),
                    startTime: startTime.format(timeFormat),
                    endTime: endTime.format(timeFormat)
                });
            }

            if (item.hasOwnProperty('rrule')) {
                var itemRRuleOptions = item.rrule.options,
                    adder = '';

                if (moment(itemRRuleOptions.until).isAfter(today)) {
                    switch (itemRRuleOptions.freq) {
                        case 1: //daily
                            adder = 'days';
                            break;
                        case 2: //weekly
                            adder = 'weeks';
                            break;
                        case 3: //monthly
                            adder = 'months';
                            break;
                        case 4: //yearly
                            adder = 'years';
                            break;
                        default:
                            break;
                    }

                    var current = startTime,
                        end;
                    for (var i = 1; current.isBefore(itemRRuleOptions.until); i++) {
                        current = moment(startTime).add(itemRRuleOptions.interval * i, adder);
                        end = moment(endTime).add(itemRRuleOptions.interval * i, adder);

                        if (current.isAfter(moment())) {
                            events.push({
                                title: item.summary,
                                startDate: current.format(dateFormat),
                                endDate: end.format(dateFormat),
                                startTime: current.format(timeFormat),
                                endTime: end.format(timeFormat)
                            });
                        }
                    }
                }
            }
        });

        events = _.sortBy(events, 'startDate');

        _.each(events, function (event) {
            preparedSendeplan += '<li class="list-group-item">' +
            '<b>' + event.title + '</b><br />' +
            moment(event.startDate + ' ' + event.startTime).format('DD.MM.YYYY HH:mm') +
            '</li>';
        });

        return preparedSendeplan;
    }
};