"use strict";
const arr = Array.from({ length: 1000 }, (v, i) => i);
for (let _i = 0, _a = arr.length; _i < _a; _i++) {
    const v = arr[_i];
    console.log(v);
}
for (const ch of 'string') {
    console.log(ch);
}
const arr2 = Array.from({ length: 1000 }, (v, i) => [i, i + 1]);
for (let _b = 0, _c = arr2.length; _b < _c; _b++) {
    const v = arr2[_b];
    for (let _d = 0, _e = v.length; _d < _e; _d++) {
        const v2 = v[_d];
        console.log(v2);
    }
}
