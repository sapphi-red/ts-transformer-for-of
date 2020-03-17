"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
const arr = Array.from({ length: 1000 }, (v, i) => i);
(function (_a) {
    var _b = n => {
        console.log(n + 5);
    };
    for (_d of _a) {
        _b(_d);
    }
})(arr);
(function (_e) {
    var _f = function (n) {
        console.log(n + this);
    }.bind(2);
    for (_h of _e) {
        _f(_h);
    }
})(arr);
