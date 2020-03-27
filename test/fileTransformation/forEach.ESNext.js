"use strict";
var _a, _b, _c, _d, _e, _f;
const arr = Array.from({ length: 1000 }, (v, i) => i);
(function (_b) {
    const _a = n => {
        console.log(n + 5);
    };
    for (let _i = 0; _i < _b.length; _i++) {
        const _c = _b[_i];
        _a(_c);
    }
})(arr);
(function (_e) {
    const _d = function (n) {
        console.log(n + this);
    }.bind(2);
    for (let _i = 0; _i < _e.length; _i++) {
        const _f = _e[_i];
        _d(_f);
    }
})(arr);
