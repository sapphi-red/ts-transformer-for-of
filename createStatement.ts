import * as ts from 'typescript';

type HoistVariableDeclaration = (node: ts.Identifier) => void

export const wrapWithFunc = (hoistVariableDeclaration: HoistVariableDeclaration, getStatements: (inputVar: ts.Identifier) => ts.Statement[]) => {
  const inputVar = ts.createTempVariable(hoistVariableDeclaration)
  const inputParam = ts.createParameter([], [], undefined, inputVar)
  return ts.createFunctionExpression([], undefined, undefined, [], [inputParam], undefined, ts.createBlock(
    getStatements(inputVar)
  , true))
}

export const createForOf = (hoistVariableDeclaration: HoistVariableDeclaration, inputVar: ts.Identifier, getStatements: (nVar: ts.Identifier) => ts.Statement[]): ts.ForOfStatement => {
  const nVar = ts.createTempVariable(hoistVariableDeclaration)
  return ts.createForOf(undefined, nVar, inputVar, ts.createBlock(getStatements(nVar), true))
}

type CreateTmpFunction = (hoistVariableDeclaration: HoistVariableDeclaration, bindedCallback: ts.Expression) => ts.FunctionExpression

export const createFilterTmpFunction: CreateTmpFunction = (hoistVariableDeclaration, bindedCallback: ts.Expression) => {
  const callbackFuncVar = ts.createTempVariable(hoistVariableDeclaration)
  const outputVar = ts.createTempVariable(hoistVariableDeclaration)
  return wrapWithFunc(hoistVariableDeclaration, inputVar => [
    ts.createVariableStatement([], [ts.createVariableDeclaration(callbackFuncVar, undefined, bindedCallback)]),
    ts.createVariableStatement([], [ts.createVariableDeclaration(outputVar, undefined, ts.createArrayLiteral())]),
    createForOf(hoistVariableDeclaration, inputVar, nVar => [
      ts.createIf(ts.createLogicalNot(ts.createCall(callbackFuncVar, [], [nVar])), ts.createContinue()),
      ts.createExpressionStatement(ts.createCall(ts.createPropertyAccess(outputVar, 'push'), [], [nVar]))
    ]),
    ts.createReturn(outputVar)
  ])
}

export const createMapTmpFunction: CreateTmpFunction = (hoistVariableDeclaration, bindedCallback) => {
  const callbackFuncVar = ts.createTempVariable(hoistVariableDeclaration)
  const outputVar = ts.createTempVariable(hoistVariableDeclaration)
  return wrapWithFunc(hoistVariableDeclaration, inputVar => [
    ts.createVariableStatement([], [ts.createVariableDeclaration(callbackFuncVar, undefined, bindedCallback)]),
    ts.createVariableStatement([], [ts.createVariableDeclaration(outputVar, undefined, ts.createArrayLiteral())]),
    createForOf(hoistVariableDeclaration, inputVar, nVar => [
      ts.createExpressionStatement(ts.createCall(
        ts.createPropertyAccess(outputVar, 'push'),
        [],
        [ts.createCall(callbackFuncVar, [], [nVar])]
      ))
    ]),
    ts.createReturn(outputVar)
  ])
}

export const createForEachTmpFunction: CreateTmpFunction = (hoistVariableDeclaration, bindedCallback) => {
  const callbackFuncVar = ts.createTempVariable(hoistVariableDeclaration)
  return wrapWithFunc(hoistVariableDeclaration, inputVar => [
    ts.createVariableStatement([], [ts.createVariableDeclaration(callbackFuncVar, undefined, bindedCallback)]),
    createForOf(hoistVariableDeclaration, inputVar, nVar => [
      ts.createExpressionStatement(ts.createCall(callbackFuncVar, [], [nVar]))
    ])
  ])
}
