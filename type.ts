import * as ts from 'typescript'

export type MethodCallExpression = ts.CallExpression & { expression: ts.PropertyAccessExpression }

export function isArrayMethodCallExpression(node: ts.Node, typeChecker: ts.TypeChecker): node is MethodCallExpression {
  if (!ts.isCallExpression(node)) {
    return false
  }
  if (!ts.isPropertyAccessExpression(node.expression)) {
    return false
  }

  const propAccess = getSimpleArrayMethodExpression(node.expression)
  const base = propAccess.expression
  const baseType = typeChecker.getTypeAtLocation(base)

  return isArray(baseType, typeChecker)
}

export function getSimpleArrayMethodExpression(expression: ts.PropertyAccessExpression): ts.PropertyAccessExpression {
  while (ts.isPropertyAccessExpression(expression.expression)) {
    expression = expression.expression
  }
  return expression
}

function isArray(type: ts.Type, typeChecker: ts.TypeChecker): type is ts.TypeReference {
  if (type.getSymbol()?.getName() !== 'Array') {
    return false
  }
  if (typeChecker.getTypeArguments(type as ts.TypeReference).length !== 1) {
    return false
  }
  return true
}

export function isFunction(expression: ts.Expression): expression is ts.FunctionExpression | ts.ArrowFunction {
  return ts.isArrowFunction(expression) || ts.isFunctionExpression(expression)
}

export function isArrayForOfStatement(node: ts.Node, typeChecker: ts.TypeChecker): node is ts.ForOfStatement {
  if (!ts.isForOfStatement(node)) return false
  // for await of
  if (node.awaitModifier !== undefined) return false

  const arr = node.expression
  const arrType = typeChecker.getTypeAtLocation(arr)

  return isArray(arrType, typeChecker)
}
