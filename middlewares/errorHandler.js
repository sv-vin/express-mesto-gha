const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err.stack || err);
  const status = err.statusCode || 500;

  res.status(status).send({ err });
  next();
};

module.exports = errorHandler;
