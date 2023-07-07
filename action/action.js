const express = require("express");

const create = (model, body, res) => {
  model
    .create(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.send(500).send(err.message);
    });
};

module.exports = {
  create,
};
