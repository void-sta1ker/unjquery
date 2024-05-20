import * as rules from "../rules.js";
import * as transformers from "../transformers/index.js";
import {
  CoreHandler,
  AssignmentHandler,
  MethodHandler,
  MutationHandler,
} from "../handlers/index.js";
import type * as t from "@babel/types";
import type { Request } from "./handler.js";

const chain = new CoreHandler();

chain
  .setNext(new AssignmentHandler())
  .setNext(new MethodHandler())
  .setNext(new MutationHandler());

const staticChain = new AssignmentHandler();

staticChain
  .setNext(new CoreHandler())
  .setNext(new MethodHandler())
  .setNext(new MutationHandler());

const readonlyChain = new CoreHandler();

readonlyChain.setNext(new AssignmentHandler()).setNext(new MethodHandler());

type Mode = "readonly" | "writable";

export default function openGate(request: Request, mode: Mode = "writable") {
  const { context, path } = request;

  // only if it used inside another chain
  if (mode === "readonly" && rules.isJQuery(context, path)) {
    // we don't mutate the path in the end but read it and return parts
    return readonlyChain.handle({
      context: request.context,
      path: request.path,
      stack: request?.stack ?? [],
      parts: request?.parts ?? [],
      transformer: request?.transformer ?? transformers.jQuery,
      meta: request.meta ?? {},
    });
  }

  if (rules.isJQuery(context, path)) {
    return chain.handle({
      context: request.context,
      path: request.path,
      stack: [],
      parts: [],
      transformer: transformers.jQuery,
      meta: {},
    });
  }

  // if it is static method like $.each
  const callee = path.node.callee as t.MemberExpression;
  const property = callee?.property as t.Identifier;

  if (property?.name && rules.isStaticMethod(property.name, path)) {
    const propertyName = property.name as transformers.StaticMethod;

    if (typeof transformers[propertyName] === "function") {
      return staticChain.handle({
        context: request.context,
        path: request.path,
        stack: [],
        parts: [],
        transformer: transformers[propertyName],
        meta: {},
      });
    }
  }
}
