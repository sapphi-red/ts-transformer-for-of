import * as ts from 'typescript'
import transformer from '../../transformer'
import type { TransformerOptions } from '../../transformer'

const _compile = (
  transformer?: (program: ts.Program, opts?: TransformerOptions) => ts.TransformerFactory<ts.SourceFile>,
  opts?: TransformerOptions
) => {
  return (filePaths: string[], target: ts.ScriptTarget, writeFile = false) => {
    return new Promise<[string, string]>((resolve, reject) => {
      const program = ts.createProgram(filePaths, {
        strict: true,
        noEmitOnError: true,
        suppressImplicitAnyIndexErrors: true,
        target,
        module: ts.ModuleKind.CommonJS
      })
      const transformers: ts.CustomTransformers = transformer
        ? {
            before: [transformer(program, opts)],
            after: []
          }
        : {}
      const writeFileCallback: ts.WriteFileCallback | undefined =
        writeFile
          ? undefined
          : (fileName, data) => {
            resolve([fileName, data])
          }
      const { emitSkipped, diagnostics } = program.emit(undefined, writeFileCallback, undefined, false, transformers)

      if (emitSkipped) {
        reject(new Error(diagnostics.map(diagnostic => diagnostic.messageText).join('\n')))
        return
      }
    })
  }
}

export type CompileFunc = typeof compile

export const compile = _compile(transformer)
export const compileRaw = _compile()
export const compileCached = _compile(transformer, { cacheLength: true })
export const compileExcluded = _compile(transformer, { exclusions: ['Array-for-of', 'Array-forEach', 'Array-map', 'Array-filter'] })
