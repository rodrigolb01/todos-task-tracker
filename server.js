const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const url = require("./config/keys.js").MONGODB_CONNECTION_STRING;
const items = require("./routes/api/items.js");

const server = express();
server.use(express.json());
server.listen(5000, () => {
  console.log("server started in port 5000");
});
server.use(cors());

mongoose
  .connect(url)
  .then(console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

//use routes
server.use("/api/items", items);
