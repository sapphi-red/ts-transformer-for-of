"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
(function (_a) {
    var _b = function (n) {
        console.log(n + 5);
    };
    for (var _i = 0, _a_1 = _a; _i < _a_1.length; _i++) {
        _d = _a_1[_i];
        _b(_d);
    }
})(arr);
(function (_e) {
    var _f = function (n) {
        console.log(n + this);
    }.bind(2);
    for (var _i = 0, _e_1 = _e; _i < _e_1.length; _i++) {
        _h = _e_1[_i];
        _f(_h);
    }
})(arr);
