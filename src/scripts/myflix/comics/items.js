/**
 * @include "./index.js"
 */
myFlix.comics.items = {};

myFlix.comics.items.currentList = [];

myFlix.comics.items.show = function (items) {
    myFlix.comics.topbar.show();
    items = myFlix.utils.sortArray(items, myFlix.comics.selectedSortField, myFlix.comics.selectedSortType);
    var txt = '';
    var cleanedTitle = '';
    myFlix.utils.forEach(items, function (i, item) {
        var cleanedTitle = myFlix.comics.items.utils.cleanTitle(item.title);
        txt += '<li id="movie-' + item.id + '" title="' + cleanedTitle + '" class="movie">' +
            '<img class="lazy" onclick="myFlix.comics.item.openSingleContent(' + item.id + ');" data-lazy-img="' + item.folderUri + '/' + item.cover + '" />' +
            '<div class="title">' + cleanedTitle + '</div>' +
            '<div class="year">' + item.year + '</div>';
        if (myFlix.comics.selectedSortField === 'rating') {
            txt += '<div class="rating">' + item.rating + '</div>';
        }
        txt += '</li>';
    });

    $('.middle-content .items').empty().html(txt);

    $('img.lazy').lazyload({
        data_attribute: "lazy-img"
    });
};

myFlix.comics.items.handleCallback = function (items) {
    myFlix.comics.items.currentList = items;
    myFlix.comics.items.show(items);
};

myFlix.comics.items.utils = {};

myFlix.comics.items.utils.cleanTitle = function (title) {
    var cleanedTitle = title.replace(/ \([0-9]{1,4}\)/ig, '').trim();
    cleanedTitle = cleanedTitle.replace(/(.*) - /, '').trim();
    cleanedTitle = cleanedTitle.replace(/ _ /ig, ' - ').trim();
    return cleanedTitle;
};