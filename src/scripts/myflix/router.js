/**
 * @include "../../../config.js"
 * @include "./index.js"
 * @include "./movies/index.js"
 */
/*global Router */
myFlix.router = {};

myFlix.router.instance = null;

myFlix.router.setRoutes = function () {
    myFlix.router.instance = new Router();

    myFlix.router.instance.get('#/movies', function (req, next) {
        myFlix.router.instance.redirect('#/movies/What\'s New');
    });

    myFlix.router.instance.get('#/movies/What\'s New', function (req, next) {
        myFlix.movies.index(req, next);
    });

    myFlix.router.instance.get('#/movies/genre/:genre', function (req, next) {
        myFlix.movies.index(req, next);
    });

    myFlix.router.instance.errors(404, function () {
        myFlix.router.instance.redirect('#/movies');
    });

    myFlix.router.instance.run();
};