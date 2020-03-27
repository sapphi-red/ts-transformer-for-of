"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
var arr2 = function (_c) {
    var _a = function (n) { return n % 2 === 0; };
    var _b = [];
    for (var _i = 0; _i < _c.length; _i++) {
        var _d = _c[_i];
        if (!_a(_d, _i, _c))
            continue;
        _b.push(_d);
    }
    return _b;
}(arr);
var arr3 = function (_g) {
    var _e = function (n) {
        return n % 2 === 0 && this.content.length > 0;
    }.bind({ content: 'this is this' });
    var _f = [];
    for (var _i = 0; _i < _g.length; _i++) {
        var _h = _g[_i];
        if (!_e(_h, _i, _g))
            continue;
        _f.push(_h);
    }
    return _f;
}(arr);
var arr4 = function (_l) {
    var _j = function (v, i, a) { return v % 5 === 0 || (i % 3 === 0 && a[i + 1] % 2 === 0); };
    var _k = [];
    for (var _i = 0; _i < _l.length; _i++) {
        var _m = _l[_i];
        if (!_j(_m, _i, _l))
            continue;
        _k.push(_m);
    }
    return _k;
}(arr);
var f = function (v) { return (v - 2) % 3 === 0; };
var arr5 = function (_q) {
    var _o = f;
    var _p = [];
    for (var _i = 0; _i < _q.length; _i++) {
        var _r = _q[_i];
        if (!_o(_r, _i, _q))
            continue;
        _p.push(_r);
    }
    return _p;
}(arr);
var f2 = function (v) {
    return ((v - 2) % 3) + this === 0;
};
var arr6 = function (_u) {
    var _s = f2.bind(200);
    var _t = [];
    for (var _i = 0; _i < _u.length; _i++) {
        var _v = _u[_i];
        if (!_s(_v, _i, _u))
            continue;
        _t.push(_v);
    }
    return _t;
}(arr);
