"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
const arr = Array.from({ length: 1000 }, (v, i) => i);
const arr2 = function (_c) {
    const _a = n => n % 2 === 0;
    const _b = [];
    for (let _i = 0; _i < _c.length; _i++) {
        const _d = _c[_i];
        if (!_a(_d, _i, _c))
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
        if (!_e(_h, _i, _g))
            continue;
        _f.push(_h);
    }
    return _f;
}(arr);
const arr4 = function (_l) {
    const _j = (v, i, a) => v % 5 === 0 || (i % 3 === 0 && a[i + 1] % 2 === 0);
    const _k = [];
    for (let _i = 0; _i < _l.length; _i++) {
        const _m = _l[_i];
        if (!_j(_m, _i, _l))
            continue;
        _k.push(_m);
    }
    return _k;
}(arr);
const f = (v) => (v - 2) % 3 === 0;
const arr5 = function (_q) {
    const _o = f;
    const _p = [];
    for (let _i = 0; _i < _q.length; _i++) {
        const _r = _q[_i];
        if (!_o(_r, _i, _q))
            continue;
        _p.push(_r);
    }
    return _p;
}(arr);
const f2 = function (v) {
    return ((v - 2) % 3) + this === 0;
};
const arr6 = function (_u) {
    const _s = f2.bind(200);
    const _t = [];
    for (let _i = 0; _i < _u.length; _i++) {
        const _v = _u[_i];
        if (!_s(_v, _i, _u))
            continue;
        _t.push(_v);
    }
    return _t;
}(arr);
