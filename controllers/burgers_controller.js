var express = require("express");

var router = express.Router();

// Import the model to use its database functions.

var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  db.Burger.findAll({})
    .then(function (data) {
      burgArr = data.map(Burger => Burger.dataValues)
      var hbsObject = {
        burgers: burgArr
      };
      res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
  db.Burger.create(req.body).then(function (result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function (req, res) {
  db.Burger.update({ devoured: true },
    {
      where: {
        id: req.params.id
      }
    })
    .then(function (result) {
      if (result[0] == 0) {
        console.log("failed")
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        console.log("it worked!")
        res.status(200).end();
      }
    });
});

router.delete("/api/burgers/:id", function (req, res) {

  db.Burger.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (dbBurger) {
    res.json(dbBurger);
  });
});

// Export routes for server.js to use.
module.exports = router;
