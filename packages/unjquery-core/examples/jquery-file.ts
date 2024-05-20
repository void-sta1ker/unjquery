$(function () {
  $(".draw").css({ height: $(window).height() + "px" });

  setInterval(gos);

  let flag = 0;

  function gos() {
    if (flag == 0) {
      $(".wings div")
        .removeClass("wing2")
        .removeClass("wing3")
        .addClass("wing");
      flag = 1;
    } else if (flag == 1) {
      $(".wings div")
        .removeClass("wing")
        .removeClass("wing3")
        .addClass("wing2");
      flag = 2;
    } else {
      $(".wings div")
        .removeClass("wing")
        .removeClass("wing2")
        .addClass("wing3");
      flag = 0;
    }
  }

  function goRight() {
    $(".bee").css({
      transform: "scaleX(-1)",
    });
    $(".bee").animate(
      {
        marginLeft: ($(window).width() ?? 0) - ($(".bee").width() ?? 0) + "px",
      },
      5000,
      function () {
        goLeft();
      },
    );
  }

  function goLeft() {
    $(".bee").css({
      transform: "scaleX(1)",
    });
    $(".bee").animate(
      {
        margin: "10px",
      },
      5000,
      function () {
        goRight();
      },
    );
  }

  goRight();
});
