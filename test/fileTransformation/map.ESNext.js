"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
const arr = Array.from({ length: 1000 }, (v, i) => i);
const arr2 = function (_c) {
    var _a = n => n * n;
    var _b = [];
    for (_d of _c) {
        _b.push(_a(_d));
    }
    return _b;
}(arr);
const arr3 = function (_g) {
    var _e = function (n) {
        return n * n * this;
    }.bind(2);
    var _f = [];
    for (_h of _g) {
        _f.push(_e(_h));
    }
    return _f;
}(arr);
