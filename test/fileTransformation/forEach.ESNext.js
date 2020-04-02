"use strict";
const arr = Array.from({ length: 1000 }, (v, i) => i);
(function (_a) {
    const _b = n => {
        console.log(n + 5);
    };
    for (let _i = 0, _c = _a.length; _i < _c; _i++) {
        const _d = _a[_i];
        _b(_d, _i, _a);
    }
})(arr);
(function (_a) {
    const _b = function (n) {
        console.log(n + this);
    }.bind(2);
    for (let _i = 0, _c = _a.length; _i < _c; _i++) {
        const _d = _a[_i];
        _b(_d, _i, _a);
    }
})(arr);
(function (_a) {
    const _b = (v, i, a) => {
        console.log(v, i, a[i + 1]);
    };
    for (let _i = 0, _c = _a.length; _i < _c; _i++) {
        const _d = _a[_i];
        _b(_d, _i, _a);
    }
})(arr);
(function (_a) {
    const _b = console.log;
    for (let _i = 0, _c = _a.length; _i < _c; _i++) {
        const _d = _a[_i];
        _b(_d, _i, _a);
    }
})(arr);
