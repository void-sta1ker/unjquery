function innerWidth(el, value) {
  if (value === undefined) {
    return el.clientWidth;
  } else {
    el.style.width = value;
  }
}
