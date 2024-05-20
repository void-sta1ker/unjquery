import * as t from "@babel/types";
import genAst from "../../helpers/gen-ast.js";
import isObviousHtml from "../../helpers/is-obvious-html.js";
import type { NodePath } from "@babel/traverse";
import type { Path, State } from "../index.js";
import type * as JQuery from "../../jquery.typings.js";

export default function transformJQuery(path: Path, state: State) {
  const arg1 = path.get("arguments")[0];
  const arg2 = path.get("arguments")[1];

  const argType = getArgType(arg1, arg2);

  let newAst;

  if (argType === undefined) {
    newAst = t.emptyStatement();
  }

  if (argType === "Selector") {
    const argNode = arg1.node as t.StringLiteral;
    newAst = genAst`document.querySelectorAll("${argNode.value}");`;
  }

  if (argType === "htmlString") {
    const arg1Node = arg1.node as t.StringLiteral;
    newAst = genAst`generateElements("${arg1Node.value}");`;
  }

  if (argType === "ElementArray") {
    newAst = t.toExpression(arg1.node as t.ArrayExpression);
  }

  if (argType === "PlainObject") {
    //
  }

  if (argType === "Function") {
    newAst = t.expressionStatement(
      t.callExpression(t.identifier("ready"), [arg1.node]),
    );
  }

  if (argType === "Element") {
    // `this` is an element
    // `this` keyword correctly references an object inside event handler function
    // because the converted value of every method are wrapped with forEach, we return `this` in array
    // `this` is equal to el
    newAst = t.arrayExpression([arg1.node as t.Expression]);
  }

  return newAst && [newAst];
}

type ArgType =
  | JQuery.Selector
  | JQuery.Element
  | JQuery.ElementArray
  | JQuery.PlainObject
  | JQuery.JQuery
  | JQuery.HtmlString
  | JQuery.Function
  | undefined;

function getArgType(
  ...args: NodePath<
    t.ArgumentPlaceholder | t.JSXNamespacedName | t.SpreadElement | t.Expression
  >[]
): ArgType {
  const [arg1, arg2] = args;

  if (typeof arg1 === "undefined") {
    return undefined;
  }

  if (arg1.type === "StringLiteral") {
    const arg1Node = arg1.node as t.StringLiteral;

    if (isObviousHtml(arg1Node.value)) {
      return "htmlString";
    }

    return "Selector";
  }

  if (arg1.type === "ArrayExpression") {
    return "ElementArray";
  }

  if (arg1.type === "ObjectExpression" && typeof arg2 === "undefined") {
    return "PlainObject";
  }

  if (arg1.type === "CallExpression" && typeof arg2 === "undefined") {
    return "jQuery";
  }

  if (
    (arg1.type === "FunctionExpression" ||
      arg1.type === "ArrowFunctionExpression") &&
    typeof arg2 === "undefined"
  ) {
    return "Function";
  }

  return "Element";
}
