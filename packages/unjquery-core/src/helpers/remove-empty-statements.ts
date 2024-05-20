export default function removeEmptyStatements(code: string) {
  const lines = code.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let newLine = line;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      const prevChar = line[j - 1];

      if (char === ";" && prevChar === char) {
        newLine = newLine.replace(";;", ";\n\n");
      }
    }

    lines[i] = newLine;
  }

  const cleanedCode = lines.join("\n");

  return cleanedCode;
}
