"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
var arr2 = function (_a) {
    var _b = function (n) { return n % 2 === 0; };
    var _c = [];
    for (var _i = 0, _a_1 = _a; _i < _a_1.length; _i++) {
        _d = _a_1[_i];
        if (!_b(_d))
            continue;
        _c.push(_d);
    }
    return _c;
}(arr);
var arr3 = function (_e) {
    var _f = function (n) {
        return n % 2 === 0 && this.content.length > 0;
    }.bind({ content: 'this is this' });
    var _g = [];
    for (var _i = 0, _e_1 = _e; _i < _e_1.length; _i++) {
        _h = _e_1[_i];
        if (!_f(_h))
            continue;
        _g.push(_h);
    }
    return _g;
}(arr);
