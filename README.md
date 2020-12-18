# ts-transformer-for-of
A TypeScript custom transformer to transform `for-of` and array methods like `filter`, `map`, `forEach` to a normal `for` loop.

This transformation results in a higher performance. See [here](https://github.com/aminya/typescript-optimization) for benchmarks.

```shell
npm install --save-dev @sapphi-red/ts-transformer-for-of
```

# How to use the custom transformer
### ttypescript
Install ttypescript and use `ttsc` like how you use `tsc`
```shell
npm install --save-dev ttypescript
```

In tsconfig.json:
```jsonc
{
  "compilerOptions": {
    // ...
    "plugins": [
      { 
      	"transform": "@sapphi-red/ts-transformer-for-of", 
      	"cacheLength": false  // cache the length of the array in `for-of` transformations. Defaults to false.
      } 
    ]
  },
  // ...
}
```

See [ttypescript's README](https://github.com/cevek/ttypescript/blob/master/README.md) for how to use this with module bundlers such as webpack or Rollup.

### other methods
See [kimamula/ts-transformer-keys](https://github.com/kimamula/ts-transformer-keys/blob/master/README.md#how-to-use-the-custom-transformer) for other methods.

# Caveats
## Sparse arrays are not supported
Using this transformer with Sparse arrays, arrays with unfilled slots, may lead to unintended behavior.
Before transforming the code, Array iteration methods will skip unfilled slots, but after transforming the code it will work as if it is filled with `undefined`.

# License

MIT

Some code are from [kimamula/ts-transformer-keys](https://github.com/kimamula/ts-transformer-keys/blob/master/README.md#how-to-use-the-custom-transformer).  
Copyright (c) 2017 Kenji Imamula  
[kimamula/ts-transformer-keys:/LICENSE](https://github.com/kimamula/ts-transformer-keys/blob/master/LICENSE)
