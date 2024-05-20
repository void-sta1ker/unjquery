import findTopParent from "../helpers/find-top-parent.js";
import { AbstractHandler } from "../components/handler.js";
import * as t from "@babel/types";
import type { OngoingRequest, Response } from "../components/handler.js";

export default class MutationHandler extends AbstractHandler {
  public handle(request: OngoingRequest): Response {
    const { path, meta } = request;

    if (meta.assignedToVar) {
      const currFrame = request.stack.at(-1);
      const topParent = findTopParent(path, (p) => p.isCallExpression());
      currFrame && topParent.replaceWith(currFrame?.varID);

      path
        .findParent((path) => path.isStatement())
        ?.insertBefore([...request.parts, t.emptyStatement()]);
    }

    if (!meta.assignedToVar) {
      const statementPath = path.findParent((path) => path.isStatement());
      statementPath?.replaceWithMultiple([
        ...request.parts,
        t.emptyStatement(),
      ]);
    }

    return super.handle(request);
  }
}
