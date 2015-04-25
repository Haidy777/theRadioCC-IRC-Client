var stream = {
    getCurrentPlayingInfo: function () {
        var infoURL = 'http://theradio.cc:12011';

        $.get(infoURL, stream.preparePlayingInfo);
    },

    preparePlayingInfo: function (data) {
        var $playing = $('#now-playing');
        $playing.html('<b>Jetzt:</b> ' + data);
    }
};