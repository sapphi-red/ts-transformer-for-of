import * as ts from 'typescript'
import { isArrayMethodCallExpression, isFunction, getSimpleArrayMethodExpression } from './type'
import { createFilterTmpFunction, createMapTmpFunction, createForEachTmpFunction } from './createStatement'

export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => (file: ts.SourceFile) => visitNodeAndChildren(file, program, context)
}

function visitNodeAndChildren(
  node: ts.SourceFile,
  program: ts.Program,
  context: ts.TransformationContext
): ts.SourceFile
function visitNodeAndChildren(
  node: ts.Node,
  program: ts.Program,
  context: ts.TransformationContext
): ts.Node | undefined
function visitNodeAndChildren(
  node: ts.Node,
  program: ts.Program,
  context: ts.TransformationContext
): ts.Node | undefined {
  return ts.visitEachChild(
    visitNode(node, program, context),
    childNode => visitNodeAndChildren(childNode, program, context),
    context
  )
}

function visitNode(node: ts.SourceFile, program: ts.Program, context: ts.TransformationContext): ts.SourceFile
function visitNode(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node | undefined
function visitNode(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node | undefined {
  const typeChecker = program.getTypeChecker()
  if (!isArrayMethodCallExpression(node, typeChecker)) {
    return node
  }

  const expression = getSimpleArrayMethodExpression(node.expression)

  const base = expression.expression
  const method = expression.name
  const methodName = method.getText()

  if (!['filter', 'map', 'forEach'].includes(methodName)) {
    console.log('Array::filter, Array::map and Array::forEach are only supported. Method name:', methodName)
    return node
  }

  const args = node.arguments
  const callback = args[0]
  const thisArg = args[1]
  if (!isFunction(callback)) {
    console.log('The first arg is not a function:', methodName)
    return node
  }
  if (callback.parameters.filter(p => p.name.getText() !== 'this').length > 1) {
    console.log('Using index param and array param is not supported. Param length:', callback.parameters.length)
    return node
  }

  const { hoistVariableDeclaration } = context

  const bindedCallback = thisArg ? ts.createCall(ts.createPropertyAccess(callback, 'bind'), [], [thisArg]) : callback

  let tmpFunction
  if (methodName === 'filter') {
    tmpFunction = createFilterTmpFunction(hoistVariableDeclaration, bindedCallback)
  } else if (methodName === 'map') {
    tmpFunction = createMapTmpFunction(hoistVariableDeclaration, bindedCallback)
  } else if (methodName === 'forEach') {
    tmpFunction = createForEachTmpFunction(hoistVariableDeclaration, bindedCallback)
  } else {
    throw new Error(`Transform Error: unsupported method was going to be transformed: ${methodName}`)
  }

  return ts.updateCall(node, tmpFunction, [], [base])
}
