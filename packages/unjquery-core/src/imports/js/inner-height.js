function innerHeight(el, value) {
  if (value === undefined) {
    return el.clientHeight;
  } else {
    el.style.height = value;
  }
}
