"use strict";
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
var arr2 = function (_a) {
    var _b = function (n) { return n % 2 === 0; };
    var _c = [];
    for (var _i = 0, _d = _a.length; _i < _d; _i++) {
        var _e = _a[_i];
        if (!_b(_e, _i, _a))
            continue;
        _c.push(_e);
    }
    return _c;
}(arr);
var arr3 = function (_a) {
    var _b = function (n) {
        return n % 2 === 0 && this.content.length > 0;
    }.bind({ content: 'this is this' });
    var _c = [];
    for (var _i = 0, _d = _a.length; _i < _d; _i++) {
        var _e = _a[_i];
        if (!_b(_e, _i, _a))
            continue;
        _c.push(_e);
    }
    return _c;
}(arr);
var arr4 = function (_a) {
    var _b = function (v, i, a) { return v % 5 === 0 || (i % 3 === 0 && a[i + 1] % 2 === 0); };
    var _c = [];
    for (var _i = 0, _d = _a.length; _i < _d; _i++) {
        var _e = _a[_i];
        if (!_b(_e, _i, _a))
            continue;
        _c.push(_e);
    }
    return _c;
}(arr);
var f = function (v) { return (v - 2) % 3 === 0; };
var arr5 = function (_a) {
    var _b = f;
    var _c = [];
    for (var _i = 0, _d = _a.length; _i < _d; _i++) {
        var _e = _a[_i];
        if (!_b(_e, _i, _a))
            continue;
        _c.push(_e);
    }
    return _c;
}(arr);
var f2 = function (v) {
    return ((v - 2) % 3) + this === 0;
};
var arr6 = function (_a) {
    var _b = f2.bind(200);
    var _c = [];
    for (var _i = 0, _d = _a.length; _i < _d; _i++) {
        var _e = _a[_i];
        if (!_b(_e, _i, _a))
            continue;
        _c.push(_e);
    }
    return _c;
}(arr);
