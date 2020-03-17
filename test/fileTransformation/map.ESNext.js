"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
const arr = Array.from({ length: 1000 }, (v, i) => i);
const arr2 = function (_a) {
    var _b = n => n * n;
    var _c = [];
    for (_d of _a) {
        _c.push(_b(_d));
    }
    return _c;
}(arr);
const arr3 = function (_e) {
    var _f = function (n) {
        return n * n * this;
    }.bind(2);
    var _g = [];
    for (_h of _e) {
        _g.push(_f(_h));
    }
    return _g;
}(arr);
