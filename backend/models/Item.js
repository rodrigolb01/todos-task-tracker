const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  user :{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
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
},
{
  timestamps: true
});

const Item = mongoose.model("item", ItemSchema);
module.exports = Item;
