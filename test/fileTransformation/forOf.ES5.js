"use strict";
var arr = Array.from({ length: 1000 }, function (v, i) { return i; });
for (var _i = 0; _i < arr.length; _i++) {
    var v = arr[_i];
    console.log(v);
}
for (var _a = 0, _b = 'string'; _a < _b.length; _a++) {
    var ch = _b[_a];
    console.log(ch);
}
var arr2 = Array.from({ length: 1000 }, function (v, i) { return [i, i + 1]; });
for (var _c = 0; _c < arr2.length; _c++) {
    var v = arr2[_c];
    for (var _d = 0; _d < v.length; _d++) {
        var v2 = v[_d];
        console.log(v2);
    }
}
