import type { NodePath } from "@babel/traverse";

export default function findTopParent(
  path: NodePath,
  predicate: (p: NodePath) => boolean,
) {
  const lastPath = path.findParent(predicate);

  if (!lastPath) return path;

  return findTopParent(lastPath, predicate);
}
