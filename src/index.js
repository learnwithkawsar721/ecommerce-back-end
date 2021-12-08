const express = require("express");
const mongoose = require("mongoose");
const app = express();
/* Dotenv Config*/
require("dotenv").config();

// environment variable or you can say constants
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes.js");
const adminRoute = require("./routes/admin/auth.routes");

// database

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.858ok.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => console.log("Database Connect"));
// meddilware
app.use("/api", authRoutes);
app.use("/api/admin", adminRoute);

// express listen
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
