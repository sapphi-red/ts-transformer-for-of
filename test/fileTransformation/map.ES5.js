"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
var arr2 = function (_a) {
    var _b = function (n) { return n * n; };
    var _c = [];
    for (var _i = 0, _a_1 = _a; _i < _a_1.length; _i++) {
        _d = _a_1[_i];
        _c.push(_b(_d));
    }
    return _c;
}(arr);
var arr3 = function (_e) {
    var _f = function (n) {
        return n * n * this;
    }.bind(2);
    var _g = [];
    for (var _i = 0, _e_1 = _e; _i < _e_1.length; _i++) {
        _h = _e_1[_i];
        _g.push(_f(_h));
    }
    return _g;
}(arr);
