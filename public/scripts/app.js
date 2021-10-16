$(document).ready(function () {

  $("button").on("click", function (event) {
    const daisy_text = "h1"
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    $(daisy_text).css("color", `#${randomColor}`);

  });

});
