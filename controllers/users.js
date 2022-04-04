const User = require('../models/user');

// module.exports.getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.send({ data: [{ users }] }))
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// };

// module.exports.getUserById = (req, res) => {
//   const { userId } = req.params;
//   User.findById(userId)
//     .then((users) => {
//       if (!users) {
//         res
//           .status(404)
//           .send({ message: 'Пользователь по переданному id не найден' });
//       } else {
//         res.send({ data: users });
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         res.status(400).send({ message: 'Невалидный id пользователя' });
//       } else {
//         res.status(500).send({ message: 'Произошла ошибка' });
//       }
//     });
// };

// module.exports.getUserInfo = (req, res) => {
//   const userId = req.user._id;
//   User.findById(userId)
//     .then((users) => {
//       if (!users) {
//         res
//           .status(404)
//           .send({ message: 'Пользователь по переданному id не найден' });
//       } else {
//         res.send({ data: users });
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         res.status(400).send({ message: 'Невалидный id пользователя' });
//       } else {
//         res.status(500).send({ message: 'Произошла ошибка' });
//       }
//     });
// };

// module.exports.updateAvatar = (req, res) => {
//   const { avatar } = req.body;
//   User.findByIdAndUpdate(
//     req.user._id,
//     { avatar },
//     {
//       new: true,
//       runValidators: true,
//       upsert: false, // если пользователь не найден, он будет создан
//     },
//   )
//     .then((users) => {
//       if (!users) {
//         res
//           .status(404)
//           .send({ message: 'Пользователь с указанным id не найден' });
//       } else {
//         res.send({ data: users });
//       }
//     })
//     .catch((err) => {
//       console.dir(err);
//       if (err.name === 'ValidationError') {
//         res.status(400).send({
//           message: 'Переданы некорректные данные при обновлении аватара',
//         });
//       } else {
//         res.status(500).send({ message: 'Произошла ошибка' });
//       }
//     });
// };

// module.exports.updateProfile = (req, res) => {
//   User.findByIdAndUpdate(req.user._id, req.body, {
//     new: true,
//     runValidators: true,
//     upsert: false, // если пользователь не найден, он будет создан
//   })
//   // обновим имя найденного по _id пользователя

//     .then((users) => {
//       if (!users) {
//         res
//           .status(404)
//           .send({ message: 'Пользователь по переданному id не найден' });
//       } else {
//         res.send({ data: users });
//       }
//     })
//     .catch((err) => {
//       console.dir(err);
//       if (err.name === 'ValidationError') {
//         res.status(400).send({ message: 'Переданы не корректные данные' });
//       } else {
//         res.status(500).send({ message: 'Произошла ошибка' });
//       }
//     });
// };

// module.exports.createUsers = (req, res) => {
//   const { name, about, avatar } = req.body;
//   User.create({ name, about, avatar })
//     .then((users) => res.send({ data: users }))
//     // если данные не записались, вернём ошибку
//     .catch((err) => {
//       console.dir(err);
//       if (err.name === 'ValidationError') {
//         res.status(400).send({ message: 'Переданы некорректные данные' });
//       } else {
//         res.status(500).send({ message: 'Произошла ошибка' });
//       }
//     });
// };

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибочка' }));
};
module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: 'Пользователь по переданному id не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибочка' });
      }
    });
};
module.exports.createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  // записываем данные в базу
  User.create({ name, about, avatar })
    // возвращаем записанные в базу данные пользователю
    .then((user) => res.send({ data: user })) // возможно юзер нужно будет переписать с нижней буквы
    // если данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибочка' });
      }
    });
};
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  // обновим имя найденного по _id пользователя
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, он будет создан
    },
  )
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: 'Пользователь по переданному id не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы не корректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибочка' });
      }
    });
};
module.exports.updateAvatar = (req, res) => {
  // обновим имя найденного по _id пользователя
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, avatar, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: false, // если пользователь не найден, он будет создан
  })
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: 'Пользователь по переданному id не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы не корректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибочка' });
      }
    });
};
