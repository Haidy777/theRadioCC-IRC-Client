var news = {
    getNews: function () {
        var newsURL = 'http://theradio.cc/feed/',
            $news = $('#news'),
            $newsContainer = $('#news-container'),
            newHeight = $news.innerHeight() - $newsContainer.position().top - 10 + $news.position().top;

        $newsContainer.css({
            'height': newHeight,
            'max-height': newHeight
        });

        parseRSS(newsURL, function (err, rss) {
            $newsContainer.html(news.prepareNews(rss));
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

        return preparedNews;
    }
};