const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Item = require("../../models/Item");
// @route Get api/items
// @desc get ALl Items
// @access Public

var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(express.json());
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

router.post("/", urlencodedParser, (req, res) => {
  const newItem = new Item({
    date: req.body.date ? req.body.date : Date.now(),
    description: req.body.description ? req.body.description : "undefined",
  });

  newItem.save().then((item) => res.json(item));
});

router.put("/:id", urlencodedParser, (req, res) => {
  const id = req.params.id;

  const target = Item.findById(id).catch((err) => {
    console.log("User not found. Error " + err);
  });

  const updated = {
    date: req.body.date ? req.body.date : target.date,
    description: req.body.description
      ? req.body.description
      : target.description,
  };

  Item.findByIdAndUpdate(id, updated, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        console.log("Updated user id:" + id);
      } else {
        console.log("Error. User id:" + id + " not found");
      }
    })
    .catch((err) =>
      console.log("Error updating user id:" + id + " with error: " + err)
    );
});

router.delete("/:id", urlencodedParser, (req, res) => {
  const id = req.params.id;

  Item.findByIdAndDelete(id)
    .then((deletedUser) => {
      if (deletedUser) {
        console.log("User deleted:", deletedUser);
      } else {
        console.log("User not found");
      }
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
});

module.exports = router;
