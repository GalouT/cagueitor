"use strict";

const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");

mongoose.connect(config.db);
const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Error de conexión a la base de datos:", err);
});

db.once("open", () => {
  console.log("Conexión a la base de datos establecicda");

  app.listen(config.port, () => {
    console.log(`la api esta corriendo en http://localhost:${config.port}`);
  });
});
