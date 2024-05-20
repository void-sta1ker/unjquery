import type { Path, State } from "../index.js";

export default function transformEnd(path: Path, state: State) {
  state.stack.pop();
}
