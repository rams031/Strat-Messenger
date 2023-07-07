function errorHandler(err, req, res, next) {
  const { code, keyPattern } = err || {};

  if (err.code === 11000) {
    const duplciateObject = Object.entries(keyPattern).map(([object, value]) => object)  ;
    return res.status(422).json({ message: `${duplciateObject} credential already used` });
  }
  res.sendStatus(500);
}

module.exports = errorHandler;
