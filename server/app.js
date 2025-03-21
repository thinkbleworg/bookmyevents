// server.js
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const eventRoutes = require("./routes/eventRoutes");

const app = express();
const PORT = process.env.port || 5000;

// Allow requests from React frontend running on localhost
app.use(cors());

// Use the express to parse the requests
app.use(express.json());


// Use the routes
app.use("/api/events", eventRoutes);

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
