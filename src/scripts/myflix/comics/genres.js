/**
 * @include "./index.js"
 */

myFlix.comics.genres = {};

myFlix.comics.genres.currentList = [];

myFlix.comics.genres.show = function (genres) {
    var txt = '',
        genreSelected = myFlix.comics.selectedGenre === 'Batman' ? ' item-selected' : '';
    txt += '';
    txt += '<li><a class="item" href="#/movies"><i class="fa fa-arrow-left" aria-hidden="true"></i> &nbsp;Movies</a></li>';
    myFlix.utils.forEach(genres, function (i, genre) {
        genreSelected = myFlix.comics.selectedGenre === genre ? ' item-selected' : '';
        txt += '<li><a class="item' + genreSelected + '" href="#/comics/genre/' + genre + '">' + genre + '</a></li>';
    });
    $('.left-sidebar .items').html(txt);
};

myFlix.comics.genres.handleCallback = function (genres) {
    myFlix.comics.genres.currentList = genres;
    myFlix.comics.genres.show(genres);
};