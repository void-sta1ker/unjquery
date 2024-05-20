import openGate from "../../components/gate.js";
import * as t from "@babel/types";
import type { Response } from "../../components/handler.js";
import type { Path, State } from "../index.js";

export default function transformPushStack(path: Path, state: State) {
  const arg1 = path.get("arguments")[0];

  if (arg1?.type === "CallExpression") {
    let res: Response | undefined;

    arg1.traverse({
      CallExpression(path) {
        res = openGate(
          {
            context: state.context,
            path,
            stack: state.stack,
          },
          "readonly",
        );
      },
    });

    if (res) {
      arg1.remove();
      return [...res.parts];
    }
  }

  const newVarID = path.scope.generateUidIdentifier();

  state.stack.push({ varID: newVarID });

  return [
    t.variableDeclaration("const", [
      t.variableDeclarator(newVarID, arg1.node as t.Expression),
    ]),
  ];
}
