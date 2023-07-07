const router = require("express").Router();
const UserModel = require("./../../model/user/user");

const { create } = require("./../../action/action");

router.post("/register", (req, res) => {
  const { body } = req || {};

  const createUser = create(UserModel, body, res);
  return createUser;
});

module.exports = router;
