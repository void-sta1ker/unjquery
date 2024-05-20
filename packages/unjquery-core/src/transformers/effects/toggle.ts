import * as t from "@babel/types";
import genAst from "../../helpers/gen-ast.js";
import type { NodePath } from "@babel/traverse";
import type { Path, State } from "../index.js";
import type * as JQuery from "../../jquery.typings.js";

export default function transformToggle(path: Path, state: State) {
  const arg1 = path.get("arguments")[0];
  const arg2 = path.get("arguments")[1];

  const argType = getArgType(arg1, arg2);

  if (argType === undefined) {
    /*
    ${els}.forEach((el) => {
      toggle(el);
    });
    */

    const fnAst = genAst`function toggle(el) {
      if (el.style.display == 'none') {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    }`;

    const { varID } = state.stack.at(-1) ?? {};

    if (!varID) throw new Error("Couldn't compile function .toggle()");

    const newAst = genAst`${varID.name}.forEach((el) => {
      toggle(el);
    })`;

    return fnAst && newAst && [fnAst, newAst];
  }
}

type ArgType = JQuery.Boolean | undefined;

function getArgType(
  ...args: NodePath<
    t.ArgumentPlaceholder | t.JSXNamespacedName | t.SpreadElement | t.Expression
  >[]
): ArgType {
  const [arg1] = args;

  if (arg1 === undefined) {
    return undefined;
  }

  throw new Error("Unknown call signature in toggle method call");
}
