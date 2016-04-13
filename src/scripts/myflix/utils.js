/**
 * @include "./index.js"
 */

myFlix.utils = {};

myFlix.utils.jsInc = function (id, url) {
    var oldId = document.getElementById(id),
        scriptElement = document.createElement('script');
    if (oldId) {
        oldId.parentNode.removeChild(oldId);
    }
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('src', url);
    scriptElement.setAttribute('id', id);
    document.getElementsByTagName('head')[0].appendChild(scriptElement);
};

myFlix.utils.forEach = function (obj, cb) {
    var i,
        l,
        k;
    if (/String|Array/.test(Object.prototype.toString.call(obj))) {
        for (i = 0, l = obj.length; i < l; i++) {
            if (cb) {
                cb(i, obj[i]);
            }
        }
    } else {
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                if (cb) {
                    cb(k, obj[k]);
                }
            }
        }
    }
};

myFlix.utils.sortArray = function (data, key, type) {
    type = type || 'asc';
    return data.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        if (type === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
        if (type === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
};

myFlix.utils.nextInArray = function (index, arr) {
    index = index + 1;
    if (index >= arr.length) {
        index = 0;
    }
    return arr[index];
};