function offset(el) {
  const box = el.getBoundingClientRect();
  const docElem = document.documentElement;
  return {
    top: box.top + window.pageYOffset - docElem.clientTop,
    left: box.left + window.pageXOffset - docElem.clientLeft,
  };
}
