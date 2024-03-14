"use strict";

const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const api = require("./routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutDir: __dirname + "/views/layouts/",
  })
);
app.set("view engine", ".hbs");

app.get("/login", (req, res) => {
  res.render("login");
});
app.use("/api", api);

module.exports = app;
