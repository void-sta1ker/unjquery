import parser from "@babel/parser";
import _traverse from "@babel/traverse";
import _generate from "@babel/generator";
import type { Visitor } from "@babel/traverse";
import prettier from "prettier";
import * as rules from "./rules.js";
import openGate from "./components/gate.js";
import type { Context } from "./components/context.js";
import { type Config } from "./components/config.js";
import removeEmptyStatements from "./helpers/remove-empty-statements.js";

//------- INIT
const traverse = _traverse.default;
const generate = _generate.default;

export default async function unjquery(file: string, config: Config = {}) {
  //------- PARSING
  const ast = parser.parse(file, {
    sourceType: "module",
    strictMode: true,
  });

  //------- TRANSFORMATION
  const context: Context = {
    noConflict: false,
    readyException: () => {},
  };

  const visitor: Visitor<{ context: Context }> = {
    CallExpression(path) {
      openGate({
        context: this.context,
        path,
      });
    },

    MemberExpression(path) {
      if (rules.isStaticProperty(path)) {
        //
      }
    },
  };

  //------- TRAVERSING
  traverse(ast, visitor, undefined, { context });

  //------- CODE GENERATION
  const output = generate(ast, {
    retainLines: true,
  });

  const cleanedCode = removeEmptyStatements(output.code);

  const prettyCode = await prettier.format(cleanedCode, {
    parser: "babel",
  });

  return prettyCode;
}
