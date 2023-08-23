const jwt = require("jsonwebtoken");

const verifyBearer = (req, res, next) => {
  console.log(`req:`, req)
  if (!req.headers.authorization)
    return res.status(403).send("No authorized access");
  const token = req.headers.authorization.split(" ")[1];

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
