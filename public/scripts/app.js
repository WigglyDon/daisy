$(document).ready(function() {
  loadListings(70);

  // -------------------------------------
  $(".admin_button").on("click", function(event) {

    $.get(`/login/1`, function() {
      console.log("get request");
    });
    setTimeout(function() { location.reload(); }, 50);
    // location.reload();
  });

  $(".logout").on("click", function(event) {

    $.post(`/logout`, function() {
      console.log("get request");
    });

    setTimeout(function() { location.reload(); }, 50);
    // location.reload();
  });





  // -------------------------------------





  $("#search-bar").on("input", function(event) {


    const search = $(this).val();

    loadListings(5, search);
  });

  $(".search-form").on("submit", function(event) {
    event.preventDefault();
  })


  $(".new-listing").on("submit", function(event) {
    event.preventDefault();

    const formdata = $(this).serializeArray();
    const package = formdata.reduce((accu, current) => {
      accu[current.name] = current.value;
      return accu;
    }, {});

    const search = $("#search-bar").val();

    $.post("/listings", package)
      .then((res) => {
        // window.location.reload();
      })

  });
});
// document ready end

const loadListings = function(limit, search) {
  const searchText = search ? `search=${search}` : "";
  const limitText = limit ? `limit=${limit}` : "";

  const url = `/listings?${searchText}&${limitText}`;


  $.get(url).then((data) => {
    renderListings(data.listings, data.loggedInUser);


    $(".fav").off("click").on("click", function(event) {
      event.preventDefault();
      const id = event.target.dataset.id;
      console.log(id);

      $.post(`/listings/${id}/favorited`)
        .then(() => {
          console.log('post to favorited');

        });

      setTimeout(function() { location.reload(); }, 50);
    });

    $(".unfav").off("click").on("click", function(event) {
      event.preventDefault();
      const id = event.target.dataset.id;
      console.log(id);

      $.post(`/listings/${id}/unfavorited`)
        .then(() => {
          console.log('post to unfavorited');

        });

      setTimeout(function() { location.reload(); }, 50);
    });






    $(".delete").on("click", function(event) {
      event.preventDefault();

      const id = event.target.dataset.id;
      $.post(`/listings/${id}/delete`)
        .then(() => {
          window.location.reload();
        });
    });
  });
};

function renderListings(listings, loggedInUser) {
  $(`.listings_master_container`).empty();
  console.log(listings);
  const sortedListings = listings.sort((a, b) => b - a);
  for (const listing of sortedListings) {
    const newListing = createListing(listing, loggedInUser);
    $(`.listings_master_container`).append(newListing);
  }
}

function createListing(listing, loggedInUser) {
  const contactButton = `<button class="contact">
 <a href="mailto:someone@mozilla.org">Contact</a>
    </button>
  `
  const deleteButton = `
  <button class="delete" data-id='${listing.id}'>delete</button>
  `
  return $(`
  <div class="listing_container">

  <h3>${listing.name}</h3>
  <img src="${listing.picture_url}" alt="flower">
  <h4 class="listing-info">$${listing.price} Quantity: ${listing.quantity}</h4>
  <div class="listing-bottom">
    ${contactButton}
    <button class="fav" data-id = '${listing.id}'>❤️</button>
    <button class="unfav" data-id='${listing.id}'>&#128148;</button>

    ${loggedInUser ? deleteButton : ''}


  </div>
</div>
  `);
}

// style= "display:none;"









