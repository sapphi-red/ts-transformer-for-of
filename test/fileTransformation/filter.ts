const arr = Array.from({ length: 1000 }, (v, i) => i)

const arr2 = arr.filter(n => n % 2 === 0)

const arr3 = arr.filter(
  function(this: { content: string }, n) {
    return n % 2 === 0 && this.content.length > 0
  },
  { content: 'this is this' }
)
