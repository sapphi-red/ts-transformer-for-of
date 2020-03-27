import * as ts from 'typescript'
import {
  isArrayMethodCallExpression,
  isFunction,
  getSimpleArrayMethodExpression,
  MethodCallExpression,
  isArrayForOfStatement
} from './type'
import { createFilterTmpFunction, createMapTmpFunction, createForEachTmpFunction, createFor } from './createStatement'

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
  if (isArrayMethodCallExpression(node, typeChecker)) {
    return transformArrayMethods(node, context)
  }

  if (isArrayForOfStatement(node, typeChecker)) {
    return transformForOf(node, context)
  }

  return node
}

function transformArrayMethods(node: MethodCallExpression, context: ts.TransformationContext): ts.Expression {
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

function transformForOf(node: ts.ForOfStatement, context: ts.TransformationContext): ts.Statement {
  const { hoistVariableDeclaration } = context

  const initializer = node.initializer
  if (!ts.isVariableDeclarationList(initializer)) {
    console.log('Ignoring because initializer type is unknown: ', initializer)
    return node
  }
  const nDeclarations = initializer.declarations
  if (nDeclarations.length !== 1) {
    console.log('Ignoring because initializer length is unknown: ', nDeclarations)
    return node
  }
  const n = nDeclarations[0]
  if (!ts.isIdentifier(n.name)) {
    console.log('Ignoring because name was not identifier: ', n.name)
    return node
  }

  const arr = node.expression
  const statement = node.statement

  let statements: ts.NodeArray<ts.Statement> | ts.Statement[]
  if (ts.isBlock(statement)) {
    statements = statement.statements
  } else {
    statements = [statement]
  }

  return createFor(hoistVariableDeclaration, arr, () => statements, n.name)
}
