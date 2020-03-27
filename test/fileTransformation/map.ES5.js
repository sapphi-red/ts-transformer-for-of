"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
var arr2 = function (_c) {
    var _a = function (n) { return n * n; };
    var _b = [];
    for (var _i = 0, _c_1 = _c; _i < _c_1.length; _i++) {
        _d = _c_1[_i];
        _b.push(_a(_d));
    }
    return _b;
}(arr);
var arr3 = function (_g) {
    var _e = function (n) {
        return n * n * this;
    }.bind(2);
    var _f = [];
    for (var _i = 0, _g_1 = _g; _i < _g_1.length; _i++) {
        _h = _g_1[_i];
        _f.push(_e(_h));
    }
    return _f;
}(arr);
