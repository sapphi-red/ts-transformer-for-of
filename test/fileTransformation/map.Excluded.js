"use strict";
const arr = Array.from({ length: 1000 }, (v, i) => i);
const arr2 = arr.map(n => n * n);
const arr3 = arr.map(function (n) {
    return n * n * this;
}, 2);
const arr4 = arr.map((v, i, a) => v * i * a.length);
const f = (v) => v * 2;
const arr5 = arr.map(f);
