"use strict";
const arr = Array.from({ length: 1000 }, (v, i) => i);
const arr2 = function (_a) {
    const _b = n => n % 2 === 0;
    const _c = [];
    for (let _i = 0, _d = _a.length; _i < _d; _i++) {
        const _e = _a[_i];
        if (!_b(_e, _i, _a))
            continue;
        _c.push(_e);
    }
    return _c;
}(arr);
const arr3 = function (_a) {
    const _b = function (n) {
        return n % 2 === 0 && this.content.length > 0;
    }.bind({ content: 'this is this' });
    const _c = [];
    for (let _i = 0, _d = _a.length; _i < _d; _i++) {
        const _e = _a[_i];
        if (!_b(_e, _i, _a))
            continue;
        _c.push(_e);
    }
    return _c;
}(arr);
const arr4 = function (_a) {
    const _b = (v, i, a) => v % 5 === 0 || (i % 3 === 0 && a[i + 1] % 2 === 0);
    const _c = [];
    for (let _i = 0, _d = _a.length; _i < _d; _i++) {
        const _e = _a[_i];
        if (!_b(_e, _i, _a))
            continue;
        _c.push(_e);
    }
    return _c;
}(arr);
const f = (v) => (v - 2) % 3 === 0;
const arr5 = function (_a) {
    const _b = f;
    const _c = [];
    for (let _i = 0, _d = _a.length; _i < _d; _i++) {
        const _e = _a[_i];
        if (!_b(_e, _i, _a))
            continue;
        _c.push(_e);
    }
    return _c;
}(arr);
const f2 = function (v) {
    return ((v - 2) % 3) + this === 0;
};
const arr6 = function (_a) {
    const _b = f2.bind(200);
    const _c = [];
    for (let _i = 0, _d = _a.length; _i < _d; _i++) {
        const _e = _a[_i];
        if (!_b(_e, _i, _a))
            continue;
        _c.push(_e);
    }
    return _c;
}(arr);
