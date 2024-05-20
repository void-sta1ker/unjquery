import * as t from "@babel/types";
import type { Path, State } from "../index.js";

export default function transformNoop(path: Path, state: State) {
  return [
    t.expressionStatement(
      t.callExpression(
        t.functionExpression(null, [], t.blockStatement([])),
        [],
      ),
    ),
  ];
}
