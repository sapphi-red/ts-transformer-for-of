import * as ts from 'typescript'
import transformer from '../../transformer'

const _compile = (transformer?: (program: ts.Program) => ts.TransformerFactory<ts.SourceFile>) => {
  return (filePaths: string[], target = ts.ScriptTarget.ES5, writeFileCallback?: ts.WriteFileCallback) => {
    const program = ts.createProgram(filePaths, {
      strict: true,
      noEmitOnError: true,
      suppressImplicitAnyIndexErrors: true,
      target
    })
    const transformers: ts.CustomTransformers = transformer
      ? {
          before: [transformer(program)],
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
