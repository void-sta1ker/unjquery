import * as t from "@babel/types";
import genAst from "../../helpers/gen-ast.js";
import type { NodePath } from "@babel/traverse";
import type * as JQuery from "../../jquery.typings.js";
import type { Path, State } from "../index.js";
import isObviousHtml from "../../helpers/is-obvious-html.js";

export default function transformAppendTo(path: Path, state: State) {
  const arg1 = path.get("arguments")[0];

  const argType = getArgType(arg1);

  let newAst;

  if (argType === "Selector") {
    const { varID } = state.stack.at(-1) ?? {};

    if (!varID) throw new Error("Error compiling function .appendTo()");

    const arg1Node = arg1.node as t.StringLiteral;
    newAst = genAst`document.querySelectorAll("${arg1Node.value}").forEach((parent) => {
      ${varID.name}.forEach((child) => {
        parent.append(child);
      });
    })`;
  }

  return newAst && [newAst];
}

type ArgType =
  | JQuery.Selector
  | JQuery.HtmlString
  | JQuery.Element
  | JQuery.Array
  | JQuery.JQuery;

function getArgType(
  ...args: NodePath<
    t.ArgumentPlaceholder | t.JSXNamespacedName | t.SpreadElement | t.Expression
  >[]
): ArgType {
  const [arg1] = args;

  if (arg1.type === "StringLiteral") {
    const arg1Node = arg1.node as t.StringLiteral;

    if (isObviousHtml(arg1Node.value)) {
      return "htmlString";
    }

    return "Selector";
  }

  throw new Error("Unknown call signature in text method call");
}
