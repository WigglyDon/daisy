$(document).ready(function () {

  $(".test_button").on("click", function () {
    const daisy_text = "h1"
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    $(daisy_text).css("color", `#${randomColor}`);
  });

  $("form").on("submit", function (event) {

    event.preventDefault();
    console.log(event);
    $(".listings_master_container").append(createListings());
  })

  const createListings = function () {
    const plantName = "plantName";
    const $listingDom = $(`
    <div class="listing_container">
    <h3>${plantName}</h3>
    <img src="https://cdn.britannica.com/56/197956-050-5062911A/Arabian-jasmine.jpg" alt="flower">
    <div class="listing-bottom">
      <button>
        <a href="mailto:someone@mozilla.org">Contact</a>
      </button>
      <button class="fav">
        fav
      </button>
    </div>
  </div>
    `);
    return $listingDom;


  };



  // $.get("/api/widgets", function(data, status){
  //   data.forEach(item => {
  //     $(".listing_container").append(item.name);

  //   });
  // });

})
