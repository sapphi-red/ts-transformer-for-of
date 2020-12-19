import * as assert from 'assert'
import * as path from 'path'
import * as fs from 'fs'
import { compile, compileCached, compileExcluded } from './compile/compile'
import * as ts from 'typescript'

describe('transforms', () => {
  const fileTransformationDir = path.join(__dirname, 'fileTransformation')
  fs.readdirSync(fileTransformationDir)
    .filter(file => {
      return path.extname(file) === '.ts'
    })
    .forEach(file =>
      (['ES5', 'ESNext', 'Excluded'] as const).forEach(target =>
        it(`should transform ${file} as expected when target is ${target}`, async () => {
          let result = ''
          const fullFileName = path.join(fileTransformationDir, file),
            postCompileFullFileName = fullFileName.replace(/\.ts$/, '.js')

            if (target !== 'Excluded') {
              if ( path.basename(file) !== 'forOf-lengthCached.ts' ) {
                compile(
                  [fullFileName],
                  ts.ScriptTarget[target],
                  (fileName, data) => postCompileFullFileName === path.join(fileName) && (result = data)
                )
              } else {
                // forOf-lengthCached
                compileCached(
                  [fullFileName],
                  ts.ScriptTarget[target],
                  (fileName, data) => postCompileFullFileName === path.join(fileName) && (result = data)
                )
              }
          } else {
            // check exclusions
            compileExcluded(
              [fullFileName],
              ts.ScriptTarget['ESNext'],
              (fileName, data) => postCompileFullFileName === path.join(fileName) && (result = data)
            )
          }

          assert.strictEqual(
            result.replace(/\r?\n/g, '\n'),
            fs.readFileSync(fullFileName.replace(/\.ts$/, `.${target}.js`), 'utf-8').replace(/\r?\n/g, '\n')
          )
        }).timeout(0)
      )
    )
})
