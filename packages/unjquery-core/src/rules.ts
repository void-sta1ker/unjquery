import * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";
import type { Context } from "./components/context.js";

export function isJQuery(context: Context, path: NodePath<t.CallExpression>) {
  if (context.noConflict) {
    return path.get("callee").isIdentifier({ name: "jQuery" });
  }

  return (
    path.get("callee").isIdentifier({ name: "$" }) ||
    path.get("callee").isIdentifier({ name: "jQuery" })
  );
}

export function isMethod(name: string, path: NodePath<t.CallExpression>) {
  const callee = path.get("callee");

  if (callee.isMemberExpression()) {
    const object = callee.get("object");
    const property = callee.get("property");
    return object.isCallExpression() && property.isIdentifier({ name });
  }

  return false;
}

export function isStaticMethod(name: string, path: NodePath<t.CallExpression>) {
  const { callee } = path.node;

  return (
    t.isMemberExpression(callee) &&
    t.isIdentifier(callee.object, { name: "$" }) &&
    t.isIdentifier(callee.property, { name })
  );

  /* These are not the same thing!! */

  // const callee = path.get("callee");

  // return (
  //   callee.isMemberExpression() &&
  //   callee.object.isIdentifier({ name: "$" }) &&
  //   callee.property.isIdentifier({ name })
  // );
}

export function isStaticProperty(path: NodePath<t.MemberExpression>) {
  return !path.findParent((path) => path.isCallExpression());
}

export function isAssignedToVar(path: NodePath<t.CallExpression>) {
  return !!path.findParent((path) => path.isVariableDeclaration());
}

export function hasChainedMethod(path: NodePath<t.CallExpression>) {
  const outerPath = path.findParent((p) =>
    p.isCallExpression(),
  ) as NodePath<t.CallExpression>;

  if (outerPath) {
    const callee = outerPath.get("callee");

    if (callee.isMemberExpression()) {
      const object = callee.get("object");
      const property = callee.get("property");
      return object.isCallExpression() && property.isIdentifier();
    }
  }

  return false;
}
