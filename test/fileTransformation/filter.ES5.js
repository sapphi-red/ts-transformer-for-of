"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
var arr2 = function (_c) {
    var _a = function (n) { return n % 2 === 0; };
    var _b = [];
    for (var _i = 0, _c_1 = _c; _i < _c_1.length; _i++) {
        _d = _c_1[_i];
        if (!_a(_d))
            continue;
        _b.push(_d);
    }
    return _b;
}(arr);
var arr3 = function (_g) {
    var _e = function (n) {
        return n % 2 === 0 && this.content.length > 0;
    }.bind({ content: 'this is this' });
    var _f = [];
    for (var _i = 0, _g_1 = _g; _i < _g_1.length; _i++) {
        _h = _g_1[_i];
        if (!_e(_h))
            continue;
        _f.push(_h);
    }
    return _f;
}(arr);
