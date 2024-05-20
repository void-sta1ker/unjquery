const _temp = document.querySelectorAll("p");
_temp.forEach((elm) => {
  elm.style.color = "red";
});

const _temp2 = document.querySelectorAll("p");
_temp2.forEach((elm) => {
  "btn btn-primary".split(" ").forEach((cls) => {
    elm.classList.toggle(cls);
  });
});

const _temp3 = document.querySelectorAll("p");
_temp3.forEach((elm) => {
  elm.classList.add("btn", "btn-primary");
});

const _temp4 = document.querySelectorAll("p");
_temp4.forEach((elm) => {
  elm.classList.remove("btn", "btn-primary");
});

const _temp5 = document.querySelectorAll("p.desc");
_temp5.item(0).innerHTML;

const _temp6 = document.querySelectorAll("p.desc");
_temp6.item(0).innerHTML = "<strong>WOW</strong>";

const _temp7 = document.querySelectorAll("p");
_temp7.forEach((elm) => {
  elm.style.color = "red";
});
const _temp8 = _temp7.querySelectorAll(":scope .special");
_temp8.forEach((elm) => {
  elm.style.color = "green";
});

const _temp9 = document.querySelectorAll("ul.first");
const _temp10 = _temp9.querySelectorAll(":scope .foo");
_temp10.forEach((elm) => {
  elm.style.color = "red";
});
const _temp11 = _temp9.querySelectorAll(":scope .bar");
_temp11.forEach((elm) => {
  elm.style.color = "green";
});

const _temp12 = document.querySelectorAll("p");

// [] -> ["p"] -> []
const _temp13 = document.querySelectorAll("p");
_temp13.forEach((elm) => {
  elm.style.color = "red";
});

var p = [_temp13];
const _temp14 = { a: 1, b: 2 };
for (const [key, value] of Object.entries(_temp14)) {
  console.log.call(value, key, value);
}
const _temp15 = [1, 2, 3];
_temp15.forEach((item, index) => {
  console.log.call(item, index, item);
});

const _temp16 = document.querySelectorAll("p");
_temp16.forEach((elm) => {
  elm.style.color = "red";
});
_temp16.forEach((item, index) => {
  console.log.call(item, index, item);
});

var pp = _temp16;
const _temp17 = document.querySelectorAll("p");
_temp17.forEach((elm) => {
  elm.style.color = "red";
});
_temp17.forEach((item, index) => {
  console.log.call(item, index, item);
});

const _temp18 = document.querySelectorAll("p");
for (const el of _temp18) {
  el.remove();
}
const _temp19 = document.querySelectorAll("p.desc");
let _temp20 = "";
_temp19.forEach((el) => {
  _temp20 += el.textContent;
});

const _temp21 = document.querySelectorAll("p.desc");
_temp21.forEach((el) => {
  el.textContent = "WoW";
});

(function () {})();

const _temp23 = document.querySelectorAll("p");
_temp23.forEach((el) => {
  el.addEventListener(
    "click",

    function (evt) {
      evt.stopPropagation();
      const _temp24 = [this];
      _temp24.forEach((elm) => {
        "expanded".split(" ").forEach((cls) => {
          elm.classList.toggle(cls);
        });
      });
    },
  );
});

const _temp25 = document.querySelectorAll("p");
const _temp26 = document.querySelectorAll("q");
_temp26.forEach((elm) => {
  elm.style.color = "red";
});
_temp26.item(0).innerHTML;

const _temp27 = [];
const _temp28 = document.getElementsByTagName("div");
for (const el of _temp28) {
  el.remove();
}
const _temp29 = await fetch("/my/url");
const _temp30 = await response.json();

const _temp31 = document.querySelectorAll("p");
function toggle(el) {
  if (el.style.display == "none") {
    el.style.display = "";
  } else {
    el.style.display = "none";
  }
}
_temp31.forEach((el) => {
  toggle(el);
});

const _temp32 = generateElements("<p id='test'>My <em>new</em> text</p>");
document.querySelectorAll("body").forEach((parent) => {
  _temp32.forEach((child) => {
    parent.append(child);
  });
});

const _temp33 = ready(function ($) {
  const _temp34 = document.querySelectorAll("p");
  _temp34.forEach((elm) => {
    elm.style.color = "red";
  });
});

const _temp35 = { foo: "bar", hello: "world" };
_temp35["foo"];

const _temp36 = [document.body];
_temp36.forEach((elm) => {
  elm.style.background = "black";
});

const _temp37 = document.querySelectorAll("p");
_temp37.classList.replace("hide", "show");
