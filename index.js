var parseRSS = require('parse-rss'),
    moment = require('moment');

var audioPlayer = null,
    audioPlayerVolume = 50;

$(document).ready(function () {
    var elemente = ['#chat', '#sidebar', '.custom-container'],
        sidebarElemente = ['#sendeplan', '#news'],
        $sidebar = $('#sidebar'),
        $window = $(window);

    _.each(elemente, function (element) {
        var $element = $(element),
            newHeight = $window.innerHeight() - $element.position().top - 20;

        $element.css({
            'height': newHeight,
            'maxHeight': newHeight
        });
    });

    _.each(sidebarElemente, function (element) {
        var $element = $(element),
            newHeight = $sidebar.innerHeight() / 2 - 10;

        $element.css({
            'height': newHeight,
            'maxHeight': newHeight
        });
    });

    stream.initializePlayer();

    runner.start();
});