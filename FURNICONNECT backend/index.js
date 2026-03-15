const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./src/db/db");

const authRoutes = require("./src/routes/authRoutes");
const jobRoutes = require("./src/routes/jobRoutes");
const materialRoutes = require("./src/routes/materialRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);


app.get("/", (req, res) => {
  res.send("FurniConnect Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});