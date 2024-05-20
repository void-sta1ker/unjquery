import parser from "@babel/parser";

export default function genAst(
  strings: TemplateStringsArray,
  ...keys: unknown[]
) {
  let source = "";

  for (let i = 0; i < strings.length; i++) {
    source += strings[i] ?? "";
    source += keys[i] ?? "";
  }

  const ast = parser.parse(source, {
    sourceType: "module",
    strictMode: true,
  });

  return ast.program.body.at(0);
}
