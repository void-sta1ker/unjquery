function generateElements(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  // from HTMLCollection to Array
  return Array.from(template.content.children);
}
