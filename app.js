const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routesUser = require('./routes/users');
const routerCard = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb ', {
  useNewUrlParser: true,
});

app.use(routesUser);
app.use(routerCard);

app.use((req, res, next) => {
  req.user = {
    _id: '6248741a5e2ca84661c0bdd5',
  };
  next();
});

app.use((req, res) => {
  res.status(404).send({ message: 'Не корректный URL' });
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
