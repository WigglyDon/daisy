$(document).ready(function () {

  $("form").on("submit", function (event) {
    event.preventDefault();
    const formdata = $(this).serializeArray();
    const data = {};
    $(formdata).each(function (index, obj) { data[obj.name] = obj.value; });
    console.log("formdata", formdata);
    console.log("data", data);
    $.get(`/listings?search=${data['search-bar']}`, function (newData) {
      renderListings(newData.listings);
    });
  });

  function renderListings(listings) {
    $(`.listings_master_container`).empty();
    console.log(listings);

    for (const listing of listings) {
      const newListing = createListing(listing);
      $(`.listings_master_container`).prepend(newListing);
    }
  }

  function createListing(listing) {
      return $(`
    <div class="listing_container">
    <h3>${listing.name}</h3>
    <img src="${listing.picture_url}" alt="flower">
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
  };

});
