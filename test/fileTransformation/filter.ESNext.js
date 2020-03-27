"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
const arr = Array.from({ length: 1000 }, (v, i) => i);
const arr2 = function (_c) {
    const _a = n => n % 2 === 0;
    const _b = [];
    for (let _i = 0; _i < _c.length; _i++) {
        const _d = _c[_i];
        if (!_a(_d))
            continue;
        _b.push(_d);
    }
    return _b;
}(arr);
const arr3 = function (_g) {
    const _e = function (n) {
        return n % 2 === 0 && this.content.length > 0;
    }.bind({ content: 'this is this' });
    const _f = [];
    for (let _i = 0; _i < _g.length; _i++) {
        const _h = _g[_i];
        if (!_e(_h))
            continue;
        _f.push(_h);
    }
    return _f;
}(arr);
