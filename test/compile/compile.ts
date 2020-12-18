import * as ts from 'typescript'
import transformer from '../../transformer'
import type { TransformerOptions } from '../../transformer'

const _compile = (
  transformer?: (program: ts.Program, opts?: TransformerOptions) => ts.TransformerFactory<ts.SourceFile>,
  opts?: TransformerOptions
) => {
  return (filePaths: string[], target = ts.ScriptTarget.ES5, writeFileCallback?: ts.WriteFileCallback) => {
    const program = ts.createProgram(filePaths, {
      strict: true,
      noEmitOnError: true,
      suppressImplicitAnyIndexErrors: true,
      target
    })
    const transformers: ts.CustomTransformers = transformer
      ? {
          before: [transformer(program, opts)],
          after: []
        }
      : {}
    const { emitSkipped, diagnostics } = program.emit(undefined, writeFileCallback, undefined, false, transformers)

    if (emitSkipped) {
      throw new Error(diagnostics.map(diagnostic => diagnostic.messageText).join('\n'))
    }
  }
}

export const compile = _compile(transformer)
export const compileRaw = _compile()
export const compileCached = _compile(transformer, { cacheLength: true })
