import { NextResponse } from "next/server";

export const revalidate = false;

const content = `$("p").css("color", "red");

$("p").toggleClass("btn btn-primary");

$("p").addClass("btn btn-primary");

$("p").removeClass("btn btn-primary");

$("p.desc").html();

$("p.desc").html("<strong>WOW</strong>");

$("p")
  .css("color", "red")
  .find(".special")
  .css("color", "green");

$("ul.first")
  .find(".foo")
  .css("color", "red")
  .end()
  .find(".bar")
  .css("color", "green")
  .end();

$("p")
  .end()
  .css("color", "red"); // [] -> ["p"] -> []

var p = [$("p").css("color", "red")];

$.each({ a: 1, b: 2 }, console.log);

$.each([1, 2, 3], console.log);

var pp = $
.each($("p")
.css("color", "red"), console.log);

$
  .each($("p")
  .css("color", "red"), console.log);

$("p").remove();

$("p.desc").text();

$("p.desc").text("WoW");

$.noop();

$();

$("p").click(function (evt) {
  evt.stopPropagation();
  $(this).toggleClass("expanded");
});

$("p")
  .pushStack($("q")
  .css("color", "red"))
  .html();

jQuery([])
  .pushStack(document.getElementsByTagName("div"))
  .remove()
  .end();

$.getJSON("/my/url", function (data) {});

$("p").toggle();

$("<p id='test'>My <em>new</em> text</p>").appendTo("body");

jQuery(function ($) {
  $("p").css("color", "red");
});

$({ foo: "bar", hello: "world" }).prop("foo");

$(document.body).css("background", "black");

$("p").fadeIn();

$(".test1").closest(".test2").css("color", "red");`;

export async function GET(request: Request) {
  return NextResponse.json(
    {
      content,
    },
    { status: 200 }
  );
}
