import { AbstractHandler } from "../components/handler.js";
import type { OngoingRequest, Response } from "../components/handler.js";

export default class CoreHandler extends AbstractHandler {
  public handle(request: OngoingRequest): Response {
    const { path, transformer } = request;

    const exprs = transformer(path, {
      context: request.context,
      stack: request.stack,
    });

    if (exprs) {
      exprs.forEach((expr) => {
        request.parts.push(expr);
      });
    }

    return super.handle(request);
  }
}
