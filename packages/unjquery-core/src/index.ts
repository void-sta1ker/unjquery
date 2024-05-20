import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import unjquery from "./unjquery.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const text = readFileSync(`${dirname}/../examples/input.js`, "utf8");

unjquery(text).then((output) => {
  writeFileSync("./out/output.js", output);
  console.log("done");
});
