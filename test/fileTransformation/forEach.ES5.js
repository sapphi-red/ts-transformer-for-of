"use strict";
var _a, _b, _c, _d, _e, _f;
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
(function (_b) {
    var _a = function (n) {
        console.log(n + 5);
    };
    for (var _i = 0; _i < _b.length; _i++) {
        var _c = _b[_i];
        _a(_c);
    }
})(arr);
(function (_e) {
    var _d = function (n) {
        console.log(n + this);
    }.bind(2);
    for (var _i = 0; _i < _e.length; _i++) {
        var _f = _e[_i];
        _d(_f);
    }
})(arr);
