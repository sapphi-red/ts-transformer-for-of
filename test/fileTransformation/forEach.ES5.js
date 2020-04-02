"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
(function (_b) {
    var _a = function (n) {
        console.log(n + 5);
    };
    for (var _i = 0, _d = _b.length; _i < _d; _i++) {
        var _c = _b[_i];
        _a(_c, _i, _b);
    }
})(arr);
(function (_f) {
    var _e = function (n) {
        console.log(n + this);
    }.bind(2);
    for (var _i = 0, _h = _f.length; _i < _h; _i++) {
        var _g = _f[_i];
        _e(_g, _i, _f);
    }
})(arr);
(function (_k) {
    var _j = function (v, i, a) {
        console.log(v, i, a[i + 1]);
    };
    for (var _i = 0, _m = _k.length; _i < _m; _i++) {
        var _l = _k[_i];
        _j(_l, _i, _k);
    }
})(arr);
(function (_p) {
    var _o = console.log;
    for (var _i = 0, _r = _p.length; _i < _r; _i++) {
        var _q = _p[_i];
        _o(_q, _i, _p);
    }
})(arr);
