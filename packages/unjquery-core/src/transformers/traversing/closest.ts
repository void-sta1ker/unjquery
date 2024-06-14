import genAst from "../../helpers/gen-ast.js";
import type { NodePath } from "@babel/traverse";
import type * as t from "@babel/types";
import type * as JQuery from "../../jquery.typings.js";
import type { Path, State } from "../index.js";

export default function transformClosest(path: Path, state: State) {
  const arg1 = path.get("arguments")[0];
  const arg1Node = arg1.node as t.StringLiteral;
  const argType = getArgType(arg1);

  const { varID } = state.stack.at(-1) ?? {};

  if (varID) {
    const newVarID = path.scope.generateUidIdentifier();

    state.stack.push({ varID: newVarID });

    if (argType === "Selector") {
      const newAst = genAst`const ${newVarID.name} = ${varID.name}.closest("${arg1Node.value}");`;
      return newAst && [newAst];
    }
  }
}

type ArgType = JQuery.Selector | JQuery.Element | JQuery.JQuery;

function getArgType(
  ...args: NodePath<
    t.ArgumentPlaceholder | t.JSXNamespacedName | t.SpreadElement | t.Expression
  >[]
): ArgType {
  const [arg1] = args;

  if (arg1.type === "StringLiteral") {
    return "Selector";
  }

  throw new Error("Unknown call signature in find method call");
}
