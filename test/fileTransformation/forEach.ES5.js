"use strict";
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
(function (_a) {
    var _b = function (n) {
        console.log(n + 5);
    };
    for (var _i = 0, _c = _a.length; _i < _c; _i++) {
        var _d = _a[_i];
        _b(_d, _i, _a);
    }
})(arr);
(function (_a) {
    var _b = function (n) {
        console.log(n + this);
    }.bind(2);
    for (var _i = 0, _c = _a.length; _i < _c; _i++) {
        var _d = _a[_i];
        _b(_d, _i, _a);
    }
})(arr);
(function (_a) {
    var _b = function (v, i, a) {
        console.log(v, i, a[i + 1]);
    };
    for (var _i = 0, _c = _a.length; _i < _c; _i++) {
        var _d = _a[_i];
        _b(_d, _i, _a);
    }
})(arr);
(function (_a) {
    var _b = console.log;
    for (var _i = 0, _c = _a.length; _i < _c; _i++) {
        var _d = _a[_i];
        _b(_d, _i, _a);
    }
})(arr);
