"use strict";
var _a, _b, _c, _d, _e, _f;
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
(function (_b) {
    var _a = function (n) {
        console.log(n + 5);
    };
    for (var _i = 0, _b_1 = _b; _i < _b_1.length; _i++) {
        _c = _b_1[_i];
        _a(_c);
    }
})(arr);
(function (_e) {
    var _d = function (n) {
        console.log(n + this);
    }.bind(2);
    for (var _i = 0, _e_1 = _e; _i < _e_1.length; _i++) {
        _f = _e_1[_i];
        _d(_f);
    }
})(arr);
