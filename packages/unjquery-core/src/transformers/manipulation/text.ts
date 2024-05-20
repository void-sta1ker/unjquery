import * as t from "@babel/types";
import genAst from "../../helpers/gen-ast.js";
import type { NodePath } from "@babel/traverse";
import type { Path, State } from "../index.js";
import type * as JQuery from "../../jquery.typings.js";

export default function transformHTML(path: Path, state: State) {
  const arg1 = path.get("arguments")[0];

  const argType = getArgType(arg1);

  const { varID } = state.stack.at(-1) ?? {};

  if (!varID) throw new Error("Couldn't compile function .text()");

  if (argType === undefined) {
    // let text = '';
    // ${varID}.forEach((el) => {
    //   text += el.textContent;
    // });

    const newVarID = path.scope.generateUidIdentifier();
    const varDecl = genAst`let ${newVarID.name} = '';`;

    const newAst = genAst`${varID.name}.forEach((el) => {${newVarID.name} += el.textContent;});`;

    return varDecl && newAst && [varDecl, newAst];
  }

  if (argType === "Text") {
    // ${varID}.forEach((el) => {
    //   el.textContent = ${arg1};
    // });

    const arg1Node = arg1.node as
      | t.StringLiteral
      | t.NumericLiteral
      | t.BooleanLiteral;

    const newAst = genAst`${varID.name}.forEach((el) => {
      el.textContent = "${arg1Node.value}"
    })`;

    return newAst && [newAst];
  }

  if (argType === "Function") {
    //
  }
}

type ArgType = JQuery.Text | JQuery.Function | undefined;

function getArgType(
  ...args: NodePath<
    t.ArgumentPlaceholder | t.JSXNamespacedName | t.SpreadElement | t.Expression
  >[]
): ArgType {
  const [arg1] = args;

  if (typeof arg1 === "undefined") {
    return undefined;
  }

  if (
    arg1.type === "StringLiteral" ||
    arg1.type === "NumericLiteral" ||
    arg1.type === "BooleanLiteral"
  ) {
    return "Text";
  }

  if (
    arg1.type === "FunctionExpression" ||
    arg1.type === "ArrowFunctionExpression"
  ) {
    return "Function";
  }

  throw new Error("Unknown call signature in text method call");
}
