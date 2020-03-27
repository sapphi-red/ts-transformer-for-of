const arr = Array.from({ length: 1000 }, (v, i) => i)

arr.forEach(n => {
  console.log(n + 5)
})

arr.forEach(function(this: number, n) {
  console.log(n + this)
}, 2)

arr.forEach((v, i, a) => {
  console.log(v, i, a[i + 1])
})

arr.forEach(console.log)
