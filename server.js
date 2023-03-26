const path = require("path");
const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 5000;
const connectDB = require("./config/db")

connectDB();


const app = express();

// static folder to be read by browser (HTML, CSS) // __dirname points to the root folder of this computer, which goes all the way to randomideas-api, whic is the root of this project, which then joins with public folder in this project, which then loads those static files into the browser when app is deployed or opened in live server
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))



// create basic get route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Random Ideas!" })
});

const ideasRouter = require("./routes/ideas")

// app.use is used for middleware
app.use("/api/ideas", ideasRouter)


// create server
app.listen(port, "localhost", () => {
  console.log(`Server listening on port ${port}`)
});
