import * as t from "@babel/types";
import * as rules from "../rules.js";
import { AbstractHandler } from "../components/handler.js";
import type { OngoingRequest, Response } from "../components/handler.js";

export default class AssignmentHandler extends AbstractHandler {
  public handle(request: OngoingRequest): Response {
    const { path } = request;

    // it means we're compiling regular method
    if (request.parts.length) {
      const varID = path.scope.generateUidIdentifier();
      request.stack.push({ varID });

      const expr = request.parts.pop() as
        | t.ExpressionStatement
        | t.EmptyStatement;

      if (expr.type !== "EmptyStatement") {
        const newAst = t.variableDeclaration("const", [
          t.variableDeclarator(varID, t.toExpression(expr)),
        ]);

        request.parts.push(newAst);
      }
    } else {
      // handling non jquery call, first arguments where we can add var declaration here
      const arg1 = path.get("arguments")[0];

      if (
        arg1 &&
        arg1.type !== "CallExpression" &&
        // or any other primitive type
        arg1.type !== "StringLiteral"
      ) {
        const varID = path.scope.generateUidIdentifier();
        request.stack.push({ varID });

        const newAst = t.variableDeclaration("const", [
          t.variableDeclarator(
            varID,
            t.toExpression(arg1.node as t.Expression),
          ),
        ]);

        request.parts.push(newAst);
      }
    }

    if (rules.isAssignedToVar(path)) {
      request.meta.assignedToVar = true;
    }

    return super.handle(request);
  }
}
