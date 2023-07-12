const jwt = require("jsonwebtoken");

const verifyBearer = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(403).send("No authorized access");

  try {
    const decoded = jwt.verify(token, "secret");

    if (decoded) {
      req.user = decoded?._doc;
      return next();
    }
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = verifyBearer;
