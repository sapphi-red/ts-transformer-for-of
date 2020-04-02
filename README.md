# ts-transformer-for-of
A TypeScript custom transformer which transforms multiple array methods to one for loop.
Also this transforms `for-of` to a traditional `for` loop.

For now, `Array::filter`, `Array::map` and `Array::forEach` are only supported.

# How to use the custom transformer

Unfortunately, TypeScript itself does not currently provide any easy way to use custom transformers (See [Microsoft/TypeScript#14419](https://github.com/Microsoft/TypeScript/issues/14419)).
The followings are the example usage of the custom transformer.

See [kimamula/ts-transformer-keys](https://github.com/kimamula/ts-transformer-keys/blob/master/README.md#how-to-use-the-custom-transformer).  
You can use this as it.

# Caveats
## Sparse arrays are not supported
Using this transformer with Sparse arrays, arrays with unfilled slots, may lead to unintended behavior.
Before transforming the code, Array iteration methods will skip unfilled slots, but after transforming the code it will work as if it is filled with `undefined`.

# License

MIT

Some code are from [kimamula/ts-transformer-keys](https://github.com/kimamula/ts-transformer-keys/blob/master/README.md#how-to-use-the-custom-transformer).  
Copyright (c) 2017 Kenji Imamula  
[kimamula/ts-transformer-keys:/LICENSE](https://github.com/kimamula/ts-transformer-keys/blob/master/LICENSE)
