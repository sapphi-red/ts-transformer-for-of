"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
const arr = Array.from({ length: 1000 }, (v, i) => i);
(function (_b) {
    const _a = n => {
        console.log(n + 5);
    };
    for (let _i = 0, _d = _b.length; _i < _d; _i++) {
        const _c = _b[_i];
        _a(_c, _i, _b);
    }
})(arr);
(function (_f) {
    const _e = function (n) {
        console.log(n + this);
    }.bind(2);
    for (let _i = 0, _h = _f.length; _i < _h; _i++) {
        const _g = _f[_i];
        _e(_g, _i, _f);
    }
})(arr);
(function (_k) {
    const _j = (v, i, a) => {
        console.log(v, i, a[i + 1]);
    };
    for (let _i = 0, _m = _k.length; _i < _m; _i++) {
        const _l = _k[_i];
        _j(_l, _i, _k);
    }
})(arr);
(function (_p) {
    const _o = console.log;
    for (let _i = 0, _r = _p.length; _i < _r; _i++) {
        const _q = _p[_i];
        _o(_q, _i, _p);
    }
})(arr);
