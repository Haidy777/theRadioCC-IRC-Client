var stream = {
    getCurrentPlayingInfo: function () {
        var infoURL = 'http://theradio.cc:12011';

        $.get(infoURL, stream.preparePlayingInfo);
    },

    preparePlayingInfo: function (data) {
        var $playing = $('#now-playing');
        $playing.html('<b>Jetzt:</b> ' + data);
    },

    initializePlayer: function () {
        var playerElement = document.getElementById('audio-player');
        audioPlayer = playerElement;
    },

    play: function () {
        audioPlayer.load();
        stream.updateVolume();
        audioPlayer.play();
    },

    stop: function () {
        audioPlayer.pause();
    },

    mute: function () {
        if (audioPlayer.volume == 0) {
            stream.updateVolume();
        } else {
            audioPlayer.volume = 0;
            $('#audio-player-volume').css({
                width: 0 + '%'
            });
        }
    },

    volumeUp: function () {
        if (audioPlayerVolume != 100) {
            audioPlayerVolume = audioPlayerVolume + 5;
        }

        stream.updateVolume();
    },

    volumeDown: function () {
        if (audioPlayerVolume != 0) {
            audioPlayerVolume = audioPlayerVolume - 5;
        }

        stream.updateVolume();
    },

    updateVolume: function () {
        audioPlayer.volume = audioPlayerVolume / 100;
        $('#audio-player-volume').css({
            width: audioPlayerVolume + '%'
        });
    }
};