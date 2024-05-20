import type * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";
import type { Context } from "./context.js";
import type { Stack } from "./stack.js";
import type { GenericTransformer } from "../transformers/index.js";

export interface Request {
  context: Context;
  path: NodePath<t.CallExpression>;

  stack?: Stack;
  parts?: t.Node[];
  transformer?: GenericTransformer; // is there a case when we need to pass transformer to openGate?
  meta?: Record<string, unknown>; // the same as above
}

export type OngoingRequest = Required<Request>;

export interface Response {
  stack: Stack;
  parts: t.Node[];
  // should `meta` be added here?
}

export interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: OngoingRequest): Response;
}

export abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | undefined;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: OngoingRequest): Response {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return { stack: request.stack, parts: request.parts };
  }
}
