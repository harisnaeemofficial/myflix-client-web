/**
 * @include "./index.js"
 */

myFlix.movies.genres = {};

myFlix.movies.genres.currentList = [];

myFlix.movies.genres.show = function (genres) {
    var txt = '',
        genreSelected = myFlix.movies.selectedGenre === 'What\'s New' ? ' item-selected' : '';
    txt += '';
    txt += '<li><a class="item' + genreSelected + '" href="#/movies/What\'s New">What\'s New</a></li>';
    myFlix.utils.forEach(genres, function (i, genre) {
        genreSelected = myFlix.movies.selectedGenre === genre ? ' item-selected' : '';
        txt += '<li><a class="item' + genreSelected + '" href="#/movies/genre/' + genre + '">' + genre + '</a></li>';
    });
    $('.left-sidebar .items').html(txt);
};

myFlix.movies.genres.handleCallback = function (genres) {
    myFlix.movies.genres.currentList = genres;
    myFlix.movies.genres.show(genres);
};