import * as t from "@babel/types";
import openGate from "../../components/gate.js";
import type { NodePath } from "@babel/traverse";
import type { Path, State } from "../index.js";
import type * as JQuery from "../../jquery.typings.js";

export default function transformClick(path: Path, state: State) {
  const arg1 = path.get("arguments")[0];
  const arg2 = path.get("arguments")[1];

  const argType = getArgType(arg1, arg2);

  if (argType === "Function") {
    // ${els}.forEach((el) => {
    //   el.addEventListener("click", ${arg1})
    // });

    arg1.traverse({
      CallExpression(path) {
        openGate({
          context: state.context,
          path,
          stack: state.stack,
          meta: { bindThisToEl: "el" },
        });
      },
    });

    const { varID } = state.stack.at(-1) ?? {};

    if (!varID) throw new Error("Couldn't compile function .click()");

    const newAst = t.expressionStatement(
      t.callExpression(t.memberExpression(varID, t.identifier("forEach")), [
        t.arrowFunctionExpression(
          [t.identifier("el")],
          t.blockStatement([
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.identifier("el"),
                  t.identifier("addEventListener"),
                ),
                [t.stringLiteral("click"), arg1.node],
              ),
            ),
          ]),
        ),
      ]),
    );

    return [newAst];
  }

  if (argType === undefined) {
    //
  }

  if (argType === "Anything") {
    //
  }
}

type ArgType = JQuery.Function | JQuery.Anything | undefined;

function getArgType(
  ...args: NodePath<
    t.ArgumentPlaceholder | t.JSXNamespacedName | t.SpreadElement | t.Expression
  >[]
): ArgType {
  const [arg1, arg2] = args;

  if (typeof arg1 === "undefined") {
    return undefined;
  }

  if (
    (typeof arg2 === "undefined" && arg1?.type === "FunctionExpression") ||
    arg1?.type === "ArrowFunctionExpression"
  ) {
    return "Function";
  }

  if (
    arg2.type === "FunctionExpression" ||
    arg2.type === "ArrowFunctionExpression"
  ) {
    return "Anything";
  }

  throw new Error("Unknown call signature in click call");
}
