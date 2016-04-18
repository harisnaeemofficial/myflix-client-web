/**
 * @include "../index.js"
 * @include "../utils.js"
 * @include "../router.js"
 * @include "./topbar.js"
 * @include "./genres.js"
 * @include "./item.js"
 */
/*global Cookies */
myFlix.movies = {};

myFlix.movies.selectedGenre = '';
myFlix.movies.selectedSortField = '';
myFlix.movies.selectedSortType = '';

myFlix.movies.index = function (req, next) {
    window.scrollTo(0, 0);
    myFlix.movies.setSelectedGenre(req.params.genre);
    myFlix.movies.setBreadcrumb();
    myFlix.movies.setSortItems();
    $('#input-search').attr('placeholder', 'Search Movies ...').attr('onkeyup', 'myFlix.movies.search.init(this.value);');
    $('#close-single-content').attr('onclick', 'myFlix.movies.item.closeSingleContent();');

    if (myFlix.movies.genres.currentList.length !== 0) {
        myFlix.movies.genres.show(myFlix.movies.genres.currentList);
    } else {
        myFlix.utils.jsInc('genres', config.apiUrl + 'movies/genres?callback=myFlix.movies.genres.handleCallback');
    }
    if (req.params.genre) {
        myFlix.utils.jsInc('items', config.apiUrl + 'movies/genre/' + myFlix.movies.selectedGenre + '?callback=myFlix.movies.items.handleCallback');
    } else {
        myFlix.utils.jsInc('items', config.apiUrl + 'movies/whatsnew?callback=myFlix.movies.items.handleCallback');
    }
};

myFlix.movies.setSortItems = function (reqParams) {
    var cookieSelectedSortField = Cookies.get('mfsortfield'),
        cookieSelectedSortType = Cookies.get('mfsorttype');
    if (cookieSelectedSortField) {
        myFlix.movies.selectedSortField = cookieSelectedSortField;
    } else {
        myFlix.movies.selectedSortField = 'title';
    }

    if (cookieSelectedSortField) {
        myFlix.movies.selectedSortType = cookieSelectedSortType;
    } else {
        myFlix.movies.selectedSortType = 'asc';
    }
};

myFlix.movies.setSelectedGenre = function (reqParamGenre) {
    myFlix.movies.selectedGenre = reqParamGenre ? decodeURIComponent(reqParamGenre) : 'What\'s New';
};

myFlix.movies.setBreadcrumb = function () {
    $('header .breadcrumb').html(' &raquo; Movies &raquo; ' + myFlix.movies.selectedGenre);
};