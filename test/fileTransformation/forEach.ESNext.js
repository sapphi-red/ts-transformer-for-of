"use strict";
var _a, _b, _c, _d, _e, _f;
const arr = Array.from({ length: 1000 }, (v, i) => i);
(function (_b) {
    var _a = n => {
        console.log(n + 5);
    };
    for (_c of _b) {
        _a(_c);
    }
})(arr);
(function (_e) {
    var _d = function (n) {
        console.log(n + this);
    }.bind(2);
    for (_f of _e) {
        _d(_f);
    }
})(arr);
