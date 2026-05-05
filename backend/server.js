const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

console.log("URI Loaded:",process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
})
.catch(err => {
    console.log("FULL ERROR:",err);
});


app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});