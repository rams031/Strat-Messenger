const router = require("express").Router();
const UserModel = require("./../../model/user/user");
const auth = require("./../../middleware/auth");

const { create, view, login } = require("./../../action/action");

router.get("/", auth, (req, res, next) => {
	

	const getAllUser = view(UserModel, res, next);
	return getAllUser;
});

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
