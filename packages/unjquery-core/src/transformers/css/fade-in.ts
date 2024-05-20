import genAst from "../../helpers/gen-ast.js";
import type { Path, State } from "../index.js";

export default function transformFadeIn(path: Path, state: State) {
  const { varID } = state.stack.at(-1) ?? {};

  if (varID) {
    const newAst = genAst`${varID.name}.classList.replace('hide', 'show');`;

    return newAst && [newAst];
  }
}
