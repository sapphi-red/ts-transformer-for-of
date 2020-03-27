"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
const arr = Array.from({ length: 1000 }, (v, i) => i);
const arr2 = function (_c) {
    const _a = n => n * n;
    const _b = [];
    for (let _i = 0; _i < _c.length; _i++) {
        const _d = _c[_i];
        _b.push(_a(_d, _i, _c));
    }
    return _b;
}(arr);
const arr3 = function (_g) {
    const _e = function (n) {
        return n * n * this;
    }.bind(2);
    const _f = [];
    for (let _i = 0; _i < _g.length; _i++) {
        const _h = _g[_i];
        _f.push(_e(_h, _i, _g));
    }
    return _f;
}(arr);
const arr4 = function (_l) {
    const _j = (v, i, a) => v * i * a.length;
    const _k = [];
    for (let _i = 0; _i < _l.length; _i++) {
        const _m = _l[_i];
        _k.push(_j(_m, _i, _l));
    }
    return _k;
}(arr);
const f = (v) => v * 2;
const arr5 = function (_q) {
    const _o = f;
    const _p = [];
    for (let _i = 0; _i < _q.length; _i++) {
        const _r = _q[_i];
        _p.push(_o(_r, _i, _q));
    }
    return _p;
}(arr);
