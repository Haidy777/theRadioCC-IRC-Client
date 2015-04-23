var runner = {
    start: function () {
        runner.run();
    },

    run: function () {
        var $refreshIcon = $('.refresh-icon');
        $refreshIcon.show();

        news.getNews();
        sendeplan.getSendeplan();

        setTimeout(function () {
            $refreshIcon.hide()
        }, 1000);

        setTimeout(runner.run, 60000);
    }
};