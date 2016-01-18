/**
 * @include "./index.js"
 */

myFlix.movies.search = {};

myFlix.movies.search.timer = 0;

myFlix.movies.search.init = function (q) {
    clearTimeout(myFlix.movies.search.timer);
    myFlix.movies.search.timer = setTimeout(function () {
        if (q) {
            myFlix.utils.jsInc('items', config.apiUrl + 'movies/search/' + q.trim() + '?callback=myFlix.movies.items.handleCallback');
        } else {
            myFlix.router.instance.run();
        }
    }, 1000);
};