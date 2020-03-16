"use strict";
var _a, _b, _c, _d;
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
var arr2 = function (_a) {
    var _b = function (n) { return n % 2 === 0; };
    var _c = [];
    for (var _i = 0, _a_1 = _a; _i < _a_1.length; _i++) {
        _d = _a_1[_i];
        if (!_b(_d))
            continue;
        _c.push(_d);
    }
    return _c;
}(arr);
