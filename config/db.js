const mongoose = require("mongoose");

const config = require("config");
const mongoURI = config.get("mongoURI");

mongoose
  .connect(mongoURI)
  .then((res) => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB not connected"));
