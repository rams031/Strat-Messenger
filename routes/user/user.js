const router = require("express").Router();
const UserModel = require("./../../model/user/user");
const auth = require("./../../middleware/auth");

const { create, view, login } = require("./../../action/action");
const cache = require("../../middleware/cache");

router.get("/", (req, res, next) => {
  const getAllUser = view(UserModel, res, req, next);
  return getAllUser;
});

router.get("/info", auth, (req, res, next) => {
  if (req.user) return res.status(200).send({
    data: req.user,
    message: "Account Exist",
  });

  return res.status(422).send({ message: "No Account Found" });
})

router.post("/register", (req, res, next) => {
  const { body } = req || {};
  const createUser = create(UserModel, body, res, next);
  return createUser;
});

router.post("/login", (req, res, next) => {
  const { body } = req || {};
  const loginUser = login(UserModel, body, res, next);
  return loginUser;
});

module.exports = router;
