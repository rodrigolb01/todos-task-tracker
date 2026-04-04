const path = require('path');
const express = require("express");
const cors = require('cors');
const { errorHandler } = require("./middleware/errorMiddleware.js");
const connectDB = require("./config/db.js");
const port = process.env.PORT || 5000;

const goals = require("./routes/goalRoutes.js");
const users = require("./routes/userRoutes.js");

connectDB();

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//use routes
app.use("/goals", goals);
app.use("/users", users);

//serve frontend
if(process.env.NODE_ENV === "production")
{
  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (req, res) => 
    res.sendFile(
      path.resolve(__dirname, "../build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send('App is currently not set to production');
  })
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started in port ${port}`);
});
