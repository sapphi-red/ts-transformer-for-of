"use strict";
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
for (var _i = 0, _a = arr.length; _i < _a; _i++) {
    var v = arr[_i];
    console.log(v);
}
for (var _b = 0, _c = 'string'; _b < _c.length; _b++) {
    var ch = _c[_b];
    console.log(ch);
}
var arr2 = Array.from({ length: 1000 }, function (v, i) { return [i, i + 1]; });
for (var _d = 0, _e = arr2.length; _d < _e; _d++) {
    var v = arr2[_d];
    for (var _f = 0, _g = v.length; _f < _g; _f++) {
        var v2 = v[_f];
        console.log(v2);
    }
}
