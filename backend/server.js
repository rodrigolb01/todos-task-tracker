const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const url = require("../config/keys").MONGODB_CONNECTION_STRING;
const items = require("./routes/api/items.js");
const users = require("./routes/api/users.js");
const settings = require ('../config/keys');
const { aggregate } = require('./models/User');

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
server.use("/api/users", users);

//serve frontend
if(settings.NODE_ENV === "PRODUCTION")
{
  server.use(express.static(path.join(__dirname, "../build")));

  server.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "build", "index.html")
    )
  });
}
else
{
  server.get("/", (req, res) => {
    res.send('App is currently not set to production');
  })
}