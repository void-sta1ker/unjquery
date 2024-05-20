const variable = ".folder-tree li";

$(function () {
  $(variable).click(function (evt) {
    evt.stopPropagation();
    $(this).toggleClass("expanded");
  });
});

/*

window.onload = function () {
  document.querySelector(".folder-tree li").onclick = function (evt) {
    evt.stopPropagation();  
    this.classList.toggle("expanded");
  };
}

*/
