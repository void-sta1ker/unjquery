import * as t from "@babel/types";
import genAst from "../../helpers/gen-ast.js";
import type { NodePath } from "@babel/traverse";
import type * as JQuery from "../../jquery.typings.js";
import type { Path, State } from "../index.js";

export default function transformRemove(path: Path, state: State) {
  const arg1 = path.get("arguments")[0];

  const argType = getArgType(arg1);

  const { varID } = state.stack.at(-1) ?? {};

  if (!varID) throw new Error("Couldn't compile function .remove()");

  let newAst;

  if (argType === undefined) {
    // for (const el of ${elements}) {
    //   el.remove();
    // }

    newAst = genAst`for (const el of ${varID.name}) {
      el.remove();
    }`;
  }

  if (argType === "Selector") {
    //
  }

  return newAst && [newAst];
}

type ArgType = JQuery.Selector | undefined;

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
    return "Selector";
  }

  throw new Error("Unknown call signature in text method call");
}
