var parseRSS = require('parse-rss'),
    moment = require('moment');

$(document).ready(function () {
    var elemente = ['#sendeplan', '#chat', '#news', '.custom-container'],
        $window = $(window);

    _.each(elemente, function (element) {
        var $element = $(element),
            newHeight = $window.innerHeight() - $element.position().top - 20;

        $element.css({
            'height': newHeight,
            'maxHeight': newHeight
        });
    });

    runner.start();
});

var runner = {
    start: function () {
        runner.run();
    },

    run: function () {
        console.log('Runner runs :)');
        news.getNews();

        //setTimeout(runner.run, 5000);
    }
};

var news = {
    getNews: function () {
        var newsURL = 'http://theradio.cc/feed/',
            $news = $('#news'),
            $newsContainer = $('#news-container'),
            newHeight = $news.innerHeight() - $newsContainer.position().top - 10;

        $newsContainer.css({
            'height': newHeight,
            'max-height': newHeight
        });

        parseRSS(newsURL, function (err, rss) {
            var temp = news.prepareNews(rss);
            $newsContainer.html(temp);
        });
    },

    prepareNews: function (news) {
        var preparedNews = '';

        _.each(news, function (entry) {
            preparedNews += '<a href="' + entry.link + '" target="_blank">' +
            '<li class="list-group-item">' +
            '<b>' + entry.title + '</b><br />' +
            moment(entry.pubDate).format('DD.MM.YYYY HH:mm') + ' ' +
            entry.author +
            '</li></a>';
        });

        //for (var i = 0; i < 10; i++) {
        //    var entry = news[i];
        //    preparedNews += '<li class="list-group-item">' +
        //    '' + entry.title + '' +
        //    ' ' + moment(entry.pubDate).format('DD.MM. HH:mm') +
        //    '</li>';
        //}

        //_.each(news, function (newsEntry) {
        //    preparedNews += '<li class="list-group-item">' +
        //    '<b>' + newsEntry.author + '</b>' +
        //    '</li>';
        //    //preparedNews.push({
        //    //    author: newsEntry.author,
        //    //    link: newsEntry.link,
        //    //    pubDate: moment(newsEntry.pubDate).format('DD.MM. HH:mm'),
        //    //    title: newsEntry.title
        //    //});
        //});

        return preparedNews;
    }
};