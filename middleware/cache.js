const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { client } = require("./../db/redis");

const cache = async (req, res, next) => {
  const { originalUrl, user } = req || {};
  const { _id } = user || {};

  const stringToHash = (data) =>
    crypto.createHash("md5").update(data).digest("base64");

  const typeHash = stringToHash(_id);
  const modelHash = stringToHash(originalUrl);
  const redisCacheData = await client.hGet(typeHash, modelHash);

  if (redisCacheData) {
    var decodedCache = jwt.verify(redisCacheData, "secret");
    return res.status(200).send(decodedCache);
  }

  return next();
};

module.exports = cache;
