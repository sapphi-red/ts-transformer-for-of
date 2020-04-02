"use strict";
const arr = Array.from({ length: 1000 }, (v, i) => i);
const arr2 = function (_a) {
    const _b = n => n * n;
    const _c = [];
    for (let _i = 0, _d = _a.length; _i < _d; _i++) {
        const _e = _a[_i];
        _c.push(_b(_e, _i, _a));
    }
    return _c;
}(arr);
const arr3 = function (_a) {
    const _b = function (n) {
        return n * n * this;
    }.bind(2);
    const _c = [];
    for (let _i = 0, _d = _a.length; _i < _d; _i++) {
        const _e = _a[_i];
        _c.push(_b(_e, _i, _a));
    }
    return _c;
}(arr);
const arr4 = function (_a) {
    const _b = (v, i, a) => v * i * a.length;
    const _c = [];
    for (let _i = 0, _d = _a.length; _i < _d; _i++) {
        const _e = _a[_i];
        _c.push(_b(_e, _i, _a));
    }
    return _c;
}(arr);
const f = (v) => v * 2;
const arr5 = function (_a) {
    const _b = f;
    const _c = [];
    for (let _i = 0, _d = _a.length; _i < _d; _i++) {
        const _e = _a[_i];
        _c.push(_b(_e, _i, _a));
    }
    return _c;
}(arr);
