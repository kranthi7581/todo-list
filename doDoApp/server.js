const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const toDoRoutes = require("./routes/ToDoRoutes");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const clientBuildPath = path.join(__dirname, "client", "build");
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

<<<<<<< HEAD
app.use(cors({
  origin:[
    "http://localhost:3000",
    "https://todo-list-4-ww9x.onrender.com",
  ],
  credentials: true,
}));
// app.use(cors({ origin: "*" }));
=======
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
>>>>>>> 1b3f301 (render)
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/todo", toDoRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientBuildPath));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

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
