"use strict";
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
var arr2 = function (_a) {
    var _b = function (n) { return n * n; };
    var _c = [];
    for (var _i = 0, _d = _a.length; _i < _d; _i++) {
        var _e = _a[_i];
        _c.push(_b(_e, _i, _a));
    }
    return _c;
}(arr);
var arr3 = function (_a) {
    var _b = function (n) {
        return n * n * this;
    }.bind(2);
    var _c = [];
    for (var _i = 0, _d = _a.length; _i < _d; _i++) {
        var _e = _a[_i];
        _c.push(_b(_e, _i, _a));
    }
    return _c;
}(arr);
var arr4 = function (_a) {
    var _b = function (v, i, a) { return v * i * a.length; };
    var _c = [];
    for (var _i = 0, _d = _a.length; _i < _d; _i++) {
        var _e = _a[_i];
        _c.push(_b(_e, _i, _a));
    }
    return _c;
}(arr);
var f = function (v) { return v * 2; };
var arr5 = function (_a) {
    var _b = f;
    var _c = [];
    for (var _i = 0, _d = _a.length; _i < _d; _i++) {
        var _e = _a[_i];
        _c.push(_b(_e, _i, _a));
    }
    return _c;
}(arr);
