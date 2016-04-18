/**
 * @include "../index.js"
 * @include "../utils.js"
 * @include "../router.js"
 * @include "./topbar.js"
 * @include "./genres.js"
 * @include "./item.js"
 */
/*global Cookies */
myFlix.animations = {};

myFlix.animations.selectedGenre = '';
myFlix.animations.selectedSortField = '';
myFlix.animations.selectedSortType = '';

myFlix.animations.index = function (req, next) {
    window.scrollTo(0, 0);
    myFlix.animations.setSelectedGenre(req.params.genre);
    myFlix.animations.setBreadcrumb();
    myFlix.animations.setSortItems();
    $('#input-search').attr('placeholder', 'Search Animations ...').attr('onkeyup', 'myFlix.animations.search.init(this.value);');
    $('#close-single-content').attr('onclick', 'myFlix.animations.item.closeSingleContent();');

    if (myFlix.animations.genres.currentList.length !== 0) {
        myFlix.animations.genres.show(myFlix.animations.genres.currentList);
    } else {
        myFlix.utils.jsInc('genres', config.apiUrl + 'animations/genres?callback=myFlix.animations.genres.handleCallback');
    }
    if (req.params.genre) {
        myFlix.utils.jsInc('items', config.apiUrl + 'animations/genre/' + myFlix.animations.selectedGenre + '?callback=myFlix.animations.items.handleCallback');
    } else {
        myFlix.utils.jsInc('items', config.apiUrl + 'animations/genre/All Various?callback=myFlix.animations.items.handleCallback');
    }
};

myFlix.animations.setSortItems = function (reqParams) {
    var cookieSelectedSortField = Cookies.get('mfsortfield'),
        cookieSelectedSortType = Cookies.get('mfsorttype');
    if (cookieSelectedSortField) {
        myFlix.animations.selectedSortField = cookieSelectedSortField;
    } else {
        myFlix.animations.selectedSortField = 'title';
    }

    if (cookieSelectedSortField) {
        myFlix.animations.selectedSortType = cookieSelectedSortType;
    } else {
        myFlix.animations.selectedSortType = 'asc';
    }
};

myFlix.animations.setSelectedGenre = function (reqParamGenre) {
    myFlix.animations.selectedGenre = reqParamGenre ? decodeURIComponent(reqParamGenre) : 'All Various';
};

myFlix.animations.setBreadcrumb = function () {
    $('header .breadcrumb').html(' &raquo; Animations &raquo; ' + myFlix.animations.selectedGenre);
};