// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");

app.use(cookieSession({

  name: 'COOKIE session',
  // keys: ['test'],
  signed: false,
  maxAge: 24 * 60 * 60 * 100
}
));


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect(() => { console.log("Connected to database"); });

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

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
// app.use("/listings", listingsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});


app.get("/listings", (req, res) => {
  const searchQuery = req.query.search;
  let query = `
    SELECT name, picture_url
    FROM listings
    JOIN plants on plant_id = plants.id
    WHERE name LIKE '%${searchQuery}%';
    `;
  db.query(query)
    .then(data => {
      const listings = data.rows
      res.json({ listings });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  return app;
  ;
});


app.get("/login", (req, res) => {

  req.session = {
    user: 'John'
  };
  res.send(`endpoint for /listings/:id method GET`);
});

app.post("/listings", (req, res) => {
  res.send('endpoint for /listings method POST')
});

app.post("/logout", (req, res) => {

  req.session = null;
  res.send('endpoint for /logout method POST')
});


app.listen(PORT, () => {
  console.log(`DAISY on port ${PORT}! :)`);
});






