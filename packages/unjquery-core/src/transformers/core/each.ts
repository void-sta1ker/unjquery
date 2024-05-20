import * as t from "@babel/types";
import openGate from "../../components/gate.js";
import type { NodePath } from "@babel/traverse";
import type { Path, State } from "../index.js";
import type { Response } from "../../components/handler.js";
import type * as JQuery from "../../jquery.typings.js";

export default function transformEach(path: Path, state: State) {
  const arg1 = path.get("arguments")[0];
  const arg2 = path.get("arguments")[1];

  const argType = getArgType(arg1, arg2);

  if (argType === "Object") {
    /*
    for (const [key, value] of Object.entries(${varID})) {
      callbackFn.call(value, key, value);
    }
    */

    const currFrame = state.stack.at(-1);

    if (!currFrame) throw new Error("Couldn't compile function $.each()");

    return [
      t.forOfStatement(
        t.variableDeclaration("const", [
          t.variableDeclarator(
            t.arrayPattern([t.identifier("key"), t.identifier("value")]),
            null,
          ),
        ]),
        t.callExpression(
          t.memberExpression(t.identifier("Object"), t.identifier("entries")),
          [currFrame.varID],
        ),
        t.blockStatement([
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                arg2.node as t.Expression,
                t.identifier("call"),
              ),
              [
                t.identifier("value"),
                t.identifier("key"),
                t.identifier("value"),
              ],
            ),
          ),
        ]),
      ),
    ];
  }

  if (argType === "Array-Like Object") {
    /*
    ${varID}.forEach((item, index) => {
      callbackFn.call(item, index, item);
    });
    */

    const currFrame = state.stack.at(-1);

    if (!currFrame) throw new Error("Couldn't compile function $.each");

    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(currFrame.varID, t.identifier("forEach")),
          [
            t.arrowFunctionExpression(
              [t.identifier("item"), t.identifier("index")],
              t.blockStatement([
                t.expressionStatement(
                  t.callExpression(
                    t.memberExpression(
                      arg2.node as t.Expression,
                      t.identifier("call"),
                    ),
                    [
                      t.identifier("item"),
                      t.identifier("index"),
                      t.identifier("item"),
                    ],
                  ),
                ),
              ]),
            ),
          ],
        ),
      ),
    ];
  }

  if (argType === "CallExpression") {
    /*
    const ${varID} = $("p").css("color", "red");
    ${varID}.forEach((item, index) => {
      callbackFn.call(item, index, item);
    });
    */

    let response: Response | undefined;

    // opening new chain while being in chain :)
    arg1.traverse({
      CallExpression(path) {
        response = openGate(
          {
            context: state.context,
            path,
            stack: state.stack,
          },
          "readonly",
        );
      },
    });

    // in order to not catch next jquery calls again in visitor method which we handled above
    arg1.remove();

    if (response) {
      const currFrame = response.stack.at(-1);

      if (!currFrame) throw new Error("Couldn't compile function $.each");

      const newAst = t.expressionStatement(
        t.callExpression(
          t.memberExpression(currFrame.varID, t.identifier("forEach")),
          [
            t.arrowFunctionExpression(
              [t.identifier("item"), t.identifier("index")],
              t.blockStatement([
                t.expressionStatement(
                  t.callExpression(
                    t.memberExpression(
                      arg2.node as t.Expression,
                      t.identifier("call"),
                    ),
                    [
                      t.identifier("item"),
                      t.identifier("index"),
                      t.identifier("item"),
                    ],
                  ),
                ),
              ]),
            ),
          ],
        ),
      );

      return [...response.parts, newAst];
    }
  }
}

type ArgType = JQuery.ArrayLikeObject | JQuery.Object | "CallExpression";

function getArgType(
  ...args: NodePath<
    t.ArgumentPlaceholder | t.JSXNamespacedName | t.SpreadElement | t.Expression
  >[]
): ArgType {
  const [arg1, arg2] = args;

  if (
    arg2.type !== "FunctionExpression" &&
    arg2.type !== "MemberExpression" &&
    arg2.type !== "Identifier"
  ) {
    throw new Error("Unknown call signature in each static method call");
  }

  if (arg1.type === "ObjectExpression") {
    return "Object";
  }

  if (arg1.type === "ArrayExpression") {
    return "Array-Like Object";
  }

  if (arg1.type === "CallExpression") {
    return "CallExpression";
  }

  throw new Error("Unknown call signature in each static method call");
}
