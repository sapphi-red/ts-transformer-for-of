const arr = Array.from({ length: 1000 }, (v, i) => i)

arr.forEach(n => {
  console.log(n + 5)
});

arr.forEach(function(this: number, n) {
  console.log(n + this)
}, 2);
