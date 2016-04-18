/**
 * @include "./index.js"
 */
myFlix.animations.topbar = {};

myFlix.animations.topbar.show = function () {
    var txt = '',
        sortSelected = '';

    txt += '<li>Sort:</li>';

    if (myFlix.animations.selectedSortField === 'title') {
        txt += '<li><a class="selected" href="#" ';
        if (myFlix.animations.selectedSortType === 'asc') {
            txt += 'onclick="' + myFlix.animations.topbar.makeSortAnchor('title', 'desc') + '">Title A-Z</a></li>';
        } else {
            txt += 'onclick="' + myFlix.animations.topbar.makeSortAnchor('title', 'asc') + '">Title Z-A</a></li>';
        }
    } else {
        txt += '<li><a href="#" ';
        txt += 'onclick="' + myFlix.animations.topbar.makeSortAnchor('title', 'asc') + '">Title A-Z</a></li>';
    }

    if (myFlix.animations.selectedSortField === 'year') {
        txt += '<li><a class="selected" href="#" ';
        if (myFlix.animations.selectedSortType === 'asc') {
            txt += 'onclick="' + myFlix.animations.topbar.makeSortAnchor('year', 'desc') + '">Year <i class="fa fa-arrow-down"></i></a></li>';
        } else {
            txt += 'onclick="' + myFlix.animations.topbar.makeSortAnchor('year', 'asc') + '">Year <i class="fa fa-arrow-up"></i></a></li>';
        }
    } else {
        txt += '<li><a href="#" ';
        txt += 'onclick="' + myFlix.animations.topbar.makeSortAnchor('year', 'desc') + '">Year <i class="fa fa-arrow-up"></i></a></li>';
    }

    if (myFlix.animations.selectedSortField === 'rating') {
        txt += '<li><a class="selected" href="#" ';
        if (myFlix.animations.selectedSortType === 'asc') {
            txt += 'onclick="' + myFlix.animations.topbar.makeSortAnchor('rating', 'desc') + '">Rating <i class="fa fa-arrow-down"></i></a></li>';
        } else {
            txt += 'onclick="' + myFlix.animations.topbar.makeSortAnchor('rating', 'asc') + '">Rating <i class="fa fa-arrow-up"></i></a></li>';
        }
    } else {
        txt += '<li><a href="#" ';
        txt += 'onclick="' + myFlix.animations.topbar.makeSortAnchor('rating', 'desc') + '">Rating <i class="fa fa-arrow-up"></i></a></li>';
    }

    $('.middle-content .topbar').html(txt);

};

myFlix.animations.topbar.makeSortAnchor = function (sortField, sortType) {
    return 'Cookies.set(\'mfsortfield\', \'' + sortField + '\', { expires: 365, path: window.location.pathname });Cookies.set(\'mfsorttype\', \'' + sortType + '\', { expires: 365, path: window.location.pathname });myFlix.animations.setSortItems();myFlix.animations.items.show(myFlix.animations.items.currentList);return false;';
};