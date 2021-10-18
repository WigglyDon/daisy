/*
 * All routes for listings are defined here
 * Since this file is loaded in server.js into api/listings,
 *   these routes are mounted onto /listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/listings", (req, res) => {
    db.query(`SELECT * FROM listings;`)
      .then(data => {
        const listings = data.rows;
        res.json({ listings });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
