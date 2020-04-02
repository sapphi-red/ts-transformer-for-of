"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
const arr = Array.from({ length: 1000 }, (v, i) => i);
const arr2 = function (_c) {
    const _a = n => n % 2 === 0;
    const _b = [];
    for (let _i = 0, _e = _c.length; _i < _e; _i++) {
        const _d = _c[_i];
        if (!_a(_d, _i, _c))
            continue;
        _b.push(_d);
    }
    return _b;
}(arr);
const arr3 = function (_h) {
    const _f = function (n) {
        return n % 2 === 0 && this.content.length > 0;
    }.bind({ content: 'this is this' });
    const _g = [];
    for (let _i = 0, _k = _h.length; _i < _k; _i++) {
        const _j = _h[_i];
        if (!_f(_j, _i, _h))
            continue;
        _g.push(_j);
    }
    return _g;
}(arr);
const arr4 = function (_o) {
    const _l = (v, i, a) => v % 5 === 0 || (i % 3 === 0 && a[i + 1] % 2 === 0);
    const _m = [];
    for (let _i = 0, _q = _o.length; _i < _q; _i++) {
        const _p = _o[_i];
        if (!_l(_p, _i, _o))
            continue;
        _m.push(_p);
    }
    return _m;
}(arr);
const f = (v) => (v - 2) % 3 === 0;
const arr5 = function (_t) {
    const _r = f;
    const _s = [];
    for (let _i = 0, _v = _t.length; _i < _v; _i++) {
        const _u = _t[_i];
        if (!_r(_u, _i, _t))
            continue;
        _s.push(_u);
    }
    return _s;
}(arr);
const f2 = function (v) {
    return ((v - 2) % 3) + this === 0;
};
const arr6 = function (_y) {
    const _w = f2.bind(200);
    const _x = [];
    for (let _i = 0, _0 = _y.length; _i < _0; _i++) {
        const _z = _y[_i];
        if (!_w(_z, _i, _y))
            continue;
        _x.push(_z);
    }
    return _x;
}(arr);
