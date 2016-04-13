/**
 * @include "./index.js"
 */

myFlix.comics.search = {};

myFlix.comics.search.timer = 0;

myFlix.comics.search.init = function (q) {
    clearTimeout(myFlix.comics.search.timer);
    myFlix.comics.search.timer = setTimeout(function () {
        if (q) {
            myFlix.utils.jsInc('items', config.apiUrl + 'comics/search/' + q.trim() + '?callback=myFlix.comics.items.handleCallback');
        } else {
            myFlix.router.instance.run();
        }
    }, 1000);
};