"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
const arr = Array.from({ length: 1000 }, (v, i) => i);
const arr2 = function (_a) {
    var _b = n => n % 2 === 0;
    var _c = [];
    for (_d of _a) {
        if (!_b(_d))
            continue;
        _c.push(_d);
    }
    return _c;
}(arr);
const arr3 = function (_e) {
    var _f = function (n) {
        return n % 2 === 0 && this.content.length > 0;
    }.bind({ content: 'this is this' });
    var _g = [];
    for (_h of _e) {
        if (!_f(_h))
            continue;
        _g.push(_h);
    }
    return _g;
}(arr);
