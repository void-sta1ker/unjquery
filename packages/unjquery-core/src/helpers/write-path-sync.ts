import { writeFileSync } from "fs";
import { inspect } from "util";
import { fileURLToPath } from "url";
import path from "path";
import type { NodePath } from "@babel/traverse";

export default function writePathSync(babelPath: NodePath, fileUrl: string) {
  const dirname = path.dirname(fileURLToPath(fileUrl));
  writeFileSync(path.resolve(dirname, "path.txt"), inspect(babelPath));
}
