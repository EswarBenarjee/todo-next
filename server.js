const express = require("express");
const cors = require("cors");

// Express App
const app = express();

// DB Connect
require("./config/db");

// Use middle ware
app.use(express.json({ extended: false }));
app.use(cors());

// Routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/todo", require("./routes/api/todo-items"));

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("App started"));
