import * as ts from 'typescript';

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
  if (!isFunction(callback)) {
    console.log('The first arg is not a function: ', method.getText())
    return node;
  }

  const { hoistVariableDeclaration } = context;

  const inputVar = ts.createTempVariable(hoistVariableDeclaration)
  const filterFuncVar = ts.createTempVariable(hoistVariableDeclaration)
  const outputVar = ts.createTempVariable(hoistVariableDeclaration)
  const nVar = ts.createTempVariable(hoistVariableDeclaration)
  const inputParam = ts.createParameter([], [], undefined, inputVar)
  const tmpFunction = ts.createFunctionExpression([], undefined, undefined, [], [inputParam], undefined, ts.createBlock([
    ts.createVariableStatement([], [ts.createVariableDeclaration(filterFuncVar, undefined, callback)]),
    ts.createVariableStatement([], [ts.createVariableDeclaration(outputVar, undefined, ts.createArrayLiteral())]),
    ts.createForOf(undefined, nVar, inputVar, ts.createBlock([
      ts.createIf(ts.createLogicalNot(ts.createCall(filterFuncVar, [], [nVar])), ts.createContinue()),
      ts.createExpressionStatement(ts.createCall(ts.createPropertyAccess(outputVar, 'push'), [], [nVar]))
    ], true)),
    ts.createReturn(outputVar)
  ], true))

  return ts.updateCall(node, tmpFunction, [], [base])
}

function isArrayMethodCallExpression(node: ts.Node, typeChecker: ts.TypeChecker): node is ts.CallExpression & {expression: ts.PropertyAccessExpression} {
  if (!ts.isCallExpression(node)) {
    return false;
  }
  if (!ts.isPropertyAccessExpression(node.expression)) {
    return false;
  }

  const propAccess = getSimpleArrayMethodExpression(node.expression)
  const base = propAccess.expression
  const baseType = typeChecker.getTypeAtLocation(base)

  return isArray(baseType, typeChecker)
}

function getSimpleArrayMethodExpression(expression: ts.PropertyAccessExpression): ts.PropertyAccessExpression {
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

function isFunction(expression: ts.Expression): expression is ts.FunctionExpression | ts.ArrowFunction {
  return ts.isArrowFunction(expression) || ts.isFunctionExpression(expression)
}
