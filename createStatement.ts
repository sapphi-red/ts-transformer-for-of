import * as ts from 'typescript';

const createConst = (declarations: ts.VariableDeclaration[]): ts.VariableStatement => ts.createVariableStatement(undefined, ts.createVariableDeclarationList(declarations, ts.NodeFlags.Const))

type HoistVariableDeclaration = (node: ts.Identifier) => void

export const wrapWithFunc = (hoistVariableDeclaration: HoistVariableDeclaration, getStatements: (inputVar: ts.Identifier) => ts.Statement[]) => {
  const inputVar = ts.createTempVariable(hoistVariableDeclaration)
  const inputParam = ts.createParameter([], [], undefined, inputVar)
  return ts.createFunctionExpression([], undefined, undefined, [], [inputParam], undefined, ts.createBlock(
    getStatements(inputVar)
  , true))
}

export const createFor = (hoistVariableDeclaration: HoistVariableDeclaration, inputVar: ts.Identifier, getStatements: (nVar: ts.Identifier) => ts.Statement[]): ts.ForStatement => {
  const iVar = ts.createLoopVariable()
  const nVar = ts.createTempVariable(hoistVariableDeclaration)
  return ts.createFor(
    ts.createVariableDeclarationList([ts.createVariableDeclaration(iVar, undefined, ts.createLiteral(0))], ts.NodeFlags.Let),
    ts.createLessThan(iVar, ts.createPropertyAccess(inputVar, 'length')),
    ts.createPostfixIncrement(iVar),
    ts.createBlock(
      ([
        createConst([ts.createVariableDeclaration(nVar, undefined, ts.createElementAccess(inputVar, iVar))])
      ] as ts.Statement[]).concat(getStatements(nVar))
    )
  )
}

type CreateTmpFunction = (hoistVariableDeclaration: HoistVariableDeclaration, bindedCallback: ts.Expression) => ts.FunctionExpression

export const createFilterTmpFunction: CreateTmpFunction = (hoistVariableDeclaration, bindedCallback: ts.Expression) => {
  const callbackFuncVar = ts.createTempVariable(hoistVariableDeclaration)
  const outputVar = ts.createTempVariable(hoistVariableDeclaration)
  return wrapWithFunc(hoistVariableDeclaration, inputVar => [
    createConst([ts.createVariableDeclaration(callbackFuncVar, undefined, bindedCallback)]),
    createConst([ts.createVariableDeclaration(outputVar, undefined, ts.createArrayLiteral())]),
    createFor(hoistVariableDeclaration, inputVar, nVar => [
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
    createConst([ts.createVariableDeclaration(callbackFuncVar, undefined, bindedCallback)]),
    createConst([ts.createVariableDeclaration(outputVar, undefined, ts.createArrayLiteral())]),
    createFor(hoistVariableDeclaration, inputVar, nVar => [
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
    createConst([ts.createVariableDeclaration(callbackFuncVar, undefined, bindedCallback)]),
    createFor(hoistVariableDeclaration, inputVar, nVar => [
      ts.createExpressionStatement(ts.createCall(callbackFuncVar, [], [nVar]))
    ])
  ])
}
