import * as assert from 'assert'
import * as path from 'path'
import * as fs from 'fs'
import { compile, compileCached, compileExcluded, CompileFunc } from './compile/compile'
import * as ts from 'typescript'

const TARGETS = ['ES5', 'ESNext'] as const

const getCompiledText = async (fullFileName: string, compileFunc: CompileFunc, target: keyof typeof ts.ScriptTarget) => {
  const [fileName, data] = await compileFunc([fullFileName], ts.ScriptTarget[target])
  const postCompileFullFileName = fullFileName.replace(/\.ts$/, '.js')
  if (postCompileFullFileName !== path.join(fileName)) {
    return ''
  }
  return data.replace(/\r?\n/g, '\n')
}

const getExpectedText = (fullFileName: string, target: keyof typeof ts.ScriptTarget | 'Excluded') => {
  const data = fs.readFileSync(fullFileName.replace(/\.ts$/, `.${target}.js`), 'utf-8')
  return data.replace(/\r?\n/g, '\n')
}

describe('transforms', () => {
  const fileTransformationDir = path.join(__dirname, 'fileTransformation')
  const tsFiles = fs.readdirSync(fileTransformationDir).filter(file => path.extname(file) === '.ts')

  tsFiles.forEach(file => {
    const fullFileName = path.join(fileTransformationDir, file)

    TARGETS.forEach(target => {
      it(`should transform ${file} as expected when target is ${target}`, async () => {
        let actual = ''
        if (path.basename(file) !== 'forOf-lengthCached.ts') {
          actual = await getCompiledText(fullFileName, compile, target)
        } else {
          // forOf-lengthCached
          actual = await getCompiledText(fullFileName, compileCached, target)
        }

        const expected = getExpectedText(fullFileName, target)

        assert.strictEqual(actual, expected)
      }).timeout(0)
    })

    it(`should not transform ${file} when excluded`, async () => {
      const actual = await getCompiledText(fullFileName, compileExcluded, 'ESNext')
      const expected = getExpectedText(fullFileName, 'Excluded')
      assert.strictEqual(actual, expected)
    }).timeout(0)
  })
})
