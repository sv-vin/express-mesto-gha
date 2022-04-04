const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((users) => {
      if (!users) {
        res
          .status(404)
          .send({ message: 'Пользователь по переданному id не найден' });
      } else {
        res.send({ data: users });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.getUserInfo = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((users) => {
      if (!users) {
        res
          .status(404)
          .send({ message: 'Пользователь по переданному id не найден' });
      } else {
        res.send({ data: users });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false, // если пользователь не найден, он будет создан
    },
  )
    .then((users) => {
      if (!users) {
        res
          .status(404)
          .send({ message: 'Пользователь с указанным id не найден' });
      } else {
        res.send({ data: users });
      }
    })
    .catch((err) => {
      console.dir(err);
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: false, // если пользователь не найден, он будет создан
  })
  // обновим имя найденного по _id пользователя

    .then((users) => {
      if (!users) {
        res
          .status(404)
          .send({ message: 'Пользователь по переданному id не найден' });
      } else {
        res.send({ data: users });
      }
    })
    .catch((err) => {
      console.dir(err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы не корректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((users) => res.send({ data: users }))
    // если данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
