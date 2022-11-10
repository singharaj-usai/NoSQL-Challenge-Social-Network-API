// Express.js
const express = require("express");
// Mongoose
const mongoose = require("mongoose");

// Initialize the server
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for JSON and string parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware for the API routes
app.use(require("./routes"));

// Mongoose database connection
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://localhost:27017/nosql-social-network-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Log the mongo queries being executed
mongoose.set("debug", true);

// Open a port for the server
app.listen(PORT, () => console.log("Now listening on port %s.", PORT, PORT));
