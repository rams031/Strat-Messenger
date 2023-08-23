const router = require("express").Router();
const UserModel = require("./../../model/user/user");
const auth = require("./../../middleware/auth");

const { create, view, login } = require("./../../action/action");
const cache = require("../../middleware/cache");

router.get("/", (req, res, next) => {
  const getAllUser = view(UserModel, res, req, next);
  return getAllUser;
});

router.post("/register", (req, res, next) => {
  const { body } = req || {};
  const createUser = create(UserModel, body, res, next);
  return createUser;
});

router.post("/login", (req, res, next) => {
  const { body } = req || {};
  console.log(`body:`, body)
  const loginUser = login(UserModel, body, res, next);
  return loginUser;
});

module.exports = router;
