export default function isObviousHtml(input: string) {
  return (
    input[0] === "<" && input[input.length - 1] === ">" && input.length >= 3
  );
}
