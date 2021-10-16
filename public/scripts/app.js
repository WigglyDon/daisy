$(document).ready(function () {

  $(".test_button").on("click", function () {
    const daisy_text = "h1"
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    $(daisy_text).css("color", `#${randomColor}`);
  });

  $(".database_button").on("click", function () {
    $.get("/api/widgets", function(data, status){
      data.forEach(item => {
        $(".listing_container").append(item.name);

      });
    });

  });

});



