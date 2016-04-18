/**
 * @include "./index.js"
 */
myFlix.animations.items = {};

myFlix.animations.items.currentList = [];

myFlix.animations.items.show = function (items) {
    myFlix.animations.topbar.show();
    items = myFlix.utils.sortArray(items, myFlix.animations.selectedSortField, myFlix.animations.selectedSortType);
    var txt = '';
    var cleanedTitle = '';
    myFlix.utils.forEach(items, function (i, item) {
        var cleanedTitle = myFlix.animations.items.utils.cleanTitle(item.title);
        txt += '<li id="movie-' + item.id + '" title="' + cleanedTitle + '" class="movie">' +
            '<img class="lazy" onclick="myFlix.animations.item.openSingleContent(' + item.id + ');" data-lazy-img="' + item.folderUri + '/' + item.cover + '" />' +
            '<div class="title">' + cleanedTitle + '</div>' +
            '<div class="year">' + item.year + '</div>';
        if (myFlix.animations.selectedSortField === 'rating') {
            txt += '<div class="rating">' + item.rating + '</div>';
        }
        txt += '</li>';
    });

    $('.middle-content .items').empty().html(txt);

    $('img.lazy').lazyload({
        data_attribute: "lazy-img"
    });
};

myFlix.animations.items.handleCallback = function (items) {
    myFlix.animations.items.currentList = items;
    myFlix.animations.items.show(items);
};

myFlix.animations.items.utils = {};

myFlix.animations.items.utils.cleanTitle = function (title) {
    var cleanedTitle = title.replace(/ \([0-9]{1,4}\)/ig, '').trim();
    cleanedTitle = cleanedTitle.replace(/(.*) - /, '').trim();
    cleanedTitle = cleanedTitle.replace(/ _ /ig, ' - ').trim();
    return cleanedTitle;
};