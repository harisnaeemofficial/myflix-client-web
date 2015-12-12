/**
 * @include "./index.js"
 */
myFlix.movies.topbar = {};

myFlix.movies.topbar.show = function() {
    var txt = '',
        sortSelected = '';	
	
    txt += '<li>Sort:</li>';
	
    if (myFlix.movies.selectedSortField === 'title') {
        txt +='<li><a class="selected" href="#" ';
        if (myFlix.movies.selectedSortType === 'asc') {
            txt += 'onclick="' + myFlix.movies.topbar.makeSortAnchor('title', 'desc') + '">Title A-Z</a></li>';	
        } else {
            txt += 'onclick="' + myFlix.movies.topbar.makeSortAnchor('title', 'asc') + '">Title Z-A</a></li>';	
        }
    } else {
        txt +='<li><a href="#" ';
        txt += 'onclick="' + myFlix.movies.topbar.makeSortAnchor('title', 'asc') + '">Title A-Z</a></li>';	
    }
	
	if (myFlix.movies.selectedSortField === 'year') {
        txt +='<li><a class="selected" href="#" ';
        if (myFlix.movies.selectedSortType === 'asc') {
            txt += 'onclick="' + myFlix.movies.topbar.makeSortAnchor('year', 'desc') + '">Year <i class="fa fa-arrow-down"></i></a></li>'; 
        } else {
            txt += 'onclick="' + myFlix.movies.topbar.makeSortAnchor('year', 'asc') + '">Year <i class="fa fa-arrow-up"></i></a></li>';  
        }
    } else {
    	txt +='<li><a href="#" ';
        txt += 'onclick="' + myFlix.movies.topbar.makeSortAnchor('year', 'desc') + '">Year <i class="fa fa-arrow-up"></i></a></li>';      
    }
    
    if (myFlix.movies.selectedSortField === 'rating') {
        txt +='<li><a class="selected" href="#" ';
        if (myFlix.movies.selectedSortType === 'asc') {
            txt += 'onclick="' + myFlix.movies.topbar.makeSortAnchor('rating', 'desc') + '">Rating <i class="fa fa-arrow-down"></i></a></li>'; 
        } else {
            txt += 'onclick="' + myFlix.movies.topbar.makeSortAnchor('rating', 'asc') + '">Rating <i class="fa fa-arrow-up"></i></a></li>';  
        }
    } else {
    	txt +='<li><a href="#" ';
        txt += 'onclick="' + myFlix.movies.topbar.makeSortAnchor('rating', 'desc') + '">Rating <i class="fa fa-arrow-up"></i></a></li>';      
    }

    $('.middle-content .topbar').html(txt);
    
};

myFlix.movies.topbar.makeSortAnchor = function(sortField, sortType) {
    return 'Cookies.set(\'mfsortfield\', \'' + sortField + '\', { expires: 365, path: window.location.pathname });Cookies.set(\'mfsorttype\', \'' + sortType + '\', { expires: 365, path: window.location.pathname });myFlix.movies.setSortItems();myFlix.movies.items.show(myFlix.movies.items.currentList);return false;';
};
