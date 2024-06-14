import type * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";
import type { Context } from "../components/context.js";
import type { Stack } from "../components/stack.js";

export * from "./ajax/index.js";
export * from "./attributes/index.js";
export * from "./core/index.js";
export * from "./css/index.js";
export * from "./effects/index.js";
export * from "./events/index.js";
export * from "./manipulation/index.js";
export * from "./traversing/index.js";

export type Method =
  | "pushStack"
  | "css"
  | "addClass"
  | "removeClass"
  | "toggleClass"
  | "html"
  | "prop"
  | "text"
  | "remove"
  | "appendTo"
  | "end"
  | "find"
  | "closest"
  | "click"
  | "toggle";

export type StaticMethod = "noop" | "each" | "getJSON";

export type GenericTransformer = (
  path: Path,
  state: State,
) => t.Node[] | undefined;

export type State = { context: Context; stack: Stack };

export type Path = NodePath<t.CallExpression>;

// transformers.static.noop(); transformers.css();
