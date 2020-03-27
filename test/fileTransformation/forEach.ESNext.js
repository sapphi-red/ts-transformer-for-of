"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
const arr = Array.from({ length: 1000 }, (v, i) => i);
(function (_b) {
    const _a = n => {
        console.log(n + 5);
    };
    for (let _i = 0; _i < _b.length; _i++) {
        const _c = _b[_i];
        _a(_c, _i, _b);
    }
})(arr);
(function (_e) {
    const _d = function (n) {
        console.log(n + this);
    }.bind(2);
    for (let _i = 0; _i < _e.length; _i++) {
        const _f = _e[_i];
        _d(_f, _i, _e);
    }
})(arr);
(function (_h) {
    const _g = (v, i, a) => {
        console.log(v, i, a[i + 1]);
    };
    for (let _i = 0; _i < _h.length; _i++) {
        const _j = _h[_i];
        _g(_j, _i, _h);
    }
})(arr);
(function (_l) {
    const _k = console.log;
    for (let _i = 0; _i < _l.length; _i++) {
        const _m = _l[_i];
        _k(_m, _i, _l);
    }
})(arr);
