"use strict";

const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config");

function createToken(user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };

  return jwt.sign(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
  const decode = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);

      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: "El Token expiró",
        });
      }

      resolve(payload.sub);
    } catch (err) {
      reject({
        status: 500,
        message: "Invalid Token",
      });
    }
  });

  return decode;
}

module.exports = {
  createToken,
  decodeToken,
};
