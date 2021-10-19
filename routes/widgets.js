const express = require('express');
const router  = express.Router();



module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM plants`;
    console.log(query);
    db.query(query)
      .then(data => {
        const plants = data.rows;
        res.json({ plants });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
      db.query(" SELECT * FROM plants;")
    .then(result => {
        // console.log(res.rows);
        res.json(result.rows);

    }).catch(err => console.error(err.stack));

  });
  return router;
};
