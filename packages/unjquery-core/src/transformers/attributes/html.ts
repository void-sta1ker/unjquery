import genAst from "../../helpers/gen-ast.js";
import type { NodePath } from "@babel/traverse";
import type * as t from "@babel/types";
import type * as JQuery from "../../jquery.typings.js";
import type { Path, State } from "../index.js";

export default function transformHTML(path: Path, state: State) {
  const arg1 = path.get("arguments")[0];

  const argType = getArgType(arg1);

  const { varID } = state.stack.at(-1) ?? {};

  if (varID) {
    if (typeof argType === "undefined") {
      const newAst = genAst`${varID.name}.item(0).innerHTML;`;
      return newAst && [newAst];
    }

    if (argType === "htmlString") {
      const arg1Node = arg1.node as t.StringLiteral;

      const newAst = genAst`${varID.name}.item(0).innerHTML = "${arg1Node.value}";`;
      return newAst && [newAst];
    }

    if (argType === "Function") {
      //
    }
  }
}

type ArgType = JQuery.HtmlString | JQuery.Function | undefined;

function getArgType(
  ...args: NodePath<
    t.ArgumentPlaceholder | t.JSXNamespacedName | t.SpreadElement | t.Expression
  >[]
): ArgType {
  const [arg1] = args;

  if (typeof arg1 === "undefined") {
    return undefined;
  }

  if (arg1.type === "StringLiteral") {
    return "htmlString";
  }

  if (
    arg1.type === "FunctionExpression" ||
    arg1.type === "ArrowFunctionExpression"
  ) {
    return "Function";
  }

  throw new Error("Unknown call signature in html method call");
}
