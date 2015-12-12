/**
 * @include "./index.js"
 */
myFlix.movies.items = {};

myFlix.movies.items.currentList = [];

myFlix.movies.items.show = function(items) {
    myFlix.movies.topbar.show();
    items = myFlix.utils.sortArray(items, myFlix.movies.selectedSortField, myFlix.movies.selectedSortType);
    var txt = '';
    var cleanedTitle = '';
    myFlix.utils.forEach(items, function(i, item) {
        var cleanedTitle = myFlix.movies.items.utils.cleanTitle(item.title);
        txt += '<li id="movie-' + item.id + '" title="' + cleanedTitle + '" class="movie">' +
            '<img class="lazy" onclick="myFlix.movies.item.openSingleContent(' + item.id + ');" data-lazy-img="' + item.folderUri + '/' + item.cover + '" />' +
            '<div class="title">' + cleanedTitle + '</div>' +
            '<div class="year">' + item.year + '</div>';
        if (myFlix.movies.selectedSortField === 'rating') {
            txt += '<div class="rating">' + item.rating + '</div>';	
        }
        txt += '</li>';
    });
    
    $('.middle-content .items').empty().html(txt);
    
    $('img.lazy').lazyload({
        data_attribute  : "lazy-img"
    });
};

myFlix.movies.items.handleCallback = function(items) {
    myFlix.movies.items.currentList = items;
    myFlix.movies.items.show(items);
};

myFlix.movies.items.utils = {};

myFlix.movies.items.utils.cleanTitle = function(title) {
    var cleanedTitle = title.replace(/ \([0-9]{1,4}\)/ig, '').trim();
    cleanedTitle = cleanedTitle.replace(/(.*) - /,'').trim();
    cleanedTitle = cleanedTitle.replace(/ _ /ig,' - ').trim();
    return cleanedTitle;      
};
