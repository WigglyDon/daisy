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
    // keys: ['test'],
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
  if (!req.session.user) {
    res.render("index");
  } else {
    res.render("admin");
  }
});

//LOGIN
app.get("/login", (req, res) => {
  req.session = {
    user: "John",
  };

  res.redirect("/");
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
  VALUES ($1, $2, $3, $4, false)`;
  console.log(req.body);
  db.query(query, [
    req.body["listing-name"],
    req.body["img-url"],
    req.body["price"],
    req.body["quantity"],
  ]).then((data) => {

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
  WHERE id = ${id};`;

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
  console.log("QUERY", req.originalUrl);
  const limit = Number(req.query.limit);
  console.log("searchQuery", searchQuery);
  let query = `
    SELECT id, name, picture_url, price, quantity
    FROM listings`;

  if (searchQuery && searchQuery.length)
    query += ` WHERE name LIKE '%${searchQuery}%'`;
  console.log("limit", limit);

  query += ` ORDER BY favorited DESC, id`;

  if (limit > 0) query += ` LIMIT ${limit} `;

  console.log("query = ", query);

  db.query(query)
    .then((data) => {

      const listings = data.rows;
      res.json({ listings });
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
