"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
var arr2 = function (_c) {
    var _a = function (n) { return n * n; };
    var _b = [];
    for (var _i = 0, _e = _c.length; _i < _e; _i++) {
        var _d = _c[_i];
        _b.push(_a(_d, _i, _c));
    }
    return _b;
}(arr);
var arr3 = function (_h) {
    var _f = function (n) {
        return n * n * this;
    }.bind(2);
    var _g = [];
    for (var _i = 0, _k = _h.length; _i < _k; _i++) {
        var _j = _h[_i];
        _g.push(_f(_j, _i, _h));
    }
    return _g;
}(arr);
var arr4 = function (_o) {
    var _l = function (v, i, a) { return v * i * a.length; };
    var _m = [];
    for (var _i = 0, _q = _o.length; _i < _q; _i++) {
        var _p = _o[_i];
        _m.push(_l(_p, _i, _o));
    }
    return _m;
}(arr);
var f = function (v) { return v * 2; };
var arr5 = function (_t) {
    var _r = f;
    var _s = [];
    for (var _i = 0, _v = _t.length; _i < _v; _i++) {
        var _u = _t[_i];
        _s.push(_r(_u, _i, _t));
    }
    return _s;
}(arr);
