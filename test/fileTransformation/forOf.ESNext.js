"use strict";
const arr = Array.from({ length: 1000 }, (v, i) => i);
for (let _i = 0; _i < arr.length; _i++) {
    const v = arr[_i];
    console.log(v);
}
for (const ch of 'string') {
    console.log(ch);
}
const arr2 = Array.from({ length: 1000 }, (v, i) => [i, i + 1]);
for (let _a = 0; _a < arr2.length; _a++) {
    const v = arr2[_a];
    for (let _b = 0; _b < v.length; _b++) {
        const v2 = v[_b];
        console.log(v2);
    }
}
