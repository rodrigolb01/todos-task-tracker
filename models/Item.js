const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  date: {
    type: String,
    required: true,
    default: Date.now(),
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
});

const Item = mongoose.model("item", ItemSchema);
module.exports = Item;
