const ts = require('typescript')
const { compile } = require('./compile')
const path = require('path')

compile([path.join(__dirname, '../index.ts')], ts.ScriptTarget.ES5, true)
