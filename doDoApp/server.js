const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const toDoRoutes = require("./routes/ToDoRoutes");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const dns = require("dns");
dns.setServers(["[8.8.8.8]","[1.1.1.1]"]);

app.use(cors({
  origin:[
    "http://localhost:3000",
    "https://todo-list-4-ww9x.onrender.com",
  ]
  credentials: true,
}));
// app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/todo", toDoRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    console.log("db connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
