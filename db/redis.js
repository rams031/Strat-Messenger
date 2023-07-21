require("dotenv").config();
const crypto = require("crypto");
const { createClient } = require("redis");
 
const jwt = require("jsonwebtoken");

const client = createClient({
  password: "MVpYGc4bW8654L6VS5PzuKpjrt5q3gJo",
  socket: {
    host: "redis-16518.c14.us-east-1-2.ec2.cloud.redislabs.com",
    port: 16518,
  },
});

 
const redisConfig = {
  EX: 86400, // Expiration
  NX: true, // Writable
};

const stringToHash = (data) =>
  crypto.createHash("md5").update(data).digest("base64");

const saveCache = async (req, data) => {
  const { originalUrl, user } = req || {};
  const { _id } = user || {};
  const typeHash = stringToHash(_id);
  const modelHash = stringToHash(originalUrl);

  if (data) {
    const encoded = jwt.sign({ data }, "secret");

    try {
      const saveToCloud = await client.hSet(typeHash, modelHash, encoded);
      return saveToCloud;
    } catch (err) {
      console.log("Cannot save to cloud");
    }
  }
  //   if (redisCacheData) {
  //     var decodedCache = jwt.verify(redisCacheData, "secret");
  //     return res.status(200).send(decodedCache);
  //   }

  //   return new Promise((resolve) => {
  //     model
  //       .find()
  //       .then(async (response) => {
  //         if (response) {
  //           const encoded = jwt.sign({ response }, "secret");

  //           await client
  //             .hSet(typeHash, modelHash, encoded)
  //             .then((res) => console.log("res", res))
  //             .catch((err) => console.log("err", err));

  //           return resolve(response);
  //           //   res.status(200).send(response);
  //         }
  //       })
  //       .catch((err) => {
  //         return next(err);
  //       });
  // connection.query(query, async (error, results) => {
  //   const encoded = jwt.sign({ data: { error, results } }, "secret");

  //   await client
  //     .hSet(
  //       keyHash,
  //       queryHash,
  //       encoded
  //       // redisConfig
  //     )
  //     .then((res) => console.log("res", res));
  //   return resolve({ error, results });
  // });
  //   });
};

const clearCache = (key) => {
  const hashKey = stringToHash(key);
  console.log(`hashKey key clear:`, hashKey);
  return client.del(hashKey).then((res) => console.log("res", res));
};

module.exports = { client, redisConfig, clearCache, saveCache };
