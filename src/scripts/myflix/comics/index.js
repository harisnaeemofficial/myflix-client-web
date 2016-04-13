/**
 * @include "../index.js"
 * @include "../utils.js"
 * @include "../router.js"
 * @include "./topbar.js"
 * @include "./genres.js"
 * @include "./item.js"
 */
/*global Cookies */
myFlix.comics = {};

myFlix.comics.selectedGenre = '';
myFlix.comics.selectedSortField = '';
myFlix.comics.selectedSortType = '';

myFlix.comics.index = function (req, next) {
    window.scrollTo(0, 0);
    myFlix.comics.setSelectedGenre(req.params.genre);
    myFlix.comics.setBreadcrumb();
    myFlix.comics.setSortItems();
    $('#input-search').attr('placeholder', 'Search Comics ...').attr('onkeyup', 'myFlix.comics.search.init(this.value);');

    if (myFlix.comics.genres.currentList.length !== 0) {
        myFlix.comics.genres.show(myFlix.comics.genres.currentList);
    } else {
        myFlix.utils.jsInc('genres', config.apiUrl + 'comics/genres?callback=myFlix.comics.genres.handleCallback');
    }
    if (req.params.genre) {
        myFlix.utils.jsInc('items', config.apiUrl + 'comics/genre/' + myFlix.comics.selectedGenre + '?callback=myFlix.comics.items.handleCallback');
    } else {
        myFlix.utils.jsInc('items', config.apiUrl + 'comics/genre/Batman?callback=myFlix.comics.items.handleCallback');
    }
};

myFlix.comics.setSortItems = function (reqParams) {
    var cookieSelectedSortField = Cookies.get('mfsortfield'),
        cookieSelectedSortType = Cookies.get('mfsorttype');
    if (cookieSelectedSortField) {
        myFlix.comics.selectedSortField = cookieSelectedSortField;
    } else {
        myFlix.comics.selectedSortField = 'title';
    }

    if (cookieSelectedSortField) {
        myFlix.comics.selectedSortType = cookieSelectedSortType;
    } else {
        myFlix.comics.selectedSortType = 'asc';
    }
};

myFlix.comics.setSelectedGenre = function (reqParamGenre) {
    myFlix.comics.selectedGenre = reqParamGenre ? decodeURIComponent(reqParamGenre) : 'Batman';
};

myFlix.comics.setBreadcrumb = function () {
    $('header .breadcrumb').html(' &raquo; Comics &raquo; ' + myFlix.comics.selectedGenre);
};