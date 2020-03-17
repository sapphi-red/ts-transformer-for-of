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

  if (method.getText() !== 'filter') {
    console.log('Array::filter is only supported', method.getText())
    return node;
  }

  const args = node.arguments
  const callback = args[0]
  const thisArg = args[1]
  if (!isFunction(callback)) {
    console.log('The first arg is not a function: ', method.getText())
    return node;
  }
  if (callback.parameters.filter(p => p.name.getText() !== 'this').length > 1) {
    console.log('Using index param and array param is not supported. Param length: ', callback.parameters.length)
    return node;
  }

  const { hoistVariableDeclaration } = context;

  const inputVar = ts.createTempVariable(hoistVariableDeclaration)
  const callbackFuncVar = ts.createTempVariable(hoistVariableDeclaration)
  const outputVar = ts.createTempVariable(hoistVariableDeclaration)
  const nVar = ts.createTempVariable(hoistVariableDeclaration)
  const inputParam = ts.createParameter([], [], undefined, inputVar)

  const bindedCallback = thisArg ? ts.createCall(ts.createPropertyAccess(callback, 'bind'), [], [thisArg]) : callback

  const tmpFunction = ts.createFunctionExpression([], undefined, undefined, [], [inputParam], undefined, ts.createBlock([
    ts.createVariableStatement([], [ts.createVariableDeclaration(callbackFuncVar, undefined, bindedCallback)]),
    ts.createVariableStatement([], [ts.createVariableDeclaration(outputVar, undefined, ts.createArrayLiteral())]),
    ts.createForOf(undefined, nVar, inputVar, ts.createBlock([
      ts.createIf(ts.createLogicalNot(ts.createCall(callbackFuncVar, [], [nVar])), ts.createContinue()),
      ts.createExpressionStatement(ts.createCall(ts.createPropertyAccess(outputVar, 'push'), [], [nVar]))
    ], true)),
    ts.createReturn(outputVar)
  ], true))

  return ts.updateCall(node, tmpFunction, [], [base])
}
