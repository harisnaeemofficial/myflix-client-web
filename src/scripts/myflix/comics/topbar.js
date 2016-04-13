/**
 * @include "./index.js"
 */
myFlix.comics.topbar = {};

myFlix.comics.topbar.show = function () {
    var txt = '',
        sortSelected = '';

    txt += '<li>Sort:</li>';

    if (myFlix.comics.selectedSortField === 'title') {
        txt += '<li><a class="selected" href="#" ';
        if (myFlix.comics.selectedSortType === 'asc') {
            txt += 'onclick="' + myFlix.comics.topbar.makeSortAnchor('title', 'desc') + '">Title A-Z</a></li>';
        } else {
            txt += 'onclick="' + myFlix.comics.topbar.makeSortAnchor('title', 'asc') + '">Title Z-A</a></li>';
        }
    } else {
        txt += '<li><a href="#" ';
        txt += 'onclick="' + myFlix.comics.topbar.makeSortAnchor('title', 'asc') + '">Title A-Z</a></li>';
    }

    if (myFlix.comics.selectedSortField === 'year') {
        txt += '<li><a class="selected" href="#" ';
        if (myFlix.comics.selectedSortType === 'asc') {
            txt += 'onclick="' + myFlix.comics.topbar.makeSortAnchor('year', 'desc') + '">Year <i class="fa fa-arrow-down"></i></a></li>';
        } else {
            txt += 'onclick="' + myFlix.comics.topbar.makeSortAnchor('year', 'asc') + '">Year <i class="fa fa-arrow-up"></i></a></li>';
        }
    } else {
        txt += '<li><a href="#" ';
        txt += 'onclick="' + myFlix.comics.topbar.makeSortAnchor('year', 'desc') + '">Year <i class="fa fa-arrow-up"></i></a></li>';
    }

    if (myFlix.comics.selectedSortField === 'rating') {
        txt += '<li><a class="selected" href="#" ';
        if (myFlix.comics.selectedSortType === 'asc') {
            txt += 'onclick="' + myFlix.comics.topbar.makeSortAnchor('rating', 'desc') + '">Rating <i class="fa fa-arrow-down"></i></a></li>';
        } else {
            txt += 'onclick="' + myFlix.comics.topbar.makeSortAnchor('rating', 'asc') + '">Rating <i class="fa fa-arrow-up"></i></a></li>';
        }
    } else {
        txt += '<li><a href="#" ';
        txt += 'onclick="' + myFlix.comics.topbar.makeSortAnchor('rating', 'desc') + '">Rating <i class="fa fa-arrow-up"></i></a></li>';
    }

    $('.middle-content .topbar').html(txt);

};

myFlix.comics.topbar.makeSortAnchor = function (sortField, sortType) {
    return 'Cookies.set(\'mfsortfield\', \'' + sortField + '\', { expires: 365, path: window.location.pathname });Cookies.set(\'mfsorttype\', \'' + sortType + '\', { expires: 365, path: window.location.pathname });myFlix.comics.setSortItems();myFlix.comics.items.show(myFlix.comics.items.currentList);return false;';
};