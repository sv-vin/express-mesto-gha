const Card = require('../models/card');

  
module.exports.getCards = (req, res) => {
  Card.find({})
        .then(cards => res.send({ data: cards }))
        .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove({cardId})
        .then(cards => res.send({ data: cards }))
        .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
        .then(cards => res.send({ data: cards }))
        .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.putLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)

module.exports.deleteLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)

