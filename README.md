# ts-transformer-for-of
A TypeScript custom transformer which transforms multiple array methods to one for-of loop.

For now, `Array::filter` and `Array::map` are only supported.

## How to use the custom transformer

Unfortunately, TypeScript itself does not currently provide any easy way to use custom transformers (See [Microsoft/TypeScript#14419](https://github.com/Microsoft/TypeScript/issues/14419)).
The followings are the example usage of the custom transformer.

See [kimamula/ts-transformer-keys](https://github.com/kimamula/ts-transformer-keys/blob/master/README.md#how-to-use-the-custom-transformer).  
You can use this as it.

# License

MIT

Some code are from [kimamula/ts-transformer-keys](https://github.com/kimamula/ts-transformer-keys/blob/master/README.md#how-to-use-the-custom-transformer).  
Copyright (c) 2017 Kenji Imamula  
[kimamula/ts-transformer-keys:/LICENSE](https://github.com/kimamula/ts-transformer-keys/blob/master/LICENSE)
