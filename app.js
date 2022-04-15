const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();

const error = require('./middlewares/error');
const NotFoundError = require('./errors/not-found');
const UnauthorizedError = require('./errors/unauthorized');

const auth = require('./middlewares/auth');

const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(auth, (req) => {
  if (!req.user) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  throw new NotFoundError('Ресурс не найден');
});

app.use(errors());
app.use(error);

app.listen(PORT);
