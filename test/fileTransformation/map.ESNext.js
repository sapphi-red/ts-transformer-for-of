"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
const arr = Array.from({ length: 1000 }, (v, i) => i);
const arr2 = function (_c) {
    const _a = n => n * n;
    const _b = [];
    for (let _i = 0, _e = _c.length; _i < _e; _i++) {
        const _d = _c[_i];
        _b.push(_a(_d, _i, _c));
    }
    return _b;
}(arr);
const arr3 = function (_h) {
    const _f = function (n) {
        return n * n * this;
    }.bind(2);
    const _g = [];
    for (let _i = 0, _k = _h.length; _i < _k; _i++) {
        const _j = _h[_i];
        _g.push(_f(_j, _i, _h));
    }
    return _g;
}(arr);
const arr4 = function (_o) {
    const _l = (v, i, a) => v * i * a.length;
    const _m = [];
    for (let _i = 0, _q = _o.length; _i < _q; _i++) {
        const _p = _o[_i];
        _m.push(_l(_p, _i, _o));
    }
    return _m;
}(arr);
const f = (v) => v * 2;
const arr5 = function (_t) {
    const _r = f;
    const _s = [];
    for (let _i = 0, _v = _t.length; _i < _v; _i++) {
        const _u = _t[_i];
        _s.push(_r(_u, _i, _t));
    }
    return _s;
}(arr);
