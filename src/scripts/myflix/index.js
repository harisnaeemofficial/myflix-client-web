/**
 * @include "../../../config.js"
 * @include "./router.js"
 */

var myFlix = {};

myFlix.windowBreakpoint = 721;
myFlix.sidebarWidth = 170;
myFlix.windowWidth = 0;

myFlix.init = function () {
    myFlix.windowWidth = $(window).width();
    myFlix.setResponsive();
    window.addEventListener('resize', function () {
        var currentWidth = $(window).width();
        if (currentWidth !== myFlix.windowWidth) {
            myFlix.windowWidth = currentWidth;
            myFlix.setResponsive();
        }
    }, false);
    myFlix.router.setRoutes();
};

myFlix.toggleSidebar = function () {
    if ($('.left-sidebar').get(0).style.display === 'block') {
        $('.left-sidebar').get(0).setAttribute('style', 'display:none');
        $('.middle-content').get(0).setAttribute('style', 'padding-left: 0px');
    } else {
        $('.left-sidebar').get(0).setAttribute('style', 'display:block');
        $('.middle-content').get(0).setAttribute('style', 'padding-left: ' + myFlix.sidebarWidth + 'px');
    }
};

myFlix.setResponsive = function (currentWidth) {
    if (myFlix.windowWidth < myFlix.windowBreakpoint) {
        $('.left-sidebar').get(0).setAttribute('style', 'display:none');
        $('.middle-content').get(0).setAttribute('style', 'padding-left: 0px');
    } else {
        $('.left-sidebar').get(0).setAttribute('style', 'display:block');
        $('.middle-content').get(0).setAttribute('style', 'padding-left: ' + myFlix.sidebarWidth + 'px');
    }
};