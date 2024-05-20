import type * as t from "@babel/types";
import genAst from "../../helpers/gen-ast.js";
import type { Path, State } from "../index.js";

export default function transformRemoveClass(path: Path, state: State) {
  const arg1Node = path.get("arguments")[0].node as t.StringLiteral;

  const classes = arg1Node.value
    .split(" ")
    .map((elm) => `"${elm}"`)
    .join(", ");

  const { varID } = state.stack.at(-1) ?? {};

  if (varID) {
    const newAst = genAst`${varID.name}.forEach((elm) => {
      elm.classList.remove(${classes});
    });`;

    return newAst && [newAst];
  }
}
