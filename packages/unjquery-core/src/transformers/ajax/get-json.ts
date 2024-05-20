import * as t from "@babel/types";
import genAst from "../../helpers/gen-ast.js";
import type { NodePath } from "@babel/traverse";
import type { Path, State } from "../index.js";
import type * as JQuery from "../../jquery.typings.js";

export default function transformGetJson(path: Path, state: State) {
  const arg1 = path.get("arguments")[0];
  const arg2 = path.get("arguments")[1];

  const argType = getArgType(arg1, arg2);

  if (argType === "String") {
    /*
    const response = await fetch(${url});
    const data = await response.json();
    */

    const arg1Node = arg1.node as t.StringLiteral;

    const res = path.scope.generateUidIdentifier();
    const data = path.scope.generateUidIdentifier();

    const resAst = genAst`const ${res.name} = await fetch("${arg1Node.value}");`;
    const dataAst = genAst`const ${data.name} = await response.json();`;

    return resAst && dataAst && [resAst, dataAst];
  }
}

type ArgType = JQuery.String;

function getArgType(
  ...args: NodePath<
    t.ArgumentPlaceholder | t.JSXNamespacedName | t.SpreadElement | t.Expression
  >[]
): ArgType {
  const [arg1, arg2, arg3] = args;

  // if (
  //   arg1.type === "StringLiteral" &&
  //   (arg2.type === "StringLiteral" || arg2.type === "ObjectExpression") &&
  //   (arg3.type === "FunctionExpression" ||
  //     arg3.type === "ArrowFunctionExpression")
  // ) {
  return "String";
  // }

  throw new Error("Unknown call signature in getJSON static method call");
}
