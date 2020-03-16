import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
import { compile } from './compile/compile';
import * as ts from 'typescript';

describe('transforms', () => {
  const fileTransformationDir = path.join(__dirname, 'fileTransformation');
  fs.readdirSync(fileTransformationDir).filter((file) => path.extname(file) === '.ts').forEach(file =>
    (['ES5', 'ESNext'] as const).forEach(target =>
      it(`should transform ${file} as expected when target is ${target}`, async () => {
        let result = '';
        const fullFileName = path.join(fileTransformationDir, file), postCompileFullFileName = fullFileName.replace(/\.ts$/, '.js');
        compile([fullFileName], ts.ScriptTarget[target], (fileName, data) => postCompileFullFileName === path.join(fileName) && (result = data));
        assert.strictEqual(result.replace(/\r\n/g, '\n'), fs.readFileSync(fullFileName.replace(/\.ts$/, `.${target}.js`), 'utf-8'));
      }).timeout(0)
    )
  );
});
