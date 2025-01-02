const mongoose = require("mongoose");
const express = require("express");

const connectToDB = require("./DB/dbService");
const router = require("./router/router");
const app = express();
const PORT = 8181;
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log("Server lisening to port " + PORT);
  connectToDB();
});
