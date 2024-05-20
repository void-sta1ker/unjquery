import genAst from "../../helpers/gen-ast.js";
import type { NodePath } from "@babel/traverse";
import type * as t from "@babel/types";
import type * as JQuery from "../../jquery.typings.js";
import type { Path, State } from "../index.js";

export default function transformProp(path: Path, state: State) {
  const arg1 = path.get("arguments")[0];

  const argType = getArgType(arg1);

  const { varID } = state.stack.at(-1) ?? {};

  if (!varID) throw new Error("Couldn't compile function .prop()");

  let newAst;

  if (argType === "String") {
    const arg1Node = arg1.node as t.StringLiteral;

    newAst = genAst`${varID.name}["${arg1Node.value}"]`;
    return newAst && [newAst];
  }

  if (argType === "Function") {
    //
  }

  return newAst && [newAst];
}

type ArgType =
  | JQuery.String
  | JQuery.PlainObject
  | JQuery.Anything
  | JQuery.Function;

function getArgType(
  ...args: NodePath<
    t.ArgumentPlaceholder | t.JSXNamespacedName | t.SpreadElement | t.Expression
  >[]
): ArgType {
  const [arg1, arg2] = args;

  if (arg1.type === "StringLiteral" && typeof arg2 === "undefined") {
    return "String";
  }

  throw new Error("Unknown call signature in html method call");
}
