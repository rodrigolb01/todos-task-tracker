const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Item = require("../../models/Item");
const asyncHandler = require('express-async-handler')
const { protect } = require('../../middleware/authMiddleware');
const User = require("../../models/User");
// @route Get api/items
// @desc get all Items
// @access Public

var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(express.json());

router.get("/", protect, asyncHandler(async (req, res) => {
  Item.find({ user: req.user.id })
    .sort({ date: -1 })
    .then((items) => res.json(items));
}));

router.post("/", protect, urlencodedParser, asyncHandler(async (req, res) => {
  const newItem = new Item({
    user: req.user.id,
    date: req.body.date ? req.body.date : Date.now(),
    description: req.body.description ? req.body.description : "undefined",
  });

  newItem.save().then((item) => res.json(item));
}));

router.put("/:id", protect, urlencodedParser, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const id = req.params.id;

  const item = await Item.findById(id).catch((err) => {
    throw new Error(err);
  });

  if (!item) {
    res.status(400);
    throw new Error("Resource not found");
  }

  if (item.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updated = {
    date: req.body.date ? req.body.date : item.date,
    description: req.body.description
      ? req.body.description
      : item.description,
  };

  Item.findByIdAndUpdate(id, updated, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        res.status(200);
        res.json(updated)
      } else {
        res.status(401);
        throw new Error("Error updating item");
      }
    })
    .catch((err) => {
      console.log("Error updating item id:" + id + " with error: " + err)
      res.status(401);
      throw new Error("Error updating item");
    }
    );
}));

router.delete("/:id", protect, urlencodedParser, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if(!user)
  {
    res.status(400);
    throw new Error("User not found");
  }

  const id = req.params.id;

  const item = await Item.findById(id).catch((err) => 
  {
    throw new Error(err);
  })

  if(!item)
  {
    res.status(400);
    throw new Error("Resource not found");
  }

  if(item.user.toString() !== user.id)
  {
    res.status(401);
    throw new Error("Not authorized");
  }

  Item.findByIdAndDelete(id)
    .then((deletedUser) => {
      if (deletedUser) {
        res.status(200);
        res.json(deletedUser);
      } else {
        throw new Error("Error deleting item");
      }
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
    });
}));

module.exports = router;
