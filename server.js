// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "COOKIE",
    keys: ['test'],
    signed: false,
    maxAge: 24 * 60 * 60 * 100,
  })
);

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect(() => {
  console.log("Connected to database");
});

//

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const listingsRoutes = require("./routes/listings");
const { request } = require("express");
const { reset } = require("nodemon");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
// app.use("/listings", listingsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

//HOME
//!!!
app.get("/", (req, res) => {
  const object = {
    user: req.session.user
  };

  res.render("index", object);

});

//LOGIN
app.get("/login/:id", (req, res) => {


  const query =
    `
  SELECT name
  FROM users
  WHERE id = ${req.params.id}
  `;

  db.query(query).then((data) => {
    req.session = {
      user: data.rows[0].name,
    };
    res.redirect("/");
  })

  // const word = true ? 'apple' : orange;



});

///LOGOUT
app.post("/logout", (req, res) => {
  req.session = null;
  res.send("endpoint for /logout method POST");
});

//LISTINGS
app.post("/listings", (req, res) => {

  let query = `
  INSERT INTO listings (name, picture_url, price, quantity, favorited)
  VALUES ($1, $2, $3, $4, FALSE)`;
  console.log(req.body);
  db.query(query, [
    req.body["listing-name"],
    req.body["img-url"],
    req.body["price"],
    req.body["quantity"],
  ]).then((data) => {
    // console.log(data)
    res.json({});

  })

    .catch((err) => {
      debugger
      console.log('error 1');
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

app.post("/listings/:id/favorited", (req, res) => {
  const id = req.params.id;
  let query = `
  UPDATE listings
  SET favorited = TRUE
  WHERE id = ${id}`;

  db.query(query).then((data) => {
    res.json({});
  })
    .catch((err) => {
      console.log('error 2');
      res.status(500).json({ error: err.message });
    });
});

app.post("/listings/:id/unfavorited", (req, res) => {
  const id = req.params.id;
  let query = `
  UPDATE listings
  SET favorited = FALSE
  WHERE id = ${id};`;

  db.query(query).then((data) => {
    res.json({});
  })
    .catch((err) => {
      console.log('error 2');
      res.status(500).json({ error: err.message });
    });
});


app.post("/listings/:id/delete", (req, res) => {
  const id = req.params.id;
  let query = `
  DELETE FROM listings WHERE id = ${id};`;

  db.query(query).then((data) => {
    console.log("deleted from db");
    res.json({});
  })
    .catch((err) => {
      console.log('error 2');
      res.status(500).json({ error: err.message });
    });
});


//update sql query to join the favorites table
app.get("/listings", (req, res) => {
  const searchQuery = req.query.search;
  const limit = Number(req.query.limit);
  let query = `
    SELECT id, name, picture_url, price, quantity
    FROM listings`;

  if (searchQuery && searchQuery.length)
    query += ` WHERE LOWER(name) LIKE LOWER('%${searchQuery}%')`;
  console.log("limit", limit);

  query += ` ORDER BY favorited DESC, id`;


  if (limit > 0) query += ` LIMIT ${limit} `;

  db.query(query)
    .then((data) => {
      const listings = data.rows;
      res.json({
        listings,
        loggedInUser: req.session.user
      });
    })
    .catch((err) => {
      console.log('error 3');
      res.status(500).json({ error: err.message });
    });
});

app.listen(PORT, () => {
  console.log(`DAISY on port ${PORT} ! :)`);
});


// UPDATE listings
// SET favorited = TRUE
// WHERE id = ${id};
