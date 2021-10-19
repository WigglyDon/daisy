

$(document).ready(function() {
  loadListings(12);


  $(".admin_button").on("click", function(event) {
    location.reload();
    // event.preventDefault();
    $.get(`/login`, function() {
      console.log("get request")

    })

  })

  $(".logout").on("click", function(event) {
    location.reload();
    // event.preventDefault();
    $.post(`/logout`, function() {
      console.log("get request")
    })
  })


  $("form").on("submit", function(event) {
    event.preventDefault();
    // const formdata = $(this).serializeArray();
    const search = $("#search-bar").val();
    loadListings(-1, search);
  });
});


const loadListings = function(limit, search) {
  const searchText = search ? `search=${search}` : '';
  const limitText = limit ? `limit=${limit}` : '';

  console.log("SearchText", searchText);


  const url = `/listings?${searchText}&${limitText}`;
  console.log("url", url);

  $.get(url)
    .then(data => {
      renderListings(data.listings);
    }
    )
}


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
