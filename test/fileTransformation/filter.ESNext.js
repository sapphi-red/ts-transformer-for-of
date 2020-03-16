"use strict";
var _a, _b, _c, _d;
const arr = Array.from({ length: 1000 }, (v, i) => i);
const arr2 = function (_a) {
    var _b = n => n % 2 === 0;
    var _c = [];
    for (_d of _a) {
        if (!_b(_d))
            continue;
        _c.push(_d);
    }
    return _c;
}(arr);
