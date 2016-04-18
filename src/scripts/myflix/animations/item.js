/**
 * @include "./index.js"
 */
/*global jwplayer*/

myFlix.animations.item = {};

myFlix.animations.item.jwplayerInstance = null;

myFlix.animations.item.currentMovieId = 0;

myFlix.animations.item.coundownTimer = null;

myFlix.animations.item.openSingleContent = function (movieId, autoPlay) {
    myFlix.animations.item.currentMovieId = movieId;
    var movie = myFlix.animations.items.currentList.filter(function (a) {
            return a.id === movieId;
        })[0],
        directorTitle = movie.director.length > 1 ? 'Directors' : 'Director',
        txt = '';
    window.scrollTo(0, 0);
    $('#main-wrapper').hide();
    $('.single-content').show();

    if (myFlix.animations.item.jwplayerInstance === null) {
        myFlix.animations.item.jwplayerInstance = jwplayer('embed-movie-container');
    }

    try {
        myFlix.animations.item.jwplayerInstance.remove();
    } catch (e) {}

    var jwplayerOptions = {
        base: '.',
        file: movie.filenameUri,
        stretching: 'uniform',
        aspectratio: '16:9',
        preload: true,
        //skin: 'five',
        skin: {
            name: 'flat',
            active: '#E74C3C',
            inactive: '#C0392B',
            background: '#E1E1E1'
        },
        width: '88%',
        image: decodeURI(movie.folderUri + '/about.jpg'),
        tracks: [
            {
                file: decodeURI(movie.folderUri + '/' + movie.title + '-thumbs.vtt'),
                kind: 'thumbnails'
            }
        ],
        captions: {
            backgroundOpacity: 0
        },
        logo: {
            file: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAAPCAYAAAC/UHJkAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOdAAADnQBaySz1gAAACF0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgNC4w6iYndQAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMS8yNC8xNejT7bMAAAJGSURBVHic7VexbtswEH0pOlBdBXCqwU0do9VevTars+YfuvUf8g9Zo9VevVqrO8YbYU8EtMrc3EHH6EwfVaewixTIAwyQ1KPufHx8pG4OhwM+0OEzAFit7qLxxji/Ch2rVQ5gEnFeAOwATPmYcX7DSVarEsCIuq1xfinEO4Fxfh7xVsb5RuJKPKvVlyi31/lWqxGAkucEUDEAfI/e3wBYsf43gQPj/MZqxedPrVY/jfMtBc0BPADI6PljIp6EecR7obwknPCM863VqgBQ0HjB4s/YeBUmfkq8PKfqBZQJHozzc5ZkFiV2j74Qv2LV/AM8sXZhtZqQUkMhdkEVQK8MCQWALWv/KegPak+tVjW6ItzS2D5KjKNicS4K2i4L9As0A9AyyjPnDxWjBLAkqWUDvLBdagBjFjRnlHnYOgK211QMec+Y8skwoNRBZZAJJbdIhIq4GY6VtOFSFHBvtYoLVXMDvwCe0CsX6JT6HJMkz+AmVeK4GLtUNFr5SngkjXF8RVc8/ssHZ7wdcd6tdDJJxVizdpAXAGxwvN9OQKvJAy+N81fxgzdiFvVzq9U0JknbpEZ/PnO5r3HeluEF25/Bf7ymZ5DnjYVHd1armnvZiTJoJaU/sRbG/gfwC9kCvXIzdHegV6QMdI3jajZ0TF0qwb+BZLRb43zSk6xWE/Tq3gNYoruUBTO9tVoVQZmpS1esgvegCsloRykynYTcKyrjfEt/nJ9uD6GRKka8h+vzc343mKG/UzTRUb1AbwV5+La5+fhq7fEbCEPg7CYVbPEAAAAASUVORK5CYII=',
            hide: true,
            position: 'top-left'
        }
    };

    if (movie.hassubtitle === 'yes') {
        jwplayerOptions.tracks.push({
            file: decodeURI(movie.folderUri + '/' + movie.title + '.vtt'),
            label: 'English',
            kind: 'captions',
            'default': true
        });
    }

    if (autoPlay === true) {
        jwplayerOptions.autostart = true;
    } else {
        jwplayerOptions.autostart = false;
    }

    myFlix.animations.item.jwplayerInstance.setup(jwplayerOptions);

    $('.single-content .movie-info-container').hide();

    myFlix.animations.item.parseMovieInfo(movie);

    myFlix.animations.item.jwplayerInstance.on('play', function () {
        $('.single-content .movie-info-container').show();
    });

    myFlix.animations.item.jwplayerInstance.on('complete', function () {
        var nextMovie = myFlix.utils.nextInArray($.inArray(movie, myFlix.animations.items.currentList), myFlix.animations.items.currentList),
            txt = '';

        txt += '<table cellpadding="0" cellspacing="0">';

        txt += '<tr>';
        txt += '<td colspan="2">';
        txt += '<div style="margin-bottom:15px;font-weight:bold;font-size:150%;">Up Next:</div>';
        txt += '</td>';
        txt += '</tr>';

        txt += '<tr>';
        txt += '<td valign="top"><img style="margin-right:15px;" src="' + nextMovie.folderUri + '/' + nextMovie.cover + '" /></td>';
        txt += '<td valign="top">';
        txt += '<div id="countdown"></div><div style="text-align:center;margin-top:10px;font-weight:bold;cursor:pointer;" onclick="myFlix.animations.item.closeSingleContent();">Cancel</div>';
        txt += '</td>';
        txt += '</tr>';

        txt += '</table>';

        $('#embed-movie-container').empty().html(txt);

        myFlix.animations.item.parseMovieInfo(nextMovie);

        myFlix.animations.item.coundownTimer = $("#countdown").countdown360({
            radius: 60,
            seconds: 40,
            label: ['sec', 'secs'],
            fontColor: '#FFFFFF',
            strokeStyle: '#FFFFFF',
            fillStyle: '#DB0510',
            autostart: false,
            onComplete: function () {
                myFlix.animations.item.openSingleContent(nextMovie.id, true);
            }
        });

        myFlix.animations.item.coundownTimer.start();

    });

};

myFlix.animations.item.closeSingleContent = function () {
    if (myFlix.animations.item.coundownTimer !== null) {
        myFlix.animations.item.coundownTimer.stop();
    }
    try {
        myFlix.animations.item.jwplayerInstance.remove();
    } catch (e) {}
    $('.single-content').hide();
    $('#main-wrapper').show();
    $(window).scrollTop($('#movie-' + myFlix.animations.item.currentMovieId).offset().top);
};


myFlix.animations.item.parseMovieInfo = function (movie) {
    var directorTitle = movie.director.length > 1 ? 'Directors' : 'Director';
    $('.single-content .movie-info-container .movie-info-inner .title').html('' + movie.title.replace(/ _ /ig, ' - ') + '').show();
    $('.single-content .movie-info-container .movie-info-inner .plot').html(movie.plot);
    $('.single-content .movie-info-container .movie-info-inner .director').html('<strong>' + directorTitle + ':</strong> ' + movie.director.join(', '));

    //if (movie.genre[0] !== '') {
    //    $('.single-content .movie-info-container .movie-info-inner .genre').html('<strong>Genre:</strong> ' + movie.genre.join(', ')).show();
    //} else {
    $('.single-content .movie-info-container .movie-info-inner .genre').empty().hide();
    //}

    $('.single-content .movie-info-container .movie-info-inner .meta-container .rating').html('<strong>IMDB Rating:</strong> ' + movie.rating);
    $('.single-content .movie-info-container .movie-info-inner .meta-container .duration').html('<strong>Duration:</strong> ' + movie.durationminutes + ' min');
    $('.single-content .movie-info-container .movie-info-inner .meta-container .certification').html('<strong>Certification:</strong> ' + movie.certification);

};