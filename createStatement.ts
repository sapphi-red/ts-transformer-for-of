import * as ts from 'typescript'
import type { TransformerOptions } from './transformer'

const createConst = (declarations: ts.VariableDeclaration[]): ts.VariableStatement =>
  ts.createVariableStatement(undefined, ts.createVariableDeclarationList(declarations, ts.NodeFlags.Const))

export const wrapWithFunc = (
  getStatements: (inputVar: ts.Identifier) => ts.Statement[],
) => {
  const inputVar = ts.createTempVariable(undefined)
  const inputParam = ts.createParameter([], [], undefined, inputVar)
  return ts.createFunctionExpression(
    [],
    undefined,
    undefined,
    [],
    [inputParam],
    undefined,
    ts.createBlock(getStatements(inputVar), true)
  )
}

export const createBlock = (
  getStatements: (inputVar: ts.Identifier) => ts.Statement[]
) => {
  const inputVar = ts.createTempVariable(undefined)
  return ts.createBlock(getStatements(inputVar))
}

export const createblockOrWrapWithFunc = (
  getStatements: (inputVar: ts.Identifier) => ts.Statement[],
  opts: TransformerOptions
) => {
  return opts.wrapWithFunc ? wrapWithFunc(getStatements) : createBlock(getStatements)
}

export const createFor = (
  inputVar: ts.Expression,
  getStatements: (nVar: ts.Identifier, iVar: ts.Identifier) => ts.Statement[] | ts.NodeArray<ts.Statement>,
  cacheLength: boolean = false,
  nVar: ts.Identifier = ts.createTempVariable(undefined)
): ts.ForStatement => {
  const iVar = ts.createLoopVariable()

  const varDeclarations = [ts.createVariableDeclaration(iVar, undefined, ts.createLiteral(0))]
  let lessThan = ts.createLessThan(iVar, ts.createPropertyAccess(inputVar, 'length'))

  if (cacheLength) {
    const lenVar = ts.createTempVariable(undefined)
    varDeclarations.push(ts.createVariableDeclaration(lenVar, undefined, ts.createPropertyAccess(inputVar, 'length')))
    lessThan = ts.createLessThan(iVar, lenVar)
  }

  return ts.createFor(
    ts.createVariableDeclarationList(
      varDeclarations,
      ts.NodeFlags.Let
    ),
    lessThan,
    ts.createPostfixIncrement(iVar),
    ts.createBlock(
      ([
        createConst([ts.createVariableDeclaration(nVar, undefined, ts.createElementAccess(inputVar, iVar))])
      ] as ts.Statement[]).concat(getStatements(nVar, iVar))
    )
  )
}

type CreateTmpFunction = (
  bindedCallback: ts.Expression,
  opts: TransformerOptions
) => ts.FunctionExpression | ts.Block

export const createFilterTmpFunction: CreateTmpFunction = (bindedCallback, opts) => {
  const callbackFuncVar = ts.createTempVariable(undefined)
  const outputVar = ts.createTempVariable(undefined)
  return createblockOrWrapWithFunc(inputVar => [
    createConst([ts.createVariableDeclaration(callbackFuncVar, undefined, bindedCallback)]),
    createConst([ts.createVariableDeclaration(outputVar, undefined, ts.createArrayLiteral())]),
    createFor(inputVar, (nVar, iVar) => [
      ts.createIf(ts.createLogicalNot(ts.createCall(callbackFuncVar, [], [nVar, iVar, inputVar])), ts.createContinue()),
      ts.createExpressionStatement(ts.createCall(ts.createPropertyAccess(outputVar, 'push'), [], [nVar]))
    ], true),
    ts.createReturn(outputVar)
  ], opts)
}

export const createMapTmpFunction: CreateTmpFunction = (bindedCallback, opts) => {
  const callbackFuncVar = ts.createTempVariable(undefined)
  const outputVar = ts.createTempVariable(undefined)
  return createblockOrWrapWithFunc(inputVar => [
    createConst([ts.createVariableDeclaration(callbackFuncVar, undefined, bindedCallback)]),
    createConst([ts.createVariableDeclaration(outputVar, undefined, ts.createArrayLiteral())]),
    createFor(inputVar, (nVar, iVar) => [
      ts.createExpressionStatement(
        ts.createCall(ts.createPropertyAccess(outputVar, 'push'), [], [ts.createCall(callbackFuncVar, [], [nVar, iVar, inputVar])])
      )
    ], true),
    ts.createReturn(outputVar)
  ], opts)
}

export const createForEachTmpFunction: CreateTmpFunction = (bindedCallback, opts) => {
  const callbackFuncVar = ts.createTempVariable(undefined)
  return createblockOrWrapWithFunc(inputVar => [
    createConst([ts.createVariableDeclaration(callbackFuncVar, undefined, bindedCallback)]),
    createFor(inputVar, (nVar, iVar) => [
      ts.createExpressionStatement(ts.createCall(callbackFuncVar, [], [nVar, iVar, inputVar]))
    ], true)
  ], opts)
}
