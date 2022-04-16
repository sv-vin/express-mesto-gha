const ErrorNotFound = require('../errors/ErrorNotFound');
const BadRequest = require('../errors/BadRequest');
const ForbiddenError = require('../errors/Forbidden');
const Cards = require('../models/card');

module.exports.getCard = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => {
      if (!card) {
        next(new BadRequest('Переданы некорректные данные'));
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest({ message: err.errorMessage }));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new ErrorNotFound('Карточка не найдена');
    })
    .then((card) => {
      if (!card) {
        next(new ErrorNotFound('Карточка не найдена'));
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest({ message: err.errorMessage }));
      }
      next(err);
    });
};

module.exports.disLikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new ErrorNotFound('Карточка не найдена');
    })
    .then((card) => {
      if (!card) {
        next(new ErrorNotFound('Карточка не найдена'));
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest({ message: 'Переданы некорректные данные' }));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Cards.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound('Карточка с указанным _id не найдена');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Запрещено удалять чужие карточки');
      }
      return Cards.deleteOne({ _id: cardId });
    })
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequest('При удалении карточки передан некорректный _id'),
        );
      }
      next(err);
    });
};
