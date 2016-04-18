/**
 * @include "./index.js"
 */

myFlix.animations.genres = {};

myFlix.animations.genres.currentList = [];

myFlix.animations.genres.show = function (genres) {
    var txt = '',
        genreSelected = myFlix.animations.selectedGenre === 'All Various' ? ' item-selected' : '';
    txt += '';
    txt += '<li><a class="item" href="#/movies"><i class="fa fa-arrow-left" aria-hidden="true"></i> &nbsp;Movies</a></li>';
    myFlix.utils.forEach(genres, function (i, genre) {
        genreSelected = myFlix.animations.selectedGenre === genre ? ' item-selected' : '';
        txt += '<li><a class="item' + genreSelected + '" href="#/animations/genre/' + genre + '">' + genre + '</a></li>';
    });
    $('.left-sidebar .items').html(txt);
};

myFlix.animations.genres.handleCallback = function (genres) {
    myFlix.animations.genres.currentList = genres;
    myFlix.animations.genres.show(genres);
};