const arr = Array.from({ length: 1000 }, (v, i) => i)

for (const v of arr) {
  console.log(v)
}

for (const ch of 'string') {
  console.log(ch)
}

const arr2 = Array.from({ length: 1000 }, (v, i) => [i, i + 1])

for (const v of arr2) {
  for (const v2 of v) {
    console.log(v2)
  }
}
