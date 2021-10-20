


$(document).ready(function() {
  loadListings(15);


  $(".admin_button").on("click", function(event) {
    location.reload();
    // event.preventDefault();
    $.get(`/login`, function() {
      console.log("get request")

    })

  })

  $(".logout").on("click", function(event) {
    location.reload();

    $.post(`/logout`, function() {
      console.log("get request")
    })
  })


  $(".search-form").on("submit", function(event) {
    event.preventDefault();

    const search = $("#new-listing").val();
    loadListings(-1, search);
  });


  $(".new-listing").on("submit", function(event) {
    event.preventDefault();

    const formdata = $(this).serializeArray();
    const package = formdata.reduce((accu, current) => {

      accu[current.name] = current.value;
      return accu;
    }, {})
    debugger
    const search = $("#search-bar").val();
    $.post('/listings', package)

      .then(() => {

        console.log("post request made");
      }
      )

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

      $(".delete").on("click", function(event) {
        event.preventDefault();

        const id = event.target.dataset.id;
        $.post(`/listings/${id}/delete`)

          .then(() => {

            console.log("this item is deleted");
            window.location.reload();
          }
          )

      })
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
  console.log("LISTING", listing);
  return $(`
  <div class="listing_container">
  <h3>${listing.name}</h3>
  <h4>${listing.price}</h4>
  <h4>${listing.quantity}</h4>
  <img src="${listing.picture_url}" alt="flower">
  <div class="listing-bottom">
    <button>
      <a href="mailto:someone@mozilla.org">Contact</a>
    </button>
    <button class="fav">
      fav
    </button>
    <button class="delete"
data-id = '${listing.id}'
    >
    delete
  </button>
  </div>
</div>
  `);
};




    // style= "display:none;"
