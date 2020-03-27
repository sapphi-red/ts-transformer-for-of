"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
const arr = Array.from({ length: 1000 }, (v, i) => i);
const arr2 = function (_c) {
    var _a = n => n % 2 === 0;
    var _b = [];
    for (_d of _c) {
        if (!_a(_d))
            continue;
        _b.push(_d);
    }
    return _b;
}(arr);
const arr3 = function (_g) {
    var _e = function (n) {
        return n % 2 === 0 && this.content.length > 0;
    }.bind({ content: 'this is this' });
    var _f = [];
    for (_h of _g) {
        if (!_e(_h))
            continue;
        _f.push(_h);
    }
    return _f;
}(arr);
