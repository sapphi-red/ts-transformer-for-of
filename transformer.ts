import * as ts from 'typescript';
import { isArrayMethodCallExpression, isFunction, getSimpleArrayMethodExpression } from './util';

export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => (file: ts.SourceFile) => visitNodeAndChildren(file, program, context);
}

function visitNodeAndChildren(node: ts.SourceFile, program: ts.Program, context: ts.TransformationContext): ts.SourceFile;
function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node | undefined;
function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node | undefined {
  return ts.visitEachChild(visitNode(node, program, context), childNode => visitNodeAndChildren(childNode, program, context), context);
}

function visitNode(node: ts.SourceFile, program: ts.Program, context: ts.TransformationContext): ts.SourceFile;
function visitNode(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node | undefined;
function visitNode(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node | undefined {
  const typeChecker = program.getTypeChecker();
  if (!isArrayMethodCallExpression(node, typeChecker)) {
    return node;
  }

  const expression = getSimpleArrayMethodExpression(node.expression)

  const base = expression.expression
  const method = expression.name
  const methodName = method.getText()

  if (!['filter', 'map', 'forEach'].includes(methodName)) {
    console.log('Array::filter, Array::map and Array::forEach are only supported. Method name:', methodName)
    return node;
  }

  const args = node.arguments
  const callback = args[0]
  const thisArg = args[1]
  if (!isFunction(callback)) {
    console.log('The first arg is not a function: ', methodName)
    return node;
  }
  if (callback.parameters.filter(p => p.name.getText() !== 'this').length > 1) {
    console.log('Using index param and array param is not supported. Param length: ', callback.parameters.length)
    //return node;
  }

  const { hoistVariableDeclaration } = context;

  const inputVar = ts.createTempVariable(hoistVariableDeclaration)
  const callbackFuncVar = ts.createTempVariable(hoistVariableDeclaration)
  const outputVar = ts.createTempVariable(hoistVariableDeclaration)
  const nVar = ts.createTempVariable(hoistVariableDeclaration)
  const inputParam = ts.createParameter([], [], undefined, inputVar)

  const bindedCallback = thisArg ? ts.createCall(ts.createPropertyAccess(callback, 'bind'), [], [thisArg]) : callback

  let tmpFunction
  if (methodName === 'filter') {
    tmpFunction = createFilterTmpFunction({inputVar, callbackFuncVar, outputVar, nVar, inputParam}, bindedCallback)
  } else if (methodName === 'map') {
    tmpFunction = createMapTmpFunction({inputVar, callbackFuncVar, outputVar, nVar, inputParam}, bindedCallback)
  } else if (methodName === 'forEach') {
    tmpFunction = createForEachTmpFunction({inputVar, callbackFuncVar, outputVar, nVar, inputParam}, bindedCallback)
  } else {
    throw new Error('Transform Error: unsupported method was going to be transformed')
  }

  return ts.updateCall(node, tmpFunction, [], [base])
}

interface TmpFunctionVars {
  inputVar: ts.Identifier
  callbackFuncVar: ts.Identifier
  outputVar: ts.Identifier
  nVar: ts.Identifier
  inputParam: ts.ParameterDeclaration
}
type CreateTmpFunction = (vars: TmpFunctionVars, bindedCallback: ts.Expression) => ts.FunctionExpression

const createFilterTmpFunction: CreateTmpFunction = ({
  inputVar, callbackFuncVar, outputVar, nVar, inputParam
}, bindedCallback: ts.Expression) => {
  return ts.createFunctionExpression([], undefined, undefined, [], [inputParam], undefined, ts.createBlock([
    ts.createVariableStatement([], [ts.createVariableDeclaration(callbackFuncVar, undefined, bindedCallback)]),
    ts.createVariableStatement([], [ts.createVariableDeclaration(outputVar, undefined, ts.createArrayLiteral())]),
    ts.createForOf(undefined, nVar, inputVar, ts.createBlock([
      ts.createIf(ts.createLogicalNot(ts.createCall(callbackFuncVar, [], [nVar])), ts.createContinue()),
      ts.createExpressionStatement(ts.createCall(ts.createPropertyAccess(outputVar, 'push'), [], [nVar]))
    ], true)),
    ts.createReturn(outputVar)
  ], true))
}

const createMapTmpFunction: CreateTmpFunction = ({
  inputVar, callbackFuncVar, outputVar, nVar, inputParam
}, bindedCallback) => {
  return ts.createFunctionExpression([], undefined, undefined, [], [inputParam], undefined, ts.createBlock([
    ts.createVariableStatement([], [ts.createVariableDeclaration(callbackFuncVar, undefined, bindedCallback)]),
    ts.createVariableStatement([], [ts.createVariableDeclaration(outputVar, undefined, ts.createArrayLiteral())]),
    ts.createForOf(undefined, nVar, inputVar, ts.createBlock([
      ts.createExpressionStatement(ts.createCall(
        ts.createPropertyAccess(outputVar, 'push'),
        [],
        [ts.createCall(callbackFuncVar, [], [nVar])]
      ))
    ], true)),
    ts.createReturn(outputVar)
  ], true))
}

const createForEachTmpFunction: CreateTmpFunction = ({
  inputVar, callbackFuncVar, nVar, inputParam
}, bindedCallback) => {
  return ts.createFunctionExpression([], undefined, undefined, [], [inputParam], undefined, ts.createBlock([
    ts.createVariableStatement([], [ts.createVariableDeclaration(callbackFuncVar, undefined, bindedCallback)]),
    ts.createForOf(undefined, nVar, inputVar, ts.createBlock([
      ts.createExpressionStatement(ts.createCall(callbackFuncVar, [], [nVar]))
    ], true))
  ], true))
}
