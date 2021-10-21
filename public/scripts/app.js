$(document).ready(function () {
  loadListings(70);

// -------------------------------------
  $(".admin_button").on("click", function (event) {

    $.get(`/login`, function () {
      console.log("get request");
    });
    setTimeout(function () { location.reload(); }, 50);
  });

  $(".logout").on("click", function (event) {

    $.post(`/logout`, function () {
      console.log("get request");
    });

    setTimeout(function () { location.reload(); }, 50);
  });





// -------------------------------------





  $(".search-form").on("submit", function (event) {
    event.preventDefault();

    const search = $("#search-bar").val();
    loadListings(-1, search);
  });

  $(".new-listing").on("submit", function (event) {
    event.preventDefault();

    const formdata = $(this).serializeArray();
    const package = formdata.reduce((accu, current) => {
      accu[current.name] = current.value;
      return accu;
    }, {});

    const search = $("#search-bar").val();

    $.post("/listings", package)
      .then((res) => {
        window.location.reload();
      })

  });
});

const loadListings = function (limit, search) {
  const searchText = search ? `search=${search}` : "";
  const limitText = limit ? `limit=${limit}` : "";

  const url = `/listings?${searchText}&${limitText}`;


  $.get(url).then((data) => {
    renderListings(data.listings);






    $(".fav").on("click", function (event) {
      event.preventDefault();
      const id = event.target.dataset.id;
      console.log(id);

      $.post(`/listings/${id}/favorited`)
        .then(() => {
          console.log('post to favorited');
        });


      });

      $(".unfav").on("click", function (event) {
        event.preventDefault();
        const id = event.target.dataset.id;
        console.log(id);

        $.post(`/listings/${id}/unfavorited`)
          .then(() => {
            console.log('post to unfavorited');
          });


        });
      // $.post(`/listings/${id}/unfavorited`)
      // .then(() => {
      //   $(this).css("color", "red");
      //   setTimeout(function () { location.reload(); }, 50);
      // });

    // $.post(`/listings/${id}/favorited`)
    //     .then(() => {
    //       $(this).css("color", "red");
    //       setTimeout(function () { location.reload(); }, 50);
    //     });







    $(".delete").on("click", function (event) {
      event.preventDefault();

      const id = event.target.dataset.id;
      $.post(`/listings/${id}/delete`)
        .then(() => {
          window.location.reload();
        });
    });
  });
};

function renderListings(listings) {
  $(`.listings_master_container`).empty();
  console.log(listings);
  const sortedListings = listings.sort((a, b) => b - a);
  for (const listing of sortedListings) {
    const newListing = createListing(listing);
    $(`.listings_master_container`).append(newListing);
  }
}

function createListing(listing) {
  console.log("LISTING", listing);
  return $(`
  <div class="listing_container">

  <h3>${listing.name}</h3>
  <img src="${listing.picture_url}" alt="flower">
  <h4 class="listing-info">$${listing.price} Quantity: ${listing.quantity}</h4>
  <div class="listing-bottom">
    <button class="contact">
      <a href="mailto:someone@mozilla.org">Contact</a>
    </button>
    <button class="fav" data-id = '${listing.id}'>&hearts;</button>
    <button class="unfav" data-id = '${listing.id}'>unfav</button>

    <button class="delete"
    data-id = '${listing.id}'
    >
    delete
  </button>
  </div>
</div>
  `);
}

// style= "display:none;"









