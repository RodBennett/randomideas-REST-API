const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 5000;
const connectDB = require("./config/db")

connectDB();


const app = express();

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
