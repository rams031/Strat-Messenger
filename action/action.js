const express = require("express");
const jwt = require("jsonwebtoken");
const { saveCache } = require("../db/redis");

const view = (model, res, req, next) => {
  model
    .find()
    .then((response) => {
      saveCache(req, response);
      return res.status(200).send(response);
    })
    .catch((err) => {
      return next(err);
    });
};

const viewOne = (model, body, res, next) => {
  const { _id } = body;

  model
    .findOne({ _id })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      return next(err);
    });
};

const create = (model, body, res, next) => {
  model
    .create(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      return next(err);
    });
};

const login = (model, body, res, next) => {
  const { email, password } = body || {};
  model
    .find({ email })
    .then((result) => {
      if (result && password === result[0].password) {
        const token = generateAccessToken({ ...result[0] });

        return res.status(201).send({
          ...result,
          token: token,
          message: "Successfully Logged In",
        });
      }

      return res.status(422).send({ message: "Invalid Credential" });
    })
    .catch((err) => {
      return next(err);
    });
};

const generateAccessToken = (data) => {
  return jwt.sign(data, "secret");
};

module.exports = {
  generateAccessToken,
  create,
  view,
  login,
};
