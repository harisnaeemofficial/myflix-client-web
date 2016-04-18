/**
 * @include "./index.js"
 */

myFlix.animations.search = {};

myFlix.animations.search.timer = 0;

myFlix.animations.search.init = function (q) {
    clearTimeout(myFlix.animations.search.timer);
    myFlix.comics.animations.timer = setTimeout(function () {
        if (q) {
            myFlix.utils.jsInc('items', config.apiUrl + 'animations/search/' + q.trim() + '?callback=myFlix.animations.items.handleCallback');
        } else {
            myFlix.router.instance.run();
        }
    }, 1000);
};