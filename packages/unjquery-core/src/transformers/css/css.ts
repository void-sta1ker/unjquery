import type * as t from "@babel/types";
import genAst from "../../helpers/gen-ast.js";
import type { Path, State } from "../index.js";

export default function transformCSS(path: Path, state: State) {
  const argument1Node = path.get("arguments")[0].node as t.StringLiteral;
  const argument2Node = path.get("arguments")[1].node as t.StringLiteral;

  const { varID } = state.stack.at(-1) ?? {};

  if (varID) {
    const newAst = genAst`${varID.name}.forEach((elm) => {
      elm.style.${argument1Node.value} = "${argument2Node.value}";
    });`;

    return newAst && [newAst];
  }
}
