"use strict";

/* const mongoose = require("mongoose"); */
const User = require("../models/user");
const service = require("../services");

function signUp(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    passworld: req.body.passworld,
  });

  user
    .save()
    .then((savedUser) => {
      res.status(200).send({ token: service.createToken(savedUser) });
    })
    .catch((err) => {
      res.status(500).send({ message: `Error al crear el usuario ${err}` });
    });
}

function signIn(req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "No existe el usuario" });
      }

      const token = service.createToken(user);

      res.status(200).send({
        message: "Te logueaste correctamente",
        token: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
}

module.exports = {
  signUp,
  signIn,
};
