const express = require("express");

const view = (model, res, next) => {
  model
    .find()
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
      if (result && password === result[0].password)
        return res.status(201).send({ data: result,  message: "Successfully Logged In" });

      return res.status(422).send({ message: "Invalid Credential" });
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = {
  create,
  view,
  login,
};
