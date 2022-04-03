const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove({ cardId })
    .then((cards) => {
      if (!cards) {
        res.status(404).send({ message: 'Карточка с указанным id не найдена' });
      } else {
        res.send({ data: cards });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id карточки' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((cards) => res.send({ data: cards }))
    // если данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.putLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((cards) => {
    if (!cards) {
      res.status(404).send({ message: 'Передан несуществующий id карточки' });
    } else {
      res.send({ data: cards });
    }
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res
        .status(400)
        .send({ message: 'Переданы некорректные данные для постановки' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
  });

module.exports.deleteLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((cards) => {
    if (!cards) {
      res.status(404).send({ message: 'Передан несуществующий id карточки' });
    } else {
      res.send({ data: cards });
    }
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res
        .status(400)
        .send({ message: 'Переданы некорректные данные для снятии лайка' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
  });
