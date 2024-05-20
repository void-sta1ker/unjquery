import * as rules from "../rules.js";
import * as transformers from "../transformers/index.js";
import { AbstractHandler } from "../components/handler.js";
import type * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";
import type { OngoingRequest, Response } from "../components/handler.js";

export default class MethodHandler extends AbstractHandler {
  public handle(request: OngoingRequest): Response {
    handleNextMethod(request);

    return super.handle(request);
  }
}

function handleNextMethod(request: OngoingRequest) {
  const { path } = request;

  if (
    path.parentPath.type === "MemberExpression" &&
    path.parentPath?.parentPath?.type === "CallExpression"
  ) {
    const nextPath = path.findParent((path) =>
      path.isCallExpression(),
    ) as NodePath<t.CallExpression> | null;

    if (nextPath) {
      const callee = nextPath.node.callee as t.MemberExpression;
      const property = callee?.property as t.Identifier;

      if (property?.name && rules.isMethod(property.name, nextPath)) {
        const propertyName = property.name as transformers.Method;

        if (typeof transformers[propertyName] === "function") {
          const exprs = transformers[propertyName](nextPath, {
            context: request.context,
            stack: request.stack,
          });

          if (exprs) {
            exprs.forEach((expr) => {
              request.parts.push(expr);
            });
          }
        }
      }

      // recursively handle chained methods
      handleNextMethod({
        context: request.context,
        path: nextPath,
        stack: request.stack,
        parts: request.parts,
        transformer: request.transformer,
        meta: request.meta,
      });
    }
  }
}
